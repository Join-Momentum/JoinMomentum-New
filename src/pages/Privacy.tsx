import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const PrivacyPolicy = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.1);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground font-mono-accent text-sm uppercase tracking-widest">
            Last Updated: October 2023
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
          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Information Collection</h2>
            <p className="leading-relaxed text-muted-foreground mb-4">
              Join Momentum collects limited personal information required for business operations. This includes contact details provided through our secure portals and data necessary for the execution of contracts. We minimize data collection to what is strictly necessary for mission fulfillment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Data Usage & Processing</h2>
            <p className="leading-relaxed text-muted-foreground mb-4">
              Your data is processed solely for the purposes of:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Providing requested operational support and consultancy.</li>
              <li>Compliance with legal and regulatory obligations, including defense vetting.</li>
              <li>Internal security auditing and risk assessment.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Data Sovereignty</h2>
            <p className="leading-relaxed text-muted-foreground">
              We ensure that data processing respects national data sovereignty requirements. Data related to national security engagements is never stored on public cloud infrastructure without appropriate, government-approved encryption and isolation controls.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Contact</h2>
            <p className="leading-relaxed text-muted-foreground">
              For privacy-related inquiries, please contact our Data Protection Officer via the secure channels provided in your engagement documentation.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;