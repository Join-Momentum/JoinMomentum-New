import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { articles, capabilityLabels, type ArticleCapability } from "@/data/articles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const FilterPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`font-mono-accent text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-all duration-200 ${
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-border bg-secondary/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

// ─── Article card ─────────────────────────────────────────────────────────────

const ArticleCard = ({
  article,
  index,
}: {
  article: (typeof articles)[0];
  index: number;
}) => (
  <motion.article
    layout
    key={article.slug}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
  >
    <Link
      to={`/insights/${article.slug}`}
      className="group block h-full bg-card border border-border hover:border-accent transition-colors duration-300"
    >
      {/* Hero image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={article.heroImage.replace("w=1600&h=800", "w=800&h=450")}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        {/* Capability tag */}
        <div className="absolute bottom-3 left-3">
          <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2 py-1 bg-background/90 text-accent border border-accent/30">
            {capabilityLabels[article.capability]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="font-heading font-bold text-base md:text-lg leading-snug mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-3">
          {article.title}
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <div>
            <p className="font-heading font-semibold text-xs">{article.author}</p>
            <p className="font-mono-accent text-[10px] text-muted-foreground mt-0.5">
              {formatDate(article.publishedAt)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 font-mono-accent text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            {article.readingTime} min read
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Insights = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [capFilter, setCapFilter] = useState<ArticleCapability | "all">("all");

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) => capFilter === "all" || a.capability === capFilter
      ),
    [capFilter]
  );

  // Featured = first article; rest = the grid
  const [featured, ...rest] = filtered;

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Insights
          </motion.span>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 leading-[1.05]"
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Perspectives for practitioners
              </motion.h1>
              <motion.p
                className="text-muted-foreground font-body text-base md:text-lg max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Doctrine, methodology, and applied frameworks from Join Momentum practitioners.
                No live-operation commentary. No partisan content. Real bylines only.
              </motion.p>
            </div>
            <motion.div
              className="lg:text-right"
              initial={{ opacity: 0 }}
              animate={heroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                Editorial policy
              </p>
              <div className="flex flex-wrap lg:justify-end gap-2">
                {["Doctrine & methodology", "Applied frameworks", "Capability development"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="font-mono-accent text-[9px] uppercase tracking-wider px-2.5 py-1 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="w-20 h-px bg-accent mt-10"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <section className="sticky top-16 md:top-20 z-30 bg-background border-b border-border px-6 md:px-12 py-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
              Topic:
            </span>
            <FilterPill label="All" active={capFilter === "all"} onClick={() => setCapFilter("all")} />
            {(Object.keys(capabilityLabels) as ArticleCapability[]).map((k) => (
              <FilterPill
                key={k}
                label={capabilityLabels[k]}
                active={capFilter === k}
                onClick={() => setCapFilter(k)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <p className="font-mono-accent text-sm text-muted-foreground">
                  No articles match the selected filter.
                </p>
              </motion.div>
            ) : (
              <motion.div key="content" layout>
                {/* Featured article — full-width */}
                {featured && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <Link
                      to={`/insights/${featured.slug}`}
                      className="group grid md:grid-cols-2 bg-card border border-border hover:border-accent transition-colors duration-300 overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                        <img
                          src={featured.heroImage.replace("w=1600&h=800", "w=900&h=600")}
                          alt={featured.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 hidden md:block" />
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-5">
                            <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2.5 py-1 bg-accent/10 text-accent border border-accent/30">
                              {capabilityLabels[featured.capability]}
                            </span>
                            <span className="font-mono-accent text-[9px] text-muted-foreground uppercase tracking-wider">
                              Latest
                            </span>
                          </div>
                          <h2 className="font-heading font-bold text-xl md:text-2xl lg:text-3xl leading-snug mb-4 group-hover:text-accent transition-colors duration-200">
                            {featured.title}
                          </h2>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {featured.excerpt}
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <div>
                            <p className="font-heading font-semibold text-sm">{featured.author}</p>
                            <p className="font-mono-accent text-[10px] text-muted-foreground mt-0.5">
                              {featured.authorRole}
                            </p>
                            <p className="font-mono-accent text-[10px] text-muted-foreground/60 mt-0.5">
                              {formatDate(featured.publishedAt)} · {featured.readingTime} min read
                            </p>
                          </div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight className="w-5 h-5 text-accent" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Remaining articles grid */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {rest.map((article, i) => (
                        <ArticleCard key={article.slug} article={article} index={i} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Editorial note ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto border border-border p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono-accent text-[10px] uppercase tracking-wider text-accent mb-2">
                Editorial policy
              </p>
              <p className="font-body text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Join Momentum publishes doctrine, methodology, and applied frameworks. We do not
                comment on named operations, named individuals, or live incidents. Authors write
                under their real names and professional roles.
              </p>
            </div>
            <Link
              to="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Discuss a contribution
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Insights;
