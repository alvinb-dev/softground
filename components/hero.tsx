import Image from "next/image";
import { BookButton } from "@/components/book-button";
import { Shape } from "@/components/shape";

const categories = [
  "Onboarding",
  "Activation",
  "Paywalls & upgrades",
  "Trial conversion",
  "Retention",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:px-20 lg:pb-20 lg:pt-24">
      <Shape
        crop="cylinder"
        priority
        className="left-[-28px] top-2 hidden h-[120px] w-[122px] rotate-[25deg] blur-[1.5px] sm:block lg:left-[40px] lg:top-0 lg:h-[193px] lg:w-[196px]"
      />
      <Shape
        crop="pyramid"
        priority
        className="-right-[180px] top-6 hidden h-[320px] w-[330px] -rotate-[22deg] md:block lg:-right-[220px] lg:top-2 lg:h-[537px] lg:w-[556px]"
      />
      <Shape
        crop="cube"
        priority
        className="-bottom-24 -left-[220px] hidden h-[360px] w-[370px] -scale-y-100 rotate-[143deg] lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
        <p className="font-mono text-xs font-medium uppercase text-ink">
          Product experimentation for subscription & SaaS teams
        </p>
        <h1 className="text-[36px] font-normal leading-[1.15] tracking-[-1px] text-ink md:text-[48px] lg:text-[56px] lg:leading-[1.2]">
          Turn more signups into active, paying customers
        </h1>
        <p className="max-w-[640px] text-base leading-[1.6] text-ink md:text-lg">
          Softground helps you uncover what’s holding users back and design
          focused experiments that make it easier to get started, find value
          and take the next step.
        </p>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <BookButton />
          <a
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-ink px-6 text-base font-medium text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            See pricing
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex max-w-[1100px] flex-col items-center gap-4 lg:mt-16">
        <p className="text-center text-base leading-[1.6] text-ink">
          Led by{" "}
          <a href="#about" className="font-semibold underline decoration-ink underline-offset-2">
            Alvin Balemesa
          </a>
          . 8+ years in product design. Product designer at Canva
        </p>
        <ul className="flex flex-wrap items-center justify-center">
          {categories.map((category, index) => (
            <li key={category} className="flex items-center">
              <span className="px-2 py-2 text-base font-medium text-ink sm:px-4 sm:py-3">
                {category}
              </span>
              {index < categories.length - 1 ? (
                <Image src="/icons/dot.svg" alt="" width={4} height={4} unoptimized />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
