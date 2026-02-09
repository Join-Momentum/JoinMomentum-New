import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, RefreshCw, ShieldCheck, Lock, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const approachItems = [
  {
    icon: Target,
    text: "Mission and threat context first",
  },
  {
    icon: Eye,
    text: "Operational realism over abstraction",
  },
  {
    icon: RefreshCw,
    text: "Capability transfer and sustainability",
  },
  {
    icon: ShieldCheck,
    text: "Responsible practice and professional discretion",
  },
];

const securityItems = [
  "Need-to-know access principles",
  "Secure collaboration practices",
  "Partner and supplier governance",
];

const aiItems = [
  "Human oversight and accountability",
  "Traceability and auditability",
  "Risk assessment and mitigation",
  "Clear boundaries for automated decision-making",
];

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: approachRef, isVisible: approachVisible } = useScrollReveal(0.2);
  const { ref: leadershipRef, isVisible: leadershipVisible } = useScrollReveal(0.2);
  const { ref: securityRef, isVisible: securityVisible } = useScrollReveal(0.2);

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            About Join Momentum
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-body text-foreground leading-relaxed max-w-3xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join Momentum Inc exists to help defence and security stakeholders{" "}
            <span className="text-accent font-medium">
              operate effectively in environments defined by uncertainty, risk, and rapid change
            </span>
            .
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            We bring together strategic thinking, operational experience, and disciplined delivery
            to support missions that matter.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Our Approach */}
      <section ref={approachRef} className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={approachVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Approach
          </motion.span>

          <motion.h2
            className="text-2xl md:text-4xl font-heading font-bold mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={approachVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            How we think about the work
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachItems.map((item, index) => (
              <motion.div
                key={item.text}
                className="group p-6 bg-background border border-border hover:border-accent transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={approachVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center mb-5 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="font-heading font-semibold text-foreground leading-snug">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Advisors */}
      <section ref={leadershipRef} className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
                initial={{ opacity: 0 }}
                animate={leadershipVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Leadership & Advisors
              </motion.span>

              <motion.h2
                className="text-2xl md:text-4xl font-heading font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Experienced professionals
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground font-body leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Our leadership and advisory network brings experience across defence, intelligence,
                cyber security, and emerging technology.
              </motion.p>

              <motion.p
                className="text-muted-foreground/70 font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={leadershipVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Details are shared in line with engagement context and security considerations.
              </motion.p>
            </div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={leadershipVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72">
                <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer hexagon */}
                  <polygon
                    points="100,10 177.94,55 177.94,145 100,190 22.06,145 22.06,55"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />
                  
                  {/* Middle hexagon with gradient fill */}
                  <polygon
                    points="100,30 166.51,62.5 166.51,137.5 100,170 33.49,137.5 33.49,62.5"
                    fill="url(#hexGradient)"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Inner hexagon */}
                  <polygon
                    points="100,55 151.96,82.5 151.96,127.5 100,155 48.04,127.5 48.04,82.5"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  
                  {/* Network nodes */}
                  <circle cx="100" cy="30" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="166.51" cy="62.5" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="166.51" cy="137.5" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="100" cy="170" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="33.49" cy="137.5" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="33.49" cy="62.5" r="3" fill="hsl(var(--accent))" opacity="0.5" />
                  
                  {/* Connection lines to center */}
                  <line x1="100" y1="30" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  <line x1="166.51" y1="62.5" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  <line x1="166.51" y1="137.5" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  <line x1="100" y1="170" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  <line x1="33.49" y1="137.5" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  <line x1="33.49" y1="62.5" x2="100" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
                  
                  {/* Shield icon in center */}
                  <g transform="translate(100, 100)">
                    <path
                      d="M0,-22 L18,-14 L18,4 C18,14 9,22 0,26 C-9,22 -18,14 -18,4 L-18,-14 Z"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M-6,0 L-2,4 L6,-4"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  
                  {/* Center node */}
                  <circle cx="100" cy="100" r="4" fill="hsl(var(--accent))" opacity="0.8" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Responsible Practice */}
      <section
        ref={securityRef}
        id="security"
        className="py-20 md:py-28 px-6 md:px-12 bg-secondary/30 border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-6"
            initial={{ opacity: 0 }}
            animate={securityVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Security & Responsible Practice
          </motion.span>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Security & Information Handling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={securityVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-accent/30 bg-accent/5 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl">
                  Security & Information Handling
                </h3>
              </div>

              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We operate with information-handling practices appropriate to sensitive environments,
                including:
              </p>

              <ul className="space-y-3 mb-6">
                {securityItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-body">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground/70 font-body">
                Engagements are scoped to comply with applicable legal, regulatory, and client
                requirements.
              </p>
            </motion.div>

            {/* Responsible Use of AI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={securityVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-accent/30 bg-accent/5 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl">
                  Responsible Use of AI
                </h3>
              </div>

              <p className="text-muted-foreground font-body mb-6 leading-relaxed">
                We support responsible use of AI and emerging technologies through:
              </p>

              <ul className="space-y-3">
                {aiItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
