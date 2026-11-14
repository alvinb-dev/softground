import type { MetadataRoute } from "next";
import { contactPath, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}${contactPath}`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
