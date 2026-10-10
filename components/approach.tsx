import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Review together.",
    body: "We examine the user journey, available data, and your team’s priorities.",
  },
  {
    number: "2",
    title: "Choose one experiment.",
    body: "We agree on the opportunity, hypothesis, scope, and success measures.",
  },
  {
    number: "3",
    title: "Design and hand over.",
    body: "I design the experience and prepare it for your team to build.",
  },
  {
    number: "4",
    title: "Test and learn.",
    body: "Your team runs the experiment. Where a results review is included, we review the findings and decide what comes next.",
  },
];

export function Approach() {
  return (
    <section id="how-we-work" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:text-[48px]">
          Our approach
        </h2>
        <div className="relative mt-12 overflow-hidden lg:mt-16">
          <Image
            src="/icons/line.svg"
            alt=""
            width={1203}
            height={2}
            unoptimized
            className="pointer-events-none absolute top-[47px] left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
          />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="relative p-6 md:p-8">
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-lime text-base font-medium text-ink/80">
                  {step.number}
                </span>
                <h3 className="mt-4 text-2xl font-normal leading-normal text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-[1.4] text-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
