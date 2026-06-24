import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Monitor,
  MapPin,
  CheckCircle2,
  Search,
  Compass,
  Rocket,
  RefreshCw,
  Lock,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import RequestDetailedInfoForm from "@/components/forms/RequestDetailedInfoForm";
import HexGrid from "@/components/HexGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SLUG = "cyber-threat-intelligence-portfolio-simulation";

const scrollToForm = () => {
  document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ─── Section header helper ────────────────────────────────────────────────────

const SectionEyebrow = ({
  label,
  isVisible,
  delay = 0.2,
}: {
  label: string;
  isVisible: boolean;
  delay?: number;
}) => (
  <div className="flex items-center gap-6 mb-8">
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
      transition={{ delay, duration: 0.5 }}
    >
      {label}
    </motion.span>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const MarketplaceCTIPS = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);
  const { ref: whatRef, isVisible: whatVisible } = useScrollReveal(0.1);
  const { ref: coversRef, isVisible: coversVisible } = useScrollReveal(0.1);
  const { ref: whoRef, isVisible: whoVisible } = useScrollReveal(0.1);
  const { ref: deliveryRef, isVisible: deliveryVisible } = useScrollReveal(0.1);
  const { ref: deliverablesRef, isVisible: deliverablesVisible } = useScrollReveal(0.1);
  const { ref: outcomesRef, isVisible: outcomesVisible } = useScrollReveal(0.1);
  const { ref: howRef, isVisible: howVisible } = useScrollReveal(0.1);
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollReveal(0.1);
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal(0.1);
  const { ref: confidRef, isVisible: confidVisible } = useScrollReveal(0.1);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.05);
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-end pb-16 md:pb-24 overflow-hidden bg-background"
      >
        <HexGrid />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[
              { label: "Home", path: "/" },
              { label: "Marketplace", path: "/marketplace" },
              { label: "Cyber Threat Intelligence Portfolio Simulation", path: null },
            ].map((crumb, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-border flex-shrink-0" />
                )}
              </span>
            ))}
          </motion.nav>

          {/* Eyebrow tags */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent font-mono-accent text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="w-3 h-3 text-accent" />
              Cyber Security & Critical Infrastructure Defence
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground">
              Marketplace
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4 max-w-4xl leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Cyber Threat Intelligence Portfolio Simulation
          </motion.h1>

          <motion.p
            className="font-mono-accent text-sm text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            for organisations, agencies, and government departments
          </motion.p>

          <motion.p
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            A portfolio of intelligence-led cyber simulations that test how your organisation
            detects, decides, and responds under realistic threat conditions.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90 hover:gap-4"
            >
              Request detailed information
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Ask to be contacted
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. What it is ────────────────────────────────────────────────────── */}
      <section
        ref={whatRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <SectionEyebrow label="What it is" isVisible={whatVisible} />
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={whatVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="font-body text-lg text-foreground/90 leading-relaxed">
                  The Cyber Threat Intelligence Portfolio Simulation puts your people, processes,
                  and technology through realistic, intelligence-led scenarios modelled on the
                  threats your organisation actually faces. Rather than abstract tests, each
                  scenario is built from current adversary behaviours relevant to your sector and
                  threat profile, then run as a controlled exercise that reveals how your teams
                  detect, decide, coordinate, and respond under pressure.
                </p>
                <p className="font-body text-lg text-foreground/90 leading-relaxed">
                  It is delivered as a portfolio: a structured set of scenarios you can select and
                  combine — from executive decision-making to technical response and full
                  cross-functional crisis handling. The objective is not to "pass". It is to surface
                  the gaps that matter before an adversary does, and to leave the organisation with
                  a clear, prioritised path to greater resilience.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={whatVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Key messages
              </h3>
              {[
                "Intelligence-led, not generic",
                "A portfolio, not a single test",
                "Tests the whole response — people, process, technology",
                "Leaves capability behind",
                "Flexible delivery",
                "Discreet by default",
              ].map((msg, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{msg}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. What the portfolio covers ─────────────────────────────────────── */}
      <section ref={coversRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="Portfolio" isVisible={coversVisible} />
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={coversVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What the portfolio covers
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body mb-12 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={coversVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Select individual scenarios or combine them into a full programme.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {[
              {
                number: "01",
                title: "Executive & Board Tabletop",
                body: "Strategic decision-making, escalation, and accountability under a live incident — designed for executive and board audiences.",
              },
              {
                number: "02",
                title: "Technical & SOC Simulation",
                body: "Detection, triage, escalation, containment, and recovery against realistic adversary tradecraft at the technical and SOC level.",
              },
              {
                number: "03",
                title: "Cross-Functional Crisis Exercise",
                body: "Security, IT, communications, legal, and operations working a coordinated response to a live incident scenario.",
              },
              {
                number: "04",
                title: "Crisis Communications Under Pressure",
                body: "Internal and external messaging, stakeholder and (where relevant) public-facing communication during an active incident.",
              },
              {
                number: "05",
                title: "Sector-Specific Scenarios",
                body: "Tailored to critical infrastructure, financial services, government, or other operating contexts with sector-relevant threat intelligence.",
              },
              {
                number: "06",
                title: "Intelligence-Led Scenario Design",
                body: "The foundation of the entire portfolio — every scenario is grounded in current, relevant adversary behaviours, not off-the-shelf templates.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                className="bg-background p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={coversVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              >
                <span className="font-mono-accent text-xs text-accent block mb-4">
                  {item.number}
                </span>
                <h3 className="font-heading font-bold text-base mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Who it is for ─────────────────────────────────────────────────── */}
      <section
        ref={whoRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionEyebrow label="Audience" isVisible={whoVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={whoVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Who it is for
              </motion.h2>

              <div className="space-y-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Organisations",
                    body: "Critical national infrastructure operators and strategic enterprises — energy, telecommunications, finance, transport, health — and large corporates with material cyber risk.",
                  },
                  {
                    icon: Users,
                    title: "Agencies",
                    body: "Security, intelligence, law-enforcement, and regulatory bodies with operational cyber exposure or programme oversight responsibilities.",
                  },
                  {
                    icon: Monitor,
                    title: "Government Departments",
                    body: "Ministries and departments with security, resilience, or technology mandates, including those responsible for critical national infrastructure policy.",
                  },
                ].map((seg, i) => (
                  <motion.div
                    key={seg.title}
                    className="flex items-start gap-5"
                    initial={{ opacity: 0, x: -16 }}
                    animate={whoVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  >
                    <div className="flex-shrink-0 w-11 h-11 border border-border bg-secondary/50 flex items-center justify-center">
                      <seg.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-base mb-1">{seg.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {seg.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Buyer roles
              </h3>
              <div className="space-y-3">
                {[
                  "CISOs and Heads of Security / Resilience",
                  "SOC leadership and technical leads",
                  "CIOs and CTOs",
                  "Heads of Risk and Compliance",
                  "Permanent Secretaries, DGs and their advisors",
                  "Resilience and continuity leads",
                  "Executive and board audiences seeking assurance",
                ].map((role, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/50">
                    <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-body text-sm text-foreground/80">{role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Delivery & logistics ───────────────────────────────────────────── */}
      <section ref={deliveryRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="Delivery" isVisible={deliveryVisible} />
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={deliveryVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Delivery & logistics
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body mb-12 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={deliveryVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Delivered in the format that fits your people, security posture, and operating
            constraints.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Monitor,
                title: "Online",
                body: "Facilitated remotely for distributed teams, rapid scheduling, and clients where travel is not feasible.",
              },
              {
                icon: Users,
                title: "In-person",
                body: "Facilitated at your premises for immersive, high-fidelity exercises that replicate real operational conditions.",
              },
              {
                icon: MapPin,
                title: "Location-specific",
                body: "Delivered at a controlled or neutral venue where security, sovereignty, or operational requirements demand it.",
              },
            ].map((mode, i) => (
              <motion.div
                key={mode.title}
                className="p-8 bg-card border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={deliveryVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <div className="w-12 h-12 border border-border bg-secondary/50 flex items-center justify-center mb-5">
                  <mode.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-base mb-3">{mode.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {mode.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-6 border border-accent/20 bg-accent/5"
            initial={{ opacity: 0, y: 16 }}
            animate={deliveryVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Duration and scale are tailored, from a half-day executive session to a multi-day
              cross-functional programme.{" "}
              <button
                onClick={scrollToForm}
                className="text-accent hover:underline font-medium"
              >
                Request detailed information for a specific proposal.
              </button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. What you get ──────────────────────────────────────────────────── */}
      <section
        ref={deliverablesRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionEyebrow label="Deliverables" isVisible={deliverablesVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={deliverablesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                What you get
              </motion.h2>
              <div className="space-y-5">
                {[
                  "A scenario portfolio tailored to your threat profile and chosen delivery mode.",
                  "A facilitated, controlled exercise run by Join Momentum practitioners.",
                  "An after-action report: findings, observed strengths, and gaps.",
                  "A prioritised remediation and capability-improvement roadmap.",
                  "An executive-level assurance summary suitable for the board.",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    animate={deliverablesVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-foreground/90 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── 7. Outcomes ── */}
            <div ref={outcomesRef}>
              <SectionEyebrow label="Outcomes" isVisible={outcomesVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={outcomesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                What changes
              </motion.h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Validated readiness",
                    body: "Detection, decision-making, and response tested and evidenced under realistic conditions.",
                  },
                  {
                    title: "Prioritised gaps",
                    body: "Exposed and ranked across people, process, and technology — with a clear roadmap to close them.",
                  },
                  {
                    title: "Improved coordination",
                    body: "Cross-functional teams that have worked a scenario together respond faster and more effectively in a real incident.",
                  },
                  {
                    title: "Board-level assurance",
                    body: "A measurable baseline of readiness and an executive summary that satisfies governance and oversight requirements.",
                  },
                ].map((outcome, i) => (
                  <motion.div
                    key={outcome.title}
                    className="p-5 bg-background border border-border"
                    initial={{ opacity: 0, y: 16 }}
                    animate={outcomesVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <h3 className="font-heading font-semibold text-sm mb-1">{outcome.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {outcome.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. How it works ──────────────────────────────────────────────────── */}
      <section ref={howRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="Process" isVisible={howVisible} />
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={howVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How it works
          </motion.h2>

          <div className="relative">
            {/* Connecting line */}
            <motion.div
              className="hidden md:block absolute top-8 left-0 h-[1px] bg-gradient-to-r from-accent via-accent to-accent/20"
              initial={{ width: 0 }}
              animate={howVisible ? { width: "100%" } : {}}
              transition={{ delay: 0.4, duration: 1.4, ease: "easeOut" }}
            />
            <motion.div
              className="md:hidden absolute top-0 left-6 w-[1px] bg-gradient-to-b from-accent via-accent to-accent/20"
              initial={{ height: 0 }}
              animate={howVisible ? { height: "100%" } : {}}
              transition={{ delay: 0.4, duration: 1.4, ease: "easeOut" }}
            />

            <div className="grid md:grid-cols-4 gap-10 md:gap-8">
              {[
                {
                  icon: Search,
                  step: "01",
                  phase: "Assess",
                  title: "Scope",
                  body: "We confirm objectives, audience, delivery mode, and threat profile for your organisation.",
                },
                {
                  icon: Compass,
                  step: "02",
                  phase: "Design",
                  title: "Design",
                  body: "We build an intelligence-led scenario portfolio tailored to your sector, threat profile, and needs.",
                },
                {
                  icon: Rocket,
                  step: "03",
                  phase: "Deliver",
                  title: "Run",
                  body: "We facilitate the simulation in your chosen format — online, in-person, or location-specific.",
                },
                {
                  icon: RefreshCw,
                  step: "04",
                  phase: "Sustain",
                  title: "Improve",
                  body: "You receive findings, a prioritised roadmap, and an executive assurance summary.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  className="relative pl-16 md:pl-0 md:pt-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                >
                  <div className="absolute md:top-0 md:left-1/2 md:-translate-x-1/2 left-0 top-0 w-14 h-14 rounded-full border-2 border-accent bg-background flex items-center justify-center shadow-lg shadow-accent/10">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-mono-accent text-xs text-accent mb-1 block">
                    {step.step} — {step.phase}
                  </span>
                  <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Pricing ───────────────────────────────────────────────────────── */}
      <section
        ref={pricingRef}
        className="py-16 md:py-20 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={pricingVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-accent block mb-2">
                Pricing
              </span>
              <p className="font-body text-base text-foreground/80 max-w-xl leading-relaxed">
                Pricing is tailored to scope, delivery mode, audience, and location. Request
                detailed information and we will provide a specific proposal through a confidential
                channel.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={pricingVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3 px-7 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground flex-shrink-0"
              >
                Request pricing
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────────── */}
      <section ref={faqRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="FAQ" isVisible={faqVisible} />
          <motion.h2
            className="text-2xl md:text-3xl font-heading font-bold mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={faqVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Frequently asked questions
          </motion.h2>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={faqVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-0">
              {[
                {
                  q: "Is our data or environment exposed?",
                  a: "No. Engagements are controlled and confidential. Scenarios use representative, not live, sensitive data unless a technical scope is explicitly agreed in writing. All scenario content and findings are handled under need-to-know principles. See the confidentiality note below.",
                },
                {
                  q: "Can it run against our real environment?",
                  a: "By arrangement, within an explicitly agreed and scoped technical engagement. This is discussed during the scoping phase and documented before any exercise begins.",
                },
                {
                  q: "How current are the scenarios?",
                  a: "Scenario design is refreshed against prevailing, sector-relevant threat intelligence as part of each engagement's design phase. Scenarios are not recycled from previous engagements without review.",
                },
                {
                  q: "Can it run for a whole department or multiple teams?",
                  a: "Yes — the portfolio scales from a single executive group to cross-functional, multi-team programmes. Participant numbers and programme structure are agreed during scoping.",
                },
                {
                  q: "Where can it be delivered?",
                  a: "Online, at your premises, or at a controlled or neutral location where security, sovereignty, or operational requirements demand it. All three modes are available; the appropriate option is agreed during scoping.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="font-heading font-semibold text-left text-base py-5 hover:text-accent transition-colors hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 11. Confidentiality ───────────────────────────────────────────────── */}
      <section
        ref={confidRef}
        className="py-14 md:py-16 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="flex items-start gap-6 max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={confidVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex-shrink-0 w-11 h-11 border border-border bg-secondary/50 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base mb-3">Professional discretion</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                Scenario design, findings, and reports are confidential by default and handled
                under need-to-know principles. Join Momentum does not publish client-identifying
                information without written authorisation.
              </p>
              <Link
                to="/security-responsible-practice"
                className="inline-flex items-center gap-1.5 font-mono-accent text-xs uppercase tracking-wider text-accent hover:underline"
              >
                Security & Responsible Practice
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 12. Lead capture form ─────────────────────────────────────────────── */}
      <section
        id="enquiry-form"
        ref={formRef}
        className="py-20 md:py-28 px-6 md:px-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form panel */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={formVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="bg-card border border-border p-8 md:p-12">
                <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                  Marketplace enquiry
                </span>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2">
                  Request detailed information
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
                  Complete the form below and we will send a tailored information pack covering
                  logistics, format, and pricing — or arrange contact as requested.
                </p>
                <RequestDetailedInfoForm listingSlug={SLUG} />
              </div>
            </motion.div>

            {/* Side panel */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={formVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div>
                <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-accent mb-5">
                  What happens next
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      step: "01",
                      text: "Your enquiry is received and reviewed by the Join Momentum team.",
                    },
                    {
                      step: "02",
                      text: "We prepare a tailored information pack covering logistics, format, and pricing relevant to your context.",
                    },
                    {
                      step: "03",
                      text: "We respond through a confidential channel — typically within two business days.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="font-mono-accent text-xs text-accent flex-shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
                  Direct contact
                </h3>
                <a
                  href="mailto:sales@joinmomentum.io"
                  className="font-body text-sm text-muted-foreground hover:text-accent transition-colors duration-200 block"
                >
                  sales@joinmomentum.io
                </a>
              </div>

              <div className="border-t border-border pt-8">
                <div className="p-5 border border-border bg-secondary/30">
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="font-mono-accent text-[11px] uppercase tracking-wider text-muted-foreground leading-relaxed">
                      Secure correspondence available on request. Signal or encrypted email by
                      arrangement.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 13. Related ──────────────────────────────────────────────────────── */}
      <section
        ref={relatedRef}
        className="py-16 md:py-20 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-8"
            initial={{ opacity: 0 }}
            animate={relatedVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Related
          </motion.span>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: "Related capability",
                title: "Cyber Security & Critical Infrastructure Defence",
                path: "/capabilities/cyber-security-critical-infrastructure-defence",
              },
              {
                label: "Delivered through",
                title: "Training, Exercises & Capacity Development",
                path: "/solutions/training-exercises-capacity-development",
              },
              {
                label: "Gallery",
                title: "Exercise & simulation imagery",
                path: "/gallery/photos",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={relatedVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              >
                <Link
                  to={item.path}
                  className="group block p-6 bg-background border border-border hover:border-accent transition-colors duration-300"
                >
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
                    {item.label}
                  </span>
                  <h3 className="font-heading font-semibold text-sm leading-snug group-hover:text-accent transition-colors duration-300 mb-3">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-accent">
                    View
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MarketplaceCTIPS;
