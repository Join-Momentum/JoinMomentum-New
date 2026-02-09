import { useEffect, useState } from "react";

const HexGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient overlay that follows mouse */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Main hex grid with animation */}
      <svg
        className="absolute inset-0 w-full h-full animate-hex-float"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Animated gradient for the hex strokes */}
          <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)">
              <animate
                attributeName="stop-color"
                values="rgba(59, 130, 246, 0.6); rgba(139, 92, 246, 0.6); rgba(59, 130, 246, 0.6)"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)">
              <animate
                attributeName="stop-color"
                values="rgba(139, 92, 246, 0.4); rgba(236, 72, 153, 0.4); rgba(139, 92, 246, 0.4)"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)">
              <animate
                attributeName="stop-color"
                values="rgba(59, 130, 246, 0.6); rgba(139, 92, 246, 0.6); rgba(59, 130, 246, 0.6)"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="hex-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="hex-pattern"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="url(#hex-gradient)"
              strokeWidth="0.5"
              filter="url(#hex-glow)"
            />
            <path
              d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
              fill="none"
              stroke="url(#hex-gradient)"
              strokeWidth="0.5"
              filter="url(#hex-glow)"
            />
          </pattern>

          {/* Secondary pattern for depth */}
          <pattern
            id="hex-pattern-2"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2.5) rotate(30)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              opacity="0.3"
            />
          </pattern>
        </defs>

        {/* Background layer */}
        <rect
          width="100%"
          height="100%"
          fill="url(#hex-pattern-2)"
          className="opacity-[0.02]"
        />

        {/* Main animated layer */}
        <rect
          width="100%"
          height="100%"
          fill="url(#hex-pattern)"
          className="opacity-[0.08]"
        >
          <animate
            attributeName="opacity"
            values="0.06; 0.1; 0.06"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      {/* Floating particles effect */}
      {/* <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full animate-float-particle"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div> */}

      {/* CSS for custom animations */}
      <style>{`
        @keyframes hex-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.01);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-30px) translateX(10px) scale(1.5);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-50px) translateX(-5px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-30px) translateX(15px) scale(1.2);
            opacity: 0.4;
          }
        }

        .animate-hex-float {
          animation: hex-float 6s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HexGrid;
