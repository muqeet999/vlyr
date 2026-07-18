"use client";

import { useEffect, useState } from "react";

export function MeasurementRule() {
  const [active, setActive] = useState(0);
  const [hasChapters, setHasChapters] = useState(false);

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!chapters.length) return;
    let frame = 0;
    const update = () => {
      const marker = window.innerHeight * 0.46;
      let chapterIndex = 0;
      chapters.forEach((chapter, index) => {
        if (chapter.getBoundingClientRect().top <= marker) chapterIndex = index;
      });
      setActive(chapterIndex);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(() => {
      setHasChapters(true);
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!hasChapters) return null;

  return (
    <aside className="measurement-rule" aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <span key={index} className={index === active ? "is-active" : undefined} />
      ))}
    </aside>
  );
}
