import { motion } from "framer-motion";

export const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.div
        className="relative flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-5 h-5 bg-orange-500 rounded-full"
            animate={{
              y: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
