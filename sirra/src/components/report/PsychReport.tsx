import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileHeart, Brain, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const focusGroupInfo = {
  'postpartum-depression': {
    title: 'Postpartum Support',
    color: 'bg-rose-100 text-rose-700 border-rose-200',
    description: 'A nurturing space for new parents navigating the emotional journey of parenthood.',
    icon: '🌸'
  },
  'anxiety-management': {
    title: 'Anxiety & Calm',
    color: 'bg-lavender-100 text-lavender-700 border-lavender-200',
    description: 'Learn techniques to manage anxiety and find your inner peace.',
    icon: '🦋'
  },
  'workplace-stress': {
    title: 'Work-Life Balance',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    description: 'Navigate workplace challenges and build resilience together.',
    icon: '⚖️'
  }
};

export default function PsychReport({ assessment, onJoinGroup }) {
  const groupInfo = focusGroupInfo[assessment.final_focus_group] || {};
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-lavender-100 to-sage-100 flex items-center justify-center">
          <FileHeart className="w-8 h-8 text-lavender-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800">Your Wellness Report</h2>
        <p className="text-slate-500">Based on our conversation, here's what we've learned</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-lavender-400 via-sage-300 to-lavender-400" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-lavender-500" />
              <CardTitle className="text-lg">Assessment Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-sm prose-slate max-w-none">
            <ReactMarkdown>{assessment.psych_report || "Your personalized assessment is being prepared..."}</ReactMarkdown>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-white to-lavender-50/30">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sage-500" />
              <CardTitle className="text-lg">Your Recommended Group</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100">
              <span className="text-3xl">{groupInfo.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800">{groupInfo.title}</h3>
                  <Badge variant="outline" className={groupInfo.color}>
                    Best Match
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{groupInfo.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-sage-50 border border-sage-100">
              <Sparkles className="w-4 h-4 text-sage-600" />
              <p className="text-sm text-sage-700">
                Connect with others who understand your journey
              </p>
            </div>

            <Button
              onClick={onJoinGroup}
              className="w-full h-12 bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-xl shadow-lg shadow-lavender-200/50"
            >
              Join Your Support Group
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}