"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projectTypeLabels } from "@/data/projects";
import type { Project, ProjectType } from "@/lib/types";

type Filter = ProjectType | "all";

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const filters = useMemo<Filter[]>(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.type)))],
    [projects],
  );
  const visible = projects.filter((p) => active === "all" || p.type === active);

  return (
    <div>
      {filters.length > 2 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр проектов по типу">
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(f)}
                className={`border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                  isActive
                    ? "border-red-deep bg-red-deep text-white"
                    : "border-line text-fg-muted hover:border-orange hover:text-fg"
                }`}
              >
                {projectTypeLabels[f]}
              </button>
            );
          })}
        </div>
      )}

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
              <ProjectCard project={project} priority={i === 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
