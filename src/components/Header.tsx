"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activePage: "services" | "resume" | "collab";
  onContactClick: () => void;
}

export function Header({ activePage, onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 sm:px-8 py-5 sm:py-6 max-w-7xl mx-auto border-b border-black/10 dark:border-foreground/10">

      {/* Brand & Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity z-50 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">R</div>
        <div className="flex flex-col min-w-0">
          <span className="text-base sm:text-xl font-bold tracking-tighter leading-tight text-foreground truncate">ROHAN RAUT</span>
          <span className="text-[9px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide truncate">rohan.raut.dev@gmail.com</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className={activePage === "services" ? "text-blue-600 dark:text-neonCyan" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"}>Services</Link>
        <Link href="/resume" className={activePage === "resume" ? "text-blue-600 dark:text-neonCyan" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"}>Experience</Link>
        <Link href="/collab" className={activePage === "collab" ? "text-purple-700 dark:text-electricPurple" : "text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"}>Collab Hub</Link>

        <div className="w-px h-6 bg-background/10 dark:bg-foreground/10 mx-1" />

        <div className="flex items-center gap-3">
          <a href="https://github.com/RohanRaut30" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/rohanraut30" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
        </div>

        <ThemeToggle />

        <button
          onClick={onContactClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full font-semibold hover:scale-[0.98] transition-transform cursor-pointer shadow-md"
        >
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </nav>

      {/* Mobile Controls (Top Right) */}
      <div className="flex sm:hidden items-center gap-3 z-50">
        <a href="https://github.com/RohanRaut30" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/rohanraut30" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
