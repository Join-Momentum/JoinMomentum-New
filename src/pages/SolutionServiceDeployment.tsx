import { Rocket } from "lucide-react";
import SolutionDetailPage from "@/components/templates/SolutionDetailPage";
import type { SolutionDetail } from "@/components/templates/SolutionDetailPage";

const data: SolutionDetail = {
  number: "04",
  title: "Service Deployment & Programme Delivery",
  eyebrowLabel: "Solutions · Deployment",
  lead: "From design to operational capability — built, integrated, and handed over to the people who will sustain it.",
  descriptionIntro:
    "When a capability needs to be stood up, not just advised on, we deliver it. We manage the full programme cycle — from initial design and build through integration with your existing teams, systems, and partners, to a structured transition that leaves the capability in your hands and running. The test is not delivery. It is sustained operational performance after we leave.",
  whenToUse: [
    {
      title: "Establishing a new operational capability",
      body: "When a capability doesn't yet exist and needs to be designed, built, and made operational from the ground up.",
    },
    {
      title: "Scaling or expanding an existing programme",
      body: "When a proven capability needs to be deployed at greater scale, to additional locations, or across additional organisations.",
    },
    {
      title: "Replacing or modernising a legacy capability",
      body: "When an existing service or programme needs to be replaced with a current, fit-for-purpose alternative without capability gaps.",
    },
    {
      title: "Programme turnaround",
      body: "When an in-flight delivery programme is failing and needs experienced programme management to recover it.",
    },
  ],
  steps: [
    {
      number: "01",
      phase: "Design",
      title: "Design",
      body: "We design the capability architecture — what is being built, how it will operate, who will run it, and how it integrates with existing structures.",
    },
    {
      number: "02",
      phase: "Build",
      title: "Stand up",
      body: "We stand up the capability — hiring, configuring, testing, and iterating until the service is proven and operationally ready.",
    },
    {
      number: "03",
      phase: "Integrate",
      title: "Integrate",
      body: "We integrate the capability into your existing teams, systems, and partner arrangements — managing dependencies and reducing transition risk.",
    },
    {
      number: "04",
      phase: "Sustain",
      title: "Hand over",
      body: "We transfer ownership through a structured transition, leaving documented processes, trained personnel, and a sustaining capability your organisation controls.",
    },
  ],
  deliverables: [
    "Programme design including capability architecture, delivery plan, and governance model",
    "Fully stood-up, tested, and operationally validated capability",
    "Integration with existing teams, systems, and partner structures",
    "Documented operating procedures, governance framework, and support model",
    "Structured transition programme with trained personnel and retained knowledge",
    "Post-delivery review and recommendations for programme optimisation",
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
  icon: Rocket,
};

const SolutionServiceDeployment = () => <SolutionDetailPage data={data} />;

export default SolutionServiceDeployment;
