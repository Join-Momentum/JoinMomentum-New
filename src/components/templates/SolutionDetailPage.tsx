import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import HexGrid from "@/components/HexGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SolutionDetail {
  number: string;
  title: string;
  eyebrowLabel: string;
  lead: string;
  descriptionIntro: string;
  whenToUse: Array<{ title: string; body: string }>;
  steps: Array<{ number: string; phase: string; title: string; body: string }>;
  deliverables: string[];
  capabilities: Array<{ title: string; path: string }>;
  marketplaceItem?: { title: string; path: string };
  icon: LucideIcon;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Template ─────────────────────────────────────────────────────────────────

const SolutionDetailPage = ({ data }: { data: SolutionDetail }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);
  const { ref: whatRef, isVisible: whatVisible } = useScrollReveal(0.1);
  const { ref: whenRef, isVisible: whenVisible } = useScrollReveal(0.1);
  const { ref: howRef, isVisible: howVisible } = useScrollReveal(0.1);
  const { ref: delivRef, isVisible: delivVisible } = useScrollReveal(0.1);
  const { ref: capsRef, isVisible: capsVisible } = useScrollReveal(0.1);

  const Icon = data.icon;

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[72vh] flex items-end pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
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
              { label: "Solutions", path: "/solutions" },
              { label: data.title, path: null },
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

          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-10 h-10 border border-accent/40 bg-accent/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <span className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent">
              {data.eyebrowLabel}
            </span>
          </motion.div>

          <motion.p
            className="font-mono-accent text-xs text-muted-foreground mb-3"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {data.number}
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 max-w-4xl leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {data.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90 hover:gap-4"
            >
              Request a capability discussion
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              All solutions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What it is ───────────────────────────────────────────────────── */}
      <section
        ref={whatRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionEyebrow label="What it is" isVisible={whatVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={whatVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                The engagement
              </motion.h2>
              <motion.p
                className="font-body text-base text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={whatVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {data.descriptionIntro}
              </motion.p>

              {data.marketplaceItem && (
                <motion.div
                  className="mt-8 p-5 border border-accent/20 bg-accent/5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={whatVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent block mb-2">
                    Available in the Marketplace
                  </span>
                  <Link
                    to={data.marketplaceItem.path}
                    className="group inline-flex items-center gap-2 font-heading font-semibold text-sm hover:text-accent transition-colors duration-200"
                  >
                    {data.marketplaceItem.title}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </div>

            {/* ── When to use ── */}
            <div ref={whenRef}>
              <SectionEyebrow label="When to use this" isVisible={whenVisible} />
              <div className="space-y-4">
                {data.whenToUse.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="p-5 bg-background border border-border"
                    initial={{ opacity: 0, y: 16 }}
                    animate={whenVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <h3 className="font-heading font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section ref={howRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="How it works" isVisible={howVisible} />
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={howVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The engagement process
          </motion.h2>

          <div className="relative">
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
              {data.steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative pl-16 md:pl-0 md:pt-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={howVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                >
                  <div className="absolute md:top-0 md:left-1/2 md:-translate-x-1/2 left-0 top-0 w-14 h-14 rounded-full border-2 border-accent bg-background flex items-center justify-center shadow-lg shadow-accent/10">
                    <span className="font-mono-accent text-xs text-accent">{step.number}</span>
                  </div>
                  <span className="font-mono-accent text-xs text-accent mb-1 block">
                    {step.phase}
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

      {/* ── Deliverables ─────────────────────────────────────────────────── */}
      <section
        ref={delivRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionEyebrow label="Deliverables" isVisible={delivVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={delivVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                What you get
              </motion.h2>
              <motion.p
                className="font-body text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={delivVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Outputs are structured for practical use — by leadership, planning teams, and
                operational staff — not filed and forgotten.
              </motion.p>
            </div>

            <div className="space-y-4">
              {data.deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-border/60 last:border-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={delivVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground/85 leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
            Get started
          </p>
          <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6 max-w-2xl mx-auto">
            Ready to discuss your requirements?
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Tell us what you're working on. We'll respond through a confidential channel.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90 hover:gap-4"
            >
              Request a capability discussion
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              All solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related capabilities ──────────────────────────────────────────── */}
      <section
        ref={capsRef}
        className="py-16 md:py-20 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-8"
            initial={{ opacity: 0 }}
            animate={capsVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Relevant capabilities
          </motion.span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.capabilities.map((cap, i) => (
              <motion.div
                key={cap.path}
                initial={{ opacity: 0, y: 16 }}
                animate={capsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={cap.path}
                  className="group block p-6 bg-background border border-border hover:border-accent transition-colors duration-300"
                >
                  <h3 className="font-heading font-semibold text-sm leading-snug group-hover:text-accent transition-colors duration-300 mb-3">
                    {cap.title}
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

export default SolutionDetailPage;
