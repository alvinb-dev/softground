import Image from "next/image";

export function About() {
  return (
    <section id="about" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 rounded-3xl bg-paper p-6 md:gap-12 md:rounded-[54px] md:p-10 lg:flex-row lg:gap-20">
        <div className="w-full lg:w-[501px] lg:shrink-0 lg:px-10">
          <h2 className="text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:text-[48px]">
            Over 8 years designing digital products users love and pay for.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-[1.5] text-ink">
            <p>
              I’m Alvin Balemesa, the product designer behind Softground. I
              currently work at Canva and bring over 8 years of product design
              experience, including more than five years at Canva.
            </p>
            <p>
              For 4 years, I worked in Canva’s Trials, Growth and Monetisation
              teams, identifying opportunities, shaping hypotheses and designing
              experiments to help users discover value and become paying
              customers.
            </p>
            <p>
              Before Canva, I helped redesign Healthengine’s mobile app,
              contributing to a 20% increase in bookings.
            </p>
            <p>
              Through Softground, I bring that experience to SaaS and
              subscription teams that want to help more users find value and
              become paying customers.
            </p>
          </div>
        </div>
        <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-lime to-paper sm:h-[600px] lg:h-[644px] lg:flex-1">
          <div className="absolute inset-x-3 top-10 bottom-0 overflow-hidden rounded-3xl sm:inset-x-4 sm:top-14">
            <Image
              src="/images/portrait.png"
              alt="Alvin Balemesa"
              fill
              sizes="(min-width: 1024px) 496px, 100vw"
              className="object-cover object-[center_18%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
