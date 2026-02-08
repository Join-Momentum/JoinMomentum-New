import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    title: "Defence Strategy",
    description: "Force structure analysis, capability development, and strategic planning for defence organizations.",
  },
  {
    title: "Intelligence & Security",
    description: "Threat assessment, intelligence analysis, and security architecture for sensitive environments.",
  },
  {
    title: "Operational Advisory",
    description: "Mission planning, operational readiness, and tactical consulting for complex deployments.",
  },
  {
    title: "Policy & Governance",
    description: "Defence policy development, regulatory compliance, and institutional governance frameworks.",
  },
];

const Capabilities = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="relative py-20 md:py-30 bg-secondary/30">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <motion.div
            className="h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 60 } : {}}
            transition={{ duration: 0.6 }}
          />
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Core Capabilities
          </motion.span>
        </div>

        <motion.h2
          className="text-2xl md:text-4xl font-heading font-bold mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Capability areas built on operational experience
        </motion.h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="group relative p-8 bg-card border border-border transition-colors duration-400 hover:border-accent"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              {/* Hex corner accent */}
              <div className="absolute top-4 right-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-border group-hover:text-accent transition-all duration-600 group-hover:rotate-[60deg]"
                >
                  <polygon
                    points="12,2 22,7 22,17 12,22 2,17 2,7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <span className="font-mono-accent text-xs text-muted-foreground mb-4 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-heading font-semibold mb-3">{cap.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                {cap.description}
              </p>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
