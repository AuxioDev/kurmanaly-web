"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { BeforeAfter } from "@/components/project/BeforeAfter";
import { ImageLightbox, type LightboxItem } from "@/components/project/ImageLightbox";
import { luxuryEase } from "@/lib/motion";
import type { Project } from "@/lib/types";

/** Каскадное появление элементов галереи при попадании в экран */
const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.65, delay: (i % 4) * 0.07, ease: luxuryEase },
});

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
        className="sticky top-14 z-30 border-y border-line bg-canvas/90 backdrop-blur-md"
      >
        <ol className="container-page flex gap-6 overflow-x-auto text-sm">
          {steps.map((step, i) => (
            <li key={step.id} className="shrink-0">
              <a
                href={`#${step.id}`}
                className="tap text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                <span className="mr-2 text-xs text-orange">0{i + 1}</span>
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
        <p className="mt-4 leading-relaxed text-fg-soft">{lead}</p>
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
          <motion.button
            key={m.src}
            type="button"
            onClick={() => setOpen(i)}
            {...reveal(i)}
            className="mb-4 block w-full break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
          >
            <Image
              src={m.src}
              alt={m.alt}
              width={m.width}
              height={m.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </motion.button>
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
    <SectionReveal className="border-t border-line bg-sunken py-16 sm:py-24">
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
            <motion.li key={d.src} {...reveal(i)}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <span className="relative block aspect-[1.414/1] overflow-hidden border border-line bg-surface transition-[border-color,transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:border-orange group-hover:shadow-[0_14px_40px_-18px_rgba(255,122,26,0.45)]">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain"
                  />
                </span>
                <span className="mt-2 block text-xs text-fg-muted">{d.caption}</span>
                <span className="block text-sm">{d.title}</span>
              </button>
            </motion.li>
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
                  <motion.button
                    key={r.src}
                    type="button"
                    onClick={() => setOpen(i)}
                    {...reveal(i)}
                    className="group relative mb-4 block w-full break-inside-avoid overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                  >
                    <Image
                      src={r.src}
                      alt={r.alt}
                      width={r.width}
                      height={r.height}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-red/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </motion.button>
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
