import { motion } from "framer-motion";
import { Sword, Shield, Star } from "lucide-react";

const LoginCard = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">

            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 text-center max-w-md w-full"
            >
                {/* Icon triosss */}
                <motion.div
                    className="flex justify-center gap-6 mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/40">
                        <Sword className="text-yellow-400 w-7 h-7" />
                    </div>
                    <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/40">
                        <Star className="text-purple-400 w-7 h-7" />
                    </div>
                    <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/40">
                        <Shield className="text-blue-400 w-7 h-7" />
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-600 mb-3 tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Apex Quest
                </motion.h1>

                <motion.p
                    className="text-gray-400 text-base sm:text-lg mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Turn your daily habits into epic adventures.
                </motion.p>

                <motion.p
                    className="text-gray-500 text-sm mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Complete quests. Earn XP. Level up your life. ⚔️
                </motion.p>

                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                >
                    {["🏆 Level System", "💰 Gold Rewards", "⚡ Real-time Sync", "🎯 Quest Log"].map((feat) => (
                        <span
                            key={feat}
                            className="text-xs text-gray-400 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full"
                        >
                            {feat}
                        </span>
                    ))}
                </motion.div>

                <motion.button
                    onClick={onLogin}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-200"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Begin Your Quest
                </motion.button>

                <p className="text-gray-600 text-xs mt-6">
                    Powered by Firebase · Your data is synced in real-time
                </p>
            </motion.div>
        </div>
    );
};

export default LoginCard;
