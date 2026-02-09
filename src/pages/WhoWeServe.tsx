import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Eye, Building2, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const sectors = [
  {
    icon: Shield,
    title: "Government & Defence",
    description: "Supporting defence ministries, armed forces, and public security institutions.",
  },
  {
    icon: Eye,
    title: "Intelligence & National Security",
    description: "Strengthening intelligence processes, decision support, and operational coordination.",
  },
  {
    icon: Building2,
    title: "Critical National Infrastructure & Strategic Organisations",
    description: "Protecting systems and services where disruption has national or systemic impact.",
  },
  {
    icon: Globe,
    title: "International & Multilateral Partners",
    description: "Operating respectfully within sovereign, regional, and institutional frameworks.",
  },
];

const SectorRow = ({
  sector,
  index,
}: {
  sector: (typeof sectors)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = sector.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative border-b border-border last:border-b-0 hover:bg-card/50 transition-colors duration-500"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center">
          {/* Number */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="font-mono-accent text-4xl md:text-5xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors duration-500">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            className="md:col-span-2 flex md:justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border bg-background flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:text-accent transition-colors duration-300">
              {sector.title}
            </h3>
          </motion.div>

          {/* Description */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-muted-foreground font-body text-lg md:text-xl leading-relaxed">
              {sector.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hover accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-accent origin-top"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const WhoWeServe = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Who We Serve
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Partners in high-stakes environments
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We work with organisations where the stakes are highest and the margin for error is smallest.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent mt-8"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Sectors - Full Width Rows */}
      <section className="border-t border-border">
        {sectors.map((sector, index) => (
          <SectorRow key={sector.title} sector={sector} index={index} />
        ))}
      </section>

      {/* Bottom spacing */}
      <div className="py-20 md:py-28" />

      <Footer />
    </main>
  );
};

export default WhoWeServe;
