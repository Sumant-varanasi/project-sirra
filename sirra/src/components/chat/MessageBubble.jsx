import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Heart } from "lucide-react";

export default function MessageBubble({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3 max-w-[85%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-gradient-to-br from-sage-200 to-sage-300" 
          : "bg-gradient-to-br from-lavender-100 to-lavender-200"
      )}>
        {isUser ? (
          <User className="w-4 h-4 text-sage-700" />
        ) : (
          <Heart className="w-4 h-4 text-lavender-600" />
        )}
      </div>
      
      <div className={cn(
        "px-5 py-3.5 rounded-2xl shadow-sm",
        isUser 
          ? "bg-sage-100 text-sage-800 rounded-tr-md" 
          : "bg-white text-slate-700 rounded-tl-md border border-slate-100"
      )}>
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </motion.div>
  );
}