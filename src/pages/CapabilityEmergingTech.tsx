import { Cpu } from "lucide-react";
import CapabilityDetailPage from "@/components/templates/CapabilityDetailPage";
import type { CapabilityDetail } from "@/components/templates/CapabilityDetailPage";

const data: CapabilityDetail = {
  slug: "emerging-technology-ai-in-defence",
  title: "Emerging Technology & Artificial Intelligence in Defence",
  eyebrowLabel: "Capabilities · Emerging Technology & AI",
  lead: "For organisations adopting AI and automation in environments where decisions carry mission-critical consequences and accountability cannot be delegated to a model.",
  descriptionIntro:
    "The question is not whether AI and emerging technology will reshape defence and security — it already is. The question is whether your organisation can adopt it responsibly: with genuine operational value, appropriate safeguards, and the governance structures that keep humans accountable for outcomes. We support that transition.",
  details: [
    "Operational value assessment of AI, automation, and emerging technology",
    "Decision-support and analytical tool design for high-stakes environments",
    "Integration of technology into existing command structures and governance",
    "Responsible AI frameworks: safeguards, oversight, and accountability design",
    "Technology risk assessment and failure-mode analysis for mission-critical use",
    "Capability roadmapping for emerging technology adoption in defence contexts",
  ],
  segments: [
    {
      title: "Defence Ministries & Commands",
      body: "Organisations responsible for AI and emerging technology adoption in operational and administrative defence environments.",
    },
    {
      title: "Intelligence Agencies",
      body: "Agencies integrating AI-driven analytics, automation, and decision-support into intelligence production and operational workflows.",
    },
    {
      title: "Government Technology Programmes",
      body: "Cross-departmental technology programmes deploying AI and automation in national security, border, or public-safety contexts.",
    },
    {
      title: "Defence Industry & Primes",
      body: "Contractors and system integrators delivering AI-enabled capability to defence and security clients, requiring assurance and governance design.",
    },
  ],
  engagementModes: [
    {
      title: "Capability Assessment & Roadmapping",
      path: "/solutions/capability-assessment-roadmapping",
      body: "Assess the operational readiness, value, and risk of AI adoption in your specific environment, with a structured adoption roadmap.",
    },
    {
      title: "Training, Exercises & Capacity Development",
      path: "/solutions/training-exercises-capacity-development",
      body: "Build the human capability — analytical, operational, governance — needed to work alongside AI systems safely and effectively.",
    },
    {
      title: "Operational Advisory & Embedded Support",
      path: "/solutions/operational-advisory-embedded-support",
      body: "Practitioner advisory embedded within technology programmes to navigate the intersection of AI capability and operational reality.",
    },
    {
      title: "Service Deployment & Programme Delivery",
      path: "/solutions/service-deployment-programme-delivery",
      body: "End-to-end delivery of an AI-enabled capability or decision-support programme, from design through integration and governance hand-over.",
    },
  ],
  outcomes: [
    "Enhanced operational insight and analytical speed without loss of human control",
    "Reduced technology and deployment risk through structured assurance processes",
    "Governance frameworks that satisfy board, legal, and oversight requirements",
    "Sustainable, mission-aligned capability built for the long term",
    "Organisations that can adopt future technology faster — and more safely",
  ],
  related: [
    {
      title: "Military Intelligence & Operational Advantage",
      path: "/capabilities/military-intelligence-operational-advantage",
    },
    {
      title: "Cyber Security & Critical Infrastructure Defence",
      path: "/capabilities/cyber-security-critical-infrastructure-defence",
    },
    {
      title: "Strategic Communications & Information Operations",
      path: "/capabilities/strategic-communications-information-operations",
    },
  ],
  icon: Cpu,
};

const CapabilityEmergingTech = () => <CapabilityDetailPage data={data} />;

export default CapabilityEmergingTech;
