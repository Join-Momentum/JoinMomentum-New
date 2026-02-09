import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Bot, Scale, AlertTriangle, Fingerprint } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const aiPrinciples = [
  {
    icon: Scale,
    title: "Accountability",
    text: "AI systems are tools, not agents. We ensure a clear chain of human responsibility for all AI-assisted outcomes."
  },
  {
    icon: AlertTriangle,
    title: "Robustness & Safety",
    text: "We stress-test models against adversarial attacks and edge cases to ensure reliability in hostile environments."
  },
  {
    icon: Fingerprint,
    title: "Traceability",
    text: "Black boxes are unacceptable in high-stakes missions. We prioritize explainable architectures and rigorous logging."
  }
];

const ResponsibleAI = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: principlesRef, isVisible: principlesVisible } = useScrollReveal(0.2);
  const { ref: statementRef, isVisible: statementVisible } = useScrollReveal(0.2);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
           <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-accent">
              <circle cx="80" cy="20" r="50" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            className="flex items-center gap-2 mb-6"
          >
            <Bot className="w-5 h-5 text-accent" />
            <span className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent">
              Emerging Technology
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Responsible AI
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-body text-foreground leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            As autonomy and machine learning enter the battlespace, we champion a "Human-Centric" approach. Technology must augment decision-making, not replace moral judgment.
          </motion.p>
        </div>
      </section>

      <section ref={principlesRef} className="py-20 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {aiPrinciples.map((item, index) => (
              <motion.div
                key={index}
                className="p-8 bg-background border border-border/50 hover:border-accent/50 transition-all shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={principlesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2 }}
              >
                <item.icon className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-body">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statementRef} className="py-20 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-heading font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={statementVisible ? { opacity: 1 } : {}}
          >
            Our Commitment
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground font-body leading-relaxed"
            initial={{ opacity: 0 }}
            animate={statementVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Join Momentum commits to the ethical development of capabilities. We will not engage in the development of lethal autonomous weapons systems that lack meaningful human control, nor systems designed to violate fundamental human rights.
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ResponsibleAI;