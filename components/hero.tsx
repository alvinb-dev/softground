import { BookButton } from "@/components/book-button";

const categories = [
  "Activation & engagement",
  "Paywalls & upgrades",
  "Trial conversion",
  "Retention",
];

export function Hero() {
  return (
    <section className="relative z-10 flex flex-col px-6 pt-10 pb-6 md:px-12 md:pt-14 md:pb-8 lg:px-20 lg:pt-16 lg:pb-8">
      <div className="mx-auto flex max-w-[800px] flex-col items-center gap-8 text-center md:gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-[40px] leading-[1.1] font-normal tracking-[-1px] text-white md:text-[56px] lg:text-[64px]">
            Turn more free users into paying customers.
          </h1>
          <p className="text-base leading-[1.6] text-white md:text-lg">
            Product design for software and subscription businesses, focused on
            activation, conversion and retention. Work directly with{" "}
            <a
              href="#about"
              className="font-semibold underline decoration-white underline-offset-2"
            >
              Alvin Balemesa
            </a>
            , a senior product designer with 9 years’ experience, including 5
            at Canva.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <BookButton
            className="whitespace-nowrap"
            label="Book a 20-min intro call"
            size="lg"
          />
          <a
            href="#pricing"
            className="text-base leading-[1.6] font-semibold text-white underline decoration-white underline-offset-2"
          >
            See plans
          </a>
        </div>
      </div>

      <ul className="mx-auto mt-8 flex max-w-[1100px] flex-wrap items-center justify-center">
        {categories.map((category, index) => (
          <li key={category} className="flex items-center">
            <span className="px-3 py-3 text-base font-medium text-white sm:px-6">
              {category}
            </span>
            {index < categories.length - 1 ? (
              <span className="size-1 shrink-0 rounded-full bg-white" aria-hidden />
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
