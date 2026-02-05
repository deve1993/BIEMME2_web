import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://biemme2.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/_next/*", "/private/*"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
