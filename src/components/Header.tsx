"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activePage: "services" | "resume";
  onContactClick: () => void;
}

export function Header({ activePage, onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-5 sm:py-6 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
      
      {/* Brand & Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity z-50">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">R</div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-bold tracking-tighter leading-tight text-foreground">ROHAN RAUT</span>
          <span className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">rohan.raut.dev@gmail.com</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className={activePage === "services" ? "text-neonCyan" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"}>Services</Link>
        <Link href="/resume" className={activePage === "resume" ? "text-neonCyan" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"}>Experience</Link>
        
        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1" />
        
        <ThemeToggle />
        
        <button 
          onClick={onContactClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-semibold hover:scale-[0.98] transition-transform cursor-pointer shadow-md"
        >
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </nav>

      {/* Mobile Navigation Controls */}
      <div className="flex sm:hidden items-center gap-3 z-50">
        <ThemeToggle />
        
        {/* Highlighted Contact Button on Mobile */}
        <button 
          onClick={onContactClick}
          className="px-4 py-1.5 bg-foreground text-background text-sm font-bold rounded-full hover:scale-[0.98] transition-transform shadow-md"
        >
          Contact
        </button>
        
        {/* Hamburger Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 text-foreground bg-black/5 dark:bg-white/10 rounded-md border border-black/10 dark:border-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-3 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl sm:hidden flex flex-col gap-2 text-center text-base font-semibold z-40"
          >
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-3 rounded-xl transition-colors ${activePage === "services" ? "bg-neonCyan/10 text-neonCyan" : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`}
            >
              Services
            </Link>
            <Link 
              href="/resume" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-3 rounded-xl transition-colors ${activePage === "resume" ? "bg-neonCyan/10 text-neonCyan" : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`}
            >
              Experience
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
