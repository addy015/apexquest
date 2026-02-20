import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trash2, Scroll } from "lucide-react";
import { DIFFICULTY_CONFIG } from "../constants";

const TaskList = ({ tasks, onComplete, onFail, onDelete }) => {

    // Falls back to "easy" config if an unrecognized difficulty is encountered.
    const cfg = (diff) => DIFFICULTY_CONFIG[diff] || DIFFICULTY_CONFIG.easy;

    if (tasks.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-gray-600"
            >
                <Scroll className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-semibold">No quests yet.</p>
                <p className="text-sm mt-1">Add your first quest above to begin your adventure!</p>
            </motion.div>
        );
    }

    return (
        <ul className="flex flex-col gap-3">
            {/* AnimatePresence plays exit animations when items are removed from the list */}
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => {
                    const c = cfg(task.difficulty);

                    return (
                        <motion.li
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: -12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 60, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className={`flex items-center gap-3 bg-gray-800 border-l-4 ${c.borderColor} rounded-xl px-4 py-3.5 shadow-sm`}
                        >
                            {/* Difficulty badge */}
                            <span
                                className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${c.badgeBg} ${c.textColor} border ${c.borderColor}`}
                            >
                                {c.label}
                            </span>

                            <p className="flex-1 text-gray-200 text-sm font-medium leading-snug wrap-break-word min-w-0">
                                {task.text}
                            </p>
                            
                            <span className="hidden sm:block text-xs text-gray-500 shrink-0">
                                +{c.xp}XP +{c.gold}🪙
                            </span>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 shrink-0">

                                <motion.button
                                    onClick={() => onComplete(task)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={`Complete (+${c.xp} XP, +${c.gold} Gold)`}
                                    className="text-green-400 hover:text-green-300 transition-colors"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    onClick={() => onFail(task)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={`I Failed (-${c.hpDamage} HP)`}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    <XCircle className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    onClick={() => onDelete(task.id)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="Remove (no penalty)"
                                    className="text-gray-600 hover:text-gray-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.li>
                    );
                })}
            </AnimatePresence>
        </ul>
    );
};

export default TaskList;
