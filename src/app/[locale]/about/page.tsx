import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).about;
  return pageMetadata({
    locale,
    path: "/about",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function AboutPage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">
          <span className="text-gradient">{dict.brand.designer}</span>
        </h1>

        <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-fg-soft">
          {t.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <a href="/portfolio.pdf" download className="btn-outline mt-8">
          {t.portfolio}
        </a>
      </section>

      <section className="container-page py-16 sm:py-24">
        <h2 className="text-4xl sm:text-5xl">{t.principlesTitle}</h2>
        <ul className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {t.principles.map((p) => (
            <li key={p.title} className="surface-gradient p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
