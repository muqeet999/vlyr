"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MagneticLink } from "@/components/ui/MagneticLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Method", target: "#method" },
  { label: "Solutions", target: "#solutions" },
  { label: "Team", target: "#team" },
  { label: "Contact", target: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const hrefFor = (target: string) => (target.startsWith("#") && pathname !== "/" ? `/${target}` : target);

  return (
    <header className={`navbar ${pathname === "/" && !isScrolled ? "is-cinematic" : ""} ${isScrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="wordmark" aria-label="VLYR home" data-cursor="">
        VLYR
      </Link>
      <nav className="navbar__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <MagneticLink href={hrefFor(item.target)} key={item.label}>
            {item.label}
          </MagneticLink>
        ))}
      </nav>
      <div className="navbar__controls">
        <ThemeToggle />
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          data-cursor=""
        >
          {isMenuOpen ? <X size={18} strokeWidth={1.4} /> : <Menu size={18} strokeWidth={1.4} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`} aria-hidden={!isMenuOpen}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link
              href={hrefFor(item.target)}
              key={item.label}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: isMenuOpen ? `${90 + index * 55}ms` : "0ms" }}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <p>VLYR / Digital Growth Studio — Srinagar</p>
      </div>
    </header>
  );
}
