import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const values = [
  {
    number: "01",
    title: "Discretion",
    description: "We operate with the highest standards of confidentiality. Information shared with us remains protected.",
  },
  {
    number: "02",
    title: "Precision",
    description: "Every recommendation is grounded in rigorous analysis. We deliver actionable intelligence, not speculation.",
  },
  {
    number: "03",
    title: "Integrity",
    description: "Our counsel is independent and objective. We serve our clients' interests without compromise.",
  },
  {
    number: "04",
    title: "Excellence",
    description: "We maintain the highest professional standards. Our work reflects decades of accumulated expertise.",
  },
];

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal(0.2);
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal(0.2);
  const { ref: leadershipRef, isVisible: leadershipVisible } = useScrollReveal(0.2);

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
            About Us
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Built on trust, driven by results
          </motion.h1>

          <motion.div
            className="w-20 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={missionRef} className="pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <motion.p
              className="text-xl md:text-2xl font-body text-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={missionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join Momentum Inc provides strategic advisory services to governments, 
              defence organizations, and enterprises navigating complex security challenges.
            </motion.p>
            <motion.p
              className="text-muted-foreground font-body leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={missionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Founded by professionals with extensive experience in national security, 
              defence operations, and institutional transformation, we bring a unique 
              perspective to every engagement. Our approach combines deep domain expertise 
              with a commitment to practical, implementable solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="pb-20 md:pb-28 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto py-20 md:py-28">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={valuesVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Values
          </motion.span>

          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Principles that guide our work
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.number}
                className="flex gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <span className="font-mono-accent text-accent text-sm flex-shrink-0">
                  {value.number}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section ref={leadershipRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={leadershipVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Leadership
          </motion.span>

          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={leadershipVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Experienced professionals
          </motion.h2>

          <motion.div
            className="bg-card border border-border p-8 md:p-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={leadershipVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 flex items-center justify-center border border-accent/50">
                <svg viewBox="0 0 32 32" className="w-5 h-5">
                  <polygon
                    points="16,2 28,9 28,23 16,30 4,23 4,9"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 14 L16 10 L20 14 M16 10 L16 22"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="font-mono-accent text-xs text-muted-foreground uppercase tracking-wider">
                Secure Information
              </span>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Leadership details shared upon engagement.
            </p>
            <p className="text-muted-foreground/60 font-body text-sm">
              Information provided in appropriate contexts.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
