import type { ServiceValue } from "@/lib/inquiry";

export const offers: {
  service: ServiceValue;
  title: string;
  description: string;
  price: string;
  cadence: string[];
  heading: string;
  points: string[];
  cta: string;
  note: string;
  noteFigure?: string;
  noteSuffix?: string;
  badge?: string;
}[] = [
  {
    service: "conversion-audit",
    title: "Conversion Audit",
    description:
      "Find out where you’re losing paying customers and what to fix first. A fixed-price review of one core journey.",
    price: "$2,500",
    cadence: ["USD, fixed price"],
    heading: "What you get",
    points: [
      "Review of one core journey, from sign-up to first payment",
      "Top 5 opportunities, ranked by impact and effort",
      "Experiment briefs for the top 3 opportunities",
      "Concept designs for the #1 opportunity",
      "Quick-fix list and the tracking gaps to close",
      "Walkthrough call, recording and Figma files",
    ],
    cta: "Book an audit",
    note: "Fully credited if you start a monthly plan within 30 days.",
  },
  {
    service: "growth-design-monthly",
    title: "Growth Design Monthly",
    description:
      "A focused growth workstream for teams with clear growth goals, tackled one at a time.",
    price: "$9,000",
    cadence: ["USD / month", "Cancel anytime"],
    heading: "What’s included",
    points: [
      "One growth area at a time: activation, conversion or retention",
      "2–3 experiments designed every month",
      "One active design request at a time",
      "Monthly planning session to review results",
      "Async updates twice a week",
      "Handover support and design QA of built work",
    ],
    cta: "Book a call",
    note: "Billed monthly. No minimum term.",
  },
  {
    service: "embedded-design-partner",
    title: "Embedded Design Partner",
    description:
      "A senior product designer from 3 days a week, working across growth and your core product.",
    price: "$12,000",
    cadence: ["USD / month", "Cancel anytime"],
    heading: "What’s included",
    points: [
      "3 dedicated days a week",
      "Growth design plus your core product",
      "Up to 2 active requests at a time",
      "Weekly sync and input on your roadmap",
      "Priority replies within 1 business day",
      "Light usability testing and customer interviews",
      "Pairing with engineers and design QA of built work",
    ],
    cta: "Book a call",
    note: "Extra days ",
    noteFigure: "$1,200/day",
    noteSuffix: ", subject to availability.",
    badge: "Limited spots",
  },
];
