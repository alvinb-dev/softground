import { Shape } from "@/components/shape";

const outcomes = [
  {
    title: "Prioritised opportunities",
    body: "A clear view of where users get stuck and which opportunities are worth pursuing.",
  },
  {
    title: "An experiment ready to build",
    body: "Focused product designs, a testable hypothesis, and the detail your team needs to implement.",
  },
  {
    title: "A plan to measure and learn",
    body: "Success measures agreed upfront, so your team can decide what to keep, change, or test next.",
  },
];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="px-6 md:px-12 lg:px-20">
      <div
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl px-6 py-12 md:rounded-[40px] md:px-12 md:py-16 lg:px-20 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, #bfbaef 0%, rgba(191, 186, 239, 0.14) 100%)",
        }}
      >
        <Shape
          crop="sphere"
          className="absolute -bottom-28 -left-28 hidden h-[420px] w-[440px] md:block lg:-bottom-36 lg:-left-40 lg:h-[558px] lg:w-[578px]"
        />
        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:text-[48px]">
              A clear opportunity. A focused experiment.
            </h2>
            <p className="text-base leading-[1.5] text-ink md:text-lg">
              Know where to focus, what to change, and how you’ll judge whether
              it worked.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {outcomes.map((outcome) => (
              <article
                key={outcome.title}
                className="rounded-3xl border border-line bg-white p-6 md:p-12"
              >
                <h3 className="text-2xl font-normal leading-normal text-ink">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-base leading-[1.4] text-ink/80">
                  {outcome.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
