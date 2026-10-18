"use client";

import Link from "next/link";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { locale, dict } = useI18n();
  const t = dict.notFound;

  return (
    <section className="container-page py-24 text-center sm:py-32">
      <p className="eyebrow justify-center">{t.eyebrow}</p>
      <h1 className="mt-3 text-5xl sm:text-7xl">{t.title}</h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-fg-soft">{t.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={localePath(locale, "/")} className="btn-primary">
          {t.home}
        </Link>
        <Link href={localePath(locale, "/projects")} className="btn-outline">
          {t.projects}
        </Link>
      </div>
    </section>
  );
}
