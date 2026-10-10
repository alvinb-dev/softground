const pains = [
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
    body: "Your team has plenty to improve and limited capacity. You need to decide what to test first.",
  },
];

export function PainPoints() {
  return (
    <section className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-16">
        <h2 className="max-w-[800px] text-center text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:text-[48px]">
          You see room for growth.
          <br />
          But where do you start?
        </h2>
        <div className="grid w-full gap-6 md:grid-cols-3">
          {pains.map((pain) => (
            <article key={pain.label} className="rounded-2xl bg-paper p-6 md:p-8">
              <p className="font-mono text-base font-medium uppercase text-ink">
                {pain.label}
              </p>
              <h3 className="mt-3 text-xl font-medium leading-normal text-ink">
                {pain.title}
              </h3>
              <p className="mt-3 text-base leading-[1.5] text-ink">{pain.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
