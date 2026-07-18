import type { Metadata } from "next";
import { Geist_Mono, Manrope, Newsreader } from "next/font/google";

import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import "./globals.css";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vlyr.in"),
  title: {
    default: "VLYR — Digital Growth Studio.",
    template: "%s — VLYR",
  },
  description:
    "VLYR diagnoses where local businesses lose customers, revenue, or time, then builds the systems that fix it.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "VLYR",
    title: "VLYR — Digital Growth Studio.",
    description: "Diagnose first. Build second. Fix what is actually not working.",
  },
  twitter: {
    card: "summary",
    title: "VLYR — Digital Growth Studio.",
    description: "Diagnose first. Build second. Fix what is actually not working.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
