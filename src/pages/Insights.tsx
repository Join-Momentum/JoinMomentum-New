import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Shield, Radio, Brain, Cpu, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const insightTopics = [
  {
    icon: Shield,
    title: "Cyber resilience and infrastructure defence",
  },
  {
    icon: Radio,
    title: "Information operations and influence risk",
  },
  {
    icon: Brain,
    title: "Intelligence and decision advantage",
  },
  {
    icon: Cpu,
    title: "Responsible deployment of emerging technology",
  },
  {
    icon: Target,
    title: "Capability development in complex environments",
  },
];

const InsightCard = ({ topic, index }: { topic: typeof insightTopics[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const Icon = topic.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex items-center gap-6 p-6 md:p-8 border-b border-border hover:bg-card/50 transition-all duration-300 cursor-pointer"
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent/30 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      
      <h3 className="font-heading font-semibold text-lg md:text-xl group-hover:text-accent transition-colors duration-300 flex-1">
        {topic.title}
      </h3>
      
      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
    </motion.div>
  );
};

const Insights = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.2);

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
            Insights
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Perspectives for practitioners
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We publish selected insights for practitioners and decision-makers, including:
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

      {/* Topics List */}
      <section className="pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="border-t border-border">
            {insightTopics.map((topic, index) => (
              <InsightCard key={topic.title} topic={topic} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="pb-28 md:pb-40 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            className="bg-card border border-border p-10 md:p-14"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-4">
              Stay Informed
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              Request access to our insights
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-xl">
              Selected publications are shared with verified practitioners and decision-makers. Contact us to discuss access.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 border border-accent text-accent font-mono-accent text-sm uppercase tracking-wider hover:bg-accent hover:text-background transition-all duration-300"
            >
              Request Access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Insights;
