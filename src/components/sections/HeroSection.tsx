import { motion } from "framer-motion";
import HexGrid from "../HexGrid";
import { ArrowDown } from "lucide-react";

const headline = "STRATEGIC DEFENCE & SECURITY CONSULTING";
const subtext = "Precision. Discretion. Momentum.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <HexGrid />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <motion.h1
          className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#who-we-are"
            className="inline-flex items-center gap-2 px-8 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-400 hover:bg-accent hover:text-accent-foreground"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <a href="#who-we-are" aria-label="Scroll down">
            <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
