"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Check, ArrowRight } from "lucide-react";

const projectTypes = [
  { id: "landing", label: "Landing Page / Portfolio", baseMin: 5000, baseMax: 8000 },
  { id: "webapp", label: "Custom Web App / SaaS", baseMin: 15000, baseMax: 25000 },
  { id: "ecommerce", label: "E-Commerce Platform", baseMin: 20000, baseMax: 35000 },
];

const featuresList = [
  { id: "ui", label: "Custom UI/UX", cost: 2500 },
  { id: "auth", label: "Auth (SSO)", cost: 1500 },
  { id: "payments", label: "Payments", cost: 4000 },
  { id: "dashboard", label: "Admin Dashboard", cost: 3500 },
  { id: "ai", label: "AI LLM Integration", cost: 4000 },
  { id: "realtime", label: "Real-time (Sockets)", cost: 2500 },
  { id: "seo", label: "Advanced SEO", cost: 2000 },
  { id: "cms", label: "CMS Integration", cost: 3000 },
];

const timelines = [
  { id: "standard", label: "Standard", multiplier: 1 },
  { id: "rush", label: "Extreme Velocity", multiplier: 1.5 },
];

export function ProjectCostEstimator({ onContact }: { onContact: () => void }) {
  const [projectType, setProjectType] = useState<string>("webapp");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("standard");
  const [estimate, setEstimate] = useState({ min: 15000, max: 25000 });

  useEffect(() => {
    let extraCost = 0;
    selectedFeatures.forEach((featureId) => {
      const feature = featuresList.find((f) => f.id === featureId);
      if (feature) extraCost += feature.cost;
    });

    const selectedType = projectTypes.find(pt => pt.id === projectType) || projectTypes[1];
    const selectedTimeline = timelines.find(t => t.id === timeline) || timelines[0];

    const baseMin = selectedType.baseMin;
    const baseMax = selectedType.baseMax;

    setEstimate({
      min: (baseMin + extraCost) * selectedTimeline.multiplier,
      max: (baseMax + extraCost + (extraCost * 0.2)) * selectedTimeline.multiplier,
    });
  }, [projectType, selectedFeatures, timeline]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-neonCyan/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-neonCyan/10 transition-colors duration-700" />

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
          <Calculator className="w-6 h-6 text-blue-600 dark:text-neonCyan" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Project Cost Estimator</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure your project to get an instant estimate.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        
        {/* Left Side: Configuration */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Project Type */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">1. Project Type</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {projectTypes.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  className={`w-full text-center p-3 border rounded-xl transition-all ${projectType === pt.id ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]" : "bg-foreground/5 border-foreground/10 hover:border-foreground/20"}`}
                >
                  <span className={`text-sm ${projectType === pt.id ? "text-foreground font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>{pt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">2. Required Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuresList.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isSelected
                      ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                      : "bg-foreground/5 border-foreground/10 hover:border-foreground/20"
                      }`}
                  >
                    <span className={`text-sm ${isSelected ? "text-foreground font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {feature.label}
                    </span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? "bg-neonCyan border-neonCyan" : "border-zinc-600"
                      }`}>
                      {isSelected && <Check className="w-3 h-3 text-background" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">3. Timeline</h4>
            <div className="grid grid-cols-2 gap-3">
              {timelines.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTimeline(t.id)}
                  className={`w-full text-center p-3 border rounded-xl transition-all ${timeline === t.id ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]" : "bg-foreground/5 border-foreground/10 hover:border-foreground/20"}`}
                >
                  <span className={`text-sm ${timeline === t.id ? "text-foreground font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Estimate Display */}
        <div className="lg:col-span-2 flex flex-col justify-center h-full">
          <div className="bg-surfaceBorder/50 border border-foreground/5 rounded-3xl p-6 md:p-8 text-center sticky top-24">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Estimated Investment Range</p>
            <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-zinc-400 mb-2 leading-tight">
              ₹{estimate.min.toLocaleString('en-IN')} <br className="hidden lg:block" />
              <span className="text-xl md:text-2xl text-zinc-500 font-normal lg:hidden"> - </span>
              <span className="hidden lg:block text-xl text-zinc-500 font-normal my-2">to</span>
              ₹{Math.round(estimate.max).toLocaleString('en-IN')}
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-6" />

            <p className="text-xs text-zinc-500 mb-8 leading-relaxed px-4">
              * This is a rough automated estimate. Final pricing depends heavily on specific requirements, scale, and complexity.
            </p>

            <button
              onClick={onContact}
              className="w-full py-4 px-6 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg group/btn cursor-pointer"
            >
              Get a Precise Quote
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
