import { Suspense } from "react";
import Image from "next/image";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { BottomCta } from "@/components/bottom-cta";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Opportunity } from "@/components/opportunity";
import { Pricing, PricingFallback } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div id="top">
        <div className="relative isolate z-50">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <Header />
        <Hero />
      </div>
      <main>
        <Opportunity />
        <Testimonials />
        <About />
        <Approach />
        <Suspense fallback={<PricingFallback />}>
          <Pricing />
        </Suspense>
        <Faq />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
