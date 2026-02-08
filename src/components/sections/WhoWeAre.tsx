import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WhoWeAre = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="who-we-are" className="relative py-20 md:py-30 bg-background">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Red accent line + title */}
        <div className="flex items-center gap-6 mb-12">
          <motion.div
            className="h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 60 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Who We Are
          </motion.span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div className="space-y-6">
            <motion.h2
              className="text-2xl md:text-4xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Advancing national security through strategic partnership
            </motion.h2>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Join Momentum Inc provides expert defence, security, and intelligence consulting to government and industry partners. We bring clarity to complex threat environments and deliver actionable strategies that protect national interests.
            </motion.p>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              With decades of operational experience across military, intelligence, and civilian domains, our team understands both the strategic landscape and the operational detail required to deliver results.
            </motion.p>
          </div>

          {/* Hexagonal visual element */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Rotating hex outlines */}
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <motion.polygon
                  points="100,10 178,55 178,145 100,190 22,145 22,55"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />
                <motion.polygon
                  points="100,30 160,62 160,138 100,170 40,138 40,62"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="0.5"
                  opacity={0.4}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />
                <motion.polygon
                  points="100,50 142,75 142,125 100,150 58,125 58,75"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "100px 100px" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
