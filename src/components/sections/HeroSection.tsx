import Link from "next/link";
import { ParallaxCover } from "@/components/motion/ParallaxCover";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Project } from "@/lib/types";

export function HeroSection({ featured, locale }: { featured: Project; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.hero;

  return (
    <section className="container-page pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-5 text-5xl leading-[1.02] sm:text-7xl lg:text-[5.5rem]">
            {t.titleLine1}
            <br />
            {t.titleLine2}
            <br />
            <span className="text-gradient">{t.titleAccent}</span>
          </h1>
        </div>
        <div className="max-w-md lg:pb-3">
          <p className="leading-relaxed text-fg-soft">
            {dict.brand.designer}. {t.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale, "/projects")} className="btn-primary">
              {t.primary}
            </Link>
            <Link href={localePath(locale, "/contact")} className="btn-outline">
              {t.secondary}
            </Link>
          </div>
        </div>
      </div>

      <Link
        href={localePath(locale, `/projects/${featured.slug}`)}
        className="group relative mt-12 block overflow-hidden bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:mt-14"
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]">
            <ParallaxCover
              src={featured.cover.src}
              alt={featured.cover.alt}
              sizes="(min-width: 1280px) 1216px, 100vw"
              priority
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-red/25 via-transparent to-orange/10 opacity-70 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-16 text-white sm:p-6 sm:pt-20">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-orange-soft">
              {t.featured}
            </p>
            <p className="mt-1 font-display text-2xl sm:text-3xl">{featured.title}</p>
          </div>
          <span className="hidden items-center gap-2 text-sm sm:inline-flex">
            {featured.city} · {featured.area} {dict.project.areaUnit}
            <span
              aria-hidden
              className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </section>
  );
}
