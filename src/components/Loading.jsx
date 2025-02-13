import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="relative w-16 h-16 bg-blue-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-spartan font-bold absolute text-white text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Hush kelibsiz! 
        </span>
      </motion.div>
    </div>
  );
};

export default Loader;
