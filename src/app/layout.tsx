import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { MobileNav } from "../components/MobileNav";
import { FloatingContact } from "../components/FloatingContact";
import { TimeBasedTheme } from "../components/TimeBasedTheme";
import { ContactProvider } from "../components/ContactContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rohanraut.is-a.dev"),
  title: "Rohan Raut | Extreme Velocity Development",
  description: "Senior Software Engineer specializing in building production-ready software solutions, mobile apps, HRMS, and CRMs faster than traditional timelines.",
  keywords: ["Rohan Raut", "Software Developer", "Next.js Developer", "React", "Tailwind CSS", "Pune", "Freelance Developer"],
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
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 pb-24 sm:pb-0">
        <ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark", "sunset", "midnight"]} enableSystem>
          <TimeBasedTheme />
          <ContactProvider>
            {children}
            <MobileNav />
            <FloatingContact />
          </ContactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
