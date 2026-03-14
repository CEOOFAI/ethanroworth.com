"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const projects = [
  {
    slug: "faux-garden",
    title: "Faux Garden",
    category: "Web Design",
    year: "2026",
    tech: "Next.js · Tailwind",
    url: "fauxgarden.com",
    accent: "#d4a574",
    bgColor: "#1a1510",
    // Mockup layout: jewellery e-commerce
    mockup: {
      hero: "Handcrafted Jewellery",
      nav: ["Shop", "Collections", "About"],
      blocks: 3,
      style: "ecommerce",
    },
  },
  {
    slug: "country-of-gibraltar",
    title: "Country of Gibraltar",
    category: "SEO",
    year: "2025",
    tech: "SEO · Multilingual",
    url: "countryofgibraltar.com",
    accent: "#6bcf8e",
    bgColor: "#0f1a12",
    mockup: {
      hero: "Discover Gibraltar",
      nav: ["Explore", "Travel", "Live"],
      blocks: 4,
      style: "content",
    },
  },
  {
    slug: "rent-gibraltar",
    title: "Rent Gibraltar",
    category: "Web Design",
    year: "2025",
    tech: "Next.js · Supabase",
    url: "rentgibraltar.com",
    accent: "#7ba7d4",
    bgColor: "#0f141a",
    mockup: {
      hero: "Find Your Home",
      nav: ["Listings", "Areas", "Contact"],
      blocks: 3,
      style: "listings",
    },
  },
  {
    slug: "timelock",
    title: "Timelock",
    category: "Web App",
    year: "2026",
    tech: "React · Supabase",
    url: "timelock.app",
    accent: "#b87fd4",
    bgColor: "#14101a",
    mockup: {
      hero: "Lock In Your Focus",
      nav: ["Dashboard", "Timer", "Stats"],
      blocks: 2,
      style: "app",
    },
  },
];

function BrowserMockup({ project }: { project: typeof projects[number] }) {
  const { accent, bgColor, url, mockup } = project;

  return (
    <div
      className="w-[380px] h-[260px] rounded-lg overflow-hidden shadow-2xl"
      style={{ background: bgColor }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.06] border-b border-white/[0.06]">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-2 px-3 py-1 rounded bg-white/[0.06] text-[10px] font-body text-white/40 truncate">
          {url}
        </div>
      </div>

      {/* Page content mockup */}
      <div className="p-4 space-y-3">
        {/* Nav */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-1.5 rounded-full" style={{ background: accent, opacity: 0.6 }} />
          <div className="flex gap-3">
            {mockup.nav.map((item) => (
              <span key={item} className="text-[8px] font-body text-white/25">{item}</span>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <div className="pt-2 pb-3">
          <div className="font-display text-base text-white/80 leading-tight">{mockup.hero}</div>
          <div className="mt-2 space-y-1">
            <div className="w-3/4 h-1 rounded-full bg-white/10" />
            <div className="w-1/2 h-1 rounded-full bg-white/10" />
          </div>
          <div
            className="mt-3 w-16 h-5 rounded text-[8px] font-body flex items-center justify-center text-white/80"
            style={{ background: `${accent}40`, border: `1px solid ${accent}60` }}
          >
            View
          </div>
        </div>

        {/* Content blocks */}
        <div className="flex gap-2">
          {Array.from({ length: mockup.blocks }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded"
              style={{
                height: mockup.style === "app" ? 60 : 40,
                background: i === 0 ? `${accent}15` : "rgba(255,255,255,0.04)",
                border: i === 0 ? `1px solid ${accent}30` : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="p-2 space-y-1">
                <div className="w-3/4 h-1 rounded-full" style={{ background: i === 0 ? `${accent}40` : "rgba(255,255,255,0.08)" }} />
                <div className="w-1/2 h-1 rounded-full bg-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const t = useTranslations("home.work");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Smooth cursor-following image with rotation based on movement direction
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const xTo = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3.out" });
    const rotateTo = gsap.quickTo(image, "rotation", { duration: 0.6, ease: "power3.out" });

    let prevX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left - 175;
      const y = e.clientY - rect.top - 125;
      mousePos.current = { x: e.clientX, y: e.clientY };

      xTo(x - 15);
      yTo(y - 5);

      // Slight rotation based on horizontal movement
      const deltaX = e.clientX - prevX;
      rotateTo(deltaX * 0.15);
      prevX = e.clientX;
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate image scale on project hover
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (activeProject !== null) {
      gsap.to(image, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(image, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [activeProject]);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      // Section title reveal
      gsap.fromTo(
        ".work-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Each row clips up from below
      const rows = sectionRef.current.querySelectorAll(".work-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // Separator lines grow from left
      const lines = sectionRef.current.querySelectorAll(".work-line");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-40 overflow-hidden"
    >
      {/* Cursor-following preview card */}
      <div
        ref={imageRef}
        className="absolute pointer-events-none z-20 hidden md:block"
        style={{ opacity: 0, transform: "scale(0.8)" }}
      >
        {activeProject !== null && (
          <BrowserMockup project={projects[activeProject]} />
        )}
      </div>

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section title */}
        <div className="work-title mb-20" style={prefersReducedMotion ? {} : { opacity: 0 }}>
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("label")}
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-text-dark">
            {t("title")}
          </h2>
        </div>

        {/* Project list */}
        <div>
          {/* Top line */}
          <div className="work-line h-[1px] bg-text-dark/10 origin-left" style={prefersReducedMotion ? {} : { transform: "scaleX(0)" }} />

          {projects.map((project, i) => (
            <div key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="work-row group block py-10 md:py-14"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left: number + title */}
                  <div className="flex items-center gap-6 md:gap-12 min-w-0">
                    {/* Number */}
                    <span className="font-display text-[clamp(1rem,2vw,1.5rem)] text-text-dark-muted/40 w-10 shrink-0 group-hover:text-accent transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Project name — slides right on hover */}
                    <h3 className="font-display text-[clamp(1.8rem,5vw,4rem)] text-text-dark group-hover:translate-x-3 group-hover:text-accent transition-all duration-500 truncate">
                      {project.title}
                    </h3>
                  </div>

                  {/* Right: meta + arrow */}
                  <div className="flex items-center gap-6 md:gap-10 shrink-0">
                    {/* Year */}
                    <span className="hidden md:block font-body text-xs tracking-[0.1em] text-text-dark-muted/60">
                      {project.year}
                    </span>

                    {/* Category */}
                    <span className="hidden md:block font-body text-xs tracking-[0.1em] uppercase text-text-dark-muted w-24 text-right">
                      {project.category}
                    </span>

                    {/* Arrow — appears on hover */}
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border border-text-dark/10 group-hover:border-accent group-hover:bg-accent transition-all duration-500 overflow-hidden">
                      <svg
                        className="w-3 h-3 text-text-dark-muted group-hover:text-white transition-colors duration-500 group-hover:translate-x-0 -translate-x-4"
                        style={{ transition: "transform 0.5s, color 0.5s" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>

              {/* Separator line */}
              <div
                className="work-line h-[1px] origin-left group-hover:bg-accent transition-colors duration-500"
                style={{
                  background: activeProject === i ? "var(--accent)" : "rgba(0,0,0,0.08)",
                  ...(prefersReducedMotion ? {} : { transform: "scaleX(0)" }),
                }}
              />
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-16">
          <Link
            href="/work"
            className="group inline-flex items-center gap-4 font-body text-sm tracking-[0.15em] uppercase text-text-dark hover:text-accent transition-colors duration-300"
            data-magnetic
          >
            {t("viewAll")}
            <span className="block w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
