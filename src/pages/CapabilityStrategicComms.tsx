import { Radio } from "lucide-react";
import CapabilityDetailPage from "@/components/templates/CapabilityDetailPage";
import type { CapabilityDetail } from "@/components/templates/CapabilityDetailPage";

const data: CapabilityDetail = {
  slug: "strategic-communications-information-operations",
  title: "Strategic Communications & Information Operations",
  eyebrowLabel: "Capabilities · Strategic Communications",
  lead: "For organisations that need to shape, protect, and defend their narrative in environments where information is contested and institutional credibility is a strategic asset.",
  descriptionIntro:
    "Modern adversaries don't only target systems — they target trust. We support governments, agencies, and organisations operating in contested information environments to understand the threat, strengthen their communications, and respond with clarity and control when it matters most.",
  details: [
    "Counter-narrative development and hostile influence assessment",
    "Strategic communications aligned with national security and operational objectives",
    "Crisis and high-pressure communications capability and readiness",
    "Disinformation detection, analysis, and response planning",
    "Internal communications resilience during security incidents",
    "Messaging frameworks for sensitive or restricted operational contexts",
  ],
  segments: [
    {
      title: "Government Departments",
      body: "Ministries and central government bodies with public communication responsibilities in sensitive, contested, or security-adjacent contexts.",
    },
    {
      title: "Intelligence & Security Agencies",
      body: "Agencies managing institutional credibility, source protection, and counter-influence operations in the information environment.",
    },
    {
      title: "International Organisations",
      body: "Multilateral bodies, coalitions, and international missions where narrative coordination across partners is operationally critical.",
    },
    {
      title: "Critical National Infrastructure",
      body: "Operators and regulators whose public communications during incidents carry national security implications.",
    },
  ],
  engagementModes: [
    {
      title: "Capability Assessment & Roadmapping",
      path: "/solutions/capability-assessment-roadmapping",
      body: "Map your current communications posture, identify influence vulnerabilities, and build a roadmap to close the gaps.",
    },
    {
      title: "Training, Exercises & Capacity Development",
      path: "/solutions/training-exercises-capacity-development",
      body: "Scenario-based exercises that test communications teams under realistic crisis and influence conditions.",
    },
    {
      title: "Operational Advisory & Embedded Support",
      path: "/solutions/operational-advisory-embedded-support",
      body: "Practitioner-level advisory embedded inside your communications or security team for operational engagements.",
    },
    {
      title: "Service Deployment & Programme Delivery",
      path: "/solutions/service-deployment-programme-delivery",
      body: "Full-cycle design and delivery of a strategic communications capability or counter-influence programme.",
    },
  ],
  outcomes: [
    "Improved narrative control under pressure and during live incidents",
    "Reduced institutional exposure to hostile influence operations",
    "Stronger alignment between communications strategy and security objectives",
    "Communications teams that perform under crisis conditions",
    "Clear, tested response frameworks for information environment threats",
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
      title: "Emerging Technology & AI in Defence",
      path: "/capabilities/emerging-technology-ai-in-defence",
    },
  ],
  icon: Radio,
};

const CapabilityStrategicComms = () => <CapabilityDetailPage data={data} />;

export default CapabilityStrategicComms;
