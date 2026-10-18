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

  return (
    <>
      <HeroSection featured={featured} />
      <ProcessSection />

      <SectionReveal className="container-page py-16 sm:py-24">
        <RevealItem>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Проекты</p>
              <h2 className="mt-2 text-4xl sm:text-5xl">Избранные работы</h2>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 text-sm underline underline-offset-4 hover:text-olive-deep sm:block"
            >
              Все проекты
            </Link>
          </div>
        </RevealItem>
        <ul className="mt-10 grid gap-x-8 gap-y-14 lg:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <li key={project.slug}>
              <RevealItem>
                <ProjectCard project={project} />
              </RevealItem>
            </li>
          ))}
        </ul>
      </SectionReveal>

      <div className="border-t border-line">
        <ServicesSection />
      </div>
      <CtaSection />
    </>
  );
}
