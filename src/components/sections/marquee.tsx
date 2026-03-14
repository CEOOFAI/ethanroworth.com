"use client";

const MARQUEE_TEXT = "WEB DESIGN · AI AUTOMATION · SEO · GIBRALTAR · LA LINEA · ";

export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-8 -rotate-1 bg-black border-y border-border-dark">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat text enough times to fill screen + scroll */}
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-[clamp(2rem,4vw,4rem)] text-accent mx-4 shrink-0"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
