import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/project/ProjectsBrowser";
import { CtaSection } from "@/components/sections/CtaSection";
import { getProjects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).projects;
  return pageMetadata({
    locale,
    path: "/projects",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function ProjectsPage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).projects;

  return (
    <>
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">
          <span className="text-gradient">{t.title}</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-fg-soft">{t.lead}</p>
        <div className="mt-12">
          <ProjectsBrowser projects={getProjects(locale)} />
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
