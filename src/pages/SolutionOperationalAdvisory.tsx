import { Shield } from "lucide-react";
import SolutionDetailPage from "@/components/templates/SolutionDetailPage";
import type { SolutionDetail } from "@/components/templates/SolutionDetailPage";

const data: SolutionDetail = {
  number: "03",
  title: "Operational Advisory & Embedded Support",
  eyebrowLabel: "Solutions · Advisory",
  lead: "For when you need the right expertise inside the operation — not consulting from a distance.",
  descriptionIntro:
    "Some problems require presence, not recommendations. We embed practitioners directly into client teams to provide expert input as operational work happens — planning cycles, intelligence and cyber operations, programme delivery, crisis environments. The value is in real-time judgment, not after-the-fact analysis.",
  whenToUse: [
    {
      title: "Running a live programme or operation",
      body: "When you need expert capability integrated into a programme team or operational cycle — not on the outside looking in.",
    },
    {
      title: "Navigating a complex or novel challenge",
      body: "When the problem is ambiguous, sensitive, or without clear precedent, and you need experienced judgment inside the room.",
    },
    {
      title: "Crisis or high-pressure environments",
      body: "During incidents, crises, or high-tempo operational periods when the decision-making environment doesn't allow for deliberate external consultation.",
    },
    {
      title: "Bridging a critical capability gap",
      body: "When an internal skill or experience gap is affecting operational performance and needs to be filled quickly and practically.",
    },
  ],
  steps: [
    {
      number: "01",
      phase: "Scope",
      title: "Scope",
      body: "We agree the specific role, remit, access level, and integration model — matched to your operational structure and sensitivities.",
    },
    {
      number: "02",
      phase: "Integrate",
      title: "Embed",
      body: "Our practitioners join your team in the agreed mode — attending planning cycles, working alongside operations teams, or supporting specific functions.",
    },
    {
      number: "03",
      phase: "Deliver",
      title: "Advise",
      body: "Practitioner-level input provided in real time as decisions are made, problems arise, and the programme progresses.",
    },
    {
      number: "04",
      phase: "Transition",
      title: "Transfer",
      body: "At agreed milestones or programme close, we document findings, transfer knowledge, and support transition to sustainable internal ownership.",
    },
  ],
  deliverables: [
    "Agreed scope, integration model, and operating terms before deployment",
    "Real-time practitioner-level advisory and decision support during the engagement",
    "Documented findings, recommendations, and decisions at agreed milestones",
    "Knowledge transfer and transition support at programme close",
    "Confidential end-of-engagement report covering observations and recommendations",
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
  icon: Shield,
};

const SolutionOperationalAdvisory = () => <SolutionDetailPage data={data} />;

export default SolutionOperationalAdvisory;
