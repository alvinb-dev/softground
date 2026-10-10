import Image from "next/image";
import { BookButton } from "@/components/book-button";

const offers = [
  {
    title: "Growth Opportunity Audit",
    description:
      "A review of one product surface or journey helping you understand what could be holding users back and where to focus next.",
    price: "$990",
    cadence: "USD per audit",
    points: [
      "Product walkthrough and review of existing data and insights",
      "Key friction points and growth opportunities",
      "Prioritised experiment ideas with supporting rationale",
      "Recommended success measures",
      "Findings report and a walkthrough of the recommendations",
    ],
  },
  {
    title: "Experiment Design Sprint",
    description:
      "Turn one defined product problem into an experiment design your team can implement.",
    price: "$2500",
    cadence: "USD per experiment",
    points: [
      "Review of the chosen journey and available evidence",
      "Clear hypothesis and agreed experiment scope",
      "Success measures and guardrail metrics to watch for unintended effects",
      "High-fidelity Figma designs with one round of refinements",
      "Experiment brief and developer handoff",
    ],
  },
  {
    title: "Growth Design Partner",
    description:
      "Ongoing growth strategy and design for a flat monthly fee. Cancel anytime.",
    price: "$4500",
    cadence: "USD per month",
    points: [
      "Unlimited growth design requests, worked through one at a time",
      "A shared monthly experiment roadmap and opportunity prioritisation",
      "Experiment briefs, hypotheses and success measures",
      "High-fidelity Figma designs, refinements and developer handoff",
      "Regular review of available experiment findings and recommended next steps",
      "Priority execution",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-16">
        <div className="flex max-w-[638px] flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:text-[48px]">
            Select an offer to get started
          </h2>
          <p className="text-base leading-[1.4] text-ink md:text-lg">
            Softground provides the strategy and design. Your team handles
            development, test setup and measurement.
          </p>
        </div>
        <div className="grid w-full items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 text-white md:p-12"
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="text-[28px] font-normal leading-normal md:text-[32px]">
                  {offer.title}
                </h3>
                <p className="text-base leading-[1.4] text-white/80">
                  {offer.description}
                </p>
                <p className="flex flex-wrap items-baseline gap-2 text-white">
                  <span className="text-[40px] leading-none md:text-[48px]">
                    {offer.price}
                  </span>
                  <span className="text-xs leading-normal">{offer.cadence}</span>
                </p>
                <ul className="flex flex-col gap-4">
                  {offer.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Image
                        src="/icons/check.svg"
                        alt=""
                        width={14}
                        height={14}
                        unoptimized
                        className="mt-1 shrink-0"
                      />
                      <span className="text-base leading-normal text-white/80">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <BookButton full />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
