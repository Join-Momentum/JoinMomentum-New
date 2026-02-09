import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Shield, MapPin } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Operational Realities",
    description: "Not abstract models",
  },
  {
    icon: Shield,
    title: "Governance & Assurance",
    description: "Accountability requirements",
  },
  {
    icon: MapPin,
    title: "Local Context",
    description: "Sovereignty and institutional maturity",
  },
];

const WhoWeAre = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="who-we-are" className="relative py-20 md:py-32 bg-background">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Red accent line + title */}
        <div className="flex items-center gap-6 mb-12">
          <motion.div
            className="h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 60 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Who We Are
          </motion.span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text content */}
          <div className="space-y-8">
            <motion.h2
              className="text-2xl md:text-4xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              At the intersection of{" "}
              <span className="text-accent">strategy, operations, intelligence, cyber defence</span>
              {" "}and emerging technology
            </motion.h2>

            <motion.p
              className="text-muted-foreground font-body leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              We support organisations responsible for national security, public safety, and critical
              infrastructure by helping them move from{" "}
              <span className="text-foreground font-medium">analysis to action</span>—designing and
              supporting capabilities that can be sustained by the people who operate them.
            </motion.p>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              <p className="text-sm font-mono-accent uppercase tracking-wider text-muted-foreground mb-6">
                Our work is shaped by:
              </p>
              <div className="space-y-4">
                {principles.map((principle, i) => (
                  <motion.div
                    key={principle.title}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded border border-border bg-secondary/50 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                      <principle.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm">
                        {principle.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hexagonal visual element */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />

              {/* Rotating hex outlines */}
              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="hex-glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer hexagon - slow rotation */}
                <motion.polygon
                  points="100,10 177.94,55 177.94,145 100,190 22.06,145 22.06,55"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Middle hexagon - accent color with glow */}
                <motion.polygon
                  points="100,30 160.62,62.5 160.62,137.5 100,170 39.38,137.5 39.38,62.5"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  opacity={0.6}
                  filter="url(#hex-glow)"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Inner hexagon - subtle */}
                <motion.polygon
                  points="100,50 143.30,75 143.30,125 100,150 56.70,125 56.70,75"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />

                {/* Static center hexagon */}
                <polygon
                  points="100,70 126,85 126,115 100,130 74,115 74,85"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                  opacity={0.8}
                  filter="url(#hex-glow)"
                />

                {/* Center dot with subtle pulse */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="4"
                  fill="hsl(var(--accent))"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
