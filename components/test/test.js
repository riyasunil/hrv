"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";

export default function Test() {
  const [currentBox, setCurrentBox] = useState(-1);
  const [animationActive, setAnimationActive] = useState(false); // State to control animation

  useEffect(() => {
    if (animationActive) {
      const interval = setInterval(() => {
        setCurrentBox((prevBox) => (prevBox + 1) % 16); // Switch to the next box
      }, 1000); // 1 second interval between each box animation

      // Stop the animation after 16 seconds
      setTimeout(() => {
        setAnimationActive(false);
      }, 16000); // 16 seconds

      return () => clearInterval(interval);
    }
  }, [animationActive]); // Run effect whenever animationActive changes

  const handleButtonClick = () => {
    setAnimationActive(!animationActive); // Toggle animation state on button click
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Button onClick={handleButtonClick}>
        {animationActive ? "Stop Animation" : "Start Animation"}
      </Button>
      {[0, 1, 2, 3].map((rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {[0, 1, 2, 3].map((columnIndex) => (
            <Box
              key={rowIndex * 4 + columnIndex}
              index={rowIndex * 4 + columnIndex}
              currentBox={currentBox}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Box({ index, currentBox }) {
  const boxes = [
    { backgroundColor: "bg-red-300" },
    { backgroundColor: "bg-blue-300" },
    { backgroundColor: "bg-green-300" },
    { backgroundColor: "bg-yellow-300" }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col justify-center items-center w-20 h-20 mr-4"
        key={index}
        initial={{ opacity: index === 0 ? 1 : 0 }}
        animate={{ opacity: index === currentBox ? [1, 0] : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className={`box w-1/2 h-1/2 ${boxes[index % 4].backgroundColor}`}></div>
      </motion.div>
    </AnimatePresence>
  );
}
