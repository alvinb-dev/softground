const steps = [
  {
    number: "1",
    title: "Start with an audit.",
    body: "I review your journey from sign-up to first payment and find where you’re losing paying customers.",
  },
  {
    number: "2",
    title: "Agree the focus.",
    body: "Together we choose the first area to improve, the scope and what success looks like.",
  },
  {
    number: "3",
    title: "Design and test.",
    body: "I design improvements and experiments, prototyping key interactions where useful.",
  },
  {
    number: "4",
    title: "Hand over and learn.",
    body: "I support your engineers with handover and design QA, then use the results to plan what’s next.",
  },
];

export function Approach() {
  return (
    <section id="how-it-works" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          How engagements work
        </h2>
        <ol className="relative mt-12 grid gap-x-6 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.number} className="relative flex flex-col gap-4">
              <div className="relative flex h-8 items-center">
                <span
                  className={[
                    "pointer-events-none absolute top-1/2 left-4 z-0 h-0 w-[calc(100%+1.5rem)] -translate-y-1/2 border-t border-dashed border-ink/25",
                    index === 3 ? "hidden" : "",
                    index === 1 ? "hidden lg:block" : "",
                    index === 0 || index === 2 ? "hidden md:block" : "",
                  ].join(" ")}
                  aria-hidden
                />
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-lime text-base font-medium text-ink/80">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl leading-normal font-normal text-ink">
                  {step.title}
                </h3>
                <p className="text-base leading-[1.4] text-ink/80">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
