"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export function AIIntro() {
  const [stage, setStage] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if intro was already played in this session
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (hasPlayed) {
      setShouldShow(false);
      return;
    }

    setShouldShow(true);

    const timers = [
      setTimeout(() => {
        setStage(1);
        sessionStorage.setItem("introPlayed", "true");
      }, 1800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {stage < 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-start font-mono text-neonCyan w-full max-w-2xl px-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-8 h-8 animate-pulse" />
              <span className="text-2xl md:text-3xl font-bold">SYSTEM_INITIALIZATION</span>
            </div>

            <div className="space-y-3 text-base md:text-lg text-zinc-300 w-full">
              {stage >= 0 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-zinc-500">{">"}</span> Booting Rohan_Raut.exe... <span className="text-green-500 font-bold">[OK]</span>
                </motion.div>
              )}

              <div className="h-1.5 w-full bg-white/10 mt-8 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-neonCyan to-electricPurple"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
