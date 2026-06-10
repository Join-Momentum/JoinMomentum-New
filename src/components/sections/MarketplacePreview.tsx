import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ShieldCheck } from "lucide-react";

const MarketplacePreview = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative py-20 md:py-32 bg-secondary/30">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
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
            Marketplace
          </motion.span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: intro text */}
          <div>
            <motion.h2
              className="text-2xl md:text-4xl font-heading font-bold mb-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Programmes you can bring into your organisation
            </motion.h2>

            <motion.p
              className="text-muted-foreground font-body leading-relaxed mb-8 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Alongside bespoke engagements, Join Momentum offers packaged, intelligence-led
              programmes through our Marketplace — named, defined programmes that organisations,
              agencies, and government departments can discover and request directly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                to="/marketplace"
                className="group inline-flex items-center gap-3 px-7 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                Explore the Marketplace
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right: featured listing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/marketplace/cyber-threat-intelligence-portfolio-simulation"
              className="group block bg-background border border-border hover:border-accent transition-all duration-400 p-8"
            >
              {/* Status + capability tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent font-mono-accent text-[10px] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Available
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground">
                  <ShieldCheck className="w-3 h-3" />
                  Cyber Security
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 leading-tight group-hover:text-accent transition-colors duration-300">
                Cyber Threat Intelligence Portfolio Simulation
              </h3>
              <p className="font-mono-accent text-xs text-muted-foreground mb-5">
                for organisations, agencies, and government departments
              </p>

              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                A portfolio of intelligence-led cyber simulations that test how your organisation
                detects, decides, and responds under realistic threat conditions.
              </p>

              <div className="flex flex-wrap gap-2 mb-6 text-xs font-mono-accent text-muted-foreground">
                <span className="px-2 py-1 bg-secondary border border-border">Online</span>
                <span className="px-2 py-1 bg-secondary border border-border">In-person</span>
                <span className="px-2 py-1 bg-secondary border border-border">Location-specific</span>
              </div>

              <span className="group-hover:text-accent inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300">
                Learn more
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
