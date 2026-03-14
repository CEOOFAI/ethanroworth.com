"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import LocaleSwitcher from "./locale-switcher";

const navLinks = [
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Animate mobile menu links
  useEffect(() => {
    if (isMobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-border-dark"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-6 md:px-16 lg:px-24">
        {/* Logo - full name in Instrument Serif */}
        <Link
          href="/"
          className="font-display text-xl text-text-light hover:text-accent transition-colors duration-300"
        >
          Ethan Roworth
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`font-body text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-accent ${
                pathname.includes(link.href)
                  ? "text-accent"
                  : "text-text-muted"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1px] bg-text-light transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1px] bg-text-light transition-all duration-300 ${
              isMobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1px] bg-text-light transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu - full screen overlay */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 top-20 bg-black z-40 transition-all duration-500 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 pt-16">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="mobile-link font-display text-[clamp(2rem,8vw,4rem)] text-text-light hover:text-accent transition-colors duration-300"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="pt-8 mobile-link">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
