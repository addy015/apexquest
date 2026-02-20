import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db, googleProvider } from "../firebase";
import { DIFFICULTY_CONFIG, DEFAULT_USER_STATS } from "../constants";
import { calculateLevelUp } from "../utils";

export function useGameLogic() {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [levelUpData, setLevelUpData] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser);

            if (!currentUser) {
                setUserData(null);
                setLoading(false);
                return;
            }

            const userRef = doc(db, "users", currentUser.uid);
            const snap = await getDoc(userRef);

            if (!snap.exists()) {
                await setDoc(userRef, {
                    ...DEFAULT_USER_STATS,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    email: currentUser.email,
                    createdAt: new Date(),
                });
            }

            const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
                setLoading(false);
            });

            return unsubscribeSnapshot;
        });

        return () => unsubscribeAuth();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast("Logged out. See you later! 👋", { icon: "🚪" });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleTaskComplete = async (taskDifficulty) => {
        if (!user || !userData) return;

        const config = DIFFICULTY_CONFIG[taskDifficulty];
        if (!config) return;

        const { newStats, didLevelUp } = calculateLevelUp(userData, config.xp, config.gold);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, newStats);

        if (didLevelUp) {
            setLevelUpData({ level: newStats.level, newMaxXP: newStats.maxXP });
            toast.success(`⚔️ LEVEL UP! You reached Level ${newStats.level}!`, {
                duration: 4000,
                style: {
                    background: "#1f2937",
                    color: "#facc15",
                    border: "1px solid #facc15",
                    fontWeight: "bold",
                },
            });
        } else {
            toast.success(`+${config.xp} XP  +${config.gold} 🪙`, {
                style: {
                    background: "#1f2937",
                    color: "#86efac",
                    border: "1px solid #22c55e",
                },
            });
        }
    };

    const handleTaskFail = async (taskDifficulty) => {
        if (!user || !userData) return;

        const config = DIFFICULTY_CONFIG[taskDifficulty];
        if (!config) return;

        const currentHp = userData.hp ?? 100;
        const newHp = Math.max(0, currentHp - config.hpDamage);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { hp: newHp });

        if (newHp === 0) {
            toast(`💀 Soldier, You've fallen! HP hit zero. Level up to restore!`, {
                duration: 5000,
                style: {
                    background: "#1f2937",
                    color: "#f87171",
                    border: "1px solid #ef4444",
                    fontWeight: "bold",
                },
            });
        } else {
            toast(`💔 Quest failed! -${config.hpDamage} HP`, {
                style: {
                    background: "#1f2937",
                    color: "#f87171",
                    border: "1px solid #ef4444",
                },
            });
        }
    };

    const closeLevelUpModal = () => setLevelUpData(null);

    return { user, userData, loading, levelUpData, closeLevelUpModal, handleTaskComplete, handleTaskFail, handleLogin, handleLogout };
}
