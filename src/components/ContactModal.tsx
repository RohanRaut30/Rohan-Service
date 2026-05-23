"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, Calendar } from "lucide-react";
import { useTheme } from "next-themes";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectText?: string;
}

export function ContactModal({ isOpen, onClose, initialProjectText = "" }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<"email" | "scheduler">("email");
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [iframeLoading, setIframeLoading] = useState(true);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Dynamic Cal.com link styled to light/dark themes
  const calUrl = `https://cal.com/rohan-raut-mdepnt?embed=true&theme=${isDark ? "dark" : "light"}`;

  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, project: initialProjectText }));
      // Default back to email when modal reopens
      setActiveTab("email");
    }
  }, [isOpen, initialProjectText]);

  const validate = () => {
    let newErrors = { name: "", email: "", project: "" };
    let isValid = true;

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formData.project.trim().length < 10) {
      newErrors.project = "Please provide more details (at least 10 characters).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", project: "" });
          setErrors({ name: "", email: "", project: "" });
          onClose();
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full border border-surfaceBorder bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col transition-all duration-300 ${
              activeTab === "scheduler" ? "max-w-2xl h-[650px]" : "max-w-lg h-auto"
            }`}
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-neonCyan/20 blur-[60px] pointer-events-none rounded-full" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-foreground transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title */}
            <div className="mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">Let's build together.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Tell me about your project or schedule a quick call.</p>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-foreground/10 mb-6 gap-4 relative z-10">
              <button
                onClick={() => setActiveTab("email")}
                className={`pb-2.5 text-sm font-bold relative transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "email" ? "text-foreground font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                Email Message
                {activeTab === "email" && (
                  <motion.div layoutId="modalActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-neonCyan" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("scheduler");
                  setIframeLoading(true);
                }}
                className={`pb-2.5 text-sm font-bold relative transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "scheduler" ? "text-foreground font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Book a Call
                {activeTab === "scheduler" && (
                  <motion.div layoutId="modalActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-neonCyan" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 relative z-10 flex flex-col min-h-0">
              <AnimatePresence mode="wait">
                {activeTab === "email" ? (
                  <motion.div
                    key="email-tab"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 flex flex-col"
                  >
                    {status === "success" ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">I'll review your project details and reach out soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                          <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: "" });
                            }}
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors"
                            placeholder="Your Name or Company Name"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: "" });
                            }}
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors"
                            placeholder="you@domain.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="project" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Project Details</label>
                          <textarea
                            id="project"
                            rows={4}
                            value={formData.project}
                            onChange={(e) => {
                              setFormData({ ...formData, project: e.target.value });
                              if (errors.project) setErrors({ ...errors, project: "" });
                            }}
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors resize-none"
                            placeholder="....."
                          />
                          {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
                        </div>

                        {status === "error" && (
                          <p className="text-red-400 text-sm">Something went wrong. Please check your backend configuration or try again.</p>
                        )}

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-lg px-4 py-3 hover:bg-zinc-200 transition-colors disabled:opacity-77 cursor-pointer"
                        >
                          {status === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              Send Message <Send className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="scheduler-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 flex flex-col min-h-0 h-full relative"
                  >
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm rounded-xl">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-neonCyan mb-3" />
                        <p className="text-xs font-mono">Loading scheduler interface...</p>
                      </div>
                    )}
                    <iframe
                      src={calUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="rounded-xl border border-foreground/5 bg-transparent min-h-[420px] flex-1"
                      onLoad={() => setIframeLoading(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
