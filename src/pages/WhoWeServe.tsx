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

const SectorCard = ({ sector, index }: { sector: typeof sectors[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = sector.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative bg-card border border-border p-10 md:p-12 transition-all duration-500 hover:border-accent"
    >
      {/* Hexagonal corner accent */}
      <div className="absolute top-4 right-4 w-8 h-8 opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-90">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <polygon
            points="16,2 28,9 28,23 16,30 4,23 4,9"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="flex flex-col items-start">
        <div className="w-16 h-16 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 mb-8">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        
        <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4 group-hover:text-accent transition-colors duration-300">
          {sector.title}
        </h3>
        
        <p className="text-muted-foreground font-body text-lg leading-relaxed">
          {sector.description}
        </p>
      </div>
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
      <section ref={heroRef} className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12">
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

      {/* Sectors Grid */}
      <section className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {sectors.map((sector, index) => (
              <SectorCard key={sector.title} sector={sector} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WhoWeServe;
