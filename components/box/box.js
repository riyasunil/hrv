import React from "react";
import { motion,AnimatePresence } from "framer-motion";

export default function Box(){
    return (
        <AnimatePresence>
        <motion.div
        className="flex flex-col justify-center items-center w-20 h-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [1, 0],  }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="box w-1/2 h-1/2 bg-violet-300"></div>
      </motion.div>
        </AnimatePresence>
    );
}