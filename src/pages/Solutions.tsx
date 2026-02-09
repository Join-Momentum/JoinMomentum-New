import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Users, Shield, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const solutions = [
  {
    icon: Target,
    title: "Capability Assessment & Roadmapping",
    description: "Structured assessment of current capability, risks, and gaps, resulting in:",
    details: [
      "Clear problem definition",
      "Prioritised capability roadmap",
      "Operating and governance model",
      "Near-term and long-term recommendations",
    ],
  },
  {
    icon: Users,
    title: "Training, Exercises & Capacity Development",
    description: "Role-based capability development through:",
    details: [
      "Leadership and operator training",
      "Tabletop and scenario-based exercises",
      "Simulation-supported learning",
      "Evaluation and progression frameworks",
    ],
    note: "The focus is on building lasting institutional capability, not one-off training events.",
  },
  {
    icon: Shield,
    title: "Operational Advisory & Embedded Support",
    description: "Advisory and embedded roles supporting:",
    details: [
      "Planning and readiness cycles",
      "Intelligence and cyber operations",
      "Programme delivery and coordination",
      "Crisis and high-pressure environments",
    ],
  },
  {
    icon: Rocket,
    title: "Service Deployment & Programme Delivery",
    description: "Where required, we support:",
    details: [
      "Stand-up of defined operational capability",
      "Delivery of security services and programmes",
      "Integration with existing teams and partners",
      "Transition to client ownership and sustainment",
    ],
  },
];

const SolutionSection = ({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const Icon = solution.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Connecting line */}
      {index < solutions.length - 1 && (
        <div className="absolute left-6 md:left-1/2 top-20 bottom-0 w-px bg-gradient-to-b from-accent/50 to-border md:-translate-x-1/2" />
      )}

      <div
        className={`grid md:grid-cols-2 gap-8 md:gap-16 items-start ${
          isEven ? "" : "md:direction-rtl"
        }`}
      >
        {/* Number & Icon Side */}
        <motion.div
          className={`flex items-start gap-6 ${isEven ? "md:justify-end" : "md:justify-start md:direction-ltr"}`}
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-accent bg-background flex items-center justify-center relative z-10">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <span className="font-mono-accent text-xs text-accent mt-3">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className={`max-w-sm ${isEven ? "md:text-right" : "md:text-left"}`}>
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">
              {solution.title}
            </h3>
            <p className="text-muted-foreground font-body">
              {solution.description}
            </p>
          </div>
        </motion.div>

        {/* Details Side */}
        <motion.div
          className={`pl-[4.5rem] md:pl-0 ${isEven ? "" : "md:direction-ltr"}`}
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-card border border-border p-6 md:p-8 hover:border-accent/50 transition-colors duration-300">
            <ul className="space-y-4">
              {solution.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-foreground/90 font-body">{detail}</span>
                </li>
              ))}
            </ul>

            {solution.note && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-accent font-medium italic">
                  {solution.note}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Solutions = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Solutions
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Structured approaches to complex problems
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From assessment to deployment, we deliver capability that endures.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent mt-8 mx-auto"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </section>

      {/* Solutions Timeline */}
      <section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto space-y-16 md:space-y-24">
          {solutions.map((solution, index) => (
            <SolutionSection key={solution.title} solution={solution} index={index} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Solutions;
