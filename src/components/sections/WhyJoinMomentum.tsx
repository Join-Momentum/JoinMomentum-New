import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Crosshair, Layers, Workflow, Lock } from "lucide-react";

const reasons = [
  {
    icon: Crosshair,
    title: "Operational Focus",
    description: "Built for real-world conditions",
  },
  {
    icon: Layers,
    title: "Capability-First Mindset",
    description: "Skills, systems, and structures that endure",
  },
  {
    icon: Workflow,
    title: "Integrated Delivery",
    description: "People, process, and technology treated as one system",
  },
  {
    icon: Lock,
    title: "Professional Discretion",
    description: "Appropriate for sensitive and high-trust environments",
  },
];

const WhyJoinMomentum = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="relative py-20 md:py-32 bg-secondary/30">
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
            Why Join Momentum
          </motion.span>
        </div>

        <motion.h2
          className="text-2xl md:text-4xl font-heading font-bold mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          What sets us apart
        </motion.h2>

        <motion.p
          className="text-muted-foreground font-body leading-relaxed max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We bring a distinct approach to defence and security consulting—grounded in experience,
          focused on outcomes, and designed for complexity.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="group relative p-6 bg-card border border-border transition-all duration-400 hover:border-accent"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              {/* Decorative hex in corner */}
              <div className="absolute -top-3 -right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-accent">
                  <polygon
                    points="20,2 35.59,11 35.59,29 20,38 4.41,29 4.41,11"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mb-5 rounded border border-border bg-secondary/50 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                <reason.icon className="w-5 h-5 text-accent" />
              </div>

              <h3 className="font-heading font-semibold text-base mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {reason.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinMomentum;
