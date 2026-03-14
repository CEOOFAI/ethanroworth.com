"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const packages = [
  {
    key: "starter",
    price: "600",
    features: ["fivePages", "responsive", "contactForm", "basicSeo", "analytics", "oneRevision", "oneToTwoWeeks"],
  },
  {
    key: "business",
    price: "1,500",
    popular: true,
    features: ["tenPages", "starterPlus", "cms", "blog", "gmb", "social", "twoRevisions", "twoToThreeWeeks"],
  },
  {
    key: "premium",
    price: "3,000",
    features: ["twentyPages", "businessPlus", "multilingual", "advancedSeo", "ecommerce", "custom", "threeRevisions", "threeToFiveWeeks"],
  },
];

export default function ServicesPage() {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".services-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        ".services-title-word",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        ".services-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Service detail cards
      gsap.fromTo(
        ".service-detail",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
            once: true,
          },
        }
      );

      // Pricing cards
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      // Process steps
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-section",
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
      {/* Hero */}
      <div className="relative bg-black pt-40 pb-24 md:pb-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span
            className="services-label font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("label")}
          </span>

          <h1 className="mb-6">
            {titleWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
                <span
                  className="services-title-word inline-block font-display text-[clamp(3rem,8vw,8rem)] leading-[1] text-text-light"
                  style={prefersReducedMotion ? {} : { opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="services-subtitle max-w-2xl font-body text-base md:text-lg font-light text-text-muted"
            style={prefersReducedMotion ? {} : { opacity: 0 }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Services detail - cream */}
      <div className="bg-cream py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24 services-grid">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {["webDesign", "aiAutomation", "seo"].map((key, i) => (
              <div
                key={key}
                className="service-detail"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                <span className="font-display text-6xl text-accent/15 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-text-dark mb-4">
                  {t(`details.${key}.title`)}
                </h3>
                <p className="font-body text-base font-light text-text-dark-muted leading-relaxed mb-6">
                  {t(`details.${key}.description`)}
                </p>
                <ul className="space-y-2">
                  {["point1", "point2", "point3", "point4"].map((point) => (
                    <li key={point} className="flex items-start gap-2 font-body text-sm text-text-dark-muted">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                      {t(`details.${key}.${point}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing - dark */}
      <div className="pricing-section bg-black py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("pricingLabel")}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-text-light mb-16">
            {t("pricingTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.key}
                className={`pricing-card relative p-8 border ${
                  pkg.popular
                    ? "border-accent bg-accent/[0.03]"
                    : "border-white/[0.08]"
                }`}
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-8 px-3 py-1 bg-accent text-white font-body text-[10px] tracking-[0.15em] uppercase">
                    {t("popular")}
                  </span>
                )}

                <h3 className="font-display text-2xl text-text-light mb-2">
                  {t(`packages.${pkg.key}.name`)}
                </h3>
                <p className="font-body text-sm text-text-muted mb-6">
                  {t(`packages.${pkg.key}.description`)}
                </p>

                <div className="mb-8">
                  <span className="font-display text-4xl text-text-light">&pound;{pkg.price}</span>
                </div>

                <ul className="space-y-3 mb-10">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-body text-sm text-text-muted">
                      <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {t(`features.${feature}`)}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-3 font-body text-sm tracking-[0.1em] uppercase transition-all duration-300 ${
                    pkg.popular
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "border border-white/[0.12] text-text-muted hover:border-accent hover:text-accent"
                  }`}
                  data-magnetic
                >
                  {t("getStarted")}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 font-body text-sm text-text-muted text-center">
            {t("pricingNote")}
          </p>
        </div>
      </div>

      {/* Process - cream */}
      <div className="process-section bg-cream py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24">
          <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-4">
            {t("processLabel")}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-text-dark mb-16">
            {t("processTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["discovery", "design", "build", "launch"].map((step, i) => (
              <div
                key={step}
                className="process-step relative"
                style={prefersReducedMotion ? {} : { opacity: 0 }}
              >
                <span className="font-display text-5xl text-accent/20 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-text-dark mb-3">
                  {t(`process.${step}.title`)}
                </h3>
                <p className="font-body text-sm font-light text-text-dark-muted leading-relaxed">
                  {t(`process.${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black py-24 md:py-32">
        <div className="px-6 md:px-16 lg:px-24 text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-text-light mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="font-body text-base text-text-muted mb-10 max-w-md mx-auto">
            {t("ctaDescription")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-accent text-white font-body text-sm tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors duration-300"
            data-magnetic
          >
            {t("ctaCta")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
