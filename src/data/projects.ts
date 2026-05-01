import placeholder from "@/assets/project-placeholder.jpg";

export interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc?: string;
  tag: string;
  client: string;
  bg: string;
  span?: string;
  image: string;
  featured: boolean;
  tags?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "sunrise-campus",
    title: "Sunrise Campus Portal",
    desc: "Full college web system, admissions + events + departments.",
    longDesc:
      "A complete digital backbone for an academic institution: admissions workflow, departmental microsites, event calendar, faculty profiles and a student-facing news hub. Built mobile-first with a CMS-driven content layer.",
    tag: "EDUCATION",
    client: "Academic Institution",
    bg: "var(--gradient-card-teal)",
    span: "lg:col-span-2",
    image: placeholder,
    featured: true,
    tags: ["Web", "CMS", "Education"],
  },
  {
    id: "greenleaf-menu",
    title: "GreenLeaf Digital Menu",
    desc: "QR ordering + live menu management for a restaurant chain.",
    longDesc:
      "A QR-based ordering system with realtime menu management, multi-outlet support and an analytics dashboard for the operations team.",
    tag: "HOSPITALITY",
    client: "Restaurant Group",
    bg: "var(--gradient-card-slate)",
    image: placeholder,
    featured: true,
    tags: ["QR", "Realtime", "Hospitality"],
  },
  {
    id: "urbancraft",
    title: "UrbanCraft Agency",
    desc: "Portfolio + lead funnel site for a creative studio.",
    longDesc:
      "A high-conversion portfolio site with a structured lead funnel, case studies and CMS-driven blog. Designed for organic search and brand authority.",
    tag: "BUSINESS",
    client: "Creative Studio",
    bg: "var(--gradient-card-charcoal)",
    image: placeholder,
    featured: true,
    tags: ["Portfolio", "SEO", "Business"],
  },
  {
    id: "nimbus-clinic",
    title: "Nimbus Clinic Booking",
    desc: "Multi-doctor appointment + patient portal.",
    longDesc:
      "Patient-facing booking flow plus a clinician dashboard for schedules, notes and follow-ups. Integrated WhatsApp reminders.",
    tag: "HEALTHCARE",
    client: "Private Clinic",
    bg: "var(--gradient-card-slate)",
    image: placeholder,
    featured: false,
    tags: ["Booking", "Healthcare"],
  },
  {
    id: "atlas-realty",
    title: "Atlas Realty Listings",
    desc: "Property listings with map search and lead capture.",
    longDesc:
      "Searchable listings with map clustering, saved searches and a CRM-ready lead pipeline.",
    tag: "REAL ESTATE",
    client: "Realty Brand",
    bg: "var(--gradient-card-charcoal)",
    image: placeholder,
    featured: false,
    tags: ["Maps", "Real Estate"],
  },
  {
    id: "voltline-ecom",
    title: "Voltline Storefront",
    desc: "D2C electronics storefront with custom checkout.",
    longDesc:
      "A direct-to-consumer storefront with a fast custom checkout, inventory sync and order tracking.",
    tag: "E-COMMERCE",
    client: "D2C Brand",
    bg: "var(--gradient-card-teal)",
    image: placeholder,
    featured: false,
    tags: ["E-commerce", "Checkout"],
  },
];
