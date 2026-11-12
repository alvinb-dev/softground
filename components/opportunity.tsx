const cards = [
  {
    label: "Activation",
    title: "People sign up, but don’t find value.",
    body: "Users create an account, then drop off before experiencing what makes your product useful.",
  },
  {
    label: "Conversion",
    title: "People see the value, but hesitate to pay.",
    body: "Users engage with your product, but the path to a paid plan isn’t convincing.",
  },
  {
    label: "Capacity",
    title: "You have ideas, but need a clear priority.",
    body: "Your team has plenty to improve and limited capacity. You need to decide what to focus on next.",
  },
];

export function Opportunity() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-16">
        <h2 className="max-w-[800px] text-center text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          You see room for growth.
          <br />
          But where do you start?
        </h2>
        <div className="grid w-full gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.label}
              className="flex flex-col gap-3 rounded-2xl bg-[#f4f4f4] p-6 md:p-8"
            >
              <p className="font-mono text-base font-medium tracking-normal text-ink uppercase">
                {card.label}
              </p>
              <h3 className="text-xl leading-normal font-medium text-ink">
                {card.title}
              </h3>
              <p className="text-base leading-[1.5] text-ink">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
