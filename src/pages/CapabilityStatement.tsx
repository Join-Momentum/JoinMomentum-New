import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Radio,
  ShieldCheck,
  Radar,
  Cpu,
  ClipboardList,
  GraduationCap,
  Users,
  Rocket,
  Building2,
  Eye,
  Zap,
  Globe,
  Download,
  ArrowRight,
  Search,
  Compass,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const capabilities = [
  {
    icon: Radio,
    title: "Strategic Communications & Information Operations",
    summary:
      "Protecting institutional credibility, countering hostile influence, and strengthening crisis communications in contested information environments.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security & Critical Infrastructure Defence",
    summary:
      "Protecting critical systems through risk assessment, defensive architecture, incident-response readiness, and integrated cyber defence operations.",
  },
  {
    icon: Radar,
    title: "Military Intelligence & Operational Advantage",
    summary:
      "Strengthening intelligence analysis, situational awareness, and decision support to create operational advantage under uncertainty.",
  },
  {
    icon: Cpu,
    title: "Emerging Technology & AI in Defence",
    summary:
      "Responsible adoption of AI and emerging technology — value assessment, tool design, governance, oversight, and accountability.",
  },
];

const solutions = [
  {
    icon: ClipboardList,
    title: "Capability Assessment & Roadmapping",
    summary: "Structured assessment of current capability, risks, and gaps with prioritised roadmap and operating model.",
  },
  {
    icon: GraduationCap,
    title: "Training, Exercises & Capacity Development",
    summary: "Role-based development building lasting institutional capability through leadership training, exercises, and simulation.",
  },
  {
    icon: Users,
    title: "Operational Advisory & Embedded Support",
    summary: "Embedded advisory roles across planning, readiness, intelligence, cyber operations, and crisis environments.",
  },
  {
    icon: Rocket,
    title: "Service Deployment & Programme Delivery",
    summary: "Standing up defined operational capability and programmes, with structured transition to client ownership.",
  },
];

const segments = [
  { icon: Building2, title: "Government & Defence" },
  { icon: Eye, title: "Intelligence & National Security" },
  { icon: Zap, title: "Critical National Infrastructure" },
  { icon: Globe, title: "International & Multilateral Partners" },
];

const methodSteps = [
  { icon: Search, step: "01", title: "Assess", description: "Mission context, threat environment, constraints, and objectives." },
  { icon: Compass, step: "02", title: "Design", description: "Capability roadmap, operating model, and delivery approach." },
  { icon: Rocket, step: "03", title: "Deliver", description: "Advisory support, training, exercises, and operational deployment." },
  { icon: RefreshCw, step: "04", title: "Sustain", description: "Capability transfer, governance rhythms, and continuous improvement." },
];

const differentiators = [
  { title: "Operational Focus", body: "Built for real-world conditions, not abstract models." },
  { title: "Capability-First Mindset", body: "Skills, systems, and structures designed to endure beyond the engagement." },
  { title: "Integrated Delivery", body: "People, process, and technology treated as one system." },
  { title: "Professional Discretion", body: "Appropriate for sensitive, high-trust environments." },
];

const SectionHeader = ({
  label,
  title,
  isVisible,
}: {
  label: string;
  title: string;
  isVisible: boolean;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-6 mb-4">
      <motion.div
        className="h-[1px] bg-accent"
        initial={{ width: 0 }}
        animate={isVisible ? { width: 48 } : {}}
        transition={{ duration: 0.6 }}
      />
      <motion.span
        className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {label}
      </motion.span>
    </div>
    <motion.h2
      className="text-2xl md:text-3xl font-heading font-bold max-w-2xl"
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      {title}
    </motion.h2>
  </div>
);

const CapabilityStatement = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: capRef, isVisible: capVisible } = useScrollReveal(0.1);
  const { ref: solRef, isVisible: solVisible } = useScrollReveal(0.1);
  const { ref: mktRef, isVisible: mktVisible } = useScrollReveal(0.1);
  const { ref: segRef, isVisible: segVisible } = useScrollReveal(0.1);
  const { ref: methRef, isVisible: methVisible } = useScrollReveal(0.1);
  const { ref: diffRef, isVisible: diffVisible } = useScrollReveal(0.1);
  const { ref: factRef, isVisible: factVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Capability Statement
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Join Momentum Inc — Capability Statement
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join Momentum Inc is a defence and security capability partner supporting governments,
            security institutions, and mission-critical organisations operating in complex and
            contested environments.
          </motion.p>

          {/* Download CTA */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <a
              href="/downloads/join-momentum-capability-statement.pdf"
              className="group inline-flex items-center gap-3 px-7 py-3 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-3 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section ref={capRef} className="py-16 md:py-24 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Core Capabilities"
            title="Four interconnected capability domains"
            isVisible={capVisible}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="flex items-start gap-5 p-6 bg-background border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={capVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-11 h-11 border border-border bg-secondary/50 flex items-center justify-center">
                  <cap.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-2 leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {cap.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section ref={solRef} className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Solutions"
            title="How we engage — four delivery models"
            isVisible={solVisible}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                className="flex items-start gap-5 p-6 bg-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={solVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-11 h-11 border border-border bg-secondary/50 flex items-center justify-center">
                  <sol.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-2 leading-snug">
                    {sol.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {sol.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace summary */}
      <section ref={mktRef} className="py-16 md:py-20 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Marketplace"
            title="Packaged programmes"
            isVisible={mktVisible}
          />
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={mktVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              In addition to bespoke engagements, Join Momentum offers a growing Marketplace of
              named, packaged programmes. These are defined programmes with clear scope, logistics,
              and lead-capture available directly to qualified organisations, agencies, and
              government departments.
            </p>
            <div className="p-6 border border-border bg-background">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent block mb-2">
                    Current listing
                  </span>
                  <h3 className="font-heading font-bold text-base">
                    Cyber Threat Intelligence Portfolio Simulation
                  </h3>
                  <p className="font-mono-accent text-xs text-muted-foreground mt-1">
                    for organisations, agencies, and government departments
                  </p>
                </div>
                <Link
                  to="/marketplace"
                  className="group inline-flex items-center gap-2 text-accent font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300 flex-shrink-0"
                >
                  View Marketplace
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section ref={segRef} className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Who We Serve"
            title="Four client segments"
            isVisible={segVisible}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((seg, i) => (
              <motion.div
                key={seg.title}
                className="p-6 bg-card border border-border flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={segVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 border border-border bg-secondary/50 flex items-center justify-center">
                  <seg.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="font-heading font-semibold text-sm leading-snug">
                  {seg.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section ref={methRef} className="py-16 md:py-24 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Method"
            title="Assess · Design · Deliver · Sustain"
            isVisible={methVisible}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="p-6 bg-background border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={methVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <span className="font-mono-accent text-xs text-accent block mb-3">
                  {step.step}
                </span>
                <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section ref={diffRef} className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Why Join Momentum"
            title="What sets us apart"
            isVisible={diffVisible}
          />
          <div className="grid sm:grid-cols-2 gap-5">
            {differentiators.map((diff, i) => (
              <motion.div
                key={diff.title}
                className="p-6 bg-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={diffVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <h3 className="font-heading font-bold text-base mb-2">{diff.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {diff.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section ref={factRef} className="py-16 md:py-20 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            label="Company Information"
            title="Join Momentum Inc"
            isVisible={factVisible}
          />
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={factVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { label: "Legal Name", value: "Join Momentum Inc" },
              { label: "Registration", value: "To confirm" },
              { label: "Jurisdiction", value: "To confirm" },
              { label: "General Enquiries", value: "enquiries@joinmomentum.[tld]" },
              { label: "Marketplace", value: "marketplace@joinmomentum.[tld]" },
              { label: "Security Contact", value: "security@joinmomentum.[tld]" },
            ].map((fact) => (
              <div key={fact.label} className="border-l-2 border-accent pl-5">
                <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                  {fact.label}
                </span>
                <span className="font-heading font-semibold text-sm">{fact.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download / Contact CTAs */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto border border-border p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
              Request a capability discussion
            </h2>
            <p className="text-muted-foreground font-body max-w-md leading-relaxed">
              For confidential discussions regarding capability needs or potential engagements,
              contact us directly. All communications are handled with appropriate discretion.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <a
              href="/downloads/join-momentum-capability-statement.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90"
            >
              Contact us
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CapabilityStatement;
