import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Search, Compass, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Assess",
    description:
      "Mission context, threat environment, constraints, and objectives",
  },
  {
    number: "02",
    icon: Compass,
    title: "Design",
    description:
      "Capability roadmap, operating model, and delivery approach",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deliver",
    description:
      "Advisory support, training, exercises, and operational deployment",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Sustain",
    description:
      "Capability transfer, governance rhythms, and continuous improvement",
  },
];

const ProcessTimeline = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="relative py-20 md:py-32 bg-background">
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
          className="text-2xl md:text-4xl font-heading font-bold mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Disciplined and adaptable delivery
        </motion.h2>

        <motion.p
          className="text-muted-foreground font-body leading-relaxed max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Our delivery model allows us to operate across diverse security, political, and
          institutional environments.
        </motion.p>

        {/* Desktop: horizontal / Mobile: vertical */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="hidden md:block absolute top-8 left-0 h-[1px] bg-gradient-to-r from-accent via-accent to-accent/20"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="md:hidden absolute top-0 left-6 w-[1px] bg-gradient-to-b from-accent via-accent to-accent/20"
            initial={{ height: 0 }}
            animate={isVisible ? { height: "100%" } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pl-16 md:pl-0 md:pt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
              >
                {/* Circle node with icon */}
                <div className="absolute md:top-0 md:left-1/2 md:-translate-x-1/2 left-0 top-0 w-14 h-14 rounded-full border-2 border-accent bg-background flex items-center justify-center shadow-lg shadow-accent/10">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>

                {/* Step number */}
                <span className="font-mono-accent text-xs text-accent mb-2 block">
                  {step.number}
                </span>

                <h3 className="font-heading font-semibold text-xl mb-3">{step.title}</h3>
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
