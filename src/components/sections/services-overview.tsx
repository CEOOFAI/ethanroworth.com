"use client";

import { useRef, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  { key: "webDesign", number: "01", price: "£600" },
  { key: "aiAutomation", number: "02", price: "£400" },
  { key: "seo", number: "03", price: "£200" },
];

export default function ServicesOverview() {
  const t = useTranslations("home.services");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !trackRef.current)
        return;

      const track = trackRef.current;
      const cards = track.querySelectorAll(".service-card");

      // Calculate how far we need to scroll horizontally
      // Total track width minus one viewport width (first card is already visible)
      const getScrollDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Horizontal scroll with pin
      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Background number parallax on each card
      cards.forEach((card) => {
        const bgNumber = card.querySelector(".bg-number");
        if (bgNumber) {
          gsap.to(bgNumber, {
            y: -80,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left right",
              end: "right left",
              scrub: 1,
            },
          });
        }
      });

      // Refresh ScrollTrigger after layout settles
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
    >
      {/* Section title - fixed above the scroll */}
      <div className="px-6 md:px-16 lg:px-24 pt-24 md:pt-40 pb-12">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-text-light">
          {t("title")}
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex" style={{ width: "fit-content" }}>
        {services.map((service) => (
          <div
            key={service.key}
            className="service-card relative flex-shrink-0 w-screen h-[70vh] flex items-center"
          >
            {/* Giant background number */}
            <span className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(15rem,30vw,25rem)] text-white/[0.03] select-none pointer-events-none leading-none">
              {service.number}
            </span>

            {/* Card content */}
            <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full">
              <span className="font-body text-sm tracking-[0.2em] uppercase text-accent block mb-6">
                {service.number}
              </span>
              <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-text-light mb-8">
                {t(`${service.key}.title`)}
              </h3>
              <p className="font-body text-base md:text-lg font-light leading-relaxed text-text-muted max-w-lg mb-8">
                {t(`${service.key}.description`)}
              </p>
              <p className="font-body text-sm tracking-[0.1em] uppercase text-accent">
                From {service.price}
              </p>
            </div>

            {/* Right edge accent line */}
            <div className="absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-accent/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
