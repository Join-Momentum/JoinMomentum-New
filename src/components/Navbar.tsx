import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

// ─── Mega-menu data ──────────────────────────────────────────────────────────

const megaMenus = [
  {
    key: "capabilities",
    label: "Capabilities",
    path: "/capabilities",
    items: [
      {
        name: "Strategic Communications & Information Operations",
        path: "/capabilities/strategic-communications-information-operations",
      },
      {
        name: "Cyber Security & Critical Infrastructure Defence",
        path: "/capabilities/cyber-security-critical-infrastructure-defence",
      },
      {
        name: "Military Intelligence & Operational Advantage",
        path: "/capabilities/military-intelligence-operational-advantage",
      },
      {
        name: "Emerging Technology & AI in Defence",
        path: "/capabilities/emerging-technology-ai-in-defence",
      },
    ],
    cta: { label: "View all capabilities", path: "/capabilities" },
  },
  {
    key: "solutions",
    label: "Solutions",
    path: "/solutions",
    items: [
      {
        name: "Capability Assessment & Roadmapping",
        path: "/solutions/capability-assessment-roadmapping",
      },
      {
        name: "Training, Exercises & Capacity Development",
        path: "/solutions/training-exercises-capacity-development",
      },
      {
        name: "Operational Advisory & Embedded Support",
        path: "/solutions/operational-advisory-embedded-support",
      },
      {
        name: "Service Deployment & Programme Delivery",
        path: "/solutions/service-deployment-programme-delivery",
      },
    ],
    cta: { label: "Request a capability discussion", path: "/contact" },
  },
  {
    key: "marketplace",
    label: "Marketplace",
    path: "/marketplace",
    items: [
      {
        name: "Cyber Threat Intelligence Portfolio Simulation",
        path: "/marketplace/cyber-threat-intelligence-portfolio-simulation",
        tag: "Cyber Security",
      },
    ],
    cta: { label: "View the Marketplace", path: "/marketplace" },
  },
  {
    key: "insights",
    label: "Insights",
    path: "/insights",
    items: [
      { name: "Photo Gallery", path: "/gallery/photos" },
      { name: "Video Gallery", path: "/gallery/videos" },
    ],
    cta: { label: "View Insights", path: "/insights" },
  },
] as const;

type MegaKey = (typeof megaMenus)[number]["key"];

const simpleLinks = [
  { name: "Who We Serve", path: "/who-we-serve" },
  { name: "About", path: "/about" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MegaKey | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMega(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const openMega = (key: MegaKey) => {
    clearTimeout(hoverTimeout.current);
    setActiveMega(key);
  };

  const closeMega = () => {
    hoverTimeout.current = setTimeout(() => setActiveMega(null), 140);
  };

  const keepMegaOpen = () => clearTimeout(hoverTimeout.current);

  const activeMenu = megaMenus.find((m) => m.key === activeMega) ?? null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen || activeMega
          ? "bg-background border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* ── Main nav bar ── */}
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8">
              <img src="/favicon.png" alt="Join Momentum" />
            </div>
            <span className="font-heading font-bold text-sm tracking-wide">JOIN MOMENTUM</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Mega-menu triggers */}
            {megaMenus.map((menu) => (
              <button
                key={menu.key}
                onMouseEnter={() => openMega(menu.key)}
                onMouseLeave={closeMega}
                onClick={() => setActiveMega(activeMega === menu.key ? null : menu.key)}
                className={`relative flex items-center gap-1 px-3 py-2 font-mono-accent text-xs uppercase tracking-widest transition-colors duration-200 ${
                  activeMega === menu.key || location.pathname.startsWith(menu.path)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-expanded={activeMega === menu.key}
                aria-haspopup="true"
              >
                {menu.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeMega === menu.key ? "rotate-180 text-accent" : ""
                  }`}
                />
                {(activeMega === menu.key || location.pathname.startsWith(menu.path)) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Simple links */}
            {simpleLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => { clearTimeout(hoverTimeout.current); setActiveMega(null); }}
                className={`relative px-3 py-2 font-mono-accent text-xs uppercase tracking-widest transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center ml-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-accent text-accent font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Request a capability discussion
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Desktop mega-menu panel ── */}
      <AnimatePresence>
        {activeMega && activeMenu && (
          <motion.div
            key={activeMega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={keepMegaOpen}
            onMouseLeave={closeMega}
            className="hidden lg:block absolute top-full left-0 right-0 bg-background border-b border-border"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
              <div className="flex gap-16">
                {/* Items */}
                <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-1">
                  {activeMenu.items.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        to={item.path}
                        className="group flex items-center justify-between gap-3 py-3 border-b border-border/50 hover:border-accent/50 transition-colors duration-200"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-200 leading-snug">
                          {item.name}
                        </span>
                        {"tag" in item && item.tag && (
                          <span className="flex-shrink-0 font-mono-accent text-[9px] uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5">
                            {item.tag}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Right column: CTA */}
                <div className="flex flex-col justify-between w-48 flex-shrink-0">
                  <div>
                    <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground block mb-4">
                      {activeMenu.label}
                    </span>
                    <div className="w-6 h-px bg-accent mb-4" />
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {activeMenu.key === "capabilities" && "Four interconnected domains — each can be engaged independently."}
                      {activeMenu.key === "solutions" && "Four delivery models for bespoke engagements."}
                      {activeMenu.key === "marketplace" && "Named, packaged programmes available to organisations directly."}
                      {activeMenu.key === "insights" && "Selected anonymised imagery and video from Join Momentum delivery and engagements."}
                    </p>
                  </div>
                  <Link
                    to={activeMenu.cta.path}
                    className="group mt-6 inline-flex items-center gap-2 text-accent font-heading font-semibold text-xs uppercase tracking-wider hover:gap-3 transition-all duration-300"
                    onClick={() => setActiveMega(null)}
                  >
                    {activeMenu.cta.label}
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {/* Mega-menu items (expandable) */}
              {megaMenus.map((menu, idx) => (
                <motion.div
                  key={menu.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <button
                    className="w-full flex items-center justify-between py-3 font-mono-accent text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === menu.key ? null : menu.key)
                    }
                    aria-expanded={mobileExpanded === menu.key}
                  >
                    {menu.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileExpanded === menu.key ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === menu.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-4 space-y-1 border-l border-accent/30 ml-2">
                          {menu.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="block py-2 font-body text-sm text-muted-foreground hover:text-accent transition-colors leading-snug"
                            >
                              {item.name}
                            </Link>
                          ))}
                          <Link
                            to={menu.cta.path}
                            className="flex items-center gap-1.5 pt-1 font-mono-accent text-xs uppercase tracking-wider text-accent"
                          >
                            {menu.cta.label}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Simple links */}
              {simpleLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (megaMenus.length + idx) * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 font-mono-accent text-sm uppercase tracking-widest transition-colors ${
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (megaMenus.length + simpleLinks.length) * 0.06 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  Request a capability discussion
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
