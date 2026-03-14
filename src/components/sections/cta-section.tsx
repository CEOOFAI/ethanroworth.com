"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function CTASection() {
  const t = useTranslations("home.ctaSection");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      gsap.fromTo(
        ".cta-word",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cta-email",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const titleWords = t("title").split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-32 md:py-48 overflow-hidden"
    >
      <div className="px-6 md:px-16 lg:px-24">
        {/* Massive title - each word on its own line */}
        <div className="mb-16">
          {titleWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className="cta-word block font-display text-[clamp(3rem,10vw,9rem)] leading-[1] text-text-light"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="cta-email max-w-md font-body text-base font-light text-text-muted mb-12" style={prefersReducedMotion ? {} : { opacity: 0 }}>
          {t("description")}
        </p>

        {/* Email as CTA */}
        <a
          href="mailto:hello@ethanroworth.com"
          className="cta-email group inline-block"
          style={prefersReducedMotion ? {} : { opacity: 0 }}
          data-magnetic
        >
          <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-accent group-hover:text-accent-hover transition-colors duration-300">
            hello@ethanroworth.com
          </span>
          <span className="block h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </a>
      </div>
    </section>
  );
}
