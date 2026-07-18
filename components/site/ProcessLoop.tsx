"use client";

import { useState } from "react";

const stages = [
  {
    tag: "[DIAGNOSED]",
    title: "Diagnose",
    copy: "We look at where customers actually drop off, not where we assume they do.",
  },
  {
    tag: "[PRESCRIBED]",
    title: "Prescribe",
    copy: "We recommend whatever fixes that. Sometimes it's not a website.",
  },
  {
    tag: "[BUILT]",
    title: "Build",
    copy: "We build it properly, or bring in someone who does.",
  },
  {
    tag: "[MEASURED]",
    title: "Measure",
    copy: "We check it worked. If it didn't, we go back to step one.",
  },
];

export function ProcessLoop() {
  const [active, setActive] = useState(0);

  return (
    <div className="process-loop" aria-label="VLYR process loop">
      <svg className="process-loop__path" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 7 H91 V88 H11 V16 H42" />
        <path d="M37 10 L42 16 L36 21" />
      </svg>
      <div className="process-loop__center" aria-hidden="true">
        01
        <br />
        AGAIN
      </div>
      {stages.map((stage, index) => (
        <button
          type="button"
          key={stage.title}
          className={`process-stage process-stage--${index + 1} ${active === index ? "is-active" : ""}`}
          onClick={() => setActive(index)}
          onFocus={() => setActive(index)}
          onMouseEnter={() => setActive(index)}
        >
          <span className="process-stage__tag">{stage.tag}</span>
          <span className="process-stage__title">{stage.title}</span>
          <span className="process-stage__copy">{stage.copy}</span>
        </button>
      ))}
    </div>
  );
}
