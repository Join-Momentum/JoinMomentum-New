import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const listings = [
  {
    slug: "cyber-threat-intelligence-portfolio-simulation",
    title: "Cyber Threat Intelligence Portfolio Simulation",
    descriptor: "for organisations, agencies, and government departments",
    status: "available" as const,
    oneLiner:
      "A portfolio of intelligence-led cyber simulations that test how your organisation detects, decides, and responds under realistic threat conditions.",
    capabilityTag: "Cyber Security & Critical Infrastructure Defence",
    deliveryModes: ["Online", "In-person", "Location-specific"],
  },
];

const StatusBadge = ({ status }: { status: "available" | "coming_soon" }) => {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent font-mono-accent text-[10px] uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border text-muted-foreground font-mono-accent text-[10px] uppercase tracking-wider">
      <Clock className="w-3 h-3" />
      Coming Soon
    </span>
  );
};

const ListingCard = ({
  listing,
  index,
}: {
  listing: (typeof listings)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Link
        to={`/marketplace/${listing.slug}`}
        className="group relative block bg-card border border-border hover:border-accent transition-all duration-400 p-8 md:p-10"
      >
        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <StatusBadge status={listing.status} />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary border border-border font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-accent" />
            {listing.capabilityTag}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl md:text-2xl mb-1 leading-tight group-hover:text-accent transition-colors duration-300">
          {listing.title}
        </h3>
        <p className="font-mono-accent text-xs text-muted-foreground mb-5">
          {listing.descriptor}
        </p>

        <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-2xl">
          {listing.oneLiner}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {listing.deliveryModes.map((mode) => (
            <span
              key={mode}
              className="font-mono-accent text-[10px] uppercase tracking-wider px-2.5 py-1 bg-secondary border border-border text-muted-foreground"
            >
              {mode}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
          Learn more
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-accent"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
};

const Marketplace = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: howRef, isVisible: howVisible } = useScrollReveal(0.15);

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
            Marketplace
          </motion.span>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Packaged, intelligence-led programmes
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Named, defined programmes that organisations, agencies, and government departments
            can discover and request directly — designed for repeatable, high-value outcomes.
          </motion.p>

          <motion.div
            className="w-20 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Listings */}
      <section className="pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {listings.map((listing, index) => (
            <ListingCard key={listing.slug} listing={listing} index={index} />
          ))}
        </div>
      </section>

      {/* How Marketplace relates to capabilities and solutions */}
      <section
        ref={howRef}
        className="py-20 md:py-28 px-6 md:px-12 bg-card border-y border-border"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.span
            className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent block mb-8"
            initial={{ opacity: 0 }}
            animate={howVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            How It Works
          </motion.span>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Drawn from Capabilities",
                body: "Each Marketplace programme is grounded in one or more of our four core capability domains — providing the intelligence and domain expertise behind the design.",
                link: { label: "View capabilities", path: "/capabilities" },
              },
              {
                step: "02",
                title: "Delivered through Solutions",
                body: "Marketplace listings are delivered using our proven engagement models — principally Training, Exercises & Capacity Development, aligned to your operational context.",
                link: { label: "View solutions", path: "/solutions" },
              },
              {
                step: "03",
                title: "Tailored to your context",
                body: "Logistics, format, participant numbers, and pricing are handled through a Request Detailed Information enquiry — not published as standard rates.",
                link: { label: "Contact us", path: "/contact" },
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={howVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              >
                <span className="font-mono-accent text-xs text-accent mb-4 block">
                  {item.step}
                </span>
                <h3 className="font-heading font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                  {item.body}
                </p>
                <Link
                  to={item.link.path}
                  className="group inline-flex items-center gap-2 text-accent font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
                >
                  {item.link.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="border border-border p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent mb-4">
                Request Information
              </p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
                Enquire about a programme
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                Logistics, format options, and pricing are provided on request. Use the contact
                form to receive a detailed information pack or arrange a scoping call.
              </p>
            </div>
            <Link
              to="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 border border-accent text-accent font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Marketplace;
