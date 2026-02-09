import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Target, Users, Shield, Rocket } from "lucide-react";
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

const SolutionCard = ({ solution, index }: { solution: typeof solutions[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = solution.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group bg-card border border-border p-8 md:p-10 transition-all duration-500 hover:border-accent"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
          <Icon className="w-7 h-7 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors duration-300">
            {solution.title}
          </h3>
          <p className="text-muted-foreground font-body mb-6">
            {solution.description}
          </p>
          <ul className="space-y-3 mb-4">
            {solution.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          {solution.note && (
            <p className="text-sm text-accent/80 font-mono-accent mt-4 pt-4 border-t border-border/50">
              {solution.note}
            </p>
          )}
        </div>
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
      <section ref={heroRef} className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Solutions
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Structured approaches to complex problems
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From assessment to deployment, we deliver capability that endures.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent mt-8"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard key={solution.title} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Solutions;
