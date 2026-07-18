"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = event.currentTarget.getBoundingClientRect();

    document.documentElement.style.setProperty("--theme-toggle-x", `${bounds.left + bounds.width / 2}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${bounds.top + bounds.height / 2}px`);

    if (!("startViewTransition" in document) || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => setTheme(nextTheme));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            "circle(0px at var(--theme-toggle-x) var(--theme-toggle-y))",
            "circle(150vmax at var(--theme-toggle-x) var(--theme-toggle-y))",
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      data-cursor=""
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
