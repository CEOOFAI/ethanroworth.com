"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function AboutSnippet() {
  const t = useTranslations("home.about");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      // Word-by-word reveal on the pull quote
      const words = sectionRef.current.querySelectorAll(".quote-word");
      gsap.fromTo(
        words,
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Right side content fade in
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const quoteText = t("quote");
  const quoteWords = quoteText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 md:py-40 overflow-hidden"
    >
      <div className="px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-24 items-start">
          {/* Left - Pull quote */}
          <div className="md:col-span-2">
            <p className="font-display text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.15] text-text-dark">
              {quoteWords.map((word, i) => (
                <span key={i} className="quote-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Right - Content */}
          <div className="about-content md:col-span-3" style={prefersReducedMotion ? {} : { opacity: 0 }}>
            <p className="font-body text-base md:text-lg font-light leading-relaxed text-text-dark-muted">
              {t("description")}
            </p>

            {/* Stats as flowing text */}
            <p className="mt-10 font-body text-sm tracking-[0.1em] uppercase text-text-dark-muted">
              16+ sites built · Bilingual (EN/ES) · Gibraltar & La Linea
            </p>

            {/* Photo placeholder */}
            <div className="mt-12 relative aspect-[3/4] max-w-sm bg-cream-dark overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl text-text-dark-muted/20">Photo</span>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-accent" />
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-accent" />
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-4 mt-10 font-body text-sm tracking-[0.15em] uppercase text-text-dark hover:text-accent transition-colors duration-300"
            >
              {t("link")}
              <span className="block w-8 h-[1px] bg-accent group-hover:w-16 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
