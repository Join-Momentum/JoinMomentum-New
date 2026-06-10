import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const ClosingCTA = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="relative py-24 md:py-36 bg-card border-t border-border overflow-hidden">
      {/* Subtle hex background accent */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent"
          aria-hidden="true"
        >
          <defs>
            <pattern id="cta-hex" width="80" height="92" patternUnits="userSpaceOnUse">
              <polygon
                points="40,4 73,22 73,70 40,88 7,70 7,22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-hex)" />
        </svg>
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center"
      >
        {/* Red divider */}
        <motion.div
          className="w-12 h-[2px] bg-accent mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />

        <motion.h2
          className="text-3xl md:text-5xl font-heading font-bold mb-6 max-w-3xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Capability that works under real-world constraints.
        </motion.h2>

        <motion.p
          className="text-muted-foreground font-body text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          For confidential discussions regarding capability needs, operational challenges, or
          potential engagements, get in touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent/90 hover:gap-4"
          >
            Request a capability discussion
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 font-mono-accent text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          All communications handled with professional discretion.
        </motion.p>
      </div>
    </section>
  );
};

export default ClosingCTA;
