import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const quickLinks = [
  { name: "Capabilities", path: "/capabilities" },
  { name: "Solutions", path: "/solutions" },
  { name: "Who We Serve", path: "/who-we-serve" },
  { name: "Insights", path: "/insights" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <footer className="relative bg-card border-t border-border">
      {/* CTA Panel */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: CTA */}
          <div className="max-w-md">
            <motion.span
              className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Initiate Contact
            </motion.span>

            <motion.h2
              className="text-2xl md:text-3xl font-heading font-bold mb-6"
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

          {/* Right: Quick Links */}
          <div className="flex flex-col md:items-end md:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="font-mono-accent text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Quick Links
              </h3>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={link.path}
                      className="block font-heading text-sm text-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-5 h-5">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <polygon
                  points="16,2 28,9 28,23 16,30 4,23 4,9"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                />
                <polygon
                  points="16,8 22,12 22,20 16,24 10,20 10,12"
                  fill="hsl(var(--accent))"
                />
              </svg>
            </div>
            <span className="font-heading font-bold text-xs tracking-wide">JOIN MOMENTUM</span>
          </Link>

          <span className="font-mono-accent text-xs text-muted-foreground">
            © {new Date().getFullYear()} Join Momentum Inc. All rights reserved.
          </span>

          <span className="font-mono-accent text-xs text-muted-foreground text-center md:text-right">
            Communications handled in accordance with applicable security policies.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
