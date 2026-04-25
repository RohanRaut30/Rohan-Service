"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export function AIIntro() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000), // Booting...
      setTimeout(() => setStage(2), 2500), // Loading profile...
      setTimeout(() => setStage(3), 4000), // Access granted
      setTimeout(() => setStage(4), 5000), // Hide intro
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-md"
        >
          <div className="flex flex-col items-start font-mono text-neonCyan max-w-lg w-full px-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 animate-pulse" />
              <span className="text-xl">SYSTEM_INITIALIZATION</span>
            </div>
            
            <div className="space-y-2 text-sm md:text-base text-zinc-300 w-full">
              {stage >= 0 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-zinc-500">{">"}</span> Booting Rohan_Raut.exe... <span className="text-green-500">[OK]</span>
                </motion.div>
              )}
              {stage >= 1 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-zinc-500">{">"}</span> Loading Full-Stack protocol (Angular, Node, MySQL)... <span className="text-green-500">[OK]</span>
                </motion.div>
              )}
              {stage >= 2 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-zinc-500">{">"}</span> Establishing secure connection to UI/UX layer... <span className="text-green-500">[OK]</span>
                </motion.div>
              )}
              {stage >= 3 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-electricPurple font-bold mt-4">
                  <span className="text-zinc-500">{">"}</span> ACCESS GRANTED. Welcome to the workspace.
                </motion.div>
              )}
              
              <div className="h-1 w-full bg-white/10 mt-6 overflow-hidden rounded-full">
                 <motion.div 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 4.5, ease: "linear" }}
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
