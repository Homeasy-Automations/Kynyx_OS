/** Core shared domain types for the KYNYX site. */

export interface NavLink {
  label: string;
  to: string;
}

export interface Service {
  slug: string;
  number: string;
  name: string;
  short: string;
  description: string;
  tech: string[];
  deliverables: string[];
  icon: string;
}

export interface Project {
  slug: string;
  name: string;
  industry: string;
  services: string[];
  tech: string[];
  year: string;
  result: string;
  summary: string;
  palette: { from: string; to: string; accent: string };
  overview: string;
  challenge: string;
  solution: string;
  process: { title: string; text: string }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; position: string } | null;
  metrics: { label: string; value: string }[];
  /** Real, live URL of the shipped product. Optional — link only renders when present. */
  liveUrl?: string;
}

export interface Insight {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  palette: { from: string; to: string };
  body: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  projectType: string;
}

export interface Industry {
  name: string;
  blurb: string;
}

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export interface AICapability {
  name: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  output: string;
}

export interface WhyPoint {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
  source: string;
  /** Honeypot field — must stay empty. Populated only by bots. */
  hp: string;
}

export interface InquiryResponse {
  success: boolean;
  referenceId: string;
}
