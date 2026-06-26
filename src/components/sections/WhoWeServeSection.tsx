import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, Eye, Zap, Globe, ArrowUpRight } from "lucide-react";

const segments = [
  {
    icon: Building2,
    number: "01",
    title: "Government & Defence",
    description:
      "Supporting defence ministries, armed forces, and public security institutions to build and sustain operational capability in complex environments.",
    path: "/who-we-serve#government-defence",
  },
  {
    icon: Eye,
    number: "02",
    title: "Intelligence & National Security",
    description:
      "Strengthening intelligence processes, decision support, and coordination for national security institutions operating under persistent pressure.",
    path: "/who-we-serve#intelligence-national-security",
  },
  {
    icon: Zap,
    number: "03",
    title: "Critical National Infrastructure",
    description:
      "Protecting systems and services where disruption carries national or systemic impact — energy, communications, finance, transport.",
    path: "/who-we-serve#critical-national-infrastructure",
  },
  {
    icon: Globe,
    number: "04",
    title: "International & Multilateral Partners",
    description:
      "Operating within sovereign, regional, and institutional frameworks to build shared security capacity and sustained capability.",
    path: "/who-we-serve#international-multilateral-partners",
  },
];

const WhoWeServeSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative py-20 md:py-32 bg-background">
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
            Who We Serve
          </motion.span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Organisations that carry national and security responsibility
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/who-we-serve"
              className="group inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              View all segments
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Segment grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <Link
                to={seg.path}
                className="group relative flex flex-col p-8 bg-background hover:bg-card transition-colors duration-300 h-full"
              >
                {/* Number */}
                <span className="font-mono-accent text-xs text-muted-foreground mb-6">
                  {seg.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 mb-6 border border-border bg-secondary/50 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                  <seg.icon className="w-5 h-5 text-accent" />
                </div>

                <h3 className="font-heading font-semibold text-base mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                  {seg.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">
                  {seg.description}
                </p>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
