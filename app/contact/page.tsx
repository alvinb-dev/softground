import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContactExperience, ContactExperienceFallback } from "@/components/contact-form";
import { Header } from "@/components/header";
import { isContactTab, isServiceValue } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Tell me about your product — Softground",
  description:
    "What are you working on, and what you’d like to improve? A short overview would be enough to start with.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div>
      <Header />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pt-6 pb-8 lg:gap-20 lg:px-20 lg:pt-8 lg:pb-12">
        <main className="mx-auto w-full max-w-[1234px]">
          <Suspense fallback={<ContactExperienceFallback />}>
            <ContactSection searchParams={searchParams} />
          </Suspense>
        </main>

        <footer className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Softground" className="shrink-0">
            <Image src="/images/logo.svg" alt="" width={125} height={24} unoptimized />
          </Link>
          <p className="text-right text-sm leading-[1.5] text-ink">© Softground 2026</p>
        </footer>
      </div>
    </div>
  );
}

async function ContactSection({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawService = Array.isArray(params.service) ? params.service[0] : params.service;
  const rawTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const service = rawService && isServiceValue(rawService) ? rawService : undefined;
  const tab = rawTab && isContactTab(rawTab) ? rawTab : service ? "message" : "book";

  return <ContactExperience key={`${tab}-${service ?? "none"}`} defaultService={service} defaultTab={tab} />;
}
