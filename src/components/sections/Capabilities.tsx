import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowUpRight, ArrowRight, Radio, ShieldCheck, Radar, Cpu } from "lucide-react";

const capabilities = [
  {
    icon: Radio,
    title: "Strategic Communications & Information Operations",
    description:
      "Designing and executing communications strategies that shape narratives, counter disinformation, and support operational objectives in contested information environments.",
    path: "/capabilities/strategic-communications-information-operations",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security & Critical Infrastructure Defence",
    description:
      "Protecting essential systems and networks through threat assessment, security architecture, incident response planning, and resilience frameworks for critical national infrastructure.",
    path: "/capabilities/cyber-security-critical-infrastructure-defence",
  },
  {
    icon: Radar,
    title: "Military Intelligence & Operational Advantage",
    description:
      "Enhancing intelligence collection, analysis, and dissemination capabilities to provide decision advantage and support mission success across operational domains.",
    path: "/capabilities/military-intelligence-operational-advantage",
  },
  {
    icon: Cpu,
    title: "Emerging Technology & Artificial Intelligence in Defence",
    description:
      "Integrating AI, autonomous systems, and emerging technologies into defence and security operations with appropriate governance, ethics, and human oversight.",
    path: "/capabilities/emerging-technology-ai-in-defence",
  },
];

const Capabilities = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="capabilities" className="relative py-20 md:py-32 bg-secondary/30">
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
            Core Capability Areas
          </motion.span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Specialist capabilities for defence and security environments
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/capabilities"
              className="group inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              View Capabilities
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <Link
                to={cap.path}
                className="group relative p-8 bg-card border border-border transition-all duration-400 hover:border-accent hover:bg-card/80 block"
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded border border-border bg-secondary/50 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                    <cap.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-mono-accent text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Hex corner accent */}
                <div className="absolute top-4 right-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-border group-hover:text-accent transition-all duration-600 group-hover:rotate-[60deg]"
                  >
                    <polygon
                      points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <h3 className="text-lg md:text-xl font-heading font-semibold mb-3 pr-8 leading-tight">
                  {cap.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {cap.description}
                </p>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
