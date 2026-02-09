import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Lock, FileKey, ShieldCheck, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const practices = [
  {
    icon: Lock,
    title: "Information Assurance",
    content: "We adhere to strict data classification frameworks. All client data is handled in isolated environments with encryption at rest and in transit, compliant with ISO 27001 and relevant government standards."
  },
  {
    icon: UserCheck,
    title: "Personnel Vetting",
    content: "Our team members undergo rigorous background checks and security clearance verification appropriate to the sensitivity of the engagement."
  },
  {
    icon: ShieldCheck,
    title: "Supply Chain Security",
    content: "We maintain a vetted ecosystem of partners and tools, ensuring that no unverified third-party dependencies introduce risk into client environments."
  },
  {
    icon: FileKey,
    title: "Operational Discretion",
    content: "We operate with a default 'need-to-know' policy. Client identities and engagement details are never disclosed without explicit authorization."
  }
];

const SecurityPractice = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: listRef, isVisible: listVisible } = useScrollReveal(0.2);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Security & Governance
          </motion.span>
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Uncompromising Standards
          </motion.h1>
          <motion.div
            className="w-20 h-px bg-accent mb-8"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p className="text-xl text-muted-foreground font-body max-w-3xl">
            In our line of work, trust is the currency. We embed security not just into our technology, but into our culture and operational procedures.
          </motion.p>
        </div>
      </section>

      <section ref={listRef} className="py-20 px-6 md:px-12 bg-secondary/10 border-t border-border">
        <div className="max-w-[1400px] mx-auto grid gap-12">
          {practices.map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-10 items-start p-8 border-l-2 border-border hover:border-accent transition-colors duration-300 bg-background/50"
              initial={{ opacity: 0, x: -20 }}
              animate={listVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed text-lg">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SecurityPractice;