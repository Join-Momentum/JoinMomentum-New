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

export interface CapabilityDetail {
  slug: string;
  title: string;
  eyebrowLabel: string;
  lead: string;
  descriptionIntro: string;
  details: string[];
  segments: Array<{ title: string; body: string }>;
  engagementModes: Array<{ title: string; path: string; body: string }>;
  outcomes: string[];
  related: Array<{ title: string; path: string }>;
  marketplaceItem?: { title: string; path: string; tag: string };
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

const CapabilityDetailPage = ({ data }: { data: CapabilityDetail }) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);
  const { ref: whatRef, isVisible: whatVisible } = useScrollReveal(0.1);
  const { ref: engageRef, isVisible: engageVisible } = useScrollReveal(0.1);
  const { ref: segRef, isVisible: segVisible } = useScrollReveal(0.1);
  const { ref: outcomesRef, isVisible: outcomesVisible } = useScrollReveal(0.1);
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollReveal(0.1);

  const Icon = data.icon;

  const scrollToContact = () => {
    window.location.href = "/contact";
  };

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
              { label: "Capabilities", path: "/capabilities" },
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
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90 hover:gap-4"
            >
              Request a capability discussion
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link
              to="/capability-statement"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Capability statement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────────────────────── */}
      <section
        ref={whatRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionEyebrow label="What we do" isVisible={whatVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-6 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={whatVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our work in this domain
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

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={whatVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Focus areas
              </h3>
              {data.details.map((detail, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-border/60"
                  initial={{ opacity: 0, x: 16 }}
                  animate={whatVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                >
                  <span className="font-mono-accent text-xs text-accent flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-sm text-foreground/85 leading-relaxed">
                    {detail}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How we engage ────────────────────────────────────────────────── */}
      <section ref={engageRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="How we engage" isVisible={engageVisible} />
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <motion.h2
                className="text-2xl md:text-3xl font-heading font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={engageVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Engagement models
              </motion.h2>
              <motion.p
                className="font-body text-sm text-muted-foreground leading-relaxed mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={engageVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Each engagement is scoped and structured to fit your organisation's requirements,
                timeline, and operating environment.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={engageVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  to="/solutions"
                  className="group inline-flex items-center gap-2 font-mono-accent text-xs uppercase tracking-wider text-accent hover:gap-3 transition-all duration-200"
                >
                  View all solutions
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {data.engagementModes.map((mode, i) => (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={engageVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={mode.path}
                    className="group block p-6 bg-card border border-border hover:border-accent transition-colors duration-300 h-full"
                  >
                    <h3 className="font-heading font-semibold text-sm mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                      {mode.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                      {mode.body}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-accent">
                      Learn more
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we serve ─────────────────────────────────────────────────── */}
      <section
        ref={segRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionEyebrow label="Who we serve" isVisible={segVisible} />
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-12 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={segVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Organisations we work with in this domain
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {data.segments.map((seg, i) => (
              <motion.div
                key={seg.title}
                className="bg-background p-7"
                initial={{ opacity: 0, y: 20 }}
                animate={segVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div className="w-1 h-5 bg-accent mb-5" />
                <h3 className="font-heading font-semibold text-sm mb-3 leading-snug">
                  {seg.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {seg.body}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={segVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/who-we-serve"
              className="group inline-flex items-center gap-2 font-mono-accent text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              View all segments we serve
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Outcomes ─────────────────────────────────────────────────────── */}
      <section ref={outcomesRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionEyebrow label="Outcomes" isVisible={outcomesVisible} />
              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={outcomesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                What changes after working with us
              </motion.h2>
              <motion.p
                className="font-body text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={outcomesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Every engagement is structured around a specific capability objective. These are
                the outcomes clients consistently report.
              </motion.p>
            </div>

            <div className="space-y-4">
              {data.outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={outcomesVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-body text-base text-foreground/85 leading-relaxed">
                    {outcome}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-card border-y border-border">
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
              to="/capabilities"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:border-accent hover:text-accent"
            >
              All capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related capabilities ──────────────────────────────────────────── */}
      <section ref={relatedRef} className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-8"
            initial={{ opacity: 0 }}
            animate={relatedVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Related capabilities
          </motion.span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.related.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 16 }}
                animate={relatedVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.path}
                  className="group block p-6 bg-card border border-border hover:border-accent transition-colors duration-300"
                >
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

export default CapabilityDetailPage;
