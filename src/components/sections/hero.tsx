"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { heroPreset } from "@/components/backgrounds/HyperspeedPresets";
import Aurora from "@/components/backgrounds/Aurora";

const Hyperspeed = dynamic(
  () => import("@/components/backgrounds/Hyperspeed"),
  { ssr: false }
);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(check);
  }, []);
  return isMobile;
}

function AnimatedName({ name }: { name: string }) {
  return (
    <span className="inline-block overflow-hidden">
      {name.split("").map((char, i) => (
        <span
          key={i}
          className="hero-char inline-block"
          style={prefersReducedMotion ? {} : { opacity: 0, transform: "translateY(100%)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const isMobile = useIsMobile();

  // Live clock - Gibraltar time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const gibraltarTime = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Gibraltar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(gibraltarTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Characters clip in from bottom with stagger
      tl.to(".hero-char", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power4.out",
      });

      // Title line fades in
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      // Subtitle
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // CTA
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Bottom bar
      tl.fromTo(
        ".hero-bottom",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      // Horizontal line grows from center
      tl.fromTo(
        ".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.8"
      );

      // Scroll parallax — hero content fades and scales as you scroll away
      gsap.to(".hero-content", {
        y: -80,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between bg-black overflow-hidden"
    >
      {/* Desktop: Hyperspeed | Mobile: Aurora */}
      {!isMobile ? (
        <div className="absolute inset-0 z-0 opacity-60">
          <Hyperspeed effectOptions={heroPreset} />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          <Aurora />
        </div>
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/60" />

      {/* Main content - left aligned */}
      <div className="hero-content relative z-10 flex-1 flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-16">
        <div className="max-w-[90vw]">
          {/* Name - massive serif */}
          <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] tracking-[-0.03em] text-text-light">
            <AnimatedName name={t("name")} />
          </h1>

          {/* Title */}
          <p
            className="hero-title mt-6 font-body text-[clamp(0.875rem,1.5vw,1.125rem)] font-light tracking-[0.2em] uppercase text-accent"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("title")}
          </p>

          {/* Subtitle */}
          <p
            className="hero-subtitle mt-8 max-w-lg text-base md:text-lg font-light leading-relaxed text-text-muted"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("subtitle")}
          </p>

          {/* CTA */}
          <Link
            href="/work"
            className="hero-cta group inline-flex items-center gap-4 mt-10 text-sm font-medium tracking-[0.15em] uppercase text-text-light hover:text-accent transition-colors duration-300"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("cta")}
            <span className="block w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom relative z-10 px-6 md:px-16 lg:px-24 pb-8" style={prefersReducedMotion ? {} : { opacity: 0 }}>
        {/* Horizontal accent line */}
        <div className="hero-line h-[1px] bg-accent mb-8 origin-center" style={prefersReducedMotion ? {} : { transform: "scaleX(0)" }} />

        <div className="flex items-center justify-between text-xs font-body tracking-[0.15em] uppercase text-text-muted">
          {/* Location + time */}
          <span>Gibraltar — {time}</span>

          {/* Scroll indicator */}
          <span className="flex items-center gap-3">
            {t("scroll")}
            <span className="block w-[1px] h-6 bg-accent animate-pulse" />
          </span>
        </div>
      </div>
    </section>
  );
}
