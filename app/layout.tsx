import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/structured-data";
import {
  founderName,
  founderUrl,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialDescription,
  socialTitle,
} from "@/lib/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: founderName, url: founderUrl }],
  creator: founderName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    siteName,
    type: "website",
    url: siteUrl,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip bg-white font-sans text-ink">
        <JsonLd data={siteGraph()} />
        {children}
      </body>
    </html>
  );
}
