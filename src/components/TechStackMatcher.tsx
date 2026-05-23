"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Zap, LayoutTemplate, Database, Cpu } from "lucide-react";

const problems = [
  { id: "slow", label: "Slow site speed", icon: Zap },
  { id: "ui", label: "Outdated design", icon: LayoutTemplate },
  { id: "scale", label: "Can't handle traffic", icon: Database },
  { id: "ai", label: "Need AI features", icon: Cpu },
];

const solutions = {
  slow: {
    stack: "Next.js + Vercel Edge",
    service: "Frontend Modernization",
    description: "I'll rebuild your frontend using React Server Components to deliver sub-second load times.",
  },
  ui: {
    stack: "Tailwind CSS + Framer Motion",
    service: "UI/UX Revamp",
    description: "I'll design and implement a stunning, high-converting interface that wows your users.",
  },
  scale: {
    stack: "Node.js Microservices + Redis",
    service: "Scalable Backend Architecture",
    description: "I'll migrate your monolith to a high-throughput backend capable of handling massive concurrency.",
  },
  ai: {
    stack: "OpenAI/Anthropic + Pinecone",
    service: "AI Agent Integration",
    description: "I'll embed powerful semantic search and autonomous AI agents directly into your workflows.",
  },
};

export function TechStackMatcher({ onContact }: { onContact: () => void }) {
  const [selectedProblem, setSelectedProblem] = useState<keyof typeof solutions | null>(null);

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden group h-full flex flex-col">
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-electricPurple/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-electricPurple/10 transition-colors duration-700" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
          <Wrench className="w-6 h-6 text-purple-700 dark:text-electricPurple" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Tech Stack Matcher</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Select your biggest bottleneck to see how I'd solve it.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            const isSelected = selectedProblem === problem.id;
            return (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem.id as keyof typeof solutions)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-electricPurple/20 border-electricPurple/50 text-foreground shadow-[0_0_15px_rgba(138,43,226,0.2)]"
                    : "bg-foreground/5 border-foreground/10 text-zinc-600 dark:text-zinc-400 hover:border-foreground/20 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-purple-700 dark:text-electricPurple" : "text-zinc-500"}`} />
                {problem.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-surfaceBorder/50 border border-foreground/5 rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!selectedProblem ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-zinc-500 text-sm"
              >
                Select a bottleneck above to see the recommended stack and service match.
              </motion.div>
            ) : (
              <motion.div
                key={selectedProblem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-xl p-4">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-mono">Recommended Stack</div>
                    <div className="text-base font-bold text-purple-700 dark:text-electricPurple">
                      {solutions[selectedProblem].stack}
                    </div>
                  </div>
                  <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-xl p-4">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-mono">Service Match</div>
                    <div className="text-base font-bold text-foreground font-semibold">
                      {solutions[selectedProblem].service}
                    </div>
                  </div>
                </div>
                <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-xl p-4">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-mono">Solution Details</div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                    {solutions[selectedProblem].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
