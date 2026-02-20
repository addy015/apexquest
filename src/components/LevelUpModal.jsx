// Full-screen celebration modal — shown when the player levels up.

import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Shield, X } from "lucide-react";

const LevelUpModal = ({ isOpen, level, newMaxXP, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                // Overlay: clicking anywhere outside the card closes it
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 60 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative bg-gray-900 border border-yellow-500/50 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-yellow-500/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Animated star icon */}
                        <motion.div
                            animate={{
                                rotate: [0, 15, -15, 10, -10, 0],
                                scale: [1, 1.2, 1, 1.15, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-500/50"
                        >
                            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-yellow-400 font-black text-sm uppercase tracking-widest mb-1"
                        >
                            ⚔️ Level Up!
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-yellow-300 to-orange-500 mb-2"
                        >
                            {level}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-400 text-sm mb-6"
                        >
                            You&apos;ve grown stronger, adventurer!
                        </motion.p>

                        {/* Stat bonuses summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-3 justify-center mb-6"
                        >
                            <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-2xl p-3">
                                <Shield className="w-5 h-5 text-red-400 mx-auto mb-1" />
                                <p className="text-red-400 font-bold text-sm">HP Restored</p>
                                <p className="text-white font-black text-lg">100</p>
                            </div>

                            <div className="flex-1 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-3">
                                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                                <p className="text-yellow-400 font-bold text-sm">Next Level</p>
                                <p className="text-white font-black text-lg">{newMaxXP} XP</p>
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-black py-3 rounded-2xl text-base transition-all"
                        >
                            Continue Quest! ⚔️
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LevelUpModal;
