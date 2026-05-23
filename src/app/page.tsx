"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MagneticBentoCard } from "../components/MagneticBentoCard";
import { AIIntro } from "../components/AIIntro";
import { ContactModal } from "../components/ContactModal";
import { Header } from "../components/Header";
import { ProjectCostEstimator } from "../components/ProjectCostEstimator";
import { TechStackMatcher } from "../components/TechStackMatcher";
import { LocalGreeting } from "../components/LocalGreeting";

import { useContact } from "../components/ContactContext";
import { Zap, Rocket, Code, Cpu, Database, LayoutTemplate, Mail, Search, Terminal } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { openContactModal } = useContact();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: searchQuery }] }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setAiResponse(data.text);
    } catch (err) {
      setAiResponse("Sorry, I'm having trouble connecting right now. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <AIIntro />

      <div className="min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neonCyan/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-electricPurple/10 blur-[120px] rounded-full pointer-events-none" />

        <Header activePage="services" onContactClick={() => openContactModal()} />

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 pt-16 pb-24 flex flex-col items-center gap-16">

          {/* USP Hero Section */}
          <section className="flex flex-col items-center text-center gap-6 max-w-4xl w-full">
            <LocalGreeting />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-blue-700 dark:text-neonCyan font-mono shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Zap className="h-4 w-4 fill-blue-700 dark:fill-neonCyan" />
              <span>AI-POWERED EXTREME VELOCITY</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
              Building Intelligent Software Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-blue-500 to-electricPurple">
                Faster Than Humanly Possible.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mt-2">
              Need a scalable web/mobile app, MVP, CRM, HRMS, or complex dashboard shipped yesterday? I leverage AI-agents and deep Full-Stack expertise to deliver high-performance software at record speed.
            </p>

            {/* Real AI Search Bar */}
            <div className="w-full max-w-2xl mt-8 relative z-20">
              <form onSubmit={handleSearch} className="relative flex items-center bg-background/5 dark:bg-foreground/5 border border-black/10 dark:border-foreground/10 rounded-full px-6 shadow-sm backdrop-blur-xl transition-all focus-within:border-black/20 dark:focus-within:border-foreground/20 focus-within:shadow-md">
                <Search className="w-5 h-5 text-zinc-500 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Ask my AI anything (e.g. 'Do you know React Native?')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder-zinc-500 outline-none text-base sm:text-lg h-14 min-w-0"
                />
                <button type="submit" disabled={isSearching || !searchQuery.trim()} className="hidden sm:block px-6 py-2 ml-2 bg-foreground text-background rounded-full text-sm font-semibold disabled:opacity-50 hover:scale-105 transition-transform cursor-pointer shadow-md">
                  Ask AI
                </button>
              </form>

              {/* AI Search Results */}
              <AnimatePresence>
                {hasSearched && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    className="absolute top-full left-0 right-0 mt-3 p-4 bg-zinc-900 dark:bg-surface/95 backdrop-blur-2xl border border-black/10 dark:border-foreground/10 rounded-2xl shadow-2xl z-50 text-left overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">AI Analysis</span>
                      <button onClick={() => setHasSearched(false)} className="text-zinc-500 hover:text-white transition-colors text-xs cursor-pointer">Close</button>
                    </div>
                    {isSearching ? (
                      <div className="flex items-center gap-3 text-zinc-300 py-2">
                        <Terminal className="w-5 h-5 animate-pulse text-neonCyan shrink-0" />
                        <span className="text-sm">Rohan's AI is processing your question...</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Cpu className="w-5 h-5 text-neonCyan mt-1 shrink-0" />
                          <div className="text-zinc-200 text-sm prose prose-sm prose-invert max-w-none">
                            <ReactMarkdown>{aiResponse || ""}</ReactMarkdown>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-white/10 flex justify-end">
                          <button onClick={() => openContactModal()} className="text-xs font-semibold text-neonCyan hover:underline cursor-pointer">
                            Let's discuss requirements ➔
                          </button>
                        </div>
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
                    <Rocket className="w-6 h-6 text-blue-600 dark:text-neonCyan" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Rapid MVP Development</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                    Going from zero to one shouldn't take months. I build scalable, production-ready Minimum Viable Products using modern stacks (Next.js, Angular, Node) in a fraction of the time.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 -mr-10 -mb-10">
                  <Rocket className="w-64 h-64 text-blue-600 dark:text-neonCyan" />
                </div>
              </div>
            </MagneticBentoCard>

            {/* Service 2: AI Agent Integration */}
            <MagneticBentoCard className="md:col-span-1" glowColor="rgba(138, 43, 226, 0.2)">
              <div className="p-8 flex flex-col h-full justify-between bg-glass-gradient relative">
                <div>
                  <div className="w-12 h-12 bg-electricPurple/10 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-purple-700 dark:text-electricPurple" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Integrations</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Embedding LLMs, AI agents, and semantic search directly into your existing software and mobile applications to supercharge functionality.
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
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
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
                  <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mb-4 ml-auto">
                    <Code className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Scalable API & Backends</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Architecting high-throughput Node.js APIs, optimizing complex SQL queries, and handling secure integrations (Payments, WhatsApp) that can handle real traffic.
                  </p>
                </div>
              </div>
            </MagneticBentoCard>

          </section>



          {/* Interactive Tools Section */}
          <section className="w-full mt-12 flex flex-col gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Calculators</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                Stop guessing. Use my interactive tools below to get instant estimates on project costs and discover the exact technology stack you need.
              </p>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <ProjectCostEstimator onContact={openContactModal} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2">
                  <TechStackMatcher onContact={() => openContactModal()} />
                </div>
                <div className="bg-surface border border-foreground/10 rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center group">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-neonCyan/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-neonCyan/10 transition-colors duration-700" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Have a unique idea?</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-xs leading-relaxed">
                    Let's sketch a custom architecture and outline a precise development timeline together.
                  </p>
                  <button
                    onClick={() => openContactModal()}
                    className="py-3.5 px-6 bg-foreground text-background font-semibold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer text-sm w-full"
                  >
                    Discuss Custom Project
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Footer */}
          <section className="w-full text-center py-12 border-t border-black/10 dark:border-foreground/10 mt-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to accelerate your timeline?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
              Skip the prolonged dev cycles. Let's build something exceptional right now.
            </p>
            <button
              onClick={() => openContactModal()}
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
