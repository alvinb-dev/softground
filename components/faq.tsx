"use client";

import { useState } from "react";
import Image from "next/image";
import { faqItems } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6">
        <h2 className="text-center text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
          Common Questions
        </h2>
        <div className="w-full">
          {faqItems.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.question} className="border-b border-line">
                <h3 className="text-base font-semibold">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span className="text-base font-semibold text-ink">
                      {item.question}
                    </span>
                    <Image
                      src={expanded ? "/icons/minus.svg" : "/icons/plus.svg"}
                      alt=""
                      width={14}
                      height={14}
                      unoptimized
                      className="shrink-0"
                    />
                  </button>
                </h3>
                <div className={expanded ? "flex flex-col gap-4 pb-6" : "hidden"}>
                  {item.answer.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-[1.6] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
