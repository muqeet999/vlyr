"use client";

import { useState } from "react";

import type { SolutionItem } from "@/data/solutions";

export function SolutionCards({ solutions }: { solutions: SolutionItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="solution-list">
      {solutions.map((solution, index) => {
        const isActive = active === solution.id;
        return (
          <button
            type="button"
            key={solution.id}
            className={`solution-card ${isActive ? "is-active" : ""}`}
            aria-expanded={isActive}
            onMouseEnter={() => setActive(solution.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(solution.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(solution.id)}
            data-cursor="open"
          >
            <span className="solution-card__number">0{index + 1}</span>
            <span className="solution-card__symptom">{solution.symptom}</span>
            <span className="solution-card__system" aria-hidden={!isActive}>
              {solution.system.join(" / ")}
            </span>
            <span className="solution-card__indicator" aria-hidden="true">↗</span>
          </button>
        );
      })}
    </div>
  );
}
