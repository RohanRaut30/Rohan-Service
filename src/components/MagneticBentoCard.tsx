"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

interface MagneticBentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function MagneticBentoCard({
  children,
  className,
  glowColor = "rgba(0, 240, 255, 0.15)",
}: MagneticBentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative flex flex-col rounded-3xl p-[1px] overflow-hidden transition-all duration-300 group cursor-pointer",
        className
      )}
    >
      {/* Shimmer Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-shimmer" />

      {/* Glow Behind */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-300 blur-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
            : "transparent",
        }}
      />

      {/* Card Content with Glassmorphism */}
      <div className="relative z-10 flex h-full w-full flex-col rounded-[23px] bg-surface/50 backdrop-blur-md border border-surfaceBorder overflow-hidden bg-black/40">
        {children}
      </div>
    </motion.div>
  );
}
