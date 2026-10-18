"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { BeforeAfter } from "@/components/project/BeforeAfter";
import { ImageLightbox, type LightboxItem } from "@/components/project/ImageLightbox";
import type { Project } from "@/lib/types";

export function ProjectStory({ project }: { project: Project }) {
  const hasMoodboard = project.moodboard.length > 0;
  const steps = [
    ...(hasMoodboard ? [{ id: "moodboard", label: "Мудборд" }] : []),
    { id: "drawings", label: "Чертежи" },
    { id: "renders", label: "Визуализации" },
  ];

  return (
    <div>
      <nav
        aria-label="Разделы проекта"
        className="sticky top-14 z-30 border-y border-line bg-paper/90 backdrop-blur-md sm:top-16"
      >
        <ol className="container-page flex gap-6 overflow-x-auto py-3 text-sm">
          {steps.map((step, i) => (
            <li key={step.id} className="shrink-0">
              <a
                href={`#${step.id}`}
                className="text-ink-muted transition-colors hover:text-ink"
              >
                <span className="mr-2 text-xs">0{i + 1}</span>
                {step.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {hasMoodboard && <MoodboardSection project={project} number="01" />}
      <DrawingsSection project={project} number={hasMoodboard ? "02" : "01"} />
      <RendersSection project={project} number={hasMoodboard ? "03" : "02"} />
    </div>
  );
}

function SectionHeading({
  id,
  number,
  title,
  lead,
}: {
  id: string;
  number: string;
  title: string;
  lead: string;
}) {
  return (
    <RevealItem>
      <div id={id} className="scroll-mt-32 max-w-2xl">
        <p className="eyebrow">{number}</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">{title}</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">{lead}</p>
      </div>
    </RevealItem>
  );
}

function MoodboardSection({ project, number }: { project: Project; number: string }) {
  const items = useMemo<LightboxItem[]>(
    () => project.moodboard.map((m, i) => ({ ...m, title: `Мудборд ${i + 1}` })),
    [project.moodboard],
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      <SectionHeading
        id="moodboard"
        number={number}
        title="Мудборд"
        lead="Образ интерьера до чертежей: настроение, палитра и материалы."
      />
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((m, i) => (
          <button
            key={m.src}
            type="button"
            onClick={() => setOpen(i)}
            className="mb-4 block w-full break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
          >
            <Image
              src={m.src}
              alt={m.alt}
              width={m.width}
              height={m.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </SectionReveal>
  );
}

function DrawingsSection({ project, number }: { project: Project; number: string }) {
  const items = useMemo<LightboxItem[]>(
    () =>
      project.drawings.map((d) => ({
        src: d.src,
        width: d.width,
        height: d.height,
        alt: d.alt,
        title: d.title,
        caption: `Лист ${d.sheet}`,
      })),
    [project.drawings],
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionReveal className="border-t border-line bg-paper-sunken py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="drawings"
          number={number}
          title="Чертежи"
          lead={`Рабочая документация: ${project.drawings.length} листов, по которым ведётся ремонт. Нажмите на лист, чтобы открыть его и увеличить.`}
        />

        {project.beforeAfter && (
          <RevealItem>
            <div className="mt-10">
              <BeforeAfter
                before={project.beforeAfter.before}
                after={project.beforeAfter.after}
              />
            </div>
          </RevealItem>
        )}

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((d, i) => (
            <li key={d.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              >
                <span className="relative block aspect-[1.414/1] overflow-hidden border border-line bg-paper-raised transition-colors group-hover:border-ink">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain"
                  />
                </span>
                <span className="mt-2 block text-xs text-ink-muted">{d.caption}</span>
                <span className="block text-sm">{d.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ImageLightbox
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </SectionReveal>
  );
}

function RendersSection({ project, number }: { project: Project; number: string }) {
  const items = useMemo<LightboxItem[]>(
    () =>
      project.renders.map((r) => ({
        src: r.src,
        width: r.width,
        height: r.height,
        alt: r.alt,
        title: r.room,
      })),
    [project.renders],
  );
  const rooms = useMemo(
    () => Array.from(new Set(project.renders.map((r) => r.room))),
    [project.renders],
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      <SectionHeading
        id="renders"
        number={number}
        title="Визуализации"
        lead="Так будет выглядеть результат: свет, материалы и детали каждой комнаты."
      />

      <div className="mt-12 space-y-14">
        {rooms.map((room) => (
          <div key={room}>
            <h3 className="font-display text-2xl sm:text-3xl">{room}</h3>
            <div className="mt-5 columns-1 gap-4 sm:columns-2">
              {project.renders.map((r, i) =>
                r.room === room ? (
                  <button
                    key={r.src}
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group mb-4 block w-full break-inside-avoid overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
                  >
                    <Image
                      src={r.src}
                      alt={r.alt}
                      width={r.width}
                      height={r.height}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </button>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <ImageLightbox
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </SectionReveal>
  );
}
