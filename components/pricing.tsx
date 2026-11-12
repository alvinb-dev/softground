import Image from "next/image";
import { headers } from "next/headers";
import { BookButton } from "@/components/book-button";
import type { ServiceValue } from "@/lib/inquiry";

function revealPricesForHost(host: string | null) {
  const hostname = host?.split(",")[0]?.trim().split(":")[0].toLowerCase() ?? "";
  return hostname === "softground.digital" || hostname === "www.softground.digital";
}

function PriceFigure({
  children,
  className = "",
  blurred,
}: {
  children: string;
  className?: string;
  blurred: boolean;
}) {
  return (
    <span
      aria-hidden={blurred ? true : undefined}
      className={`inline-block ${blurred ? "select-none" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

const offers: {
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
    cadence: ["USD, fixed price", "10 business days"],
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

function PricingSection({ revealPrices }: { revealPrices: boolean }) {
  return (
    <section id="pricing" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-14">
        <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
            Start with an audit. Grow from there.
          </h2>
          <p className="text-base leading-7 text-[#5f5f5f]">
            You work directly with me on every engagement. Scope covers product
            UX and UI. Branding and development are quoted separately.
          </p>
        </div>
        <div className="grid w-full items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="relative flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-card p-6 text-white md:p-10"
            >
              {offer.badge ? (
                <p className="absolute top-0 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-lavender px-4 py-2 font-mono text-sm font-medium tracking-normal whitespace-nowrap text-ink uppercase">
                  <span className="size-2 rounded-full bg-ink" aria-hidden />
                  {offer.badge}
                </p>
              ) : null}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] leading-tight font-normal md:text-[32px]">
                    {offer.title}
                  </h3>
                  <p className="text-[17px] leading-relaxed text-[#dadada]">
                    {offer.description}
                  </p>
                </div>
                <p className="flex flex-wrap items-end gap-3.5 text-white">
                  <PriceFigure
                    blurred={!revealPrices}
                    className={`text-[40px] leading-none md:text-[48px] ${revealPrices ? "" : "blur-[14px]"}`}
                  >
                    {offer.price}
                  </PriceFigure>
                  <span className="text-[15px] leading-6 text-[#dadada]">
                    {offer.cadence.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-base font-medium text-white uppercase">
                    {offer.heading}
                  </p>
                  <ul className="flex flex-col gap-3">
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
                        <span className="text-base leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <BookButton
                  full
                  size="lg"
                  service={offer.cta === "Book an audit" ? offer.service : undefined}
                  label={offer.cta}
                  className="rounded-xl"
                />
                <p className="text-center text-sm leading-6 text-[#dadada]">
                  {offer.note}
                  {offer.noteFigure ? (
                    <PriceFigure
                      blurred={!revealPrices}
                      className={`text-sm leading-6 ${revealPrices ? "" : "blur-[5px]"}`}
                    >
                      {offer.noteFigure}
                    </PriceFigure>
                  ) : null}
                  {offer.noteSuffix}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function Pricing() {
  const headerList = await headers();
  const revealPrices = revealPricesForHost(
    headerList.get("x-forwarded-host") ?? headerList.get("host"),
  );

  return <PricingSection revealPrices={revealPrices} />;
}
