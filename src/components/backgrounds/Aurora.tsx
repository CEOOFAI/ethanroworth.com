"use client";

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 77, 0, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Primary aurora band - large sweeping orange */}
      <div
        className="absolute w-[150%] h-[60%]"
        style={{
          background: "linear-gradient(135deg, transparent 20%, rgba(255, 77, 0, 0.4) 40%, rgba(255, 106, 42, 0.25) 55%, transparent 75%)",
          top: "-20%",
          left: "-25%",
          filter: "blur(60px)",
          animation: "aurora-sweep 16s ease-in-out infinite alternate",
        }}
      />

      {/* Secondary aurora band - blue counter-sweep */}
      <div
        className="absolute w-[140%] h-[50%]"
        style={{
          background: "linear-gradient(-135deg, transparent 25%, rgba(0, 102, 255, 0.35) 45%, rgba(14, 94, 165, 0.2) 60%, transparent 80%)",
          bottom: "-15%",
          right: "-20%",
          filter: "blur(70px)",
          animation: "aurora-sweep-reverse 20s ease-in-out infinite alternate",
        }}
      />

      {/* Accent streak - bright orange line */}
      <div
        className="absolute w-[120%] h-[8%]"
        style={{
          background: "linear-gradient(90deg, transparent 10%, rgba(255, 77, 0, 0.5) 30%, rgba(255, 106, 42, 0.6) 50%, rgba(255, 77, 0, 0.3) 70%, transparent 90%)",
          top: "35%",
          left: "-10%",
          filter: "blur(40px)",
          animation: "aurora-streak 12s ease-in-out infinite alternate",
          transformOrigin: "center center",
        }}
      />

      {/* Blue accent streak */}
      <div
        className="absolute w-[100%] h-[6%]"
        style={{
          background: "linear-gradient(90deg, transparent 15%, rgba(0, 102, 255, 0.4) 35%, rgba(0, 102, 255, 0.5) 50%, rgba(0, 102, 255, 0.3) 65%, transparent 85%)",
          bottom: "30%",
          left: "0%",
          filter: "blur(35px)",
          animation: "aurora-streak-blue 14s ease-in-out infinite alternate",
          transformOrigin: "center center",
        }}
      />

      {/* Hot spot - concentrated orange glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 77, 0, 0.5) 0%, rgba(255, 77, 0, 0.15) 40%, transparent 70%)",
          top: "20%",
          right: "15%",
          filter: "blur(50px)",
          animation: "aurora-pulse 8s ease-in-out infinite alternate",
        }}
      />

      {/* Cool spot - concentrated blue glow */}
      <div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 102, 255, 0.45) 0%, rgba(0, 102, 255, 0.1) 40%, transparent 70%)",
          bottom: "25%",
          left: "20%",
          filter: "blur(45px)",
          animation: "aurora-pulse-blue 10s ease-in-out infinite alternate",
        }}
      />

      <style jsx>{`
        @keyframes aurora-sweep {
          0% {
            transform: translate(0, 0) rotate(-5deg) scale(1);
          }
          50% {
            transform: translate(10%, 8%) rotate(3deg) scale(1.1);
          }
          100% {
            transform: translate(-5%, -3%) rotate(-2deg) scale(0.95);
          }
        }
        @keyframes aurora-sweep-reverse {
          0% {
            transform: translate(0, 0) rotate(3deg) scale(1);
          }
          50% {
            transform: translate(-8%, -6%) rotate(-4deg) scale(1.15);
          }
          100% {
            transform: translate(5%, 4%) rotate(2deg) scale(0.9);
          }
        }
        @keyframes aurora-streak {
          0% {
            transform: translateX(0) rotate(-3deg) scaleX(0.8);
            opacity: 0.6;
          }
          50% {
            transform: translateX(5%) rotate(1deg) scaleX(1.2);
            opacity: 1;
          }
          100% {
            transform: translateX(-3%) rotate(-1deg) scaleX(0.9);
            opacity: 0.7;
          }
        }
        @keyframes aurora-streak-blue {
          0% {
            transform: translateX(0) rotate(2deg) scaleX(0.9);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-4%) rotate(-2deg) scaleX(1.15);
            opacity: 0.9;
          }
          100% {
            transform: translateX(3%) rotate(1deg) scaleX(0.85);
            opacity: 0.6;
          }
        }
        @keyframes aurora-pulse {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-30px, 20px) scale(1.3);
            opacity: 1;
          }
          100% {
            transform: translate(20px, -15px) scale(0.9);
            opacity: 0.6;
          }
        }
        @keyframes aurora-pulse-blue {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(25px, -20px) scale(1.25);
            opacity: 0.9;
          }
          100% {
            transform: translate(-15px, 10px) scale(0.85);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
