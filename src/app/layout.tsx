import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohanraut.dev"),
  title: "Rohan Raut | Extreme Velocity Development",
  description: "Senior Frontend Engineer & UI/UX Designer specializing in building production-ready web apps and SaaS dashboards faster than traditional timelines.",
  keywords: ["Rohan Raut", "Software Developer", "Next.js Developer", "React", "Tailwind CSS", "Pune", "Freelance Developer"],
  openGraph: {
    title: "Rohan Raut | Extreme Velocity Development",
    description: "Building production-ready web apps and software significantly faster without sacrificing quality.",
    url: "https://rohanraut.dev",
    siteName: "Rohan Raut Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Raut | Extreme Velocity Development",
    description: "Building production-ready web apps and software significantly faster without sacrificing quality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
