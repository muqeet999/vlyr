"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const rails = [
  { id: "a", x: -38, y: -30, width: 132, rotate: -52, target: { x: -106, y: -52, rotate: 0 } },
  { id: "b", x: 42, y: -42, width: 94, rotate: 41, target: { x: 0, y: -52, rotate: 0 } },
  { id: "c", x: -28, y: 31, width: 108, rotate: 67, target: { x: 106, y: -52, rotate: 90 } },
  { id: "d", x: 47, y: 42, width: 132, rotate: -31, target: { x: -106, y: 0, rotate: 0 } },
  { id: "e", x: 4, y: -4, width: 94, rotate: 18, target: { x: 0, y: 0, rotate: 0 } },
  { id: "f", x: -46, y: -8, width: 108, rotate: -72, target: { x: 106, y: 0, rotate: 90 } },
  { id: "g", x: 37, y: -28, width: 132, rotate: 58, target: { x: -106, y: 52, rotate: 0 } },
  { id: "h", x: -8, y: 45, width: 94, rotate: -43, target: { x: 0, y: 52, rotate: 0 } },
  { id: "i", x: 48, y: 19, width: 108, rotate: 35, target: { x: 106, y: 52, rotate: 90 } },
];

export function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setReady(true), 220);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const isResolved = ready || reducedMotion;

  function trackLight(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--light-x", `${x}%`);
    event.currentTarget.style.setProperty("--light-y", `${y}%`);
  }

  return (
    <section className="cinematic-hero" id="top" data-chapter onPointerMove={trackLight}>
      <div className="cinematic-hero__light" aria-hidden="true" />
      <div className="cinematic-hero__field" aria-hidden="true">
        <div className="tolerance-field">
          <span className="tolerance-field__axis tolerance-field__axis--x" />
          <span className="tolerance-field__axis tolerance-field__axis--y" />
          {rails.map((rail, index) => (
            <motion.span
              className="tolerance-field__rail"
              key={rail.id}
              style={{ width: rail.width }}
              initial={reducedMotion ? rail.target : { x: `${rail.x}%`, y: `${rail.y}%`, rotate: rail.rotate, opacity: 0 }}
              animate={isResolved ? { x: rail.target.x, y: rail.target.y, rotate: rail.target.rotate, opacity: 1 } : undefined}
              transition={{
                duration: reducedMotion ? 0 : 1.65,
                delay: reducedMotion ? 0 : 0.18 + index * 0.085,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
      </div>
      <motion.div
        className="cinematic-hero__identity"
        initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(7px)" }}
        animate={isResolved ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: reducedMotion ? 0 : 0.95, delay: reducedMotion ? 0 : 1.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>VLYR</p>
        <span>Digital Growth Studio</span>
        <small>We find the friction. Then we remove it.</small>
      </motion.div>
      <motion.span
        className="cinematic-hero__scroll"
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={isResolved ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Scroll to inspect
      </motion.span>
    </section>
  );
}
