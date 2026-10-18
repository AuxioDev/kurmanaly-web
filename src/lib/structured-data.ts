import { getSameAs } from "@/data/site";
import { absoluteUrl, siteUrl, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/lib/types";

const context = "https://schema.org";

function person(dict: Dictionary) {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: dict.brand.designer,
    jobTitle: dict.brand.jobTitle,
    url: siteUrl,
    image: `${siteUrl}/og.jpg`,
    sameAs: getSameAs(),
    homeLocation: { "@type": "City", name: "Bishkek" },
  };
}

/** Главная: сайт и автор (дизайнер интерьеров, работающий в Бишкеке и Москве). */
export function homeStructuredData(locale: Locale, dict: Dictionary) {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "kurmanaly.com",
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      person(dict),
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: dict.meta.titleDefault,
        description: dict.meta.description,
        url: absoluteUrl(locale, "/"),
        image: `${siteUrl}/og.jpg`,
        areaServed: [
          { "@type": "City", name: "Bishkek" },
          { "@type": "City", name: "Moscow" },
        ],
        provider: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}

/** Страница услуг: блок «Частые вопросы». */
export function faqStructuredData(faq: { q: string; a: string }[]) {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Страница проекта: произведение с автором и изображениями. */
export function projectStructuredData(locale: Locale, dict: Dictionary, project: Project) {
  const images = [project.cover, ...project.renders].map((img) => `${siteUrl}${img.src}`);
  return {
    "@context": context,
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(locale, `/projects/${project.slug}`),
    inLanguage: locale,
    dateCreated: String(project.year),
    genre: project.style,
    image: images,
    locationCreated: { "@type": "City", name: project.city },
    creator: person(dict),
    contributor: project.credits.slice(1).map((c) => ({ "@type": "Person", name: c.name })),
  };
}

/** Хлебные крошки страницы проекта. */
export function breadcrumbStructuredData(
  items: { name: string; url: string }[],
) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
