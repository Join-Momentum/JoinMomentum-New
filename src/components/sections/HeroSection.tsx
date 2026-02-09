import { motion } from "framer-motion";
import HexGrid from "../HexGrid";
import { ArrowDown, ArrowRight } from "lucide-react";

const headline = "Defence & Security Capability for Complex Environments";
const subtext =
  "Join Momentum Inc partners with defence and security stakeholders to strengthen operational readiness, protect critical systems, and maintain strategic advantage across evolving threat landscapes.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <HexGrid />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 text-base md:text-lg lg:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-400 hover:bg-accent/90 hover:gap-4"
          >
            Request a Capability Discussion
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {/* <a href="#who-we-are" aria-label="Scroll down">
            <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
          </a> */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
