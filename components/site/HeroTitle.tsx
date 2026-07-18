"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";

const headline = "Most businesses don't have a website problem.";

export function HeroTitle() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  let characterIndex = 0;

  return (
    <h1 className="hero-title" ref={ref} aria-label={headline}>
      {headline.split(" ").map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="hero-title__word" aria-hidden="true">
            {word.split("").map((character) => {
              const delayIndex = characterIndex++;
              return (
                <motion.span
                  key={`${character}-${delayIndex}`}
                  initial={reducedMotion ? false : { y: "0.75em", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : undefined}
                  transition={{
                    duration: reducedMotion ? 0 : 0.42,
                    delay: reducedMotion ? 0 : 0.14 + delayIndex * 0.018,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {character}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < headline.split(" ").length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
