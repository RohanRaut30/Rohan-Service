"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Check, ArrowRight, Loader2, Sparkles, X, Copy, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

export function ProjectCostEstimator({ onContact }: { onContact: (text?: string) => void }) {
  const [projectType, setProjectType] = useState<string>("webapp");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("standard");
  const [estimate, setEstimate] = useState({ min: 15000, max: 25000 });

  const [traditionalWeeks, setTraditionalWeeks] = useState(12);
  const [rohanWeeks, setRohanWeeks] = useState(3);
  const [moneySaved, setMoneySaved] = useState(25000);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposalText, setProposalText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let extraCost = 0;
    let extraWeeksTraditional = 0;
    let extraWeeksRohan = 0;

    selectedFeatures.forEach((featureId) => {
      const feature = featuresList.find((f) => f.id === featureId);
      if (feature) {
        extraCost += feature.cost;
        
        if (featureId === "ui") { extraWeeksTraditional += 2; extraWeeksRohan += 0.5; }
        else if (featureId === "auth") { extraWeeksTraditional += 1; extraWeeksRohan += 0.25; }
        else if (featureId === "payments") { extraWeeksTraditional += 2; extraWeeksRohan += 0.5; }
        else if (featureId === "dashboard") { extraWeeksTraditional += 3; extraWeeksRohan += 0.75; }
        else if (featureId === "ai") { extraWeeksTraditional += 3; extraWeeksRohan += 0.75; }
        else if (featureId === "realtime") { extraWeeksTraditional += 2; extraWeeksRohan += 0.5; }
        else if (featureId === "seo") { extraWeeksTraditional += 1; extraWeeksRohan += 0.25; }
        else if (featureId === "cms") { extraWeeksTraditional += 2; extraWeeksRohan += 0.5; }
      }
    });

    const selectedType = projectTypes.find(pt => pt.id === projectType) || projectTypes[1];
    const selectedTimeline = timelines.find(t => t.id === timeline) || timelines[0];

    const baseMin = selectedType.baseMin;
    const baseMax = selectedType.baseMax;

    setEstimate({
      min: (baseMin + extraCost) * selectedTimeline.multiplier,
      max: (baseMax + extraCost + (extraCost * 0.2)) * selectedTimeline.multiplier,
    });

    let baseWeeksTraditional = 8;
    let baseWeeksRohan = 2;
    if (projectType === "landing") {
      baseWeeksTraditional = 4;
      baseWeeksRohan = 1;
    } else if (projectType === "ecommerce") {
      baseWeeksTraditional = 12;
      baseWeeksRohan = 3;
    }

    const rawTraditional = baseWeeksTraditional + extraWeeksTraditional;
    let rawRohan = baseWeeksRohan + extraWeeksRohan;
    
    if (timeline === "rush") {
      rawRohan = Math.max(1, rawRohan * 0.7);
    }

    setTraditionalWeeks(Math.ceil(rawTraditional));
    setRohanWeeks(Number(rawRohan.toFixed(1)));
    
    const agencyMin = (baseMin + extraCost) * selectedTimeline.multiplier * 2.5;
    setMoneySaved(Math.round(agencyMin - ((baseMin + extraCost) * selectedTimeline.multiplier)));

  }, [projectType, selectedFeatures, timeline]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const generateSprints = () => {
    const sprints = [];
    
    const sprint1Tasks = ["Project setup & environment config", "Database schema & API routing design"];
    if (selectedFeatures.includes("ui")) {
      sprint1Tasks.push("High-fidelity UI/UX design & prototype");
    } else {
      sprint1Tasks.push("Base responsive layout structure");
    }
    sprints.push({ week: 1, title: "Sprint 1: Architecture & Layout", tasks: sprint1Tasks });

    const sprint2Tasks = ["Core application page components", "State management & mock integrations"];
    if (selectedFeatures.includes("auth")) {
      sprint2Tasks.push("User Auth & Registration (JWT / OAuth)");
    }
    if (selectedFeatures.includes("dashboard")) {
      sprint2Tasks.push("Admin dashboard shells & charting layouts");
    }
    sprints.push({ week: 2, title: "Sprint 2: Core Functionality", tasks: sprint2Tasks });

    const sprint3Tasks: string[] = [];
    if (selectedFeatures.includes("payments")) {
      sprint3Tasks.push("Payment gateway connection (Cashfree/Stripe)");
    }
    if (selectedFeatures.includes("ai")) {
      sprint3Tasks.push("AI Agent / LLM prompt engineering & API hook");
    }
    if (selectedFeatures.includes("realtime")) {
      sprint3Tasks.push("Websocket channels for real-time notifications");
    }
    
    if (sprint3Tasks.length > 0 || projectType !== "landing") {
      if (sprint3Tasks.length === 0) {
        sprint3Tasks.push("REST API backend controller integration");
      }
      sprints.push({ week: 3, title: "Sprint 3: Advanced Integrations", tasks: sprint3Tasks });
    }

    const launchTasks = ["Mobile-responsiveness check & optimizations", "Production build compiler checks"];
    if (selectedFeatures.includes("seo")) {
      launchTasks.push("Metadata schema, sitemap, and robots.txt SEO tune");
    }
    if (selectedFeatures.includes("cms")) {
      launchTasks.push("CMS backend content synchronization");
    }
    launchTasks.push("Cloud server deployment (Vercel / Azure) & Handover");
    
    const lastWeek = sprints.length + 1;
    sprints.push({ week: lastWeek, title: `Sprint ${lastWeek}: Optimization & Launch`, tasks: launchTasks });

    return sprints;
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    setProposalModalOpen(true);
    setProposalText(null);

    const selectedType = projectTypes.find(pt => pt.id === projectType)?.label || "Custom App";
    const features = selectedFeatures.map(f => featuresList.find(fl => fl.id === f)?.label).filter(Boolean).join(", ");
    const selectedTimeline = timelines.find(t => t.id === timeline)?.label || "Standard";

    const promptText = `Please generate a technical proposal for a "${selectedType}" project. Timelines requested: ${selectedTimeline} (${rohanWeeks} weeks). Included features: ${features || "None selected yet"}. Please outline key architecture decisions, deliverables, and exact tech stack suggestions.`;

    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setProposalText(data.text);
    } catch (err) {
      setProposalText("## Error Generating Proposal\n\nSorry, I ran into an issue generating your proposal. Please try again or contact me directly at rohan.raut.dev@gmail.com.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyProposal = () => {
    if (!proposalText) return;
    navigator.clipboard.writeText(proposalText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleQuoteClick = () => {
    const selectedType = projectTypes.find(pt => pt.id === projectType)?.label || "Custom App";
    const features = selectedFeatures.map(f => featuresList.find(fl => fl.id === f)?.label).filter(Boolean).join(", ");
    const selectedTimeline = timelines.find(t => t.id === timeline)?.label || "Standard";

    const prefillText = `I would like to get a precise quote for a "${selectedType}" project.
- Timeline: ${selectedTimeline} (${rohanWeeks} weeks)
- Selected Features: ${features || "None"}
- Estimated Budget Range: ₹${estimate.min.toLocaleString('en-IN')} to ₹${Math.round(estimate.max).toLocaleString('en-IN')}

Here are some additional details about my business requirements:\n`;

    onContact(prefillText);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Configuration Section */}
        <div className="lg:col-span-7 space-y-6">
          
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

          {/* Dynamic Timeline Visualizer Toggle */}
          <div className="pt-6 border-t border-foreground/10">
            <button
              onClick={() => setShowRoadmap(!showRoadmap)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-neonCyan hover:underline cursor-pointer"
            >
              {showRoadmap ? "Hide Weekly Delivery Roadmap" : "Show Weekly Delivery Roadmap ➔"}
            </button>
            
            <AnimatePresence>
              {showRoadmap && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-6 overflow-hidden"
                >
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Dynamic Project Roadmap</h4>
                  <div className="relative pl-6 border-l border-foreground/10 space-y-6 ml-2 text-left">
                    {generateSprints().map((sprint, sIdx) => (
                      <div key={sIdx} className="relative">
                        {/* Dot on the timeline */}
                        <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-600 dark:border-neonCyan bg-background flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-neonCyan" />
                        </div>
                        <h5 className="text-sm font-bold text-foreground">{sprint.title}</h5>
                        <ul className="mt-2 space-y-1">
                          {sprint.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Column: Sticky Estimate & Savings Display */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">
          <div className="bg-surfaceBorder/30 border border-foreground/5 rounded-3xl p-6 sm:p-8 text-center w-full">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Estimated Investment Range</p>
            
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-blue-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-zinc-400 mb-2 leading-tight flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              <span className="whitespace-nowrap">₹{estimate.min.toLocaleString('en-IN')}</span>
              <span className="text-lg sm:text-xl text-zinc-500 font-normal">to</span>
              <span className="whitespace-nowrap">₹{Math.round(estimate.max).toLocaleString('en-IN')}</span>
            </div>

            {/* Business Value Readouts */}
            <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-left bg-foreground/5 dark:bg-zinc-950/40 p-5 rounded-2xl border border-foreground/5 w-full">
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">Time Saved</span>
                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">{traditionalWeeks - rohanWeeks} Weeks</span>
                <span className="text-xs text-zinc-400 block mt-0.5">({rohanWeeks}w vs {traditionalWeeks}w agency timeline)</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">Value Saved</span>
                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">₹{moneySaved.toLocaleString('en-IN')}</span>
                <span className="text-xs text-zinc-400 block mt-0.5">In agency overhead costs</span>
              </div>
            </div>
            
            <p className="text-xs text-zinc-500 mb-8 leading-relaxed w-full">
              * This is a rough automated estimate. Final pricing depends heavily on specific requirements, scale, and complexity.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-center w-full">
              <button
                onClick={handleGenerateProposal}
                className="flex-1 py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/25 group/btn cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                Generate AI Proposal
              </button>
              
              <button
                onClick={handleQuoteClick}
                className="flex-1 py-4 px-6 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg group/btn cursor-pointer text-sm"
              >
                Get a Precise Quote
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* AI Proposal Modal Overlay */}
      <AnimatePresence>
        {proposalModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProposalModalOpen(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl h-[80vh] bg-surface border border-surfaceBorder rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-surfaceBorder px-6 py-4 bg-background/30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-electricPurple" />
                  <span className="font-bold text-foreground">AI Generated Technical Proposal</span>
                </div>
                <button
                  onClick={() => setProposalModalOpen(false)}
                  className="text-zinc-500 hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar bg-white dark:bg-zinc-950 text-left">
                {isGenerating ? (
                  <div className="flex h-full flex-col items-center justify-center text-zinc-500 py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-electricPurple mb-4" />
                    <p className="font-mono text-sm">Mapping sprints, architecture and timelines...</p>
                  </div>
                ) : (
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:text-purple-700 dark:prose-headings:text-electricPurple prose-a:text-blue-600">
                    <ReactMarkdown>{proposalText || ""}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-surfaceBorder px-6 py-4 bg-background/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-zinc-500">Ready to build this at extreme velocity?</p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCopyProposal}
                    disabled={isGenerating || !proposalText}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 border border-surfaceBorder hover:bg-foreground/5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 cursor-pointer text-foreground"
                  >
                    <Copy className="w-4 h-4" />
                    {isCopied ? "Copied!" : "Copy Proposal"}
                  </button>
                  <button
                    onClick={() => {
                      setProposalModalOpen(false);
                      handleQuoteClick();
                    }}
                    disabled={isGenerating}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:scale-[0.98] transition-transform disabled:opacity-50 cursor-pointer"
                  >
                    Let's Collaborate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
