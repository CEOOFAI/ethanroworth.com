"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  stagger = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 60, x: 0 };
      case "down":
        return { y: -60, x: 0 };
      case "left":
        return { y: 0, x: 60 };
      case "right":
        return { y: 0, x: -60 };
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current) return;

      const pos = getInitialPosition();
      const children = stagger
        ? ref.current.children
        : [ref.current];

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: pos.y,
          x: pos.x,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? {} : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
