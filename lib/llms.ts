import { faqItems } from "@/lib/faq";
import { offers } from "@/lib/offers";
import {
  contactPath,
  founderName,
  founderRole,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/site";

const steps = [
  "Start with an audit. I review your journey from sign-up to first payment and find where you’re losing paying customers.",
  "Agree the focus. Together we choose the first area to improve, the scope and what success looks like.",
  "Design and test. I design improvements and experiments, prototyping key interactions where useful.",
  "Hand over and learn. I support your engineers with handover and design QA, then use the results to plan what’s next.",
];

function offerSummary(offer: (typeof offers)[number]) {
  const price = `${offer.price} ${offer.cadence.join(", ")}`;
  const note = `${offer.note}${offer.noteFigure ?? ""}${offer.noteSuffix ?? ""}`.trim();
  return [
    `### ${offer.title}`,
    "",
    `${offer.description} ${price}. ${note}`,
    "",
    ...offer.points.map((point) => `- ${point}`),
  ].join("\n");
}

export function llmsTxt() {
  const faqs = faqItems
    .map((item) => `### ${item.question}\n\n${item.answer.join("\n\n")}`)
    .join("\n\n");

  return `# ${siteName}

> ${siteDescription}

${siteName} is a product design practice. ${founderName} is ${founderRole}, based in Perth, Australia, with 9 years’ experience designing digital products, including 5 years at Canva. He works directly on every engagement. Work is mostly async, with live calls scheduled to overlap a client’s hours, for teams in the US, Europe and Australia.

Scope covers product UX and UI. Branding, development, full website builds, rebrands and specialist work such as analytics setup are quoted separately.

## Facts

- Website: ${siteUrl}
- Founder: ${founderName}, ${founderRole}
- Based in: Perth, Australia
- Works with: software and subscription businesses in the US, Europe and Australia
- Focus: activation, conversion and retention
- Intro call: 20 minutes, booked at ${siteUrl}${contactPath}
- Message replies: within 2 business days
- Pricing: ${siteUrl}/#pricing
- First week: try any monthly plan for a week. Not the right fit? Get 75% back, no questions asked
- One-off projects: if a monthly plan doesn’t fit, Softground can scope and quote the work after an intro call
- Ownership: once an invoice is paid, the client owns the designs, files and prototypes
- Cancellation: no minimum term; monthly plans are billed monthly in advance
- Results: design and experiments can be positive, negative or inconclusive. Softground does not guarantee an increase in conversions

## Services

${offers.map(offerSummary).join("\n\n")}

## How engagements work

${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Pages

- [Home](${siteUrl}): Services, approach, pricing and common questions
- [Contact](${siteUrl}${contactPath}): Book a 20-minute intro call or send a message about the product

## Common questions

${faqs}
`;
}
