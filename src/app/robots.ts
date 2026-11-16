import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://task7-front-end-for-task6.vercel.app/sitemap.xml" };
}
