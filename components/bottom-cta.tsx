import { BookButton } from "@/components/book-button";
import { Shape } from "@/components/shape";

export function BottomCta() {
  return (
    <section className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl px-6 py-16 text-center md:px-16 lg:px-20 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, #bfbaef 0%, rgba(191, 186, 239, 0.14) 100%)",
        }}
      >
        <Shape
          crop="torus"
          className="absolute -top-24 -left-24 hidden h-[280px] w-[290px] -scale-y-100 rotate-180 md:block lg:-top-28 lg:-left-32 lg:h-[374px] lg:w-[387px]"
        />
        <Shape
          crop="sphere"
          className="absolute -right-16 -bottom-24 hidden h-[300px] w-[310px] md:block lg:-right-8 lg:-bottom-32 lg:h-[420px] lg:w-[440px]"
        />
        <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-4">
          <h2 className="text-[32px] font-normal leading-[1.15] tracking-[-1px] text-ink md:text-[40px] md:tracking-[-1.5px]">
            What would you like to improve?
          </h2>
          <p className="max-w-[632px] text-base leading-[1.5] text-ink">
            Tell us about your product, where you’re getting stuck and what
            you’d like to achieve. We’ll help you work out whether Softground
            is a good fit and where to start.
          </p>
          <div className="mt-4">
            <BookButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
