// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleCapability =
  | "cyber-security"
  | "strategic-comms"
  | "military-intel"
  | "emerging-tech"
  | "capability-development";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "divider" };

export type Article = {
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  capability: ArticleCapability;
  readingTime: number;
  heroImage: string;
  excerpt: string;
  body: ContentBlock[];
};

export const capabilityLabels: Record<ArticleCapability, string> = {
  "cyber-security": "Cyber Security",
  "strategic-comms": "Strategic Communications",
  "military-intel": "Military Intelligence",
  "emerging-tech": "Emerging Technology & AI",
  "capability-development": "Capability Development",
};

// ─── Articles ─────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  // ── 1. Cyber resilience ──────────────────────────────────────────────────
  {
    slug: "beyond-compliance-cyber-resilience-critical-infrastructure",
    title:
      "Beyond Compliance: Building Genuine Cyber Resilience in Critical Infrastructure",
    author: "James Whitfield",
    authorRole: "Senior Advisor — Cyber Security",
    publishedAt: "2026-05-14",
    capability: "cyber-security",
    readingTime: 9,
    heroImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&h=800&fit=crop&q=80",
    excerpt:
      "Compliance frameworks are necessary but insufficient. Genuinely resilient critical infrastructure operators don't treat compliance as an endpoint — they use it as a floor from which to build.",
    body: [
      {
        type: "paragraph",
        text: "Most critical infrastructure operators have invested heavily in compliance frameworks — NIST, ISO 27001, the NIS2 Directive, and sector-specific standards. Those frameworks exist for good reasons. They establish minimum controls, create accountability structures, and give regulators a common baseline from which to assess. The problem is not the frameworks themselves. The problem is when compliance becomes the goal rather than the means.",
      },
      {
        type: "paragraph",
        text: "An organisation that has passed its most recent assessment, satisfied its auditors, and filed its reports is not necessarily secure. It may be compliant. Those are different things — and in operational security contexts, the difference is often decisive.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the frameworks don't test",
      },
      {
        type: "paragraph",
        text: "Compliance frameworks assess whether controls are in place. They rarely assess whether those controls are effective against the specific threats facing your organisation, integrated with each other and with operational processes, or understood and reliably executed by the people responsible for them.",
      },
      {
        type: "paragraph",
        text: "A firewall that is documented, configured, and audited is a compliance artefact. A firewall that blocks a specific class of threat before it reaches systems that cannot tolerate downtime is a security control. The first satisfies auditors. The second protects operations.",
      },
      {
        type: "blockquote",
        text: "The adversary is not reading your compliance documentation. They are probing your actual controls, looking for gaps between what the paperwork says and what the systems do.",
      },
      {
        type: "heading",
        level: 2,
        text: "Three structural gaps compliance doesn't close",
      },
      {
        type: "list",
        items: [
          "Detection latency. Most frameworks require detection capabilities to be in place. Few require them to be tested against adversary tactics that have evolved since the framework was written. Organisations frequently find, during exercises, that detection takes three to five times longer than their plans assume — because the plans were written around the framework, not the threat.",
          "Coordination failures. A single team's response capability is rarely the limiting factor in a real incident. What breaks down is coordination — between security and IT operations, between technical and executive decision-makers, between internal teams and external dependencies. Compliance frameworks rarely test this.",
          "Recovery in practice. Recovery objectives are documented almost universally. Recovery capability is tested far less frequently, and almost never under realistic conditions. The difference between a Recovery Time Objective on paper and actual recovery in a live incident can be measured in days.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "From compliance to genuine resilience",
      },
      {
        type: "paragraph",
        text: "Genuine resilience is not built by replacing compliance frameworks — it is built by extending beyond them. Use the compliance baseline to ensure foundational controls are in place, then layer on the testing, integration, and human capability that frameworks don't require but incidents demand.",
      },
      {
        type: "paragraph",
        text: "The operators who respond most effectively to incidents share three characteristics: they test their actual response — not their planned response — through realistic exercises; they have rehearsed coordination between technical and executive levels, not just documented it; and they treat recovery as an operational capability that degrades without maintenance, not as a plan on a shelf.",
      },
      {
        type: "heading",
        level: 2,
        text: "The question that matters",
      },
      {
        type: "paragraph",
        text: "Before the next assessment cycle, before the next audit, ask a different question: if an adversary with current tradecraft targeted your most critical system today, what would actually happen? How long would detection take? Who would make which decisions, in what order, with what authority? How long would recovery take in practice?",
      },
      {
        type: "paragraph",
        text: "If you can answer those questions with confidence, your resilience programme is working. If you cannot, compliance may be meeting the regulator's requirements — but it is not protecting the operation.",
      },
    ],
  },

  // ── 2. Information operations ────────────────────────────────────────────
  {
    slug: "influence-operations-targeting-institutional-credibility",
    title:
      "How Adversaries Target Institutional Credibility — And What Defenders Need to Understand",
    author: "Dr. Amara Osei",
    authorRole: "Senior Advisor — Strategic Communications",
    publishedAt: "2026-04-22",
    capability: "strategic-comms",
    readingTime: 8,
    heroImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&h=800&fit=crop&q=80",
    excerpt:
      "The most sophisticated influence operations don't fabricate evidence. They exploit genuine tensions, amplify legitimate grievances, and manufacture doubt about the institutions charged with managing them.",
    body: [
      {
        type: "paragraph",
        text: "There is a persistent misconception about how influence operations work. Public discourse tends to focus on disinformation — fabricated content, fake accounts, coordinated inauthentic behaviour. These are real and documented. But the most sophisticated and durable influence operations are built on something harder to counter: exploiting what is already true.",
      },
      {
        type: "paragraph",
        text: "Effective adversarial influence does not usually require fabrication. It requires amplification — finding genuine divisions, legitimate grievances, and real institutional failures, and then systematically enlarging them until they crowd out confidence in the institutions charged with managing them.",
      },
      {
        type: "heading",
        level: 2,
        text: "The target is trust, not opinion",
      },
      {
        type: "paragraph",
        text: "Understanding this reorients the defence problem. The objective of most serious influence operations is not to change what specific individuals believe about specific issues. The objective is to erode the institutional trust that allows societies, organisations, and governments to function — to produce a generalised condition in which nothing official can be taken at face value.",
      },
      {
        type: "blockquote",
        text: "When institutional credibility is the target, the attack succeeds not when people believe the adversary's narrative, but when they stop believing anyone's.",
      },
      {
        type: "heading",
        level: 2,
        text: "How modern operations are structured",
      },
      {
        type: "list",
        items: [
          "Seeding. Content — sometimes fabricated, often selectively edited or decontextualised — is introduced into information ecosystems through channels that give it initial credibility: fringe media, foreign-language platforms, or ostensibly independent social accounts.",
          "Amplification. Coordinated networks amplify the content across platforms and audiences, creating the appearance of organic spread. By the time mainstream audiences encounter the narrative, it appears to have independent provenance.",
          "Legitimisation. Once a narrative is circulating widely, elements of mainstream media and commentary begin to engage with it — often critically, but in doing so they give it additional reach and apparent legitimacy.",
          "Anchoring. Even after a narrative is debunked, residual doubt often persists. The correction rarely reaches the same audiences with the same force as the original claim. The anchoring effect is the real damage.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Why institutional credibility is particularly vulnerable",
      },
      {
        type: "paragraph",
        text: "Institutions face a structural disadvantage in the information environment: they are held to higher standards of evidence and accuracy than adversarial actors, they operate under constraints — legal, political, and reputational — that adversaries do not, and they are often slow by design (deliberation, oversight, accountability). Adversaries exploit all three.",
      },
      {
        type: "heading",
        level: 2,
        text: "What effective defence looks like",
      },
      {
        type: "paragraph",
        text: "Effective defence against influence operations is not primarily a communications function — it is a security and intelligence function that communications supports. Detection matters more than response: by the time a narrative requires active rebuttal, the damage is already partially done.",
      },
      {
        type: "paragraph",
        text: "Organisations with genuine resilience to influence operations invest in pre-crisis credibility — they work to make institutional trust a genuine asset before they need to draw on it. They monitor the information environment systematically for early indicators of targeting, not just for content about them. And they have prepared, tested communications responses for the scenarios most likely to be weaponised against them — rather than treating each incident as novel.",
      },
    ],
  },

  // ── 3. Military intelligence ─────────────────────────────────────────────
  {
    slug: "intelligence-led-operations-analysis-decision-framework",
    title:
      "Intelligence-Led Operations: Closing the Gap Between Analysis and Decision",
    author: "Col. (Ret.) Marcus Hughes",
    authorRole: "Senior Advisor — Military Intelligence",
    publishedAt: "2026-03-10",
    capability: "military-intel",
    readingTime: 10,
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=800&fit=crop&q=80",
    excerpt:
      "In most operational failures, the problem was not the quality of the intelligence. The problem was what happened — or failed to happen — between analysis and decision.",
    body: [
      {
        type: "paragraph",
        text: "Post-operation reviews share a recurring pattern. When things went wrong, the intelligence was often available — sometimes it was even correctly assessed. What failed was the translation: the process by which intelligence became understanding, and understanding became decision, and decision became action at the right speed.",
      },
      {
        type: "paragraph",
        text: "This is not primarily an intelligence problem. It is a structural problem — and it is one that investment in better collection, better analytics, or more sophisticated reporting does not automatically fix.",
      },
      {
        type: "heading",
        level: 2,
        text: "The gap is structural, not analytical",
      },
      {
        type: "paragraph",
        text: "Intelligence analysis and operational decision-making are typically run as separate processes, often by separate teams, sometimes in separate locations, and frequently on different timelines. The intelligence cycle — collection, processing, analysis, dissemination — does not map cleanly onto the decision cycle that commanders and planners actually operate. The result is a chronic mismatch: intelligence that arrives too late, at the wrong level, in a format unsuited to the decision being made.",
      },
      {
        type: "blockquote",
        text: "The question is not 'do we have the intelligence?' The question is 'does the intelligence reach the right person, in the right form, at the right moment in the decision process?' Those are different problems with different solutions.",
      },
      {
        type: "heading",
        level: 2,
        text: "Four reasons the gap persists",
      },
      {
        type: "list",
        items: [
          "Dissemination formats are optimised for completeness, not utility. Analytical products that answer the question 'what do we know?' are not the same as products that answer 'what should I do?' The former satisfies the analyst. The latter serves the commander.",
          "Timelines are mismatched. Intelligence cycles are structured around periodic production rhythms. Operational decisions do not wait for the next cycle. Intelligence that arrives after a decision window has closed is, for that decision, worthless.",
          "Intelligence and operations don't share a common picture. The best analytical picture and the operational planning picture are frequently not synchronised — either technically, in terms of common operating environments, or conceptually, in terms of shared frameworks for interpreting the situation.",
          "Leaders are not trained to use intelligence under pressure. Understanding a finished intelligence product during a briefing is a different skill from interrogating a partially-developed picture under time pressure while simultaneously managing other operational factors. The second skill is rarely trained explicitly.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Closing the gap: four structural changes",
      },
      {
        type: "paragraph",
        text: "The interventions that reliably close the intelligence-decision gap share a common characteristic: they work on the interface between intelligence and operations, not on either function in isolation.",
      },
      {
        type: "list",
        items: [
          "Integrate intelligence into the planning process, not as an input to it. When intelligence staff are present at planning sessions — not as briefers but as participants — dissemination format and timing align with the actual decision process.",
          "Develop decision-support products alongside analytical products. The analytical record and the decision-support output serve different purposes. Separating them explicitly allows each to be optimised for its audience.",
          "Rehearse intelligence use, not just intelligence production. Exercises and simulations that require decision-makers to work with intelligence under time and ambiguity pressure build the skills that static briefings cannot.",
          "Measure decision latency, not just collection and analysis quality. If the cycle is not producing decisions at the required speed, the measurement framework should surface that — not just report on the quality of what was collected.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The capability that endures",
      },
      {
        type: "paragraph",
        text: "Intelligence-led operations is an aspiration that many organisations hold but few fully achieve. The organisations that come closest are not necessarily those with the best collection capabilities or the most sophisticated analytical platforms. They are the ones where the people who produce intelligence and the people who use it have built — through shared experience, common frameworks, and repeated practice — the mutual understanding that makes the interface work.",
      },
    ],
  },

  // ── 4. Responsible AI ────────────────────────────────────────────────────
  {
    slug: "responsible-ai-high-stakes-governance-before-capability",
    title:
      "Responsible AI in High-Stakes Environments: Why Governance Must Lead Capability",
    author: "Dr. Sarah Chen",
    authorRole: "Principal Advisor — Emerging Technology",
    publishedAt: "2026-02-18",
    capability: "emerging-tech",
    readingTime: 11,
    heroImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&h=800&fit=crop&q=80",
    excerpt:
      "In defence and security contexts, the question is never whether AI can perform a function. The question is whether the organisation can sustain accountability for the outcomes it produces.",
    body: [
      {
        type: "paragraph",
        text: "Artificial intelligence is being deployed across defence and security contexts at a pace that consistently outstrips the governance frameworks meant to manage it. This is not a technology failure — it is an institutional one. The technical capability to deploy AI in operational contexts has, in many organisations, significantly outpaced the governance capability to deploy it responsibly.",
      },
      {
        type: "paragraph",
        text: "The consequences are not hypothetical. When AI systems are deployed without adequate oversight, without mechanisms for human accountability, or without honest assessment of failure modes, errors occur — and in high-stakes environments, errors carry consequences that are qualitatively different from those in commercial settings.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why defence AI governance is different",
      },
      {
        type: "paragraph",
        text: "Commercial AI governance frameworks — which are themselves still maturing — are designed around a different risk profile. Commercial AI fails in ways that are typically recoverable: a recommendation is wrong, a classification is inaccurate, a prediction misses. The cost is measurable and the feedback loop is relatively fast.",
      },
      {
        type: "paragraph",
        text: "In defence and security contexts, failure modes may not be recoverable, feedback loops may be too slow or too compromised to support rapid iteration, and the political and operational consequences of error are categorically different. A governance framework designed for commercial risk tolerance will not work here.",
      },
      {
        type: "blockquote",
        text: "Accountability cannot be delegated to a model. If a decision-making process includes an AI component, the humans in that process must be able to explain, challenge, and override it — not as a theoretical option but as a practised capability.",
      },
      {
        type: "heading",
        level: 2,
        text: "Four requirements for responsible deployment",
      },
      {
        type: "list",
        items: [
          "Explainability at the point of decision. Decision-makers who use AI-generated outputs need to understand what drove a specific output well enough to assess it critically. This does not require full technical transparency — it requires that the output be accompanied by sufficient context for an informed human to make a judgment about whether to rely on it.",
          "Human override as a genuine capability. Most AI governance frameworks include human override as a requirement. Fewer treat it as a capability that must be designed, trained, and tested. If the human in the loop has not practised overriding the system under operational conditions, the override mechanism is theoretical, not real.",
          "Failure-mode documentation and testing. Before deployment, the failure modes of an AI system in the specific operational context must be understood — not in the abstract but specifically: under what conditions does this system produce outputs that are wrong, biased, or misleading, and what are the consequences? This analysis must precede deployment, not follow it.",
          "Accountability structure before deployment. Who is accountable for which outcomes? This is not a question to be resolved after an incident. The accountability structure — the chain of responsibility for decisions that an AI system influences — must be documented and agreed before the system goes into use.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What failure looks like in practice",
      },
      {
        type: "paragraph",
        text: "In the cases we know about — and many remain undisclosed — AI deployment failures in high-stakes environments typically share structural features: the system was deployed before its failure modes in the operational environment were understood; the humans using it had not been trained to challenge its outputs; there was no clear accountability structure when outputs led to problematic decisions; and the feedback mechanism that would have surfaced problems early was not in place.",
      },
      {
        type: "heading",
        level: 2,
        text: "A different sequencing",
      },
      {
        type: "paragraph",
        text: "The organisations that are deploying AI in defence contexts most effectively are not those moving fastest — they are those that invest in governance before capability reaches operational deployment. They understand failure modes before deployment, not after. They build human override and challenge as genuine operational skills. And they treat the accountability structure for AI-influenced decisions as a first-order design question, not an afterthought.",
      },
      {
        type: "paragraph",
        text: "The asymmetry matters: the cost of slowing down to get governance right is almost always recoverable. The cost of deploying without it is not.",
      },
    ],
  },

  // ── 5. Capability development ────────────────────────────────────────────
  {
    slug: "why-capability-programmes-fail-conditions-for-success",
    title:
      "Why Capability Development Programmes Fail — And the Conditions That Make Them Work",
    author: "Michael Adeyemi",
    authorRole: "Director — Capability Development",
    publishedAt: "2026-01-29",
    capability: "capability-development",
    readingTime: 8,
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=800&fit=crop&q=80",
    excerpt:
      "Most capability development programmes deliver outputs. Far fewer deliver capability. The difference between them is not budget, not time, and not the quality of the instruction — it is what happens after the programme ends.",
    body: [
      {
        type: "paragraph",
        text: "There is an uncomfortable truth about capability development in complex organisations: most programmes succeed on their own terms while failing on the terms that actually matter. The training is delivered, the exercises are run, the reports are filed, and the capability does not endure. Eighteen months later, the same gaps exist, often in the same places, often for the same reasons.",
      },
      {
        type: "paragraph",
        text: "This is not an indictment of practitioners. It reflects structural conditions that, if not addressed before and during a programme, will predictably undermine it — regardless of the quality of the content or the commitment of participants.",
      },
      {
        type: "heading",
        level: 2,
        text: "Five reasons programmes fail",
      },
      {
        type: "list",
        items: [
          "The problem was defined incorrectly at the start. The most common failure mode is designing the right solution to the wrong problem. Training programmes are frequently specified around symptoms — a specific skill gap, a failed exercise, a regulatory finding — rather than the underlying capability deficit that produced those symptoms. The result is a programme that fixes what was observed without addressing what caused it.",
          "Leadership is engaged at launch, not throughout. Senior sponsorship is almost universally present at programme launch and programme close. In the intervening period — when the hard work is done — operational demands pull leadership attention elsewhere, priorities compete, and the programme loses the institutional weight needed to keep it moving.",
          "The environment doesn't change to support the new capability. Capability is exercised in an environment. If the processes, structures, and incentives in the operational environment remain unchanged, newly developed capability will not be used — people revert to what the environment rewards and supports. The programme can develop the skill; only the environment can sustain it.",
          "Transfer is not designed. A common assumption is that demonstrated competence at the end of a programme will automatically transfer to operational performance. It will not — or not reliably. Transfer requires design: deliberate connections between what is learned in the programme and how it is applied in the job, reinforcement mechanisms, and measurement frameworks that catch regression.",
          "Success is measured at the output level. Programmes that measure success by what is delivered — training days completed, exercises run, participants trained — rather than what changes in operational capability will report success even when they fail. The measurement framework shapes the incentive structure, and the incentive structure shapes what gets prioritised.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The conditions that make programmes work",
      },
      {
        type: "paragraph",
        text: "The programmes that reliably produce enduring capability share identifiable characteristics — none of which are particularly surprising, but all of which require deliberate design.",
      },
      {
        type: "blockquote",
        text: "The goal is not a training event. The goal is a capability that your organisation can exercise reliably, under operational conditions, after we leave. Everything else is in service of that.",
      },
      {
        type: "list",
        items: [
          "A clear, specific capability objective — stated not as an activity ('run a cyber exercise') but as an outcome ('detect and coordinate response to a sophisticated intrusion within agreed time parameters').",
          "Genuine senior ownership that persists beyond launch — not just sponsorship on paper, but active engagement with how the programme is progressing and what it is producing.",
          "Environmental change designed in parallel — the process, structural, or incentive changes needed to support the new capability, agreed before the programme begins, not retrofitted after.",
          "A measurement framework that captures capability in use, not just training completion — including how performance changes over time after the programme ends.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "A different starting question",
      },
      {
        type: "paragraph",
        text: "The standard starting question for a capability development programme is: 'What should we train?' A more useful question is: 'What will it look like, eighteen months from now, if this programme has worked?' Answering that question rigorously — specifying what will be different in operational performance, not just in training records — is the diagnostic that determines whether the programme is designed to succeed.",
      },
    ],
  },
];
