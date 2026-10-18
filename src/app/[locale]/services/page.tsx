import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";
import { faqStructuredData } from "@/lib/structured-data";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).servicesPage;
  return pageMetadata({
    locale,
    path: "/services",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function ServicesPage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).servicesPage;

  return (
    <>
      <JsonLd data={faqStructuredData(t.faq)} />
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">
          {t.titleBefore}
          <span className="text-gradient">{t.titleAccent}</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-fg-soft">{t.lead}</p>
      </section>

      <ServicesSection locale={locale} showHeading={false} />
      <ProcessSection locale={locale} />

      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">{t.sampleEyebrow}</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">{t.sampleTitle}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-fg-soft">{t.sampleText}</p>
          </div>
          <ol className="grid gap-x-8 border-t border-line sm:grid-cols-2">
            {t.drawingSet.map((name, i) => (
              <li key={name} className="flex gap-4 border-b border-line py-3 text-sm">
                <span className="w-6 shrink-0 text-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-sunken py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">{t.faqTitle}</h2>
          </div>
          <div className="border-t border-line">
            {t.faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-display text-xl transition-colors duration-300 hover:text-orange sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="pb-5 pr-10 leading-relaxed text-fg-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
