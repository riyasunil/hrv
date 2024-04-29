"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BreathingAnimation() {
  const [currentBox, setCurrentBox] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBox((prevBox) => (prevBox + 1) % 4); // Switch to the next box
    }, 1000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
         <div className="flex flex-row justify-center items-center h-screen">
      {[0, 1, 2, 3].map((index) => (
        <Box key={index} index={index} currentBox={currentBox} />
      ))}
      
    </div>
   
  );
}

function Box({ index, currentBox }) {
  const boxes = [
    { backgroundColor: "bg-red-300" },
    { backgroundColor: "bg-blue-300" },
    { backgroundColor: "bg-green-300" },
    { backgroundColor: "bg-yellow-300" },
    
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col justify-center items-center w-20 h-20 mr-4"
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: index === currentBox ? [1, 0] : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease:"easeInOut" }}
      >
        <div className={`box w-1/2 h-1/2 ${boxes[index].backgroundColor}`}></div>
      </motion.div>
    </AnimatePresence>
  );
}