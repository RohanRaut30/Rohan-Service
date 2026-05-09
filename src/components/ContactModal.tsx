"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [errors, setErrors] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
            className="relative w-full max-w-lg bg-surface border border-surfaceBorder rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-neonCyan/20 blur-[60px] pointer-events-none rounded-full" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8 relative z-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">Let's build together.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Tell me about your project and I'll get back to you shortly.</p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">I'll review your project details and reach out soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
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
                    className={`w-full bg-foreground/5 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-foreground/10'} rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors`}
                    placeholder="John Doe"
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
                    className={`w-full bg-foreground/5 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-foreground/10'} rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors`}
                    placeholder="john@example.com"
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
                    className={`w-full bg-foreground/5 border ${errors.project ? 'border-red-500 dark:border-red-500' : 'border-foreground/10'} rounded-lg px-4 py-2.5 text-foreground placeholder-zinc-500 focus:outline-none focus:border-neonCyan transition-colors resize-none`}
                    placeholder="We need a highly scalable Next.js dashboard..."
                  />
                  {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please check your backend configuration or try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-lg px-4 py-3 hover:bg-zinc-200 transition-colors disabled:opacity-70 cursor-pointer"
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
        </div>
      )}
    </AnimatePresence>
  );
}
