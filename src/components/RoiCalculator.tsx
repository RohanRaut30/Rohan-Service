"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp, Sparkles, Clock, AlertTriangle, HelpCircle } from "lucide-react";

type Complexity = "mvp" | "webapp" | "enterprise";

interface Scenario {
  id: string;
  label: string;
  emoji: string;
  description: string;
  situationText: string;
  defaults: {
    complexity: Complexity;
    teamSize: number;
    timelineMonths: number;
    monthlyRevenue: number;
  };
}

const scenarios: Scenario[] = [
  {
    id: "mvp",
    label: "Startup MVP Launch",
    emoji: "🚀",
    description: "Build a prototype to secure investor buy-in & validate ideas.",
    situationText: "You need to prove product-market fit fast. A traditional agency will drag the MVP build over 3 months, costing you ₹3,00,000+ and key investor momentum. By launching in 3 weeks, you save dev costs and get early user data to close your funding round.",
    defaults: { complexity: "mvp", teamSize: 2, timelineMonths: 3, monthlyRevenue: 30000 }
  },
  {
    id: "saas",
    label: "SaaS Scaling / Revamp",
    emoji: "⚡",
    description: "Rebuild a slow dashboard that is causing high user churn.",
    situationText: "Your current platform is slow, leading to customer churn. An agency suggests a 5-month rewrite for ₹9,00,000. Rebuilding using my event-driven Next.js/Serverless stack in 4 weeks plugs the leak and retains your recurring revenue.",
    defaults: { complexity: "webapp", teamSize: 3, timelineMonths: 4, monthlyRevenue: 75000 }
  },
  {
    id: "ecommerce",
    label: "Holiday Retail Launch",
    emoji: "🛒",
    description: "Deploy a high-performance headless shop before peak sales.",
    situationText: "Peak shopping season is approaching. A traditional agency quotes 5 months, risking missed holiday sales. Launching a Shopify-headless storefront in 5 weeks lets you capture high holiday checkouts and handle massive traffic spikes.",
    defaults: { complexity: "webapp", teamSize: 4, timelineMonths: 5, monthlyRevenue: 250000 }
  },
  {
    id: "ai",
    label: "Corporate AI Ingestion",
    emoji: "🤖",
    description: "Embed semantic search agents into operations data.",
    situationText: "Your operations team spends hours sorting invoices manually. An agency quotes 8 months of spec meetings, costing ₹15,00,000. Shipping a FastAPI vector search pipeline in 8 weeks automates data operations and saves massive overhead costs.",
    defaults: { complexity: "enterprise", teamSize: 6, timelineMonths: 8, monthlyRevenue: 400000 }
  }
];

export function RoiCalculator({ onContact }: { onContact: (prefillText?: string) => void }) {
  const [selectedScenario, setSelectedScenario] = useState<string>("saas");
  const [complexity, setComplexity] = useState<Complexity>("webapp");
  const [teamSize, setTeamSize] = useState<number>(3);
  const [timelineMonths, setTimelineMonths] = useState<number>(4);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(75000);

  // Constants
  const BASELINE_MONTHLY_DEV_RATE = 60000; // avg cost of a mid-senior dev in India (INR/month)
  const AGENCY_OVERHEAD_MULTIPLIER = 1.25; // 25% markup for PM, QA, management overhead

  // Calculations
  const agencyTotalRaw = teamSize * timelineMonths * BASELINE_MONTHLY_DEV_RATE;
  const agencyTotal = Math.round(agencyTotalRaw * AGENCY_OVERHEAD_MULTIPLIER);
  
  const rohanBaseRates: Record<Complexity, number> = {
    mvp: 120000,
    webapp: 320000,
    enterprise: 700000
  };

  const defaultMonths = complexity === "mvp" ? 3 : complexity === "webapp" ? 4 : 8;
  const rohanTotal = Math.round(rohanBaseRates[complexity] * (timelineMonths / defaultMonths));
  const moneySaved = agencyTotal - rohanTotal;
  const savingsPercentage = Math.round((moneySaved / agencyTotal) * 100);

  // Timelines
  const agencyWeeks = Math.ceil(timelineMonths * 4.33);
  const rohanWeeks = Math.max(2, Math.ceil(agencyWeeks / 4)); // 4x faster
  const weeksSaved = agencyWeeks - rohanWeeks;
  const monthsSaved = Number((weeksSaved / 4.33).toFixed(1));

  // Opportunity Cost
  const opportunityCostSaved = Math.round(monthsSaved * monthlyRevenue);
  const totalValueRetained = moneySaved + opportunityCostSaved;

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || {
    id: "custom",
    label: "Custom Configuration",
    emoji: "🛠️",
    description: "Bespoke project parameters",
    situationText: `You are customizing the project variables. With a team size of ${teamSize} developers over a ${timelineMonths}-month scope, a traditional agency would require high budget. My high-velocity AI approach delivers the same scope in just ${rohanWeeks} weeks.`
  };

  const handleCalculateClick = () => {
    const complexityLabel = 
      complexity === "mvp" ? "Small MVP" : 
      complexity === "webapp" ? "Custom SaaS / Web App" : "Complex Enterprise Platform";

    const scenarioText = selectedScenario === "custom" ? "Custom Setup" : currentScenario.label;

    const prefillText = `I analyzed my project ROI using the ROI Calculator:
- Target Situation: ${scenarioText}
- Complexity Tier: ${complexityLabel}
- Traditional Team Size: ${teamSize} Developers
- Estimated Agency Time: ${timelineMonths} Months
- Anticipated Monthly SaaS Revenue: ₹${monthlyRevenue.toLocaleString('en-IN')}

This shows potential savings of ₹${moneySaved.toLocaleString('en-IN')} on development and an additional ₹${opportunityCostSaved.toLocaleString('en-IN')} saved in opportunity cost (launching ${weeksSaved} weeks early). Let's connect to review this project. \n`;

    onContact(prefillText);
  };

  return (
    <div className="bg-surface border border-foreground/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-neonCyan/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-neonCyan/8 transition-colors duration-700" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-electricPurple/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-electricPurple/8 transition-colors duration-700" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
          <Calculator className="w-6 h-6 text-blue-600 dark:text-neonCyan" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Situation-Based ROI & Overhead Calculator</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Select a real-world scenario to calculate financial, timeline, and opportunity cost savings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Configurator Sliders */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Situation Presets */}
          <div>
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono block mb-3">1. Select Your Situation Scenario</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenarios.map((sc) => {
                const isSelected = selectedScenario === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc.id);
                      setComplexity(sc.defaults.complexity);
                      setTeamSize(sc.defaults.teamSize);
                      setTimelineMonths(sc.defaults.timelineMonths);
                      setMonthlyRevenue(sc.defaults.monthlyRevenue);
                    }}
                    className={`p-4 text-left rounded-xl border transition-all flex flex-col justify-between min-h-[90px] duration-300 ${
                      isSelected
                        ? "bg-neonCyan/10 border-neonCyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                        : "bg-foreground/5 border-foreground/10 text-zinc-500 hover:border-foreground/20 hover:bg-foreground/[0.07]"
                    }`}
                  >
                    <div>
                      <span className={`text-sm font-bold block ${isSelected ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}>
                        {sc.emoji} {sc.label}
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block leading-normal">{sc.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complexity Selection */}
          <div>
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono block mb-3">2. Project Complexity Scope</span>
            <div className="grid grid-cols-3 gap-2.5">
              {(["mvp", "webapp", "enterprise"] as Complexity[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    setComplexity(tier);
                    setSelectedScenario("custom");
                    if (tier === "mvp") {
                      setTeamSize(2);
                      setTimelineMonths(2);
                    } else if (tier === "webapp") {
                      setTeamSize(3);
                      setTimelineMonths(4);
                    } else {
                      setTeamSize(6);
                      setTimelineMonths(8);
                    }
                  }}
                  className={`py-3 px-2 text-center rounded-xl border transition-all text-xs font-bold ${
                    complexity === tier
                      ? "bg-electricPurple/10 border-electricPurple/50 text-foreground"
                      : "bg-foreground/5 border-foreground/10 text-zinc-500 hover:border-foreground/20 hover:bg-foreground/[0.07]"
                  }`}
                >
                  {tier === "mvp" && "Small MVP"}
                  {tier === "webapp" && "Custom App"}
                  {tier === "enterprise" && "Enterprise SaaS"}
                </button>
              ))}
            </div>
          </div>

          {/* Team Size Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono mb-2">
              <span>3. Traditional Agency Team Size</span>
              <span className="text-foreground font-bold">{teamSize} Developers</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={teamSize}
              onChange={(e) => {
                setTeamSize(parseInt(e.target.value));
                setSelectedScenario("custom");
              }}
              className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-neonCyan"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>2 devs (Lean)</span>
              <span>10 devs (Enterprise team)</span>
            </div>
          </div>

          {/* Agency Timeline Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono mb-2">
              <span>4. Estimated Agency Timeline</span>
              <span className="text-foreground font-bold">{timelineMonths} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={timelineMonths}
              onChange={(e) => {
                setTimelineMonths(parseInt(e.target.value));
                setSelectedScenario("custom");
              }}
              className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-neonCyan"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>

          {/* Projected SaaS Revenue Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono mb-2">
              <span>5. Target Monthly SaaS Revenue</span>
              <span className="text-foreground font-bold">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000000"
              step="50000"
              value={monthlyRevenue}
              onChange={(e) => {
                setMonthlyRevenue(parseInt(e.target.value));
                setSelectedScenario("custom");
              }}
              className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-neonCyan"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
              <span>₹0 (Internal tool)</span>
              <span>₹10,00,000 (Target)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Comparative Dashboard */}
        <div className="lg:col-span-6 w-full lg:sticky lg:top-24">
          <div className="bg-surfaceBorder/30 border border-foreground/5 rounded-3xl p-6 sm:p-7 flex flex-col h-full text-left">
            
            {/* Situation Brief Alert Box */}
            <div className="mb-6 p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-950/10 border border-blue-500/10 text-xs">
              <span className="font-bold text-foreground flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wide font-mono text-blue-600 dark:text-neonCyan">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" /> Scenario Situation Analysis
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                {currentScenario.situationText}
              </p>
            </div>

            {/* Header section of savings */}
            <div className="mb-6 pb-6 border-b border-foreground/10 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-green-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5 font-mono">
                Total Value Retained
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-green-600 dark:text-emerald-400 tracking-tight">
                ₹{totalValueRetained.toLocaleString('en-IN')}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                Retained development budget combined with early market revenue.
              </p>
            </div>

            {/* Metrics Breakdowns */}
            <div className="space-y-6 flex-1">
              
              {/* Financial Costs */}
              <div>
                <span className="text-xs font-bold text-foreground block mb-2 uppercase tracking-wide font-mono">Development Cost comparison</span>
                <div className="space-y-2">
                  
                  {/* Agency Cost Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-500">Traditional Agency Cost</span>
                      <span className="font-semibold text-red-500">₹{agencyTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-foreground/10 rounded-full h-2">
                      <div className="bg-red-500/80 h-full rounded-full w-full" />
                    </div>
                  </div>

                  {/* Your Cost Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground font-medium">My Velocity Rate (You Save {savingsPercentage}%)</span>
                      <span className="font-bold text-green-600 dark:text-emerald-400">₹{rohanTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-foreground/10 rounded-full h-2">
                      <motion.div 
                        className="bg-green-600 dark:bg-emerald-400 h-full rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${(rohanTotal / agencyTotal) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                </div>
                <div className="mt-2.5 px-3 py-1.5 bg-green-500/[0.04] border border-green-500/10 rounded-xl text-[11px] text-green-700 dark:text-emerald-400 flex items-center justify-between">
                  <span>Direct Financial Savings:</span>
                  <span className="font-bold">₹{moneySaved.toLocaleString('en-IN')} saved ({savingsPercentage}% saved)</span>
                </div>
              </div>

              {/* Timeline Savings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-zinc-500 mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider font-mono">Time-To-Market</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {rohanWeeks} Weeks
                  </div>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    Vs {agencyWeeks} weeks agency timeline
                  </span>
                </div>

                <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-zinc-500 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider font-mono">Velocity Savings</span>
                  </div>
                  <div className="text-lg font-bold text-green-600 dark:text-emerald-400">
                    {weeksSaved} Weeks Saved
                  </div>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    ({monthsSaved} months earlier launch)
                  </span>
                </div>
              </div>

              {/* Opportunity Revenue Captured */}
              {monthlyRevenue > 0 && (
                <div className="bg-blue-500/[0.03] dark:bg-blue-950/10 border border-blue-500/10 rounded-2xl p-4 flex gap-3 items-start">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-neonCyan shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-foreground mb-0.5">Opportunity Revenue Captured</h5>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                      Launching **{weeksSaved} weeks early** allows your business to generate up to <strong className="text-blue-600 dark:text-neonCyan">₹{opportunityCostSaved.toLocaleString('en-IN')}</strong> in active SaaS revenue instead of waiting on agency cycles.
                    </p>
                  </div>
                </div>
              )}

              {/* Explanatory Note */}
              <div className="bg-foreground/[0.02] dark:bg-zinc-950/20 border border-foreground/5 rounded-xl p-3 flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-500 leading-normal">
                  Calculations assume a standard developer salary baseline of ₹60k/month (excluding custom devops and hardware licensing markups typical in larger agencies).
                </p>
              </div>

            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-5 border-t border-foreground/10">
              <button
                onClick={handleCalculateClick}
                className="w-full py-4 px-6 bg-foreground text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg group/btn cursor-pointer text-sm"
              >
                Claim Your Savings & Get Started
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
