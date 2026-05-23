import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { MobileNav } from "../components/MobileNav";
import { FloatingContact } from "../components/FloatingContact";

import { ContactProvider } from "../components/ContactContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rohanraut.is-a.dev"),
  title: "Rohan Raut | Extreme Velocity Development",
  description: "Senior Software Engineer specializing in building production-ready software solutions, mobile apps, HRMS, and CRMs faster than traditional timelines.",
  manifest: "/manifest.json",
  keywords: ["Rohan Raut", "Software Developer", "Next.js Developer", "React", "Tailwind CSS", "Pune", "Freelance Developer", "Full Stack Engineer"],
  authors: [{ name: "Rohan Raut" }],
  creator: "Rohan Raut",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rohan Raut | Extreme Velocity Development",
    description: "Building production-ready software solutions, web, and mobile applications significantly faster without sacrificing quality.",
    url: "https://www.rohanraut.is-a.dev",
    siteName: "Rohan Raut Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Raut | Extreme Velocity Development",
    description: "Building production-ready software solutions, web, and mobile applications significantly faster without sacrificing quality.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rohan Raut",
  "url": "https://www.rohanraut.is-a.dev",
  "jobTitle": "Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Extreme Velocity Development"
  },
  "sameAs": [
    "https://github.com/RohanRaut30",
    "https://www.linkedin.com/in/rohanraut30"
  ]
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
      <head>
        {/* JSON-LD Structured Data for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 pb-24 sm:pb-0">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} themes={["light", "dark"]}>
          <ContactProvider>
            {children}
            <MobileNav />
            <FloatingContact />
            <SpeedInsights />
          </ContactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
