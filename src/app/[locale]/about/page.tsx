"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const timeline = [
  { year: "2024", key: "started" },
  { year: "2025", key: "portfolio" },
  { year: "2025", key: "quit" },
  { year: "2026", key: "freelance" },
];

const skills = [
  { category: "Design", items: ["Figma", "Tailwind CSS", "Responsive Design", "UI/UX"] },
  { category: "Development", items: ["Next.js", "React", "TypeScript", "Supabase"] },
  { category: "Growth", items: ["SEO", "Multilingual Content", "Google Analytics", "Keyword Research"] },
  { category: "AI", items: ["Claude Code", "Workflow Automation", "AI Agents", "Prompt Engineering"] },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".about-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        ".about-title-word",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".about-intro",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Timeline items
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            once: true,
          },
        }
      );

      // Skills grid
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-section",
            start: "top 70%",
            once: true,
          },
        }
      );

      // Values
      gsap.fromTo(
        ".value-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 70%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const titleWords = t("title").split(" ");

  return (
    <section ref={sectionRef}>
      {/* Hero - dark */}
      <div className="relative bg-black pt-40 pb-24 md:pb-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span
            className="about-label font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("label")}
          </span>

          <h1 className="mb-10">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
                <span
                  className="about-title-word inline-block font-display text-[clamp(3rem,8vw,8rem)] leading-[1] text-text-light"
                  style={prefersReducedMotion ? {} : { opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="about-intro grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-5xl" style={prefersReducedMotion ? {} : { opacity: 0 }}>
            <p className="font-body text-lg md:text-xl font-light leading-relaxed text-text-muted">
              {t("intro1")}
            </p>
            <p className="font-body text-lg md:text-xl font-light leading-relaxed text-text-muted">
              {t("intro2")}
            </p>
          </div>
        </div>
      </div>

      {/* Photo + Quote - cream */}
      <div className="bg-cream py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-24 items-center">
            {/* Photo */}
            <div className="md:col-span-2 relative aspect-[3/4] max-w-md bg-cream-dark overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl text-text-dark-muted/20">Photo</span>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-accent" />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-accent" />
              </div>
            </div>

            {/* Quote + details */}
            <div className="md:col-span-3">
              <blockquote className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-text-dark mb-10">
                {t("quote")}
              </blockquote>
              <p className="font-body text-base md:text-lg font-light leading-relaxed text-text-dark-muted mb-8">
                {t("story")}
              </p>
              <p className="font-body text-sm tracking-[0.1em] uppercase text-text-dark-muted">
                {t("stats")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline - dark */}
      <div className="timeline-section bg-black py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("timelineLabel")}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-text-light mb-16">
            {t("timelineTitle")}
          </h2>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item flex gap-8 md:gap-16 py-8 border-b border-white/[0.06]"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                <span className="font-display text-2xl md:text-3xl text-accent shrink-0 w-20">
                  {item.year}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-text-light mb-2">
                    {t(`timeline.${item.key}.title`)}
                  </h3>
                  <p className="font-body text-base font-light text-text-muted max-w-lg">
                    {t(`timeline.${item.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills - cream */}
      <div className="skills-section bg-cream py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("skillsLabel")}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-text-dark mb-16">
            {t("skillsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((group, i) => (
              <div
                key={group.category}
                className="skill-card p-6 border border-black/[0.06]"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                <h3 className="font-display text-lg text-text-dark mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-body text-sm text-text-dark-muted flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values - dark */}
      <div className="values-section bg-black py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("valuesLabel")}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-text-light mb-16">
            {t("valuesTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["craft", "honesty", "speed"].map((value, i) => (
              <div
                key={value}
                className="value-item"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                <span className="font-display text-5xl text-accent/20 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-text-light mb-3">
                  {t(`values.${value}.title`)}
                </h3>
                <p className="font-body text-base font-light text-text-muted leading-relaxed">
                  {t(`values.${value}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24 text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-text-dark mb-8">
            {t("ctaTitle")}
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 font-body text-sm tracking-[0.15em] uppercase text-text-dark hover:text-accent transition-colors duration-300"
            data-magnetic
          >
            {t("ctaCta")}
            <span className="block w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
