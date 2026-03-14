"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const projects = [
  {
    slug: "faux-garden",
    title: "Faux Garden",
    category: "Web Design",
    color: "#2a1f14",
  },
  {
    slug: "country-of-gibraltar",
    title: "Country of Gibraltar",
    category: "SEO",
    color: "#1a2d1a",
  },
  {
    slug: "rent-gibraltar",
    title: "Rent Gibraltar",
    category: "Web Design",
    color: "#1a2d4a",
  },
  {
    slug: "timelock",
    title: "Timelock",
    category: "Web App",
    color: "#2d1a4a",
  },
];

export default function SelectedWork() {
  const t = useTranslations("home.work");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const xTo = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (activeProject === null) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      xTo(e.clientX - rect.left - 150);
      yTo(e.clientY - rect.top - 100);
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, [activeProject]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".work-row",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-40 overflow-hidden"
    >
      {/* Cursor-following image */}
      <div
        ref={imageRef}
        className="absolute w-[300px] h-[200px] pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: activeProject !== null ? 1 : 0,
          backgroundColor: activeProject !== null ? projects[activeProject].color : "transparent",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-display text-xl text-white/30">
            {activeProject !== null ? projects[activeProject].title : ""}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section title */}
        <div className="mb-20">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-text-dark">
            {t("title")}
          </h2>
        </div>

        {/* Project list */}
        <div className="border-t border-border-light">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="work-row group block border-b border-border-light py-8 md:py-10 transition-colors duration-300 hover:bg-cream-dark/50"
              style={prefersReducedMotion ? {} : { opacity: 0 }}
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-8 md:gap-16">
                  {/* Number */}
                  <span className="font-body text-sm text-text-dark-muted font-light w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Project name */}
                  <h3 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] text-text-dark group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Category */}
                <span className="hidden md:block font-body text-sm tracking-[0.1em] uppercase text-text-dark-muted">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-4 font-body text-sm tracking-[0.15em] uppercase text-text-dark hover:text-accent transition-colors duration-300"
          >
            {t("viewAll")}
            <span className="block w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
