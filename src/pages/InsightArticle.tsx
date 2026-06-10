import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock, ArrowLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import {
  articles,
  capabilityLabels,
  type Article,
  type ContentBlock,
} from "@/data/articles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// ─── Body renderer ────────────────────────────────────────────────────────────

const BodyBlock = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-article text-base md:text-lg text-foreground/90 leading-[1.85] mb-6">
          {block.text}
        </p>
      );

    case "heading":
      return block.level === 2 ? (
        <h2 className="font-heading font-bold text-xl md:text-2xl mt-12 mb-5 text-foreground">
          {block.text}
        </h2>
      ) : (
        <h3 className="font-heading font-semibold text-lg mt-8 mb-4 text-foreground">
          {block.text}
        </h3>
      );

    case "blockquote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-accent">
          <p className="font-article italic text-lg md:text-xl text-foreground/80 leading-[1.7]">
            {block.text}
          </p>
        </blockquote>
      );

    case "list":
      return (
        <ul className="my-6 space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex-shrink-0 mt-[0.6rem] w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-article text-base md:text-lg text-foreground/90 leading-[1.85]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "divider":
      return (
        <div className="my-12 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="w-12 h-px bg-border" />
        </div>
      );

    default:
      return null;
  }
};

// ─── Related card ─────────────────────────────────────────────────────────────

const RelatedCard = ({ article }: { article: Article }) => (
  <Link
    to={`/insights/${article.slug}`}
    className="group block bg-card border border-border hover:border-accent transition-colors duration-300 overflow-hidden"
  >
    <div className="aspect-[16/9] overflow-hidden">
      <img
        src={article.heroImage.replace("w=1600&h=800", "w=600&h=340")}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <span className="font-mono-accent text-[9px] uppercase tracking-wider text-accent block mb-2">
        {capabilityLabels[article.capability]}
      </span>
      <h3 className="font-heading font-semibold text-sm leading-snug mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
        {article.title}
      </h3>
      <div className="flex items-center gap-1.5 font-mono-accent text-[10px] text-muted-foreground">
        <Clock className="w-3 h-3" />
        {article.readingTime} min read
      </div>
    </div>
  </Link>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const InsightArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.05);
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.05);
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollReveal(0.1);

  const article = useMemo(
    () => articles.find((a) => a.slug === slug),
    [slug]
  );

  const related = useMemo(
    () =>
      articles
        .filter((a) => a.slug !== slug && a.capability === article?.capability)
        .slice(0, 3),
    [slug, article]
  );

  const moreFallback = useMemo(
    () =>
      related.length < 2
        ? articles.filter((a) => a.slug !== slug && !related.includes(a)).slice(0, 2 - related.length)
        : [],
    [slug, related]
  );

  const relatedAll = [...related, ...moreFallback].slice(0, 3);

  if (!article) return <Navigate to="/insights" replace />;

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* ── Article hero ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-28 md:pt-36 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {[
              { label: "Home", path: "/" },
              { label: "Insights", path: "/insights" },
              { label: article.title, path: null },
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
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent line-clamp-1 max-w-[200px] sm:max-w-none">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-border flex-shrink-0" />
                )}
              </span>
            ))}
          </motion.nav>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="font-mono-accent text-[10px] uppercase tracking-wider px-2.5 py-1 bg-accent/10 text-accent border border-accent/30">
              {capabilityLabels[article.capability]}
            </span>
            <span className="flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground">
              <Clock className="w-3 h-3" />
              {article.readingTime} min read
            </span>
            <span className="font-mono-accent text-[10px] text-muted-foreground">
              {formatDate(article.publishedAt)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            {article.title}
          </motion.h1>

          {/* Byline */}
          <motion.div
            className="flex items-center gap-4 pb-10 border-b border-border"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
              <span className="font-heading font-bold text-xs text-accent">
                {article.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm">{article.author}</p>
              <p className="font-mono-accent text-[10px] text-muted-foreground uppercase tracking-wider">
                {article.authorRole}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div
          className="mt-10 max-w-[1400px] mx-auto px-0 md:px-12"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Article body ──────────────────────────────────────────────────── */}
      <section ref={bodyRef} className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-20">
            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bodyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {/* Excerpt as lead */}
              <p className="font-article text-lg md:text-xl text-foreground/75 leading-[1.85] mb-10 pb-10 border-b border-border font-medium italic">
                {article.excerpt}
              </p>

              {article.body.map((block, i) => (
                <BodyBlock key={i} block={block} />
              ))}

              {/* End rule */}
              <div className="mt-16 pt-10 border-t border-border flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    Written by
                  </p>
                  <p className="font-heading font-semibold text-sm">{article.author}</p>
                  <p className="font-mono-accent text-[10px] text-muted-foreground">{article.authorRole}</p>
                </div>
                <Link
                  to="/insights"
                  className="group inline-flex items-center gap-2 font-mono-accent text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  All insights
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={bodyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Topic */}
              <div>
                <p className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  Topic
                </p>
                <Link
                  to={`/insights`}
                  onClick={() => {/* filter will apply via state */}}
                  className="inline-flex items-center gap-1.5 font-mono-accent text-xs uppercase tracking-wider text-accent hover:underline"
                >
                  {capabilityLabels[article.capability]}
                </Link>
              </div>

              {/* Related capability */}
              <div className="border-t border-border pt-6">
                <p className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  Related capability
                </p>
                {(
                  [
                    ["cyber-security", "/capabilities/cyber-security-critical-infrastructure-defence"],
                    ["strategic-comms", "/capabilities/strategic-communications-information-operations"],
                    ["military-intel", "/capabilities/military-intelligence-operational-advantage"],
                    ["emerging-tech", "/capabilities/emerging-technology-ai-in-defence"],
                  ] as const
                )
                  .filter(([cap]) => cap === article.capability)
                  .map(([, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="group inline-flex items-center gap-1.5 font-mono-accent text-xs uppercase tracking-wider text-accent hover:gap-2.5 transition-all duration-200"
                    >
                      {capabilityLabels[article.capability]}
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ))}
                {article.capability === "capability-development" && (
                  <Link
                    to="/solutions"
                    className="group inline-flex items-center gap-1.5 font-mono-accent text-xs uppercase tracking-wider text-accent hover:gap-2.5 transition-all duration-200"
                  >
                    Solutions overview
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>

              {/* CTA */}
              <div className="border-t border-border pt-6">
                <p className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  Discuss this with us
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-3 border border-accent text-accent font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground w-full justify-center"
                >
                  Request a discussion
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── Related articles ──────────────────────────────────────────────── */}
      {relatedAll.length > 0 && (
        <section
          ref={relatedRef}
          className="py-16 md:py-20 px-6 md:px-12 bg-card border-t border-border"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <motion.span
                className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={relatedVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                Further reading
              </motion.span>
              <Link
                to="/insights"
                className="group inline-flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-accent"
              >
                All insights
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAll.map((a, i) => (
                <motion.div
                  key={a.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={relatedVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <RelatedCard article={a} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default InsightArticle;
