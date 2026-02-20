import { motion } from "framer-motion";
import { Coins, LogOut, Heart, Zap, Shield } from "lucide-react";

const StatBar = ({ value, max, color, icon: Icon, label }) => {

    const pct = Math.min(100, Math.round((value / max) * 100));

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-0.5">
                <span className="flex items-center gap-1">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {label}
                </span>
                <span className={`font-semibold ${color}`}>
                    {value} / {max}
                </span>
            </div>

            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color === "text-red-400"
                        ? "bg-linear-to-r from-red-600 to-red-400"
                        : "bg-linear-to-r from-yellow-600 to-yellow-400"
                        }`}
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

const UserStats = ({ userData, user, onLogout }) => {

    if (!userData) return null;

    const { level, currentXP, maxXP, hp, maxHp, gold } = userData;

    return (
        <header className="w-full bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">

            <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-4">

                {/* Avatar + level badge + name */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="relative">
                        <img
                            src={user?.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.uid}`}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full border-2 border-yellow-500 object-cover"
                        />
                        <span className="absolute -bottom-1 -right-1 bg-yellow-500 text-gray-900 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                            {level}
                        </span>
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-white font-bold text-sm leading-tight">
                            {user?.displayName?.split(" ")[0] ?? "Hero"}
                        </p>
                        <p className="text-yellow-400 text-xs font-semibold">
                            Level {level} Adventurer
                        </p>
                    </div>
                </div>

                {/* HP and XP progress bars */}
                <div className="flex flex-col gap-2 flex-1 w-full sm:w-auto">
                    <StatBar
                        value={hp}
                        max={maxHp || 100}
                        color="text-red-400"
                        icon={Heart}
                        label="HP"
                    />
                    <StatBar
                        value={currentXP}
                        max={maxXP}
                        color="text-yellow-400"
                        icon={Zap}
                        label="XP"
                    />
                </div>

                {/* Gold counter + logout */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-3 py-1.5">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300 font-bold text-sm">{gold ?? 0}</span>
                    </div>

                    <button
                        onClick={onLogout}
                        title="Logout"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-xl"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UserStats;
