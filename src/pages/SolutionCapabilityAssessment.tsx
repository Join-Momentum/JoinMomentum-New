import { Target } from "lucide-react";
import SolutionDetailPage from "@/components/templates/SolutionDetailPage";
import type { SolutionDetail } from "@/components/templates/SolutionDetailPage";

const data: SolutionDetail = {
  number: "01",
  title: "Capability Assessment & Roadmapping",
  eyebrowLabel: "Solutions · Assessment",
  lead: "Before you can close a capability gap, you need to know exactly where it is — and what closing it will realistically take.",
  descriptionIntro:
    "Most organisations underestimate their gaps and overestimate their readiness. Our assessment process gives you an honest, structured picture of where your capability stands against operational requirements — and a prioritised roadmap for getting to where it needs to be. It is the foundation for every other engagement we deliver.",
  whenToUse: [
    {
      title: "Starting a new programme",
      body: "Before committing resources to a new capability or security programme, assess the current state to ensure you're solving the right problem.",
    },
    {
      title: "Strategic review or reset",
      body: "When existing capabilities need to be re-evaluated against a changed threat environment or organisational mandate.",
    },
    {
      title: "Post-incident or near-miss",
      body: "After a security incident, exercise failure, or identified gap, to understand root causes and build a remediation plan.",
    },
    {
      title: "Board or governance requirement",
      body: "When leadership or oversight bodies require an independent assessment of capability and risk posture.",
    },
  ],
  steps: [
    {
      number: "01",
      phase: "Discovery",
      title: "Understand",
      body: "We map your current operating environment, threat context, existing capability, and stated objectives through structured review and targeted interviews.",
    },
    {
      number: "02",
      phase: "Analysis",
      title: "Assess",
      body: "We assess capability against operational requirements — identifying gaps, dependencies, and risks across people, process, and technology.",
    },
    {
      number: "03",
      phase: "Design",
      title: "Design",
      body: "We design the target state: what capability is needed, in what form, and through which delivery model — with a clear operating and governance structure.",
    },
    {
      number: "04",
      phase: "Roadmap",
      title: "Prioritise",
      body: "We produce a prioritised, actionable roadmap with near-term and long-term recommendations sequenced by impact, feasibility, and risk.",
    },
  ],
  deliverables: [
    "Clear problem definition and scope of the capability challenge",
    "Current-state assessment across people, process, and technology",
    "Gap analysis against operational requirements and threat profile",
    "Target operating and governance model for the capability",
    "Prioritised capability roadmap with near-term and long-term recommendations",
    "Executive summary suitable for board or senior leadership review",
  ],
  capabilities: [
    {
      title: "Strategic Communications & Information Operations",
      path: "/capabilities/strategic-communications-information-operations",
    },
    {
      title: "Cyber Security & Critical Infrastructure Defence",
      path: "/capabilities/cyber-security-critical-infrastructure-defence",
    },
    {
      title: "Military Intelligence & Operational Advantage",
      path: "/capabilities/military-intelligence-operational-advantage",
    },
    {
      title: "Emerging Technology & AI in Defence",
      path: "/capabilities/emerging-technology-ai-in-defence",
    },
  ],
  icon: Target,
};

const SolutionCapabilityAssessment = () => <SolutionDetailPage data={data} />;

export default SolutionCapabilityAssessment;
