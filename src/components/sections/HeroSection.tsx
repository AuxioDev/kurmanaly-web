import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import type { Project } from "@/lib/types";

export function HeroSection({ featured }: { featured: Project }) {
  return (
    <section className="container-page pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow">Дизайн интерьеров · Бишкек · Москва</p>
          <h1 className="mt-5 text-5xl leading-[1.02] sm:text-7xl">
            Интерьер
            <br />
            от идеи
            <br />
            <span className="text-gradient">до чертежа</span>
          </h1>
        </div>
        <div className="max-w-md lg:pb-3">
          <p className="leading-relaxed text-fg-soft">
            {siteConfig.designer}. Сначала мудборд, потом чертежи, затем
            визуализация. Вы видите весь путь проекта и понимаете, как он
            станет реальностью.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              Смотреть проекты
            </Link>
            <Link href="/contact" className="btn-outline">
              Обсудить проект
            </Link>
          </div>
        </div>
      </div>

      <Link
        href={`/projects/${featured.slug}`}
        className="group relative mt-14 block overflow-hidden bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
      >
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src={featured.cover.src}
            alt={featured.cover.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 text-white sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/70">
              Избранный проект
            </p>
            <p className="mt-1 font-display text-2xl sm:text-3xl">{featured.title}</p>
          </div>
          <span className="hidden text-sm sm:inline">
            {featured.city} · {featured.area} м² →
          </span>
        </div>
      </Link>
    </section>
  );
}
