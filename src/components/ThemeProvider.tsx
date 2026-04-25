"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Extract properties inline to avoid import errors since next-themes 14 might structure exports differently
export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
