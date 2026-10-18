import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ProcessSection({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale).process;

  return (
    <SectionReveal
      className={`relative overflow-hidden border-y border-line bg-sunken py-16 sm:py-24 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange/10 blur-3xl"
      />
      <div className="container-page relative">
        <RevealItem>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">{t.title}</h2>
        </RevealItem>

        <ol className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {t.steps.map((step, i) => (
            <li key={step.id} className="group relative overflow-hidden bg-sunken">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-red/15 via-red/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <RevealItem className="relative h-full">
                <div className="flex h-full flex-col p-6 sm:p-8 md:pr-10">
                  <span className="font-display text-5xl text-gradient">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-fg-soft">{step.description}</p>
                </div>
              </RevealItem>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
