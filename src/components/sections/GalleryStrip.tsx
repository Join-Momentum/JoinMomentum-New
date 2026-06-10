import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Camera } from "lucide-react";

const stripItems = [
  {
    caption: "Cyber simulation exercise — critical infrastructure cohort, Q1 2026",
    tag: "Exercise",
  },
  {
    caption: "Capacity development workshop — government cohort, Q4 2025",
    tag: "Training",
  },
  {
    caption: "Operational advisory engagement — planning cycle, Q3 2025",
    tag: "Advisory",
  },
];

const GalleryStrip = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative py-20 md:py-28 bg-background border-t border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <motion.div
                className="h-[1px] bg-accent"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 60 } : {}}
                transition={{ duration: 0.6 }}
              />
              <motion.span
                className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Gallery
              </motion.span>
            </div>

            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Selected delivery imagery
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/gallery/photos"
              className="group inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              View gallery
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Strip grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stripItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
            >
              <Link to="/gallery/photos" className="group block relative overflow-hidden">
                {/* Placeholder image area */}
                <div className="relative aspect-[4/3] bg-card border border-border overflow-hidden group-hover:border-accent transition-colors duration-400">
                  {/* Simulated dark image overlay pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-secondary/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-border" />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Caption bar */}
                <div className="flex items-center justify-between gap-3 pt-3">
                  <p className="font-body text-xs text-muted-foreground leading-snug line-clamp-2 flex-1">
                    {item.caption}
                  </p>
                  <span className="flex-shrink-0 font-mono-accent text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                    {item.tag}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
