"use client";

import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { MeasurementRule } from "@/components/ui/MeasurementRule";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <MeasurementRule />
      <main>{children}</main>
      <Footer />
    </>
  );
}
