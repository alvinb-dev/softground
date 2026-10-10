import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { BottomCta } from "@/components/bottom-cta";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PainPoints } from "@/components/pain-points";
import { Pricing } from "@/components/pricing";
import { WhatYouGet } from "@/components/what-you-get";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <WhatYouGet />
        <Approach />
        <About />
        <Pricing />
        <Faq />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
