"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project/ProjectCard";
import { useI18n } from "@/i18n/I18nProvider";
import type { Project, ProjectType } from "@/lib/types";

type TypeFilter = ProjectType | "all";

/** Дополнительные фильтры (стиль, город) появляются, когда проектов не меньше этого числа. */
const EXTRA_FILTERS_FROM = 4;

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const { locale, dict } = useI18n();
  const t = dict.projects;
  const [type, setType] = useState<TypeFilter>("all");
  const [style, setStyle] = useState("all");
  const [city, setCity] = useState("all");

  const types = useMemo<TypeFilter[]>(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.type)))],
    [projects],
  );
  const styles = useMemo(() => Array.from(new Set(projects.map((p) => p.style))), [projects]);
  const cities = useMemo(() => Array.from(new Set(projects.map((p) => p.city))), [projects]);

  const visible = projects.filter(
    (p) =>
      (type === "all" || p.type === type) &&
      (style === "all" || p.style === style) &&
      (city === "all" || p.city === city),
  );

  const showTypes = types.length > 2;
  const showExtra = projects.length >= EXTRA_FILTERS_FROM;

  return (
    <div>
      {(showTypes || showExtra) && (
        <div className="flex flex-wrap items-center gap-2">
          {showTypes && (
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterLabel}>
              {types.map((f) => {
                const isActive = type === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setType(f)}
                    className={`min-h-11 border px-5 py-2 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                      isActive
                        ? "border-red-deep bg-red-deep text-white"
                        : "border-line text-fg-muted hover:border-orange hover:text-fg"
                    }`}
                  >
                    {t.types[f]}
                  </button>
                );
              })}
            </div>
          )}

          {showExtra && (
            <>
              <select
                aria-label={t.styleLabel}
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="field !mt-0 !w-auto"
              >
                <option value="all">{t.allStyles}</option>
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                aria-label={t.cityLabel}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="field !mt-0 !w-auto"
              >
                <option value="all">{t.allCities}</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      {visible.length === 0 && <p className="mt-10 text-fg-muted">{t.empty}</p>}

      <motion.ul layout className="mt-10 grid gap-x-8 gap-y-14 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} locale={locale} priority={i === 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
