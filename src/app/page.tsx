"use client";

import React, { useState } from "react";
import { MagneticBentoCard } from "../components/MagneticBentoCard";
import { AIIntro } from "../components/AIIntro";
import { ContactModal } from "../components/ContactModal";
import { Header } from "../components/Header";
import { Zap, Rocket, Terminal, Code, Cpu, Database, LayoutTemplate, Search, Mail } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500); // Simulate AI thinking
  };

  return (
    <>
      <AIIntro />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neonCyan/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-electricPurple/10 blur-[120px] rounded-full pointer-events-none" />

        <Header activePage="services" onContactClick={() => setIsContactModalOpen(true)} />

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-24 flex flex-col items-center gap-16">
          
          {/* USP Hero Section */}
          <section className="flex flex-col items-center text-center gap-6 max-w-4xl w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-neonCyan font-mono shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Zap className="h-4 w-4 fill-neonCyan" />
              <span>AI-POWERED EXTREME VELOCITY</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
              Building Web Apps <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-blue-500 to-electricPurple">
                Faster Than Humanly Possible.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mt-2">
              Need a scalable web app, MVP, or complex dashboard shipped yesterday? I leverage AI-agents and deep Full-Stack expertise to deliver high-performance software at record speed.
            </p>

            {/* Center Search Bar */}
            <div className="w-full max-w-2xl mt-8 relative z-20">
              <div className="relative flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-6 shadow-sm backdrop-blur-xl transition-all focus-within:border-black/20 dark:focus-within:border-white/20 focus-within:shadow-md">
                <Search className="w-5 h-5 text-zinc-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search projects I can build (e.g. 'SaaS Dashboard', 'AI Integration')..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="flex-1 bg-transparent text-foreground placeholder-zinc-500 outline-none text-base sm:text-lg h-14 min-w-0"
                />
              </div>

              {/* Fake AI Search Results */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    className="absolute top-full left-0 right-0 mt-3 p-2 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl z-50 text-left"
                  >
                    {isSearching ? (
                      <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 p-4">
                        <Terminal className="w-5 h-5 animate-pulse text-neonCyan" />
                        <span>AI Agent mapping optimal architecture for "{searchQuery}"...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-colors">
                          <Cpu className="w-5 h-5 text-neonCyan mt-0.5" />
                          <div>
                            <h4 className="text-foreground font-medium">Yes, I can build exactly that.</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Estimated execution time: 3x faster than standard teams.</p>
                          </div>
                        </div>
                        <button onClick={() => setIsContactModalOpen(true)} className="block w-full text-center py-2 text-sm text-neonCyan hover:underline cursor-pointer">
                          Let's discuss requirements ➔
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Services Bento Grid */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
            
            {/* Service 1: MVP Development */}
            <MagneticBentoCard className="md:col-span-2 row-span-1" glowColor="rgba(0, 240, 255, 0.2)">
              <div className="p-8 flex flex-col h-full relative overflow-hidden justify-between">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-neonCyan/10 rounded-xl flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-neonCyan" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Rapid MVP Development</h3>
                  <p className="text-zinc-400 max-w-md">
                    Going from zero to one shouldn't take months. I build scalable, production-ready Minimum Viable Products using modern stacks (Next.js, Angular, Node) in a fraction of the time.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 -mr-10 -mb-10">
                  <Rocket className="w-64 h-64 text-neonCyan" />
                </div>
              </div>
            </MagneticBentoCard>

            {/* Service 2: AI Agent Integration */}
            <MagneticBentoCard className="md:col-span-1" glowColor="rgba(138, 43, 226, 0.2)">
              <div className="p-8 flex flex-col h-full justify-between bg-glass-gradient relative">
                <div>
                  <div className="w-12 h-12 bg-electricPurple/10 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-electricPurple" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Integrations</h3>
                  <p className="text-sm text-zinc-400">
                    Embedding LLMs, AI agents, and semantic search directly into your existing web applications to supercharge functionality.
                  </p>
                </div>
              </div>
            </MagneticBentoCard>

            {/* Service 3: Frontend Modernization */}
            <MagneticBentoCard className="md:col-span-1" glowColor="rgba(0, 255, 128, 0.15)">
              <div className="p-8 flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                    <LayoutTemplate className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Frontend Modernization</h3>
                  <p className="text-sm text-zinc-400">
                    Migrating legacy dashboards to fast, modern frameworks (Angular v19, React/Next.js) with zero downtime.
                  </p>
                </div>
              </div>
            </MagneticBentoCard>

            {/* Service 4: Scalable Backends */}
            <MagneticBentoCard className="md:col-span-2" glowColor="rgba(255, 255, 255, 0.1)">
              <div className="p-8 flex flex-col h-full relative overflow-hidden justify-between text-right items-end">
                <div className="absolute left-0 bottom-0 opacity-10 -ml-10 -mb-10 pointer-events-none">
                  <Database className="w-64 h-64" />
                </div>
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 ml-auto">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Scalable API & Backends</h3>
                  <p className="text-zinc-400">
                    Architecting high-throughput Node.js APIs, optimizing complex SQL queries, and handling secure integrations (Payments, WhatsApp) that can handle real traffic.
                  </p>
                </div>
              </div>
            </MagneticBentoCard>

          </section>

          {/* CTA Footer */}
          <section className="w-full text-center py-12 border-t border-black/10 dark:border-white/10 mt-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to accelerate your timeline?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
              Skip the prolonged dev cycles. Let's build something exceptional right now.
            </p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:scale-[0.98] transition-transform shadow-sm cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              rohan.raut.dev@gmail.com
            </button>
          </section>

        </main>
      </div>
    </>
  );
}
