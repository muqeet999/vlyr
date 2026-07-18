"use client";

import Link from "next/link";
import { type ComponentProps, useRef } from "react";

import { cn } from "@/lib/utils";

type MagneticLinkProps = ComponentProps<typeof Link>;

export function MagneticLink({ className, onMouseLeave, onMouseMove, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      className={cn("magnetic-link", className)}
      onMouseMove={(event) => {
        const element = ref.current;
        if (element) {
          const bounds = element.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 4;
          element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
        onMouseLeave?.(event);
      }}
      {...props}
    />
  );
}
