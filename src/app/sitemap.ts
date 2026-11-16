import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://task7-front-end-for-task6.vercel.app/", changeFrequency: "weekly", priority: 1 }];
}
