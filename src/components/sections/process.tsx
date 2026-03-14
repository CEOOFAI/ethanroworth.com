"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const steps = [
  { key: "discovery", number: "01" },
  { key: "design", number: "02" },
  { key: "build", number: "03" },
  { key: "launch", number: "04" },
];

export default function Process() {
  const t = useTranslations("home.process");
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !progressRef.current)
        return;

      // Animate progress line as user scrolls
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Reveal each step
      const stepEls = sectionRef.current.querySelectorAll(".process-step");
      stepEls.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
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
      className="section-light py-[var(--section-padding)] border-t border-light-border"
    >
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="label-text">{t("label")}</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-light-text mt-3">
            {t("title")}
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical progress line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-light-border md:-translate-x-[0.5px]">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full h-full bg-accent origin-top"
            />
          </div>

          {/* Steps */}
          <div className="space-y-20 pl-8 md:pl-0">
            {steps.map((step, i) => (
              <div
                key={step.key}
                className={`process-step relative md:w-1/2 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                {/* Dot on timeline */}
                <div
                  className={`absolute top-2 w-3 h-3 bg-accent rounded-full -left-[22px] md:left-auto ${
                    i % 2 === 0
                      ? "md:-right-[6.5px] md:left-auto"
                      : "md:-left-[6.5px]"
                  }`}
                />

                <span className="font-display text-5xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-bold text-light-text mt-2">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-light-text-muted">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
