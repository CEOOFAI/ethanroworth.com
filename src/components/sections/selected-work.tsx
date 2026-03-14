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
    gradient: "from-amber-900/80 via-orange-800/60 to-yellow-900/40",
    accent: "#d4a574",
  },
  {
    slug: "country-of-gibraltar",
    title: "Country of Gibraltar",
    category: "SEO",
    year: "2025",
    tech: "SEO · Multilingual",
    gradient: "from-emerald-900/80 via-green-800/60 to-teal-900/40",
    accent: "#6bcf8e",
  },
  {
    slug: "rent-gibraltar",
    title: "Rent Gibraltar",
    category: "Web Design",
    year: "2025",
    tech: "Next.js · Supabase",
    gradient: "from-blue-900/80 via-indigo-800/60 to-sky-900/40",
    accent: "#7ba7d4",
  },
  {
    slug: "timelock",
    title: "Timelock",
    category: "Web App",
    year: "2026",
    tech: "React · Supabase",
    gradient: "from-violet-900/80 via-purple-800/60 to-fuchsia-900/40",
    accent: "#b87fd4",
  },
];

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

      xTo(x);
      yTo(y);

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
          <div
            className={`w-[350px] h-[250px] rounded-lg overflow-hidden bg-gradient-to-br ${projects[activeProject].gradient} relative`}
          >
            {/* Large number watermark */}
            <span
              className="absolute -top-4 -right-2 font-display text-[10rem] leading-none select-none pointer-events-none"
              style={{ color: projects[activeProject].accent, opacity: 0.12 }}
            >
              {String(activeProject + 1).padStart(2, "0")}
            </span>

            {/* Card content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className="text-xs font-body tracking-[0.2em] uppercase block mb-2"
                style={{ color: projects[activeProject].accent }}
              >
                {projects[activeProject].category}
              </span>
              <h4 className="font-display text-2xl text-white mb-1">
                {projects[activeProject].title}
              </h4>
              <span className="text-xs font-body text-white/50">
                {projects[activeProject].tech}
              </span>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 left-4 w-8 h-8">
              <div
                className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: projects[activeProject].accent }}
              />
              <div
                className="absolute top-0 left-0 h-full w-[2px]"
                style={{ background: projects[activeProject].accent }}
              />
            </div>
          </div>
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
