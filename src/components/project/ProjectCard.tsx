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
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
    >
      <div className="card-glow relative aspect-[16/10] overflow-hidden bg-sunken">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-red/50 via-orange/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl transition-colors duration-300 group-hover:text-orange sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            {project.city} · {project.area} м² · {project.year}
          </p>
        </div>
        <span className="mt-1 text-right text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors duration-300 group-hover:text-fg">
          {project.style}
        </span>
      </div>
    </Link>
  );
}
