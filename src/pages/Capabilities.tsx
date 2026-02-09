import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Shield, Target, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const capabilities = [
  {
    icon: Shield,
    title: "Strategic Advisory",
    description: "Executive-level guidance on complex security and defence challenges.",
    details: [
      "Risk assessment and mitigation strategies",
      "Policy development and implementation",
      "Crisis management frameworks",
      "Regulatory compliance guidance",
    ],
  },
  {
    icon: Target,
    title: "Operational Planning",
    description: "Comprehensive planning for mission-critical operations.",
    details: [
      "Threat analysis and intelligence integration",
      "Resource allocation optimization",
      "Contingency planning and scenario development",
      "Performance metrics and evaluation",
    ],
  },
  {
    icon: Users,
    title: "Organizational Development",
    description: "Building resilient teams and institutional capabilities.",
    details: [
      "Leadership development programs",
      "Training and certification frameworks",
      "Organizational restructuring",
      "Culture transformation initiatives",
    ],
  },
  {
    icon: Zap,
    title: "Technology Integration",
    description: "Leveraging advanced technologies for operational advantage.",
    details: [
      "Systems architecture and design",
      "Digital transformation roadmaps",
      "Cybersecurity posture assessment",
      "Innovation and R&D partnerships",
    ],
  },
];

const CapabilityCard = ({ capability, index }: { capability: typeof capabilities[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = capability.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group bg-card border border-border p-8 md:p-10 transition-all duration-500 hover:border-accent"
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors duration-300">
            {capability.title}
          </h3>
          <p className="text-muted-foreground font-body mb-6">
            {capability.description}
          </p>
          <ul className="space-y-2">
            {capability.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Capabilities = () => {
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
            Core Capabilities
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Expertise built for complex environments
          </motion.h1>

          <motion.div
            className="w-20 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {capabilities.map((capability, index) => (
              <CapabilityCard key={capability.title} capability={capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Capabilities;
