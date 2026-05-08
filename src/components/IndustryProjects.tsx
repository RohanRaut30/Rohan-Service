"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, GraduationCap, LayoutDashboard, HeartPulse, ArrowUpRight } from "lucide-react";

const industries = [
  { id: "saas", label: "SaaS & Dashboards", icon: LayoutDashboard },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "edtech", label: "Ed-Tech", icon: GraduationCap },
  { id: "healthcare", label: "Healthcare Tech", icon: HeartPulse },
];

const projects = [
  {
    id: 1,
    title: "AI Analytics Dashboard",
    industry: "saas",
    description: "A high-throughput analytics platform processing 1M+ events/day with real-time visualization.",
    metrics: ["300% faster loads", "Real-time WebSockets"],
    color: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 2,
    title: "Global Marketplace API",
    industry: "ecommerce",
    description: "A headless commerce backend supporting multi-currency checkouts and seamless Stripe integration.",
    metrics: ["0.2s Checkout Latency", "$2M+ Processed"],
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
  },
  {
    id: 3,
    title: "Interactive LMS Platform",
    industry: "edtech",
    description: "Scalable learning management system with AI-driven course recommendations and video streaming.",
    metrics: ["10k+ Concurrent Users", "Adaptive AI Paths"],
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
  },
  {
    id: 4,
    title: "Patient Portal MVP",
    industry: "healthcare",
    description: "HIPAA-compliant patient portal built in record time with secure document sharing and tele-health scheduling.",
    metrics: ["Built in 4 weeks", "Zero Security Breaches"],
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/30",
  },
  {
    id: 5,
    title: "SaaS Billing Engine",
    industry: "saas",
    description: "Automated subscription and usage-based billing microservice for a fast-growing B2B startup.",
    metrics: ["100% Invoice Accuracy", "Automated Dunning"],
    color: "from-indigo-500/20 to-blue-500/20",
    border: "border-indigo-500/30",
  },
];

export function IndustryProjects() {
  const [activeIndustry, setActiveIndustry] = useState("saas");

  const filteredProjects = projects.filter((p) => p.industry === activeIndustry);

  return (
    <div className="w-full mt-16 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-4">Proven Results Across Industries</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Clients care about business outcomes, not just code. Select your industry to see what I've built in your space.
        </p>
      </div>

      {/* Industry Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const isActive = activeIndustry === industry.id;
          return (
            <button
              key={industry.id}
              onClick={() => setActiveIndustry(industry.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] font-semibold"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {industry.label}
            </button>
          );
        })}
      </div>

      {/* Filtered Projects Container (Swipeable on Mobile) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 gap-6 w-full max-w-5xl pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`relative min-w-[85vw] sm:min-w-0 snap-center shrink-0 overflow-hidden bg-[#0a0a0a] border rounded-3xl p-8 group hover:-translate-y-1 transition-transform duration-300 ${project.border}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.metrics.map((metric, i) => (
                    <span key={i} className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs font-medium text-zinc-300">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
