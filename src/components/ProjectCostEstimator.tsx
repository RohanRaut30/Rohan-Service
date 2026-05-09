"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Check, ArrowRight } from "lucide-react";

const featuresList = [
  { id: "ui", label: "Custom UI/UX Design", cost: 25000 },
  { id: "auth", label: "Authentication (SSO, OAuth)", cost: 15000 },
  { id: "payments", label: "Payment Gateway Integration", cost: 20000 },
  { id: "dashboard", label: "Admin Dashboard & Analytics", cost: 35000 },
  { id: "ai", label: "AI LLM / Agent Integration", cost: 40000 },
  { id: "realtime", label: "Real-time Features (WebSockets)", cost: 25000 },
];

export function ProjectCostEstimator({ onContact }: { onContact: () => void }) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [estimate, setEstimate] = useState({ min: 50000, max: 75000 }); // Base cost

  useEffect(() => {
    let extraCost = 0;
    selectedFeatures.forEach((featureId) => {
      const feature = featuresList.find((f) => f.id === featureId);
      if (feature) extraCost += feature.cost;
    });

    const baseMin = 50000;
    const baseMax = 75000;

    setEstimate({
      min: baseMin + extraCost,
      max: baseMax + extraCost + (extraCost * 0.2), // 20% buffer for max
    });
  }, [selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-neonCyan/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-neonCyan/10 transition-colors duration-700" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
          <Calculator className="w-6 h-6 text-blue-600 dark:text-neonCyan" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Project Cost Estimator</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Select features to get an instant, rough price estimate.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Features Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-4">Required Features</h4>
          {featuresList.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    : "bg-foreground/5 border-foreground/10 hover:border-foreground/20"
                }`}
              >
                <span className={`text-sm ${isSelected ? "text-foreground font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>
                  {feature.label}
                </span>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  isSelected ? "bg-neonCyan border-neonCyan" : "border-zinc-600"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-background" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Estimate Display */}
        <div className="flex flex-col justify-center">
          <div className="bg-surfaceBorder/50 border border-foreground/5 rounded-2xl p-8 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Estimated Investment Range</p>
            <div className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-zinc-400 mb-2">
              ₹{estimate.min.toLocaleString('en-IN')} <span className="text-2xl text-zinc-500 font-normal">-</span> ₹{Math.round(estimate.max).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-zinc-500 mb-8 mt-4">
              * This is a rough estimate. Final pricing depends on specific requirements and complexity.
            </p>
            
            <button
              onClick={onContact}
              className="w-full py-4 px-6 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get a Precise Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
