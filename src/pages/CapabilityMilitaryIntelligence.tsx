import { Radar } from "lucide-react";
import CapabilityDetailPage from "@/components/templates/CapabilityDetailPage";
import type { CapabilityDetail } from "@/components/templates/CapabilityDetailPage";

const data: CapabilityDetail = {
  slug: "military-intelligence-operational-advantage",
  title: "Military Intelligence & Operational Advantage",
  eyebrowLabel: "Capabilities · Military Intelligence",
  lead: "For intelligence and operational teams that need to make faster, better decisions in complex, contested environments — where uncertainty is constant and the cost of error is high.",
  descriptionIntro:
    "Decision advantage is not simply about having more information — it is about having the right information, processed correctly, at the right time, by people who know how to act on it. We support intelligence and operational teams to build and sustain the processes, skills, and structures that turn intelligence into operational advantage.",
  details: [
    "Intelligence analysis methodology, fusion processes, and analytical rigour",
    "Situational awareness architecture and decision-support design",
    "Leadership capability development for complex operational environments",
    "Intelligence-to-operations integration and cycle optimisation",
    "Assessment frameworks for ambiguous and high-pressure scenarios",
    "Institutional capability for sustained intelligence advantage",
  ],
  segments: [
    {
      title: "Military & Defence Organisations",
      body: "Land, maritime, air, and joint commands requiring enhanced intelligence process, analytical capability, and decision-support structures.",
    },
    {
      title: "Intelligence Agencies",
      body: "National and military intelligence bodies seeking to improve analysis quality, fusion processes, and operational integration.",
    },
    {
      title: "Government Departments",
      body: "Ministries and departments with national security, defence policy, or operational planning responsibilities.",
    },
    {
      title: "Allied & Partner Forces",
      body: "Coalition partners, allied nations, and multilateral missions requiring capability development in joint intelligence environments.",
    },
  ],
  engagementModes: [
    {
      title: "Capability Assessment & Roadmapping",
      path: "/solutions/capability-assessment-roadmapping",
      body: "Structured assessment of intelligence processes, analytical gaps, and decision-support architecture against operational requirements.",
    },
    {
      title: "Training, Exercises & Capacity Development",
      path: "/solutions/training-exercises-capacity-development",
      body: "Scenario-based exercises and structured training that build analytical and decision-making capability under operational pressure.",
    },
    {
      title: "Operational Advisory & Embedded Support",
      path: "/solutions/operational-advisory-embedded-support",
      body: "Practitioner-level advisory embedded within intelligence or operational planning teams during live programmes.",
    },
    {
      title: "Service Deployment & Programme Delivery",
      path: "/solutions/service-deployment-programme-delivery",
      body: "Design and full-cycle delivery of an intelligence capability or decision-support system, from concept through operational hand-over.",
    },
  ],
  outcomes: [
    "Faster, better-informed decisions at the point of operational need",
    "Improved intelligence-to-operations integration and cycle speed",
    "Enhanced analytical rigour and reduced assessment error under pressure",
    "Leadership that performs effectively in complex, ambiguous environments",
    "Sustained institutional capability that outlasts any single programme",
  ],
  related: [
    {
      title: "Strategic Communications & Information Operations",
      path: "/capabilities/strategic-communications-information-operations",
    },
    {
      title: "Emerging Technology & AI in Defence",
      path: "/capabilities/emerging-technology-ai-in-defence",
    },
    {
      title: "Cyber Security & Critical Infrastructure Defence",
      path: "/capabilities/cyber-security-critical-infrastructure-defence",
    },
  ],
  icon: Radar,
};

const CapabilityMilitaryIntelligence = () => <CapabilityDetailPage data={data} />;

export default CapabilityMilitaryIntelligence;
