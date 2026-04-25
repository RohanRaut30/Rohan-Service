"use client";

import React, { useState } from "react";
import { MagneticBentoCard } from "../../components/MagneticBentoCard";
import { ContactModal } from "../../components/ContactModal";
import { ThemeToggle } from "../../components/ThemeToggle";
import { Briefcase, Database, Cloud, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Resume() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neonCyan/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-electricPurple/10 blur-[120px] rounded-full pointer-events-none" />

        <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-xl shrink-0">R</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter leading-tight text-foreground">ROHAN RAUT</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">rohan.raut.dev@gmail.com</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors">Services</Link>
            <Link href="/resume" className="text-neonCyan">Resume</Link>
            
            <ThemeToggle />

            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 bg-surface hover:bg-surfaceBorder transition-colors border border-surfaceBorder cursor-pointer rounded-full"
            >
              Contact
            </button>
          </nav>
        </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-24 flex flex-col gap-12">
        <section className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-bold tracking-tighter">Professional Experience</h1>
          <p className="text-zinc-400 max-w-2xl">A detailed look at my career history, tech stack, and key projects.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-[auto]">

          {/* Experience: Onelife Capital Advisors */}
          <MagneticBentoCard className="md:col-span-2 row-span-2 min-h-[300px]" glowColor="rgba(138, 43, 226, 0.2)">
            <div className="p-8 flex flex-col h-full relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-electricPurple/10 rounded-xl text-electricPurple">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Software Developer</h3>
                  <p className="text-zinc-400">Onelife, Mumbai</p>
                </div>
              </div>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-electricPurple">▹</span>
                  <span>Spearheaded migration of a production LMS from Angular v2 to v19, improving build performance by ~35%.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-electricPurple">▹</span>
                  <span>Engineered Node.js backend APIs, reducing response times and enhancing overall throughput.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-electricPurple">▹</span>
                  <span>Refactored 10+ legacy modules to align with clean architecture principles.</span>
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <span className="text-xs font-mono text-zinc-500">JAN 2026 – PRESENT</span>
              </div>
            </div>
          </MagneticBentoCard>

          {/* Tech Stack */}
          <MagneticBentoCard className="md:col-span-2" glowColor="rgba(255, 255, 255, 0.1)">
            <div className="p-6 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-neonCyan h-5 w-5" />
                <h3 className="text-lg font-semibold">Tech Arsenal</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Angular (v16-19)", "TypeScript", "Node.js", "MySQL", "MongoDB", "React.js", "Firebase", "Azure AZ-900"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm font-medium hover:border-white/30 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </MagneticBentoCard>

          {/* Experience: Policy Planner */}
          <MagneticBentoCard className="md:col-span-2" glowColor="rgba(0, 255, 128, 0.15)">
            <div className="p-6 flex flex-col h-full relative z-10 justify-between">
              <div>
                <h3 className="text-lg font-bold">Full-Stack Developer</h3>
                <p className="text-sm text-zinc-400 mb-4">Policy Planner, Pune (Nov 2023 - Sep 2025)</p>
                <p className="text-sm text-zinc-300">
                  Architected the MPS web platform serving 1,000+ registered users. Integrated WhatsApp Business API and Cashfree payment gateways. Optimized MySQL queries for production scale.
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-xs px-2 py-1 bg-white/5 rounded text-zinc-400">REST APIs</span>
                <span className="text-xs px-2 py-1 bg-white/5 rounded text-zinc-400">MySQL</span>
              </div>
            </div>
          </MagneticBentoCard>

          {/* Key Projects */}
          <MagneticBentoCard className="md:col-span-2 row-span-2 min-h-[350px]" glowColor="rgba(255, 0, 128, 0.15)">
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-pink-500" /> Key Projects
              </h3>
              <div className="space-y-6">
                <div className="group">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    LMS Migration
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1">Led full migration from Angular v2 to v19. Restructured module architecture and optimized REST APIs for scalability.</p>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div className="group">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    Pyrite Resorts & Villas <a href="http://www.pyriteresortsandvillas.com" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-zinc-500 hover:text-white" /></a>
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1">Architected fully responsive live site using Angular, Bootstrap, and Node.js. Optimized SEO and load performance.</p>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div className="group">
                  <h4 className="font-semibold text-white">RewardPlanners & BizzPlanners</h4>
                  <p className="text-sm text-zinc-400 mt-1">Dual-module web & mobile platform using Angular, Node.js, and React Native.</p>
                </div>
              </div>
            </div>
          </MagneticBentoCard>

          {/* Education / Cloud */}
          <MagneticBentoCard className="md:col-span-2" glowColor="rgba(0, 100, 255, 0.2)">
            <div className="p-6 flex justify-around items-center text-center h-full">
              <div>
                <Cloud className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                <h3 className="font-bold">Azure Certified</h3>
                <p className="text-xs text-zinc-400 mt-1">AZ-900 Fundamentals</p>
              </div>
              <div className="h-16 w-px bg-white/20 mx-4" />
              <div>
                <h3 className="font-bold text-sm">Master of Computer Applications</h3>
                <p className="text-xs text-zinc-400 mt-1">Pune University (2023)</p>
              </div>
            </div>
          </MagneticBentoCard>

        </section>
      </main>
    </div>
    </>
  );
}
