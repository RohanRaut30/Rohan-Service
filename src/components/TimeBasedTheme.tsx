"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function TimeBasedTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const hasSetTimeTheme = sessionStorage.getItem("timeThemeSet");
    if (hasSetTimeTheme) return;

    const hour = new Date().getHours();
    
    // Time-based theme logic:
    // 17:00 (5 PM) to 20:00 (8 PM) -> sunset
    // 20:00 (8 PM) to 06:00 (6 AM) -> midnight
    // 06:00 (6 AM) to 17:00 (5 PM) -> dark (default high-contrast mode)
    
    if (hour >= 17 && hour < 20) {
      setTheme("sunset");
    } else if (hour >= 20 || hour < 6) {
      setTheme("midnight");
    } else {
      setTheme("dark");
    }
    
    sessionStorage.setItem("timeThemeSet", "true");
  }, [setTheme]);

  return null;
}
