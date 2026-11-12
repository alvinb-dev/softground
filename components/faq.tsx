"use client";

import { useState } from "react";
import Image from "next/image";

const items: { question: string; answer: string[] }[] = [
  {
    question: "Which plan should we choose?",
    answer: [
      "Growth Design Monthly is a focused growth workstream: one area at a time, with typically 2–3 experiments designed each month. Embedded Design Partner gives you a senior product designer 3 days a week across growth and your core product, with weekly syncs and up to 2 active requests. Not sure? Start with a Conversion Audit and I’ll recommend the right fit.",
    ],
  },
  {
    question: "Do we need an audit first?",
    answer: [
      "It’s the best way to start, but not required. The Conversion Audit is a fixed-price, 10-business-day review of your journey from sign-up to first payment, and the fee is credited if you start a monthly plan within 30 days. If your team already knows what to work on, you can start a monthly plan straight away.",
    ],
  },
  {
    question: "Who will we work with?",
    answer: [
      "Me, directly, on every engagement: strategy, design and reviews. If a project needs specialist skills such as branding or development, I’ll introduce trusted partners and quote that work separately before it starts.",
    ],
  },
  {
    question: "Where are you based, and how do time zones work?",
    answer: [
      "I’m based in Perth, Australia, and work with teams in the US, Europe and Australia. Most work happens async, with clear written updates, and I schedule live calls to overlap with your working hours.",
    ],
  },
  {
    question: "How do design requests work?",
    answer: [
      "Add requests to a shared queue and we prioritise them together. Growth Design Monthly works on one active request at a time; Embedded Design Partner on up to two. Before each request starts, we agree the scope and an expected delivery date, and larger projects are split into milestones you can review along the way. Revisions continue until each design is approved, within its agreed scope.",
    ],
  },
  {
    question: "What do you need from us to get started?",
    answer: [
      "A walkthrough of your product, your goals and current priorities, plus any research, customer feedback and analytics you have. We’ll agree the first piece of work and who needs to be involved. For experiments, I’ll also check the traffic, tracking and testing setup needed to measure results.",
    ],
  },
  {
    question: "Do you build as well as design?",
    answer: [
      "I create interactive prototypes, including prototypes in code, to explore ideas and show how the experience should work. Your engineers handle the production build, and I support handover and design QA. For experiments, your team manages test setup, tracking and launch.",
      "I can also design pricing pages, landing pages and sign-up journeys. Full website builds, rebrands and specialist work such as analytics setup are scoped and quoted separately through trusted partners.",
    ],
  },
  {
    question: "Who owns the work?",
    answer: [
      "You do. Once an invoice is paid, you own all the designs, files and prototypes created for you. I may ask to feature the work in a case study, but only with your permission.",
    ],
  },
  {
    question: "Can we cancel?",
    answer: [
      "Yes. There’s no minimum term. Monthly plans are billed monthly in advance, so cancel anytime before your next billing date and you won’t be charged again. You keep all work completed up to that point, and you decide whether current work stops straight away or wraps up within the time you’ve paid for. You can restart later, subject to availability.",
    ],
  },
  {
    question: "Do you guarantee an increase in conversions?",
    answer: [
      "No. Design and experimentation help test informed ideas, but an experiment can produce positive, negative or inconclusive results. I focus on understanding user problems, making purposeful improvements and helping your team learn from the evidence.",
    ],
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6">
        <h2 className="text-center text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          Common Questions
        </h2>
        <div className="w-full">
          {items.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.question} className="border-b border-line">
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="text-base font-semibold text-ink">
                    {item.question}
                  </span>
                  <Image
                    src={expanded ? "/icons/minus.svg" : "/icons/plus.svg"}
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                    className="shrink-0"
                  />
                </button>
                {expanded ? (
                  <div className="flex flex-col gap-4 pb-6">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-[1.6] text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
