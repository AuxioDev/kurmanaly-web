import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectsBrowser } from "@/components/project/ProjectsBrowser";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Дизайн-проекты интерьеров: мудборды, чертежи и визуализации. Бишкек и Москва.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">Портфолио</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">Проекты</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          У каждого проекта показан весь путь: идея, рабочие чертежи и
          итоговые визуализации.
        </p>
        <div className="mt-12">
          <ProjectsBrowser projects={projects} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
