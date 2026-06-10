import { Users } from "lucide-react";
import SolutionDetailPage from "@/components/templates/SolutionDetailPage";
import type { SolutionDetail } from "@/components/templates/SolutionDetailPage";

const data: SolutionDetail = {
  number: "02",
  title: "Training, Exercises & Capacity Development",
  eyebrowLabel: "Solutions · Training & Exercises",
  lead: "Capability is built through experience under pressure — not instruction alone. We develop people and institutions to perform when it counts.",
  descriptionIntro:
    "One-off training events don't build lasting capability. We design and deliver structured programmes that combine role-based instruction, scenario-based exercises, and simulation — creating the repeated, progressive experience that actually changes how people perform under pressure. The goal is always institutional capability that outlasts the programme.",
  whenToUse: [
    {
      title: "Building capability from a new baseline",
      body: "When a team, department, or organisation needs to develop a capability from scratch or from a low starting point.",
    },
    {
      title: "Testing readiness before an event or deadline",
      body: "Pre-deployment, pre-launch, or before a high-stakes operational period when you need to know your teams are ready.",
    },
    {
      title: "Maintaining capability between exercises",
      body: "Structured programmes that keep capability live between major exercises or operational cycles.",
    },
    {
      title: "Cross-functional coordination failures",
      body: "When incidents or reviews reveal that teams fail to coordinate effectively — exercises build the shared mental models that fix this.",
    },
  ],
  steps: [
    {
      number: "01",
      phase: "Design",
      title: "Design",
      body: "We design the programme around your capability objectives, audience, and threat context — not a generic template.",
    },
    {
      number: "02",
      phase: "Build",
      title: "Build",
      body: "Scenarios, exercises, and materials are built using current, relevant intelligence and validated against your specific operating environment.",
    },
    {
      number: "03",
      phase: "Deliver",
      title: "Run",
      body: "We facilitate the training and exercises — managing pace, stress, and realism to maximise learning and performance outcomes.",
    },
    {
      number: "04",
      phase: "Sustain",
      title: "Embed",
      body: "After-action reviews, evaluation frameworks, and follow-on recommendations build the institutional memory that sustains the capability.",
    },
  ],
  deliverables: [
    "A tailored programme design aligned to your capability objectives and audience",
    "Scenario library built from current, relevant threat intelligence",
    "Facilitated training and exercise delivery — online, in-person, or hybrid",
    "After-action reports with findings, observed strengths, and prioritised gaps",
    "Evaluation and progression frameworks for ongoing capability measurement",
    "Recommendations for sustaining and developing capability between programmes",
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
  marketplaceItem: {
    title: "Cyber Threat Intelligence Portfolio Simulation",
    path: "/marketplace/cyber-threat-intelligence-portfolio-simulation",
  },
  icon: Users,
};

const SolutionTrainingExercises = () => <SolutionDetailPage data={data} />;

export default SolutionTrainingExercises;
