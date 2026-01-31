import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const focusGroupNames = {
  'postpartum-depression': 'Postpartum Support',
  'anxiety-management': 'Anxiety & Calm',
  'workplace-stress': 'Work-Life Balance'
};

export default function GroupMembers({ members, focusGroup, currentUserId }) {
  const groupName = focusGroupNames[focusGroup] || 'Support Group';
  const otherMembers = members.filter(m => m.id !== currentUserId);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-sage-100 to-lavender-100 flex items-center justify-center">
          <Users className="w-8 h-8 text-sage-600" />
        </div>
 