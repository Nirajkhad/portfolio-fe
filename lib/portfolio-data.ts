// Simulating API data - in production this would come from an API call

export interface HeroData {
  kicker: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  ctaButtons: {
    label: string;
    href: string;
    icon: string;
    variant: 'ghost' | 'primary';
    isExternal: boolean;
  }[];
}

export interface ExperienceItem {
  startDate: string;
  endDate: string;
  role: string;
  company: string;
  type: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; color: 'green' | 'teal' | 'blue' | 'amber' | 'purple' | 'zinc' }[];
}

export interface PostItem {
  tags: { label: string; variant: 'accent' | 'muted' }[];
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  socials: { label: string; href: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterData {
  text: string;
  domain: string;
  year: string;
}

// Mock API data
export const heroData: HeroData = {
  kicker: "hello, world — I'm",
  name: "Niraj",
  role: "// backend software engineer",
  bio: "4+ years building scalable APIs, microservices, and event-driven systems. Deep in Node.js, NestJS, Laravel, and cloud-native architectures.",
  location: "Kathmandu, Nepal",
  ctaButtons: [
    { label: "GitHub", href: "https://github.com", icon: "⌥", variant: "ghost", isExternal: true },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "⌥", variant: "ghost", isExternal: true },
    { label: "niraj@email.com", href: "mailto:niraj@email.com", icon: "⌥", variant: "ghost", isExternal: false },
    { label: "resume.pdf", href: "#", icon: "↓", variant: "primary", isExternal: false },
  ],
};

export const navLinks: NavLink[] = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "writing", href: "#writing" },
  { label: "contact", href: "#contact" },
];

export const experienceData: ExperienceItem[] = [
  {
    startDate: "Mar 2022",
    endDate: "Present",
    role: "Backend Engineer",
    company: "Worldlink Communications",
    type: "Full-time",
    isCurrent: true,
    bullets: [
      "Architected event-driven microservices with Kafka reducing inter-service latency by 40%",
      "Built NestJS APIs serving 100k+ daily users with 99.9% uptime SLA",
      "Led NetSuite ERP integration syncing financial data across 3 internal platforms",
    ],
  },
  {
    startDate: "Jun 2020",
    endDate: "Feb 2022",
    role: "Junior Backend Developer",
    company: "Previous Company",
    type: "Full-time",
    isCurrent: false,
    bullets: [
      "Developed Laravel REST APIs and managed PostgreSQL database schemas",
      "Implemented Redis caching reducing average response times by 60%",
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    title: "ERP Integration Engine",
    description: "Real-time bidirectional sync between NetSuite and internal platforms. Processes 50k+ financial records daily with retry logic and dead-letter queues.",
    tags: ["Node.js", "Kafka", "Redis", "NetSuite API", "Docker"],
    links: [
      { label: "source", href: "#" },
      { label: "live", href: "#" },
    ],
    featured: true,
  },
  {
    title: "API Gateway Service",
    description: "Centralized auth, rate-limiting and request routing across microservices.",
    tags: ["NestJS", "JWT", "AWS"],
    links: [{ label: "source", href: "#" }],
  },
  {
    title: "Queue Worker System",
    description: "RabbitMQ-backed async job processor with priority queues and monitoring.",
    tags: ["Laravel", "RabbitMQ", "PHP"],
    links: [{ label: "source", href: "#" }],
  },
];

export const skillsData: SkillCategory[] = [
  {
    category: "languages",
    skills: [
      { name: "TypeScript", color: "green" },
      { name: "JavaScript", color: "green" },
      { name: "PHP", color: "teal" },
      { name: "Python", color: "blue" },
      { name: "Bash", color: "zinc" },
    ],
  },
  {
    category: "frameworks",
    skills: [
      { name: "NestJS", color: "green" },
      { name: "Node.js", color: "green" },
      { name: "Laravel", color: "teal" },
      { name: "Express", color: "teal" },
      { name: "Next.js", color: "blue" },
    ],
  },
  {
    category: "messaging",
    skills: [
      { name: "Apache Kafka", color: "amber" },
      { name: "RabbitMQ", color: "amber" },
      { name: "Redis Pub/Sub", color: "amber" },
      { name: "BullMQ", color: "zinc" },
    ],
  },
  {
    category: "databases",
    skills: [
      { name: "PostgreSQL", color: "teal" },
      { name: "MySQL", color: "teal" },
      { name: "Redis", color: "teal" },
      { name: "MongoDB", color: "blue" },
    ],
  },
  {
    category: "cloud & devops",
    skills: [
      { name: "AWS", color: "blue" },
      { name: "Docker", color: "blue" },
      { name: "CI/CD", color: "zinc" },
      { name: "Nginx", color: "zinc" },
      { name: "Linux", color: "zinc" },
    ],
  },
  {
    category: "integrations",
    skills: [
      { name: "NetSuite ERP", color: "purple" },
      { name: "REST APIs", color: "purple" },
      { name: "GraphQL", color: "purple" },
      { name: "Webhooks", color: "purple" },
    ],
  },
];

export const postsData: PostItem[] = [
  {
    tags: [
      { label: "Kafka", variant: "accent" },
      { label: "NestJS", variant: "accent" },
      { label: "event-driven", variant: "muted" },
    ],
    title: "Why I stopped using HTTP calls between microservices",
    excerpt: "After watching a cascade failure take down three services at 2am, I switched to Kafka. Here's what changed.",
    date: "12 Jan 2025",
    readTime: "8 min read",
    href: "#",
  },
  {
    tags: [
      { label: "Node.js", variant: "accent" },
      { label: "streams", variant: "muted" },
      { label: "performance", variant: "muted" },
    ],
    title: "Processing 500k rows without running out of memory",
    excerpt: "Replacing bulk DB reads with Node.js streams dropped memory usage from 2GB to under 80MB.",
    date: "04 Oct 2024",
    readTime: "7 min read",
    href: "#",
  },
  {
    tags: [
      { label: "NetSuite", variant: "muted" },
      { label: "ERP", variant: "muted" },
      { label: "integration", variant: "muted" },
    ],
    title: "Integrating NetSuite's REST API — things the docs don't tell you",
    excerpt: "OAuth 1.0a, undocumented rate limits, and why you need a retry queue before writing a single sync function.",
    date: "03 Jun 2024",
    readTime: "9 min read",
    href: "#",
  },
];

export const contactData: ContactData = {
  title: "Let's build something together",
  subtitle: "Open to new roles, freelance projects, or just a chat about backend architecture. My inbox is always open.",
  ctaLabel: "Say hello",
  ctaHref: "mailto:khadka.niraj11111@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
};

export const footerData: FooterData = {
  text: "Built with Laravel Filament(CMS) + Next.js",
  domain: "niraj-khadka.com.np",
  year: new Date().getFullYear().toString(),
};
