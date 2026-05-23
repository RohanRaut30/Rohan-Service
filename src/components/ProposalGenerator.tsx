"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ProposalGeneratorProps {
  onContactClick: () => void;
}

export function ProposalGenerator({ onContactClick }: ProposalGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setProposal(null);

    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProposal(data.text);
    } catch (error) {
      setProposal("An error occurred while generating the proposal. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-16 relative z-20">
      <div className="bg-background/50 dark:bg-foreground/5 border border-black/10 dark:border-foreground/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-electricPurple" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">AI Instant Proposal Generator</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
            Tell my AI what you want to build. It will instantly map out a professional 3-phase technical proposal with estimated timelines and tech stack recommendations.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="relative flex flex-col sm:flex-row items-center gap-3 w-full mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'I need a scalable e-commerce app with an admin dashboard'"
            className="w-full bg-background dark:bg-zinc-900 border border-black/10 dark:border-foreground/20 focus:border-purple-500 rounded-xl px-5 py-4 outline-none transition-colors shadow-inner text-foreground placeholder-zinc-400 dark:placeholder-zinc-500"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)] whitespace-nowrap cursor-pointer"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate"}
          </button>
        </form>

        <AnimatePresence>
          {proposal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-left relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:text-purple-700 dark:prose-headings:text-electricPurple prose-a:text-blue-600">
                  <ReactMarkdown>{proposal}</ReactMarkdown>
                </div>
                
                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-zinc-500">Ready to make this a reality?</p>
                  <button 
                    onClick={onContactClick}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer"
                  >
                    Let's Collaborate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
