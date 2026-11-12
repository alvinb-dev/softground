"use client";

import { useEffect, useRef, useState } from "react";

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [stride, setStride] = useState(0);

  const pageCount = Math.ceil(quotes.length / perPage);
  const activePage = Math.min(page, pageCount - 1);
  const rangeStart = activePage * perPage + 1;
  const rangeEnd = Math.min(quotes.length, rangeStart + perPage - 1);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const cards = [...track.children] as HTMLElement[];
      const first = cards[0];
      if (!first) return;

      const firstRect = first.getBoundingClientRect();
      const gap =
        cards.length > 1
          ? cards[1].getBoundingClientRect().left - firstRect.right
          : 0;
      const cardStride = firstRect.width + gap;
      if (cardStride <= 0) return;

      const nextPerPage = Math.max(
        1,
        Math.round((viewport.clientWidth + gap) / cardStride),
      );
      setPerPage(nextPerPage);
      setStride(cardStride * nextPerPage);
      setPage((current) =>
        Math.min(current, Math.ceil(cards.length / nextPerPage) - 1),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  function goTo(next: number) {
    setPage(Math.max(0, Math.min(pageCount - 1, next)));
  }

  return (
    <section
      className="px-6 py-16 md:px-12 md:py-20 lg:px-20"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[32px] leading-[1.2] font-normal text-ink md:text-[40px]">
            What it’s like to work with me.
          </h2>
          <p className="text-base leading-[1.5] text-ink">
            In the words of the people I’ve designed alongside.
          </p>
        </div>

        <div ref={viewportRef} className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex touch-pan-y gap-4 transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activePage * stride}px)` }}
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              dragStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (dragStart.current == null) return;
              const delta = event.clientX - dragStart.current;
              dragStart.current = null;
              if (delta <= -48) goTo(activePage + 1);
              else if (delta >= 48) goTo(activePage - 1);
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
          >
            {quotes.map((item, index) => (
              <figure
                key={item.quote}
                className="flex w-full shrink-0 flex-col gap-4 rounded-2xl border border-[#d4d4d4] bg-white p-6 lg:w-[calc((100%-2rem)/3)]"
                aria-hidden={index < rangeStart - 1 || index >= rangeEnd}
              >
                <blockquote className="text-base leading-[1.5] text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="font-mono text-sm font-medium tracking-normal text-ink uppercase">
                  — {item.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing testimonials {rangeStart} to {rangeEnd} of {quotes.length}
        </p>

        <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonials"
            disabled={activePage === 0}
            onClick={() => goTo(activePage - 1)}
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition hover:bg-[#f4f4f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M12.5 4.5L7 10l5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activePage}
                aria-label={`Testimonials page ${index + 1} of ${pageCount}`}
                onClick={() => goTo(index)}
                className={[
                  "rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                  index === activePage ? "h-2 w-6 bg-ink" : "size-2 bg-ink/25 hover:bg-ink/50",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonials"
            disabled={activePage === pageCount - 1}
            onClick={() => goTo(activePage + 1)}
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition hover:bg-[#f4f4f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M7.5 4.5L13 10l-5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="text-center text-sm leading-[1.5] text-[#737373]">
          Softground is an independent design studio and is not affiliated with
          or endorsed by Canva.
        </p>
        </div>
      </div>
    </section>
  );
}
