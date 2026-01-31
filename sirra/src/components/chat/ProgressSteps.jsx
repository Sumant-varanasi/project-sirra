import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, MessageCircle, Brain, ClipboardCheck, FileHeart } from "lucide-react";

const stages = [
  { id: 'basic-info', label: 'Getting to know you', icon: User },
  { id: 'open-ended', label: 'Your feelings', icon: MessageCircle },
  { id: 'narrowing', label: 'Understanding', icon: Brain },
  { id: 'psychometric', label: 'Assessment', icon: ClipboardCheck },
  { id: 'completed', label: 'Your report', icon: FileHeart },
];

export default function ProgressSteps({ currentStage }) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);
  
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        
        return (
          <React.Fragment key={stage.id}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                isActive && "bg-lavender-200 text-lavender-700 ring-4 ring-lavender-100",
                isCompleted && "bg-sage-200 text-sage-700",
                !isActive && !isCompleted && "bg-slate-100 text-slate-400"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={cn(
                "text-[10px] font-medium text-center max-w-[60px] leading-tight hidden sm:block",
 