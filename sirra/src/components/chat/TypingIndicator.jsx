import React from 'react';
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 max-w-[85%] mr-auto"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-lavender-100 to-lavender-200">
        <Heart className="w-4 h-4 text-lavender-600" />
      </div>
      
      <div className="px-5 py-4 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-lavender-300"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
 