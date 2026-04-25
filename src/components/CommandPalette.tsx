"use client";

import React, { useState, useEffect } from "react";
import { Search, Command, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-between gap-4 rounded-full border border-surfaceBorder bg-surface px-4 py-2 text-sm text-zinc-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Ask AI to filter projects...</span>
        </div>
        <kbd className="hidden rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-300 sm:inline-block">
          Ctrl K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-surfaceBorder bg-[#0a0a0a] shadow-2xl shadow-neonCyan/10"
            >
              <div className="flex items-center border-b border-surfaceBorder px-4 py-3">
                <Command className="h-5 w-5 text-neonCyan mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g., 'Show me his fastest builds'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
                />
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5 text-zinc-500 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto no-scrollbar">
                {query ? (
                  <div className="flex h-full flex-col items-center justify-center text-zinc-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 rounded-full border-2 border-neonCyan border-t-transparent mb-4"
                    />
                    <p>AI is analyzing &quot;{query}&quot;...</p>
                  </div>
                ) : (
                  <div className="text-sm text-zinc-500">
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider">Suggestions</p>
                    <button className="w-full text-left rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
                      Show me his fastest builds
                    </button>
                    <button className="w-full text-left rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
                      Projects using Next.js 16
                    </button>
                    <button className="w-full text-left rounded-lg px-2 py-2 hover:bg-white/5 transition-colors">
                      High-performance architectures
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
