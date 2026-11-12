import Image from "next/image";

export function About() {
  return (
    <section id="about" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 rounded-[32px] border border-[#d4d4d4] bg-white p-6 md:gap-12 md:rounded-[54px] md:p-10 lg:flex-row lg:gap-20">
        <div className="w-full lg:w-[501px] lg:shrink-0 lg:px-10">
          <h2 className="text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
            Over 9 years designing digital products users love and pay for.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-[1.5] text-ink">
            <p>
              I’m Alvin Balemesa, Founder and Senior Product Designer at
              Softground.
            </p>
            <p>
              I spent five years at Canva during a period of significant
              company growth, working across product design and
              experimentation. My work focused on improving subscription
              experiences, helping users discover value and making the path to
              upgrading clearer and easy to understand.
            </p>
            <p>
              I prototype in code and work closely with engineers to explore
              and refine interactions before they’re built. Through Softground,
              I help software and subscription businesses improve their
              products using their own research, customer feedback and
              analytics.
            </p>
          </div>
        </div>
        <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-lime to-paper sm:h-[600px] lg:h-[644px] lg:flex-1">
          <Image
            src="/images/portrait.png"
            alt="Alvin Balemesa"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-[46%_22%]"
          />
        </div>
      </div>
    </section>
  );
}
