import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunken">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl sm:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">
            {project.city} · {project.area} м² · {project.year}
          </p>
        </div>
        <span className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors group-hover:text-ink">
          {project.style}
        </span>
      </div>
    </Link>
  );
}
