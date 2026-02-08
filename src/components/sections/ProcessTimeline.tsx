import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  { number: "01", title: "Assess", description: "Comprehensive analysis of the operational environment and threat landscape." },
  { number: "02", title: "Strategize", description: "Development of tailored strategies aligned with mission objectives." },
  { number: "03", title: "Execute", description: "Precision implementation with embedded advisory support." },
  { number: "04", title: "Sustain", description: "Ongoing evaluation, adaptation, and capability reinforcement." },
];

const ProcessTimeline = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="relative py-20 md:py-30 bg-background">
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
            How We Work
          </motion.span>
        </div>

        <motion.h2
          className="text-2xl md:text-4xl font-heading font-bold mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A deliberate approach to complex challenges
        </motion.h2>

        {/* Desktop: horizontal / Mobile: vertical */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="hidden md:block absolute top-6 left-0 h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="md:hidden absolute top-0 left-6 w-[1px] bg-accent"
            initial={{ height: 0 }}
            animate={isVisible ? { height: "100%" } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pl-14 md:pl-0 md:pt-14"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }}
              >
                {/* Circle node */}
                <div className="absolute md:top-0 md:left-1/2 md:-translate-x-1/2 left-0 top-1 w-12 h-12 rounded-full border border-accent bg-background flex items-center justify-center">
                  <span className="font-mono-accent text-xs text-accent">{step.number}</span>
                </div>

                <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
