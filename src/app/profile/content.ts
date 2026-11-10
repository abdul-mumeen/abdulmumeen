export const profile = {
  name: "Abdul-Mumeen Olasode",
  pronunciation: "Ab-dool-moo-min",
  initials: "AO",
  photo: "/abdul-mumeen.jpg",
  email: "olasodeadeyemi@gmail.com",
  resume: "/abdulmumeen_olasode.pdf",
  linkedin: "https://www.linkedin.com/in/abdul-mumeen/",
  github: "https://github.com/abdul-mumeen",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  status: "Open to contract and part-time work",
  headline: "I build AI agents, platforms, and applications people rely on.",
  summary:
    "Senior full-stack engineer with 9+ years of shipping products. Most recently, AI agents and reporting at MaintainX, now part of Autodesk.",
  card: {
    title: "Checkout conversion · Web",
    tag: "This week",
    value: "3.8%",
    delta: "+0.6 pts vs last week",
    whyLabel: "Why it changed",
    why: "The new one-page checkout shipped Tuesday. Drop-off at the payment step fell by a third.",
    chips: ["Based on 18,420 sessions", "Eval passed"],
  },
};

export const proof = {
  label: "Built production software at",
  companies: [
    "Autodesk (MaintainX)",
    "BenchSci",
    "Notch",
    "Wellio (Kraft Heinz)",
  ],
  stats: [
    { value: "9+ years", label: "shipping production software" },
    { value: "350+", label: "AI agent runs in the first 8 weeks" },
    { value: "98.7%", label: "AI eval pass rate before enterprise rollout" },
  ],
};

export type Service = {
  title: string;
  description: string;
  tools: string[];
};

export const services: Service[] = [
  {
    title: "Agentic development",
    description:
      "AI agents that explain, answer and act on your data, with evals and online evaluators so teams can trust the output.",
    tools: [
      "ReAct LLM agents",
      "LlamaIndex",
      "Langfuse",
      "Arize",
      "Python",
      "TypeScript",
    ],
  },
  {
    title: "Application development",
    description:
      "Web and mobile products from first prototype to production, including payments, notifications and third-party integrations.",
    tools: ["React", "TypeScript", "Node", "Django", "FastAPI", "Stripe"],
  },
  {
    title: "Platform engineering",
    description:
      "Backends and cloud infrastructure that stay fast, observable and easy to change as usage grows.",
    tools: [
      "GraphQL Federation",
      "PostgreSQL",
      "Redis",
      "AWS (SQS, EventBridge, CDK/SST)",
      "GCP",
      "Kubernetes",
      "Datadog",
    ],
  },
  {
    title: "Reporting and data",
    description:
      "Reporting, search and data models that turn raw operational records into answers people act on.",
    tools: [
      "Databricks",
      "Elasticsearch",
      "PostgreSQL",
      "Neo4j",
      "Spanner",
      "Workato",
    ],
  },
];

export type Metric = { value: string; label: string };

export type CaseStudy = {
  meta: string;
  title: string;
  summary: string;
  metrics: Metric[];
  challenge: string;
  approach: string;
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    meta: "Autodesk (MaintainX) · 2025 – present · Senior Software Engineer, AI and Reporting Platform",
    title: "Proactive Insights",
    summary:
      "An AI agent that explains what changed in maintenance KPIs, and why, without anyone digging through reports.",
    metrics: [
      { value: "11 weeks", label: "from discovery to production alpha" },
      { value: "350+", label: "agent runs in the first 8 weeks" },
    ],
    challenge:
      "Maintenance teams could see a KPI move but had to dig through records by hand to learn why.",
    approach:
      "Led discovery, the PRD and the tech spec, then built the agent as a ReAct LLM agent on the reporting platform, with Langfuse for tracing.",
    outcome:
      "Production alpha in 11 weeks across 25+ orgs, with a 1.1% error rate and zero timeouts over the first 350+ runs.",
  },
  {
    meta: "Autodesk (MaintainX) · 2025 – present · Senior Software Engineer, AI and Reporting Platform",
    title: "Report Builder AI",
    summary:
      "Natural-language report generation, rolled out to every eligible enterprise customer.",
    metrics: [
      { value: "25% → 100%", label: "of eligible enterprise customers" },
      { value: "98.7%", label: "eval suite pass rate" },
    ],
    challenge:
      "Report generation from plain-language prompts had to be reliable enough to open up to all eligible enterprise customers.",
    approach:
      "Built an eval suite across guardrail, dataset selection, entity detection and report generation, added online evaluators, and co-led fixes for date bucketing, relative-date filters, entity search and circuit breaking.",
    outcome:
      "Rolled out from 25% to 100% of eligible customers. About 440 prompts a week, with a report save rate above manual building.",
  },
  {
    meta: "BenchSci · 2022 – 2025 · Senior Software Engineer, Gen AI and Web Applications",
    title: "Search and a RAG assistant for scientists",
    summary:
      "Faster search across millions of datasets, plus an AI assistant for disease biology.",
    metrics: [
      { value: "60%", label: "lower Elasticsearch search latency" },
      { value: "3", label: "product modules led end to end" },
    ],
    challenge:
      "Scientists searching millions of experimental datasets needed faster results and a way to ask questions in plain language.",
    approach:
      "Reworked Elasticsearch queries and the data model, led the Unified Organism Filter, Clinical Trial Data module and Drug Filter, and built a RAG assistant for disease biology.",
    outcome:
      "Search latency down 60%, a large client data migration completed, and design docs taken through the Design Council.",
  },
];

export const smallCaseStudies: CaseStudy[] = [
  {
    meta: "Notch Ordering · 2021 – 2022 · Senior Backend Engineer, Payments",
    title: "NotchPay and payment automation",
    summary:
      "A B2B checkout and receipt automation for an online ordering platform.",
    metrics: [
      { value: "1M+ CAD", label: "revenue via B2B checkout" },
      { value: "500K+ CAD", label: "offline orders via Workato automation" },
    ],
    challenge:
      "B2B buyers needed a checkout built for them, and offline orders needed receipts handled without manual work.",
    approach:
      "Built NotchPay B2B checkout with Balance, automated receipts with Workato, and set up CI/CD on CircleCI.",
    outcome:
      "B2B checkout brought in over 1M CAD in revenue, and the automation covered over 500K CAD in offline orders.",
  },
  {
    meta: "Wellio (acquired by Kraft Heinz) · 2018 – 2021 · Senior Software Engineer",
    title: "Consumer apps and microservices",
    summary:
      "Mobile, web and microservices work on a consumer app, from notifications to grocery integrations.",
    metrics: [
      { value: "3% → 6.3%", label: "user retention" },
      { value: "2", label: "grocery integrations: Amazon Fresh, Instacart" },
    ],
    challenge:
      "Retention was low, and users needed more reasons to come back and more ways to act on what the app told them.",
    approach:
      "Built the notification system, Stripe payments in the React web app, and the Amazon Fresh and Instacart integrations on Docker, Kubernetes and Firebase functions.",
    outcome:
      "Retention rose from 3% to 6.3%, and both grocery integrations shipped.",
  },
];

export const engagements = [
  {
    title: "Scoped project",
    audience:
      "For teams with a clear outcome in mind, like an agent, a report or an integration.",
    length: "Typically 4 – 12 weeks",
  },
  {
    title: "Part-time embed",
    audience:
      "For teams that need senior capacity alongside their own engineers.",
    length: "Typically 10 – 20 hours a week",
  },
  {
    title: "Audit and advisory",
    audience:
      "For teams with an AI feature or data pipeline that is not yet reliable.",
    length: "Typically 1 – 3 weeks",
  },
];

export const steps = [
  {
    title: "Discovery call",
    body: "We talk through the goal, the data and the constraints.",
  },
  {
    title: "Written plan",
    body: "You get scope, risks, a timeline and how we will measure success, in writing.",
  },
  {
    title: "Ship in small increments",
    body: "Working software on a regular cadence, so you can see progress and change course early.",
  },
];

export const testimonials = [
  {
    quote:
      "He regularly volunteers to lead projects of varying complexity and scope, often taking on challenges that others might shy away from. Abdul-Mumeen's combination of technical expertise, leadership skills, and dedication to excellence makes him an invaluable asset to any team.",
    attribution: "Jon Rodness, Software Engineering Manager · BuildOps",
  },
  {
    quote:
      "Phabbs is a thorough, thoughtful, and methodical engineer. In every situation, he took an approach of first understanding the problem well before diving into solutions. His communication of effort and identifying risk early and often is a huge boon to the progress of any project.",
    attribution: "David Cox-Espenlaub, Senior Staff Engineer · Hinge Health",
  },
];

export const about = {
  facts: [
    { label: "Based in", value: "Kitchener, Ontario, Canada · Eastern (ET)" },
    { label: "Availability", value: "Contract and part-time" },
    { label: "Education", value: "M.Sc. ICT, B.Tech Computer Engineering" },
    {
      label: "When I'm not working",
      value:
        "Gaming, sport, soccer, and time with my wife and kids (a girl and a boy)",
    },
  ],
  paragraphs: [
    "I'm a senior full-stack engineer with 9+ years of shipping products across payments, consumer apps, scientific search and industrial reporting.",
    "Lately I focus on AI agents and the data underneath them: evals that catch regressions before customers do, reporting people trust, and platforms that stay fast as usage grows. Certified in Google Cloud (Engineer Associate, 2025), DeepLearning.AI Data Engineering (2024) and Workato Automation Pro I and II (2022).",
  ],
};

export const faqs = [
  {
    question: "How do you price and structure engagements?",
    answer:
      "I work on scoped projects, part-time embeds and short audits. Pricing depends on scope and length, so I send a written proposal after a first call rather than quoting a rate up front.",
  },
  {
    question: "What time zone and availability do you work in?",
    answer:
      "I'm in Eastern Time (Kitchener, Ontario) and work remotely. I'm open to contract and part-time work, and I overlap comfortably with North American working hours.",
  },
  {
    question: "What stacks do you work with?",
    answer:
      "Most often TypeScript, React, Node and Python (Django, FastAPI), with PostgreSQL, GraphQL, AWS or GCP underneath. For AI work: LLM agents, RAG, LlamaIndex, Langfuse and Arize. I'm happy to adapt to your stack.",
  },
  {
    question: "Can you work with my existing team?",
    answer:
      "Yes. I've mentored engineers, written design docs for review and shipped inside established teams. I follow your tools, review process and release cadence.",
  },
  {
    question: "How do we start?",
    answer:
      "Email me with a few lines on the problem and the timeline. If it looks like a fit we'll book a short discovery call, and you'll get a written plan after.",
  },
];

export const contact = {
  heading: "Have a project in mind?",
  body: "Send a few lines about the problem and the timeline. I'll reply by email.",
};
