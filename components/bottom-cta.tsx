import { BookButton } from "@/components/book-button";

export function BottomCta() {
  return (
    <section className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div
        className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 rounded-3xl px-6 py-12 text-center md:px-16 md:py-16"
        style={{
          background:
            "linear-gradient(180deg, #bfbaef 0%, rgba(191, 186, 239, 0) 116%)",
        }}
      >
        <h2 className="text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          What would you like to improve?
        </h2>
        <p className="max-w-[820px] text-base leading-[1.5] text-ink md:text-lg">
          Book a call to talk through your product, where you’re getting stuck
          and what you’d like to achieve. I’ll help you work out whether
          Softground is a good fit and where to start.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <BookButton
            label="Book a 20-min intro call"
            size="lg"
            className="w-[260px] whitespace-nowrap"
          />
          <BookButton
            label="Send a message instead"
            size="lg"
            variant="white"
            className="w-[260px]"
            tab="message"
          />
        </div>
        <p className="text-sm leading-[1.5] text-ink">
          Prefer to write it down? Send a message and I’ll reply within 2
          business days.
        </p>
      </div>
    </section>
  );
}
