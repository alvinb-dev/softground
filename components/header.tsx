"use client";

import { useState } from "react";
import Image from "next/image";
import { BookButton } from "@/components/book-button";

const links = [
  { href: "#what-you-get", label: "What you get" },
  { href: "#how-we-work", label: "How we work" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white/90 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto] items-center px-6 md:px-12 lg:grid-cols-[1fr_auto_1fr] lg:px-20">
        <a href="#top" className="justify-self-start" aria-label="Softground">
          <Image
            src="/images/logo.svg"
            alt="Softground"
            width={125}
            height={24}
            unoptimized
            priority
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <BookButton />
        </div>

        <button
          type="button"
          className="justify-self-end rounded-lg p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <BookButton full />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
