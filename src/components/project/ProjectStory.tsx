"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeImage } from "@/components/motion/FadeImage";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { BeforeAfter } from "@/components/project/BeforeAfter";
import { ImageLightbox, type LightboxItem } from "@/components/project/ImageLightbox";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { luxuryEase } from "@/lib/motion";
import type { Project } from "@/lib/types";

/** Сколько листов чертежей показываем до нажатия «Показать все» (два ровных ряда по 4) */
const INITIAL_SHEETS = 8;

/** Каскадное появление элементов галереи при попадании в экран */
const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.65, delay: (i % 4) * 0.07, ease: luxuryEase },
});

export function ProjectStory({ project }: { project: Project }) {
  const { dict } = useI18n();
  const t = dict.project;
  const hasMoodboard = project.moodboard.length > 0;
  const steps = [
    ...(hasMoodboard ? [{ id: "moodboard", label: t.steps.moodboard }] : []),
    { id: "drawings", label: t.steps.drawings },
    { id: "renders", label: t.steps.renders },
  ];

  return (
    <div>
      <nav
        aria-label={t.navLabel}
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
  const { dict } = useI18n();
  const t = dict.project;
  const items = useMemo<LightboxItem[]>(
    () => project.moodboard.map((m, i) => ({ ...m, title: fmt(t.moodboardItem, { n: i + 1 }) })),
    [project.moodboard, t.moodboardItem],
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      <SectionHeading
        id="moodboard"
        number={number}
        title={t.steps.moodboard}
        lead={t.moodboardLead}
      />
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((m, i) => (
          <motion.button
            key={m.src}
            type="button"
            onClick={() => setOpen(i)}
            {...reveal(i)}
            style={{ aspectRatio: `${m.width} / ${m.height}` }}
            className="skeleton mb-4 block w-full break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
          >
            <FadeImage
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
  const { dict } = useI18n();
  const t = dict.project;
  const items = useMemo<LightboxItem[]>(
    () =>
      project.drawings.map((d) => ({
        src: d.src,
        width: d.width,
        height: d.height,
        alt: d.alt,
        title: d.title,
        caption: fmt(t.sheet, { sheet: d.sheet }),
      })),
    [project.drawings, t.sheet],
  );
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const collapsible = items.length > INITIAL_SHEETS;
  const visible = expanded || !collapsible ? items : items.slice(0, INITIAL_SHEETS);

  function toggle() {
    if (expanded) {
      // После сворачивания возвращаем читателя к началу раздела, чтобы страница не «прыгала»
      document.getElementById("drawings")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded((v) => !v);
  }

  return (
    <SectionReveal className="border-t border-line bg-sunken pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div className="container-page">
        <SectionHeading
          id="drawings"
          number={number}
          title={t.steps.drawings}
          lead={fmt(t.drawingsLead, { n: project.drawings.length })}
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
          {visible.map((d, i) => (
            <motion.li key={d.src} {...reveal(i)}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              >
                <span className="skeleton relative block aspect-[1.414/1] overflow-hidden border border-line transition-[border-color,transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:border-orange group-hover:shadow-[0_14px_40px_-18px_rgba(255,122,26,0.45)]">
                  <FadeImage
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

        {collapsible && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              className="btn-outline"
            >
              {expanded ? t.collapse : fmt(t.showAll, { n: items.length })}
            </button>
          </div>
        )}
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
  const { dict } = useI18n();
  const t = dict.project;
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
    <SectionReveal className="container-page pb-16 pt-16 sm:pb-24 sm:pt-20">
      <SectionHeading
        id="renders"
        number={number}
        title={t.steps.renders}
        lead={t.rendersLead}
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
                    style={{ aspectRatio: `${r.width} / ${r.height}` }}
                    className="skeleton group relative mb-4 block w-full break-inside-avoid overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                  >
                    <span className="block transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
                      <FadeImage
                        src={r.src}
                        alt={r.alt}
                        width={r.width}
                        height={r.height}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full"
                      />
                    </span>
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
