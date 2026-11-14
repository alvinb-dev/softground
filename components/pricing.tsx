import Image from "next/image";
import { headers } from "next/headers";
import { BookButton } from "@/components/book-button";
import { OneOffBanner } from "@/components/one-off-banner";
import { offers } from "@/lib/offers";

function revealPricesForHost(host: string | null) {
  const hostname = host?.split(",")[0]?.trim().split(":")[0].toLowerCase() ?? "";
  return hostname === "softground.digital" || hostname === "www.softground.digital";
}

function PriceFigure({
  children,
  className = "",
  blurred,
}: {
  children: string;
  className?: string;
  blurred: boolean;
}) {
  return (
    <span
      aria-hidden={blurred ? true : undefined}
      className={`inline-block ${blurred ? "select-none" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

function PricingSection({ revealPrices }: { revealPrices: boolean }) {
  return (
    <section id="pricing" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 lg:gap-14">
        <div className="flex max-w-[1280px] flex-col items-center gap-[15px] text-center">
          <h2 className="text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px] lg:leading-[55px]">
            Start with an audit. Grow from there.
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="flex items-start justify-center gap-2.5 text-base leading-7 text-[#5f5f5f] sm:items-center">
              <Image
                src="/icons/shield-check.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="mt-1 shrink-0 sm:mt-0"
              />
              <span>
                <span className="font-semibold">Try any monthly plan for a week.</span>{" "}
                Not the right fit? Get 75% back, no questions asked.
              </span>
            </p>
            <p className="max-w-[706px] text-base leading-7 text-[#5f5f5f]">
              Scope covers product UX and UI. Branding and development are quoted separately.
            </p>
          </div>
        </div>
        <div className="grid w-full items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className="relative flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-card p-6 text-white md:p-10"
            >
              {offer.badge ? (
                <p className="absolute top-0 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-lavender px-4 py-2 font-mono text-sm font-medium tracking-normal whitespace-nowrap text-ink uppercase">
                  <span className="size-2 rounded-full bg-ink" aria-hidden />
                  {offer.badge}
                </p>
              ) : null}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] leading-tight font-normal md:text-[32px]">
                    {offer.title}
                  </h3>
                  <p className="text-[17px] leading-relaxed text-[#dadada]">
                    {offer.description}
                  </p>
                </div>
                <p className="flex flex-wrap items-end gap-3.5 text-white">
                  <PriceFigure
                    blurred={!revealPrices}
                    className={`text-[40px] leading-none md:text-[48px] ${revealPrices ? "" : "blur-[14px]"}`}
                  >
                    {offer.price}
                  </PriceFigure>
                  <span className="text-[15px] leading-6 text-[#dadada]">
                    {offer.cadence.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-base font-medium text-white uppercase">
                    {offer.heading}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <Image
                          src="/icons/check.svg"
                          alt=""
                          width={14}
                          height={14}
                          unoptimized
                          className="mt-1 shrink-0"
                        />
                        <span className="text-base leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <BookButton
                  full
                  size="lg"
                  service={offer.cta === "Book an audit" ? offer.service : undefined}
                  label={offer.cta}
                  className="rounded-xl"
                />
                <p className="text-center text-sm leading-6 text-[#dadada]">
                  {offer.note}
                  {offer.noteFigure ? (
                    <PriceFigure
                      blurred={!revealPrices}
                      className={`text-sm leading-6 ${revealPrices ? "" : "blur-[5px]"}`}
                    >
                      {offer.noteFigure}
                    </PriceFigure>
                  ) : null}
                  {offer.noteSuffix}
                </p>
              </div>
            </article>
          ))}
        </div>
        <OneOffBanner />
      </div>
    </section>
  );
}

export function PricingFallback() {
  return <PricingSection revealPrices={false} />;
}

export async function Pricing() {
  const headerList = await headers();
  const revealPrices = revealPricesForHost(
    headerList.get("x-forwarded-host") ?? headerList.get("host"),
  );

  return <PricingSection revealPrices={revealPrices} />;
}
