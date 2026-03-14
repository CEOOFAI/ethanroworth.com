"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  duration = 1,
  trigger = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current) return;

      const animation = {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      };

      if (trigger) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 40 },
          {
            ...animation,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(ref.current, { opacity: 0, y: 40 }, animation);
      }
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={prefersReducedMotion ? {} : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
