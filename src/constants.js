// XP, gold, and HP values for each difficulty tier.
export const DIFFICULTY_CONFIG = {
    easy: {
        label: "Easy",
        xp: 10,
        gold: 5,
        hpDamage: 5,
        borderColor: "border-green-500",
        textColor: "text-green-400",
        badgeBg: "bg-green-500/20",
    },
    medium: {
        label: "Medium",
        xp: 20,
        gold: 10,
        hpDamage: 10,
        borderColor: "border-yellow-500",
        textColor: "text-yellow-400",
        badgeBg: "bg-yellow-500/20",
    },
    hard: {
        label: "Hard",
        xp: 30,
        gold: 20,
        hpDamage: 20,
        borderColor: "border-red-500",
        textColor: "text-red-400",
        badgeBg: "bg-red-500/20",
    },
};

// Starting stats written to Firestore when a new user signs in for the first time.
export const DEFAULT_USER_STATS = {
    level: 1,
    currentXP: 0,
    maxXP: 100,
    hp: 100,
    maxHp: 100,
    gold: 0,
};
