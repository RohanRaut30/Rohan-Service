"use client";

import React from "react";
import { Header } from "../../components/Header";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useContact } from "../../components/ContactContext";

export default function CollabHub() {
  const { openContactModal } = useContact();

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-background">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-electricPurple/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-neonCyan/10 blur-[120px] rounded-full pointer-events-none" />

        <Header activePage="collab" onContactClick={openContactModal} />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-24 flex flex-col items-center">
          
          <div className="text-center max-w-3xl mb-16">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electricPurple/10 border border-electricPurple/20 text-sm text-purple-700 dark:text-electricPurple font-mono">
                <Lock className="w-4 h-4" />
                <span>SECURE CLIENT PORTAL</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-sm text-blue-600 dark:text-neonCyan font-mono animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span>COMING SOON</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Client Collaboration Hub
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              When we work together, you get access to a private, real-time dashboard. No more messy email threads. Track progress, view invoices, and communicate securely in one place.
            </p>
          </div>

          <div className="mt-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-neonCyan/10 border border-neonCyan/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            >
              <Lock className="w-10 h-10 text-blue-600 dark:text-neonCyan" />
            </motion.div>
            <p className="text-zinc-500 font-mono text-sm max-w-md mx-auto text-center">
              I am currently building a dedicated platform for my clients to track project sprints, view invoices, and communicate securely. Stay tuned.
            </p>
          </div>

        </main>
      </div>
    </>
  );
}
