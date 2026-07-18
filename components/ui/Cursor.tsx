"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dot" | "ring">("dot");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-enabled");

    const move = (event: MouseEvent) => {
      cursor.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      cursor.current?.classList.add("is-visible");
    };

    const findInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest<HTMLElement>("a, button, input, textarea, select, summary, [data-cursor]");
    };

    const over = (event: MouseEvent) => {
      const target = findInteractiveElement(event.target);
      if (!target) return;
      setMode("ring");
      const cursorValue = target.dataset.cursor;
      setLabel(target.dataset.cursorLabel ?? (cursorValue && cursorValue !== "label" ? cursorValue : ""));
    };

    const out = (event: MouseEvent) => {
      const target = findInteractiveElement(event.target);
      if (!target || target.contains(event.relatedTarget as Node)) return;
      setMode("dot");
      setLabel("");
    };

    const leaveWindow = () => cursor.current?.classList.remove("is-visible");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leaveWindow);

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leaveWindow);
    };
  }, []);

  return (
    <div ref={cursor} className={`cursor cursor--${mode}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
