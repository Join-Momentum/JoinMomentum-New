import { ShieldCheck } from "lucide-react";
import CapabilityDetailPage from "@/components/templates/CapabilityDetailPage";
import type { CapabilityDetail } from "@/components/templates/CapabilityDetailPage";

const data: CapabilityDetail = {
  slug: "cyber-security-critical-infrastructure-defence",
  title: "Cyber Security & Critical Infrastructure Defence",
  eyebrowLabel: "Capabilities · Cyber Security",
  lead: "For organisations where a disruption to digital or physical infrastructure carries national, operational, or strategic consequences.",
  descriptionIntro:
    "Critical systems — energy grids, communications networks, financial infrastructure, government platforms — are not just operational dependencies. They are strategic targets. We help the organisations that own and operate them to understand their threat exposure, strengthen their defences, and respond with confidence when incidents occur.",
  details: [
    "Cyber risk and resilience assessment against current threat actors",
    "Defensive architecture review and security control design",
    "Incident response readiness, planning, and exercises",
    "SOC capability development and detection improvement",
    "Integration of cyber defence into wider security and resilience operations",
    "Governance, oversight, and regulatory alignment for cyber risk",
  ],
  segments: [
    {
      title: "Critical National Infrastructure",
      body: "Energy, telecommunications, water, transport, and health operators with high-consequence digital exposure and national security obligations.",
    },
    {
      title: "Government & Defence",
      body: "Departments, agencies, and defence organisations with classified or operationally sensitive systems requiring protection and assurance.",
    },
    {
      title: "Financial Services",
      body: "Institutions with systemic cyber risk exposure and regulatory requirements for resilience, incident response, and assurance.",
    },
    {
      title: "International Partners",
      body: "Allied governments and multilateral organisations requiring cyber resilience capability in complex, multi-jurisdiction environments.",
    },
  ],
  engagementModes: [
    {
      title: "Capability Assessment & Roadmapping",
      path: "/solutions/capability-assessment-roadmapping",
      body: "Structured assessment of your current cyber posture, threat exposure, and gaps — with a prioritised roadmap to close them.",
    },
    {
      title: "Training, Exercises & Capacity Development",
      path: "/solutions/training-exercises-capacity-development",
      body: "Intelligence-led simulations that test your detection, decision-making, and response capability under realistic conditions.",
    },
    {
      title: "Operational Advisory & Embedded Support",
      path: "/solutions/operational-advisory-embedded-support",
      body: "Practitioner-level advisory embedded with your security or resilience team for live programmes and planning cycles.",
    },
    {
      title: "Service Deployment & Programme Delivery",
      path: "/solutions/service-deployment-programme-delivery",
      body: "Full-cycle delivery of a defined cyber security capability, from design through integration and hand-over.",
    },
  ],
  outcomes: [
    "Reduced operational disruption from cyber incidents",
    "Faster detection and coordinated response across technical and executive levels",
    "Governance and risk posture that meets board and regulatory requirements",
    "SOC and security teams that perform under realistic incident conditions",
    "Clear, tested incident response procedures integrated with crisis management",
  ],
  related: [
    {
      title: "Emerging Technology & AI in Defence",
      path: "/capabilities/emerging-technology-ai-in-defence",
    },
    {
      title: "Military Intelligence & Operational Advantage",
      path: "/capabilities/military-intelligence-operational-advantage",
    },
    {
      title: "Strategic Communications & Information Operations",
      path: "/capabilities/strategic-communications-information-operations",
    },
  ],
  marketplaceItem: {
    title: "Cyber Threat Intelligence Portfolio Simulation",
    path: "/marketplace/cyber-threat-intelligence-portfolio-simulation",
    tag: "Cyber Security",
  },
  icon: ShieldCheck,
};

const CapabilityCyberSecurity = () => <CapabilityDetailPage data={data} />;

export default CapabilityCyberSecurity;
