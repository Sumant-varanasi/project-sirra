import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({ onSend, disabled, placeholder }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
      onSubmit={handleSubmit}
    >
      <div className="relative bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Share what's on your mind..."}
          disabled={disabled}
          className="min-h-[56px] max-h-[120px] resize-none border-0 focus-visible:ring-0 pr-14 text-[15px] placeholder:text-slate-400 bg-transparent"
          rows={1}
        />
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="icon"
          className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-400 to-lavender-500 hover:from-lavender-500 hover:to-lavender-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-lavender-200/50 transition-all duration-300"
        >
          {disabled ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </Button>
      </div>
      
      <p className="text-[11px] text-slate-400 text-center mt-2">
        Your responses are confidential and help us understand you better
      </p>
    </motion.form>
  );
}