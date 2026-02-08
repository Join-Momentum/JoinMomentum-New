import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactFooter = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <footer className="relative bg-card border-t border-border">
      {/* CTA Panel */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-30">
        <div className="max-w-2xl">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Initiate Contact
          </motion.span>

          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ready to discuss your strategic requirements?
          </motion.h2>

          <motion.p
            className="text-muted-foreground font-body mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            All communications are handled with appropriate discretion.
          </motion.p>

          <motion.a
            href="mailto:contact@joinmomentum.com"
            className="inline-flex items-center px-8 py-3 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-400 hover:bg-accent hover:text-accent-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Contact Us
          </motion.a>
        </div>
      </div>

      {/* Minimal footer */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono-accent text-xs text-muted-foreground">
            © {new Date().getFullYear()} Join Momentum Inc. All rights reserved.
          </span>
          <span className="font-mono-accent text-xs text-muted-foreground">
            Communications handled in accordance with applicable security policies.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
