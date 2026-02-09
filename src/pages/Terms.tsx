import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const TermsOfUse = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Terms of Use</h1>
          <p className="text-muted-foreground font-mono-accent text-sm uppercase tracking-widest">
            Effective Date: October 2023
          </p>
        </div>
      </section>

      <section ref={contentRef} className="py-20 px-6 md:px-12">
        <motion.div 
          className="max-w-3xl mx-auto space-y-12 font-body text-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="p-4 bg-accent/10 border-l-2 border-accent mb-8">
            <p className="text-sm text-accent font-semibold">
              Notice: Access to specific operational portals requires a separate Service Level Agreement (SLA).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-muted-foreground mb-4">
              By accessing this website, you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Intellectual Property</h2>
            <p className="leading-relaxed text-muted-foreground mb-4">
              All content, methodologies, frameworks, and digital assets presented on this site are the exclusive property of Join Momentum Inc. Unauthorized reproduction, reverse engineering, or distribution of our proprietary models is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Limitation of Liability</h2>
            <p className="leading-relaxed text-muted-foreground">
              Information provided on this public-facing site is for general informational purposes. Join Momentum assumes no liability for strategic decisions made solely based on this public content. Specific operational advice requires a formal engagement contract.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Governing Law</h2>
            <p className="leading-relaxed text-muted-foreground">
              These terms are governed by the laws of the jurisdiction in which Join Momentum is headquartered, without regard to its conflict of law provisions.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfUse;