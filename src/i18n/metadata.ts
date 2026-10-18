import type { Metadata } from "next";
import { absoluteUrl, locales, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

interface PageMetadataInput {
  locale: Locale;
  /** Путь без языкового префикса: "/projects" */
  path: string;
  title: string | { absolute: string };
  description: string;
  image?: { url: string; width: number; height: number; alt?: string };
}

const DEFAULT_OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630 };

/** Метаданные страницы: канонический адрес, hreflang-альтернативы и Open Graph. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const dict = getDictionary(locale);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, absoluteUrl(l, path)]),
  );
  languages["x-default"] = absoluteUrl("ru", path);

  const ogTitle = typeof title === "string" ? title : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(locale, path), languages },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(locale, path),
      siteName: "kurmanaly.com",
      locale: dict.meta.ogLocale,
      type: "website",
      images: [image],
    },
  };
}
