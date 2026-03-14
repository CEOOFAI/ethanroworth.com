"use client";

export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Orange blob - top right */}
      <div
        className="aurora-blob absolute w-[600px] h-[600px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #ff4d00 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
          filter: "blur(80px)",
          animation: "aurora-1 12s ease-in-out infinite alternate",
        }}
      />

      {/* Blue blob - bottom left */}
      <div
        className="aurora-blob absolute w-[500px] h-[500px] rounded-full opacity-45"
        style={{
          background: "radial-gradient(circle, #0066ff 0%, transparent 70%)",
          bottom: "-5%",
          left: "-10%",
          filter: "blur(90px)",
          animation: "aurora-2 15s ease-in-out infinite alternate",
        }}
      />

      {/* Orange secondary - center */}
      <div
        className="aurora-blob absolute w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #ff6a2a 0%, transparent 70%)",
          top: "40%",
          left: "30%",
          filter: "blur(100px)",
          animation: "aurora-3 10s ease-in-out infinite alternate",
        }}
      />

      {/* Blue secondary - top left */}
      <div
        className="aurora-blob absolute w-[350px] h-[350px] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, #0066ff 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          filter: "blur(70px)",
          animation: "aurora-4 18s ease-in-out infinite alternate",
        }}
      />

      <style jsx>{`
        @keyframes aurora-1 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-80px, 60px) scale(1.2);
          }
          100% {
            transform: translate(40px, -30px) scale(0.9);
          }
        }
        @keyframes aurora-2 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(60px, -50px) scale(1.3);
          }
          100% {
            transform: translate(-40px, 30px) scale(0.85);
          }
        }
        @keyframes aurora-3 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, -40px) scale(1.15);
          }
          100% {
            transform: translate(70px, 50px) scale(1.1);
          }
        }
        @keyframes aurora-4 {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 30px) scale(1.25);
          }
          100% {
            transform: translate(-30px, -60px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
