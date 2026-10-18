import Link from "next/link";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getFeaturedProject, projects } from "@/data/projects";

export default function HomePage() {
  const featured = getFeaturedProject();
  // Избранный проект уже показан в hero, ниже выводим только остальные
  const others = projects.filter((p) => p.slug !== featured.slug);

  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh] bg-[radial-gradient(55%_60%_at_15%_0%,rgba(229,57,43,0.22),transparent_70%),radial-gradient(40%_45%_at_85%_10%,rgba(255,122,26,0.12),transparent_70%)]"
      />
      <HeroSection featured={featured} />
      <ProcessSection />

      {others.length > 0 && (
        <SectionReveal className="container-page py-16 sm:py-24">
          <RevealItem>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Проекты</p>
                <h2 className="mt-2 text-4xl sm:text-5xl">Ещё работы</h2>
              </div>
              <Link
                href="/projects"
                className="hidden shrink-0 text-sm underline underline-offset-4 hover:text-orange sm:block"
              >
                Все проекты
              </Link>
            </div>
          </RevealItem>
          <ul className="mt-10 grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {others.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <RevealItem>
                  <ProjectCard project={project} />
                </RevealItem>
              </li>
            ))}
          </ul>
        </SectionReveal>
      )}

      <div className="border-t border-line">
        <ServicesSection />
      </div>
      <CtaSection />
    </div>
  );
}
