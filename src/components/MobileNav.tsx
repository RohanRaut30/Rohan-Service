"use client";

import React from "react";
import Link from "next/link";
import { Home, FolderGit2, Share2, Mail, Lock } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rohan Raut | Extreme Velocity Development",
          text: "Check out Rohan's portfolio. He builds web apps faster than humanly possible.",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback copy to clipboard if web share is not supported
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="sm:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        
        <Link href="/" className="flex flex-col items-center gap-1 group">
          <Home className={`w-5 h-5 transition-colors ${pathname === "/" ? "text-neonCyan" : "text-zinc-500 group-hover:text-zinc-300"}`} />
          <span className={`text-[10px] font-medium ${pathname === "/" ? "text-neonCyan" : "text-zinc-500"}`}>Home</span>
        </Link>

        <Link href="/resume" className="flex flex-col items-center gap-1 group">
          <FolderGit2 className={`w-5 h-5 transition-colors ${pathname === "/resume" ? "text-neonCyan" : "text-zinc-500 group-hover:text-zinc-300"}`} />
          <span className={`text-[10px] font-medium ${pathname === "/resume" ? "text-neonCyan" : "text-zinc-500"}`}>Experience</span>
        </Link>

        <Link href="/collab" className="flex flex-col items-center gap-1 group">
          <Lock className={`w-5 h-5 transition-colors ${pathname === "/collab" ? "text-electricPurple" : "text-zinc-500 group-hover:text-zinc-300"}`} />
          <span className={`text-[10px] font-medium ${pathname === "/collab" ? "text-electricPurple" : "text-zinc-500"}`}>Collab</span>
        </Link>

        <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
          <Share2 className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
          <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">Share</span>
        </button>

        <a href="https://wa.me/919284026437?text=Hi%20Rohan,%20I'm%20interested%20in%20building%20a%20project%20with%20you!" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group">
          <div className="relative">
            <Mail className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-electricPurple rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">Contact</span>
        </a>

      </div>
    </div>
  );
}
