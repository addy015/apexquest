import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { Plus, Scroll } from "lucide-react";
import { db } from "../firebase";
import { DIFFICULTY_CONFIG } from "../constants";
import TaskList from "./TaskList";

const DIFFICULTY_OPTIONS = [
    { value: "easy", label: "Easy", emoji: "🟢" },
    { value: "medium", label: "Medium", emoji: "🟡" },
    { value: "hard", label: "Hard", emoji: "🔴" },
];

const TaskBoard = ({ user, handleTaskComplete, handleTaskFail }) => {

    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (!user) return;

        const tasksRef = collection(db, "users", user.uid, "tasks");
        const q = query(tasksRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const taskList = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setTasks(taskList);
        });

        return () => unsubscribe();
    }, [user]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskText.trim() || !user) return;

        setAdding(true);
        try {
            const tasksRef = collection(db, "users", user.uid, "tasks");
            await addDoc(tasksRef, {
                text: taskText.trim(),
                difficulty,
                createdAt: serverTimestamp(),
                uid: user.uid,
            });
            setTaskText("");
        } catch (err) {
            console.error("Error adding task:", err);
        } finally {
            setAdding(false);
        }
    };

    const handleComplete = async (task) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "tasks", task.id));
            await handleTaskComplete(task.difficulty);
        } catch (err) {
            console.error("Error completing task:", err);
        }
    };

    // Silently removes the task without applying any XP or HP penalty.
    const handleDelete = async (taskId) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "tasks", taskId));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const handleFail = async (task) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "tasks", task.id));
            await handleTaskFail(task.difficulty);
        } catch (err) {
            console.error("Error failing task:", err);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-8 w-full">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Scroll className="text-yellow-400 w-6 h-6" />
                <h2 className="text-2xl font-black text-white tracking-tight">Quest Log</h2>
                <span className="ml-auto bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tasks.length} active
                </span>
            </div>

            {/* Add task form */}
            <form
                onSubmit={handleAddTask}
                className="flex flex-col sm:flex-row gap-3 mb-8 bg-gray-800 border border-gray-700 rounded-2xl p-4"
            >
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Describe your quest..."
                    maxLength={120}
                    className="flex-1 bg-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="bg-gray-700 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                >
                    {DIFFICULTY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.emoji} {opt.label}
                        </option>
                    ))}
                </select>

                <motion.button
                    type="submit"
                    disabled={adding || !taskText.trim()}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Quest
                </motion.button>
            </form>

            <TaskList
                tasks={tasks}
                onComplete={handleComplete}
                onFail={handleFail}
                onDelete={handleDelete}
            />

            {/* Rewards & Penalties — shown only when there are active tasks */}
            {tasks.length > 0 && (
                <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3 text-center">
                        Quest Rewards &amp; Penalties
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {[
                            { color: "bg-green-500", label: "Easy", reward: "+10 XP, +5 🪙", penalty: "-5 ❤️" },
                            { color: "bg-yellow-500", label: "Medium", reward: "+20 XP, +10 🪙", penalty: "-10 ❤️" },
                            { color: "bg-red-500", label: "Hard", reward: "+30 XP, +20 🪙", penalty: "-20 ❤️" },
                        ].map((row) => (
                            <div key={row.label} className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${row.color} shrink-0`} />
                                <span className="text-gray-400 font-semibold w-14">{row.label}</span>
                                <span className="text-green-400">{row.reward}</span>
                                <span className="text-gray-600 mx-1">|</span>
                                <span className="text-red-400">fail: {row.penalty}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-600 text-xs mt-3">
                        ✅ Complete = XP &amp; Gold &nbsp;·&nbsp; ❌ I Failed = HP damage &nbsp;·&nbsp; 🗑 Remove = no penalty
                    </p>
                </div>
            )}
        </main>
    );
};

export default TaskBoard;
