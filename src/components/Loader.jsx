import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 gap-4">

            <motion.div
                className="w-16 h-16 rounded-full border-4 border-yellow-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase animate-pulse">
                Loading Quest...
            </p>
        </div>
    );
};

export default Loader;
