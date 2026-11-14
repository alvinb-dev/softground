import { faqItems } from "@/lib/faq";
import { offers } from "@/lib/offers";
import {
  contactDescription,
  contactPath,
  contactTitle,
  founderName,
  founderRole,
  founderUrl,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialDescription,
} from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const areaServed = ["United States", "Europe", "Australia"];

function priceAmount(price: string) {
  return price.replace(/[^0-9.]/g, "");
}

function offerNote(offer: (typeof offers)[number]) {
  return `${offer.note}${offer.noteFigure ?? ""}${offer.noteSuffix ?? ""}`.trim();
}

function serviceNodes() {
  return offers.map((offer) => {
    const monthly = offer.cadence.some((line) => line.includes("/ month"));
    const amount = priceAmount(offer.price);

    return {
      "@type": "Service",
      "@id": `${siteUrl}/#${offer.service}`,
      name: offer.title,
      serviceType: "Product design",
      description: `${offer.description} ${offer.points.join(". ")}. ${offerNote(offer)}`,
      url: `${siteUrl}/#pricing`,
      provider: { "@id": organizationId },
      areaServed,
      offers: {
        "@type": "Offer",
        url: `${siteUrl}${contactPath}`,
        price: amount,
        priceCurrency: "USD",
        availability:
          offer.badge === "Limited spots"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
        ...(monthly
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: amount,
                priceCurrency: "USD",
                unitText: "MONTH",
                referenceQuantity: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode: "MON",
                },
              },
            }
          : {}),
      },
    };
  });
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: siteName,
        url: siteUrl,
        description: socialDescription,
        logo: `${siteUrl}/images/logo.svg`,
        image: `${siteUrl}/images/portrait.png`,
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Perth",
          addressCountry: "AU",
        },
        areaServed,
        knowsAbout: [
          "Product design",
          "Activation",
          "Conversion",
          "Retention",
          "Subscription experiences",
        ],
        sameAs: [founderUrl],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${siteUrl}${contactPath}`,
          availableLanguage: "English",
          areaServed,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: founderName,
        jobTitle: founderRole,
        description:
          "Founder and Senior Product Designer at Softground. Senior product designer with 9 years’ experience, including 5 years at Canva, focused on subscription experiences, activation, conversion and retention.",
        url: `${siteUrl}/#about`,
        image: `${siteUrl}/images/portrait.png`,
        worksFor: { "@id": organizationId },
        sameAs: [founderUrl],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Perth",
          addressCountry: "AU",
        },
        knowsAbout: [
          "Product design",
          "Experimentation",
          "Subscription design",
          "Activation",
          "Conversion",
          "Retention",
        ],
      },
      ...serviceNodes(),
    ],
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: `${siteUrl}/images/portrait.png`,
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        url: `${siteUrl}/#faq`,
        isPartOf: { "@id": `${siteUrl}/#webpage` },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.join("\n\n"),
          },
        })),
      },
    ],
  };
}

export function contactGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}${contactPath}#webpage`,
        url: `${siteUrl}${contactPath}`,
        name: `${contactTitle} — ${siteName}`,
        description: contactDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "en",
      },
    ],
  };
}
