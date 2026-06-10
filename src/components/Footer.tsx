import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

const capabilities = [
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
];

const engageLinks = [
  { name: "Solutions", path: "/solutions" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Who We Serve", path: "/who-we-serve" },
  { name: "Capability Statement", path: "/capability-statement" },
  { name: "Gallery", path: "/gallery/photos" },
  { name: "Insights", path: "/insights" },
  { name: "Contact", path: "/contact" },
];

const trustLinks = [
  { name: "Security & Responsible Practice", path: "/security-responsible-practice" },
  { name: "Responsible Use of AI", path: "/responsible-use-of-ai" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Use", path: "/terms-of-use" },
  { name: "Cookie Policy", path: "/legal/cookies" },
];

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
    {children}
  </h3>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="font-body text-sm text-foreground/70 hover:text-accent transition-colors duration-200 leading-snug"
    >
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Four-column grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-7 h-7">
                <img src="/favicon.png" alt="Join Momentum" />
              </div>
              <span className="font-heading font-bold text-xs tracking-wide">JOIN MOMENTUM</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              A defence and security capability partner supporting governments, security
              institutions, and mission-critical organisations in complex environments.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground font-body">
              <li>
                <a
                  href="mailto:enquiries@joinmomentum.com"
                  className="hover:text-accent transition-colors duration-200"
                >
                  enquiries@joinmomentum.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Capabilities */}
          <div>
            <FooterHeading>Capabilities</FooterHeading>
            <ul className="space-y-3">
              {capabilities.map((cap) => (
                <FooterLink key={cap.path} to={cap.path}>
                  {cap.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 3: Engage */}
          <div>
            <FooterHeading>Engage</FooterHeading>
            <ul className="space-y-3">
              {engageLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div>
            <FooterHeading>Trust & Legal</FooterHeading>
            <ul className="space-y-3">
              {trustLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Base bar */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono-accent text-xs text-muted-foreground">
            © {year} Join Momentum Inc. All rights reserved.
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <span className="font-mono-accent text-xs text-muted-foreground text-center sm:text-right">
            Jurisdiction to confirm — counsel review pending.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
