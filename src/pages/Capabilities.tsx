import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Radio, ShieldCheck, Radar, Cpu, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const capabilities = [
  {
    icon: Radio,
    title: "Strategic Communications & Information Operations",
    description:
      "We support organisations operating in contested information environments to:",
    details: [
      "Protect institutional credibility and public trust",
      "Counter misinformation, disinformation, and hostile influence",
      "Align strategic communications with security objectives",
      "Strengthen crisis and high-pressure communications capability",
    ],
    outcomes: [
      "Improved narrative control",
      "Reduced influence risk",
      "Stronger internal and external resilience",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security & Critical Infrastructure Defence",
    description:
      "We help protect systems where disruption carries national, operational, or strategic risk. Our work includes:",
    details: [
      "Cyber risk and resilience assessment",
      "Defensive architecture and control design",
      "Incident response readiness and exercises",
      "Integration of cyber defence into wider security operations",
    ],
    outcomes: [
      "Reduced operational disruption",
      "Faster detection and response",
      "Improved governance and resilience",
    ],
  },
  {
    icon: Radar,
    title: "Military Intelligence & Operational Advantage",
    description:
      "We support intelligence and operational teams to improve decision-making under uncertainty. Focus areas include:",
    details: [
      "Intelligence analysis and fusion processes",
      "Situational awareness and decision support",
      "Leadership capability in complex environments",
      "Translating intelligence into operational advantage",
    ],
    outcomes: [
      "Faster, better-informed decisions",
      "Improved coordination across functions",
      "Enhanced operational effectiveness",
    ],
  },
  {
    icon: Cpu,
    title: "Emerging Technology & Artificial Intelligence in Defence",
    description:
      "We support responsible adoption of emerging technologies where mission risk is high. This includes:",
    details: [
      "Assessing operational value of AI and automation",
      "Designing decision-support and analytic tools",
      "Integrating technology into existing command and governance structures",
      "Establishing safeguards, oversight, and accountability",
    ],
    outcomes: [
      "Enhanced insight and speed without loss of control",
      "Reduced technology and deployment risk",
      "Sustainable, mission-aligned capability",
    ],
  },
];

const CapabilityCard = ({
  capability,
  index,
}: {
  capability: (typeof capabilities)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const Icon = capability.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-card border border-border p-8 md:p-10 transition-all duration-500 hover:border-accent"
    >
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-accent/30 bg-accent/5 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <span className="font-mono-accent text-xs text-muted-foreground block mb-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight group-hover:text-accent transition-colors duration-300">
            {capability.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground font-body mb-6 leading-relaxed">
        {capability.description}
      </p>

      {/* Details */}
      <ul className="space-y-3 mb-8">
        {capability.details.map((detail, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-foreground/90"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {/* Outcomes */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-mono-accent text-xs uppercase tracking-wider text-accent mb-4">
          Outcomes
        </h4>
        <ul className="space-y-2">
          {capability.outcomes.map((outcome, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
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
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Capabilities
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Defence and security capability across four interconnected domains
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Each domain can be engaged independently or as part of a broader security programme.
          </motion.p>

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
              <CapabilityCard
                key={capability.title}
                capability={capability}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Capabilities;
