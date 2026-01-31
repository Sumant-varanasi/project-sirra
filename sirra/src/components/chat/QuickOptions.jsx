import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function QuickOptions({ options, onSelect, disabled }) {
  if (!options || options.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 justify-center py-2"
    >
      {options.map((option, index) => (
        <motion.div
          key={option.value || option}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Button
            variant="outline"
            onClick={() => onSelect(option.value || option)}
            disabled={disabled}
            className="rounded-full px-5 py-2 h-auto text-sm font-medium border-slate-200 hover:border-lavender-300 hover:bg-lavender-50 hover:text-lavender-700 transition-all duration-300"
          >
            {option.label || option}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}