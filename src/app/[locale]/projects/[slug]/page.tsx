import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectStory } from "@/components/project/ProjectStory";
import { CtaSection } from "@/components/sections/CtaSection";
import { getProject, projectSlugs } from "@/data/projects";
import { fmt, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const project = getProject(params.slug, locale);
  if (!project) return {};
  const dict = getDictionary(locale);
  const metadata = pageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: {
      url: project.cover.src,
      width: project.cover.width,
      height: project.cover.height,
      alt: project.cover.alt,
    },
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: fmt(dict.project.ogTitle, { title: project.title }),
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const project = getProject(params.slug, locale);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const t = dict.project;

  const facts = [
    { label: t.facts.city, value: project.city },
    { label: t.facts.area, value: `${project.area} ${t.areaUnit}` },
    { label: t.facts.year, value: String(project.year) },
    { label: t.facts.type, value: dict.projects.types[project.type] },
    { label: t.facts.style, value: project.style },
  ];

  return (
    <>
      <article>
        <header className="container-page pt-10 sm:pt-16">
          <Link
            href={localePath(locale, "/projects")}
            className="tap text-sm text-fg-muted transition-colors duration-300 hover:text-orange"
          >
            {t.back}
          </Link>
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-7xl">{project.title}</h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <p className="max-w-2xl text-lg leading-relaxed text-fg-soft">
              {project.summary}
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-3 lg:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd className="mt-1">{f.value}</dd>
                </div>
              ))}
              {project.credits.map((c) => (
                <div key={c.role} className="col-span-2">
                  <dt className="label">{c.role}</dt>
                  <dd className="mt-1">{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-sunken sm:aspect-[21/9]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <div className="mt-16">
          <ProjectStory project={project} />
        </div>
      </article>

      <CtaSection locale={locale} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}
