import Link from "next/link";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface CtaSectionProps {
  locale: Locale;
  title?: string;
  text?: string;
}

export function CtaSection({ locale, title, text }: CtaSectionProps) {
  const t = getDictionary(locale).cta;

  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      <RevealItem>
        <div className="relative overflow-hidden border border-line bg-surface p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-orange/15 blur-3xl"
          />
          <div className="rule-gradient absolute inset-x-0 top-0" />
          <div className="relative">
            <h2 className="max-w-2xl text-4xl sm:text-5xl">{title ?? t.title}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-fg-soft">{text ?? t.text}</p>
            <Link href={localePath(locale, "/contact")} className="btn-primary mt-8">
              {t.button}
            </Link>
          </div>
        </div>
      </RevealItem>
    </SectionReveal>
  );
}
