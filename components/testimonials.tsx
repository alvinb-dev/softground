const quotes = [
  {
    quote:
      "Multiple engineers, including a manager, have told me they love working with Alvin because he brings clarity and structure…",
    role: "Design Lead",
  },
  {
    quote:
      "He takes the time to understand our technical constraints and challenges, then factors that into his design decisions.",
    role: "Engineer",
  },
  {
    quote:
      "The feature felt polished and considered, and a lot of that quality came from your attention to the detail of each state.",
    role: "Product Owner",
  },
  {
    quote:
      "His superpower in delivering value to our customers... his ability to empathise with their experiences and needs is a real asset to our team.",
    role: "Product Owner",
  },
  {
    quote:
      "You definitely have the ability to stay clear-headed and navigate through chaos with patience and a keen sense of timing.",
    role: "Content Designer",
  },
  {
    quote:
      "Alvin's superpower is being able to come up with alternative design ideas for others to consider.",
    role: "Design Lead",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:gap-12">
        <h2 className="text-center text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          What it’s like to work with me
        </h2>
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((item) => (
            <figure
              key={item.quote}
              className="flex flex-col justify-between gap-8 rounded-2xl bg-[#f4f4f4] p-6 md:p-8"
            >
              <blockquote className="text-lg leading-[1.45] text-ink md:text-[22px]">
                “{item.quote}”
              </blockquote>
              <figcaption className="font-mono text-base font-medium text-ink">
                — {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
