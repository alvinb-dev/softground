"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookButton } from "@/components/book-button";

const links = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = pathname === "/" ? "#top" : "/";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white lg:fixed lg:inset-x-0 lg:bg-transparent lg:px-6 lg:pt-6">
      <div className="flex w-full items-center justify-between gap-4 border-b border-line bg-white px-6 py-4 lg:mx-auto lg:max-w-[760px] lg:rounded-[20px] lg:border lg:border-white/70 lg:bg-white/90 lg:py-2 lg:pr-2 lg:pl-6 lg:shadow-[0_8px_30px_rgba(19,20,27,0.08)] lg:backdrop-blur-xl">
        <Link href={homeHref} aria-label="Softground" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Softground"
            width={125}
            height={24}
            unoptimized
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={pathname === "/" ? link.href : `/${link.href}`}
              className="text-base font-medium whitespace-nowrap text-ink hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <BookButton label="Book a call" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-ink lg:hidden"
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
          className="border-b border-line bg-white px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <BookButton full label="Book a call" />
          </div>
        </nav>
      ) : null}
      </header>
      <div aria-hidden="true" className="pointer-events-none hidden lg:block lg:px-6 lg:pt-6">
        <div className="border border-transparent py-2">
          <div className="h-12" />
        </div>
      </div>
    </>
  );
}
