import type { Metadata } from "next";
import Link from "next/link";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getFeaturedProject, getProjects } from "@/data/projects";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: { absolute: dict.meta.titleDefault },
    description: dict.meta.description,
  });
}

export default function HomePage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const dict = getDictionary(locale);
  const featured = getFeaturedProject(locale);
  // Избранный проект уже показан в hero, ниже выводим только остальные
  const others = getProjects(locale).filter((p) => p.slug !== featured.slug);

  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh] overflow-hidden"
      >
        <div className="absolute -left-[12%] -top-[22%] h-[60vh] w-[70vw] max-w-[900px] rounded-full bg-red/25 blur-3xl will-change-transform motion-safe:md:animate-float-a md:blur-[120px]" />
        <div className="absolute -right-[10%] top-[4%] h-[46vh] w-[50vw] max-w-[700px] rounded-full bg-orange/15 blur-3xl will-change-transform motion-safe:md:animate-float-b md:blur-[120px]" />
      </div>
      <HeroSection featured={featured} locale={locale} />
      <ProcessSection locale={locale} />

      {others.length > 0 && (
        <SectionReveal className="container-page py-16 sm:py-24">
          <RevealItem>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">{dict.home.moreEyebrow}</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">{dict.home.moreTitle}</h2>
              </div>
              <Link
                href={localePath(locale, "/projects")}
                className="tap hidden shrink-0 text-sm underline underline-offset-4 transition-colors duration-300 hover:text-orange sm:inline-flex"
              >
                {dict.home.all}
              </Link>
            </div>
          </RevealItem>
          <ul className="mt-10 grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {others.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <RevealItem>
                  <ProjectCard project={project} locale={locale} />
                </RevealItem>
              </li>
            ))}
          </ul>
        </SectionReveal>
      )}

      <div className="border-t border-line">
        <ServicesSection locale={locale} />
      </div>
      <CtaSection locale={locale} />
    </div>
  );
}
