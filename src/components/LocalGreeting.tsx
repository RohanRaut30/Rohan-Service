"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Sun, Moon, Coffee } from "lucide-react";
import { motion } from "framer-motion";

export function LocalGreeting() {
  const [greeting, setGreeting] = useState("");
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [Icon, setIcon] = useState<React.ElementType>(Coffee);

  useEffect(() => {
    // Get Time and Day
    const date = new Date();
    const hours = date.getHours();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[date.getDay()]);

    if (hours < 12) {
      setGreeting("Good Morning");
      setIcon(() => Coffee);
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
      setIcon(() => Sun);
    } else {
      setGreeting("Good Evening");
      setIcon(() => Moon);
    }

    // Try to get location based on timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Extract city from timezone (e.g., "Asia/Kolkata" -> "Kolkata")
      if (tz && tz.includes("/")) {
        const city = tz.split("/")[1].replace("_", " ");
        setLocation(`from ${city}`);
      }
    } catch (e) {
      // Fallback if timezone detection fails
    }
  }, []);

  if (!greeting) return null; // Prevent hydration mismatch flash

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 backdrop-blur-md mb-6"
    >
      <Icon className="w-4 h-4 text-neonCyan" />
      <span>
        {greeting} {location}! Hope you're having a productive {day}.
      </span>
    </motion.div>
  );
}
