"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default hidden

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo for smooth ring following
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      // Dot follows exactly
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      // Ring follows with delay
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    // Magnetic effect — element pulls toward cursor on hover
    const magneticElements = new Map<Element, { moveHandler: (e: MouseEvent) => void; leaveHandler: () => void }>();

    const setupMagnetic = (el: Element) => {
      if (magneticElements.has(el)) return;

      const moveHandler = (e: MouseEvent) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;
        gsap.to(el, { x: deltaX, y: deltaY, duration: 0.3, ease: "power2.out" });
      };

      const leaveHandler = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };

      el.addEventListener("mousemove", moveHandler as EventListener);
      el.addEventListener("mouseleave", leaveHandler);
      magneticElements.set(el, { moveHandler: moveHandler as (e: MouseEvent) => void, leaveHandler });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover effects to interactive elements
    const setupInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], [data-magnetic]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });

      // Magnetic effect only on [data-magnetic] elements
      const magnetics = document.querySelectorAll("[data-magnetic]");
      magnetics.forEach(setupMagnetic);
    };

    setupInteractives();

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(setupInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactives = document.querySelectorAll("a, button, [role='button'], [data-magnetic]");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      magneticElements.forEach(({ moveHandler, leaveHandler }, el) => {
        el.removeEventListener("mousemove", moveHandler as EventListener);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
