import { BookButton } from "@/components/book-button";

export function OneOffBanner() {
  return (
    <div className="flex w-full flex-col items-stretch gap-8 rounded-3xl bg-lavender px-6 py-8 md:flex-row md:items-center md:gap-12 md:px-12 md:py-10">
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h2 className="text-[32px] leading-[38px] font-normal text-ink">
          Interested in a one-off project instead? Let’s chat.
        </h2>
        <p className="text-[17px] leading-[25px] text-ink/80">
          If what you need doesn’t fit a monthly plan, tell me what you’re after. You’ll get a
          scope and quote after I learn more.
        </p>
      </div>
      <BookButton
        label="Book an intro call"
        size="lg"
        className="w-full shrink-0 rounded-xl! bg-[#d9ff00]! md:w-[280px]"
      />
    </div>
  );
}
