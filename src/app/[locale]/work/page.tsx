"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const projects = [
  {
    title: "Faux Garden",
    category: "Web Design",
    year: "2026",
    url: "fauxgarden.com",
    description: "E-commerce jewellery store with a warm, artisanal feel. Built with Next.js and Tailwind CSS.",
    accent: "#d4a574",
  },
  {
    title: "Country of Gibraltar",
    category: "SEO",
    year: "2025",
    url: "countryofgibraltar.com",
    description: "Multilingual tourism and information site for Gibraltar. Ranking for competitive travel keywords.",
    accent: "#6bcf8e",
  },
  {
    title: "Rent Gibraltar",
    category: "Web Design",
    year: "2025",
    url: "rentgibraltar.com",
    description: "Rental listings platform built with Next.js and Supabase. Real-time property data.",
    accent: "#7ba7d4",
  },
  {
    title: "Timelock",
    category: "Web App",
    year: "2026",
    url: "timelock.app",
    description: "Focus and productivity web app. Built with React and Supabase for real-time data.",
    accent: "#b87fd4",
  },
  {
    title: "Gibraltar Gyms",
    category: "SEO",
    year: "2025",
    url: "gibraltargyms.com",
    description: "Local fitness directory ranking for gym-related searches in Gibraltar.",
    accent: "#e05555",
  },
  {
    title: "Things to Do Gibraltar",
    category: "SEO",
    year: "2025",
    url: "thingstodogibraltar.com",
    description: "Tourism content site capturing activity and attraction searches for visitors.",
    accent: "#55b8e0",
  },
  {
    title: "Gibraltar Relocation",
    category: "SEO",
    year: "2025",
    url: "gibraltarrelocation.com",
    description: "Relocation guide targeting expats and businesses moving to Gibraltar.",
    accent: "#e0a855",
  },
  {
    title: "Buy Property Gibraltar",
    category: "SEO",
    year: "2025",
    url: "buypropertygibraltar.com",
    description: "Real estate content site targeting property buyers in the Gibraltar market.",
    accent: "#55e0a8",
  },
];

const categories = ["All", "Web Design", "SEO", "Web App"];

export default function WorkPage() {
  const t = useTranslations("work");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".work-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        ".work-page-title-word",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".work-filters",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        ".work-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      );
    },
    { scope: sectionRef }
  );

  const titleWords = t("title").split(" ");

  return (
    <section ref={sectionRef} className="relative bg-black min-h-screen pt-40 pb-24 md:pb-40">
      <div className="px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span
            className="work-label font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("label")}
          </span>

          <h1 className="mb-6">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
                <span
                  className="work-page-title-word inline-block font-display text-[clamp(3rem,8vw,8rem)] leading-[1] text-text-light"
                  style={prefersReducedMotion ? {} : { opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Filters */}
        <div
          className="work-filters flex flex-wrap gap-3 mb-16"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-accent text-white"
                  : "border border-white/[0.12] text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <a
              key={project.url}
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="work-card group block overflow-hidden"
              style={prefersReducedMotion ? {} : { opacity: 0 }}
            >
              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03] border border-white/[0.06]">
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 mx-2 px-2 py-0.5 rounded bg-white/[0.06] text-[9px] font-body text-white/40 truncate">
                    {project.url}
                  </div>
                </div>

                <img
                  src={`https://image.thum.io/get/width/800/crop/500/https://${project.url}`}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="font-body text-sm tracking-[0.15em] uppercase text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Visit Site
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between mt-4 mb-1">
                <h3 className="font-display text-xl text-text-light group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="font-body text-xs tracking-[0.1em] uppercase text-text-muted">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-body text-sm text-text-muted max-w-sm">
                  {project.description}
                </p>
                <span
                  className="font-body text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border"
                  style={{ color: project.accent, borderColor: `${project.accent}40` }}
                >
                  {project.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
