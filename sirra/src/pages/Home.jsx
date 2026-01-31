import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield, Users, ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/30 to-sage-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200/30 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-lavender-100/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-lavender-100 to-sage-100 flex items-center justify-center shadow-xl shadow-lavender-200/30"
            >
              <Leaf className="w-10 h-10 text-sage-600" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-lavender-100 mb-8"
            >
              <Sparkles className="w-4 h-4 text-lavender-500" />
              <span className="text-sm font-medium text-slate-600">Your journey to wellness starts here</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
            >
              Find Your
              <span className="bg-gradient-to-r from-lavender-500 to-sage-500 bg-clip-text text-transparent"> Perfect </span>
              Support Group
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed"
            >
              Through a gentle, guided conversation, we'll help you discover the right community of people who truly understand your journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to={createPageUrl("Assessment")}>
                <Button 
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-lavender-500 to-lavender-600 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-2xl shadow-xl shadow-lavender-300/40 transition-all duration-300 hover:scale-105"
                >
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-4">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">A thoughtful process designed to understand you and connect you with the right support</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Compassionate Conversation",
              description: "Share your thoughts and feelings at your own pace through a warm, understanding dialogue.",
              color: "lavender"
            },
            {
              icon: Shield,
              title: "Confidential Assessment",
              description: "Your responses help us understand your unique needs through validated psychometric measures.",
              color: "sage"
            },
            {
              icon: Users,
              title: "Community Connection",
              description: "Get matched with a supportive group of people who share similar experiences.",
              color: "lavender"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lavender-100/50 to-sage-100/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur rounded-3xl p-8 border border-slate-100 hover:border-lavender-200 transition-all duration-300 hover:shadow-xl hover:shadow-lavender-100/30">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.color === 'lavender' 
                    ? 'bg-gradient-to-br from-lavender-100 to-lavender-200' 
                    : 'bg-gradient-to-br from-sage-100 to-sage-200'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'lavender' ? 'text-lavender-600' : 'text-sage-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support Groups Preview */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Focus Groups</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Specialized support communities designed around your specific needs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🌸",
              title: "Postpartum Support",
              description: "For new parents navigating the emotional journey of parenthood",
              gradient: "from-rose-50 to-rose-100/50",
              border: "border-rose-100"
            },
            {
              emoji: "🦋",
              title: "Anxiety & Calm",
              description: "Learn techniques to manage anxiety and find inner peace",
              gradient: "from-lavender-50 to-lavender-100/50",
              border: "border-lavender-100"
            },
            {
              emoji: "⚖️",
              title: "Work-Life Balance",
              description: "Navigate workplace challenges and build resilience together",
              gradient: "from-amber-50 to-amber-100/50",
              border: "border-amber-100"
            }
          ].map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`bg-gradient-to-br ${group.gradient} rounded-2xl p-6 border ${group.border} hover:shadow-lg transition-all duration-300`}
            >
              <span className="text-4xl mb-4 block">{group.emoji}</span>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{group.title}</h3>
              <p className="text-sm text-slate-600">{group.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender-500 to-sage-500 p-12 text-center"
        >
          <div className="absolute inset-0 opacity-10 bg-white" style={{ backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Support?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Take the first step towards connecting with people who understand your journey.
            </p>
            <Link to={createPageUrl("Assessment")}>
              <Button 
                size="lg"
                className="h-14 px-8 text-lg bg-white text-lavender-600 hover:bg-lavender-50 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-sage-500" />
            <span className="font-semibold text-slate-700">Mindful Match</span>
          </div>
          <p className="text-sm text-slate-500">
            Creating connections for healing and growth
          </p>
        </div>
      </footer>
    </div>
  );
}