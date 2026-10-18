import type { MetadataRoute } from "next";
import { projectSlugs } from "@/data/projects";
import { absoluteUrl, locales } from "@/i18n/config";

const staticPaths = ["/", "/projects", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...staticPaths, ...projectSlugs.map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency: path.startsWith("/projects/") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  );
}
