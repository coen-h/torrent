"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["software", "games", "APKs", "eBooks"];

export default function Ticker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 text-neutral-400 font-medium">
      <motion.span layout>The intelligent</motion.span>
        <span className="relative flex items-center justify-center overflow-hidden h-[1.5em]">
          <AnimatePresence mode="popLayout">
            <motion.span key={words[index]} layout initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="whitespace-nowrap">{words[index]}</motion.span>
          </AnimatePresence>
        </span>
      <motion.span layout>discovery engine.</motion.span>
    </div>      
  );
}