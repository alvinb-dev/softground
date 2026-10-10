"use client";

import { useState } from "react";
import Image from "next/image";

const answered = {
  question: "What do we need to get started?",
  answer:
    "A defined product flow, access to relevant analytics, an experimentation platform, and an engineering team that can launch this test. We'll first check whether your traffic and measurement setup will support the experiment.",
};

const pending = [
  "Who builds and runs the experiment?",
  "What happens after the test?",
  "Do you guarantee an uplift?",
];

export function Faq() {
  const [open, setOpen] = useState(true);

  return (
    <section id="faq" className="px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <h2 className="text-[32px] font-normal leading-[1.15] text-ink md:text-[40px] lg:w-[580px] lg:shrink-0 lg:text-[48px]">
          Common Questions
        </h2>
        <div className="w-full lg:w-[640px] lg:shrink-0">
          <div className="border-b border-line pb-6">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="text-base font-semibold text-ink">
                {answered.question}
              </span>
              <Image
                src={open ? "/icons/minus.svg" : "/icons/plus.svg"}
                alt=""
                width={14}
                height={14}
                unoptimized
                className="shrink-0"
              />
            </button>
            {open ? (
              <p className="mt-4 text-base leading-[1.6] text-muted">
                {answered.answer}
              </p>
            ) : null}
          </div>
          {pending.map((question) => (
            <div
              key={question}
              className="flex items-center justify-between gap-4 border-b border-line py-6"
            >
              <p className="text-base font-semibold text-ink">{question}</p>
              <Image
                src="/icons/plus.svg"
                alt=""
                width={14}
                height={14}
                unoptimized
                className="shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
