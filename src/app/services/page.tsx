import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { drawingSetExample } from "@/data/services";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Планировочное решение, эскизный проект и полный дизайн-проект интерьера: что входит, сроки и формат работы.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">Услуги</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">
          Что входит <span className="text-gradient">в проект</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-fg-soft">
          Три формата работы: от планировки до полной документации для ремонта.
          Работаю дистанционно с объектами в Бишкеке и Москве.
        </p>
      </section>

      <ServicesSection showHeading={false} />
      <ProcessSection />

      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Пример</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Ведомость чертежей</h2>
            <p className="mt-4 max-w-md leading-relaxed text-fg-soft">
              Так выглядит комплект рабочей документации в полном проекте. Состав
              уточняется под объект.
            </p>
          </div>
          <ol className="grid gap-x-8 border-t border-line sm:grid-cols-2">
            {drawingSetExample.map((name, i) => (
              <li
                key={name}
                className="flex gap-4 border-b border-line py-3 text-sm"
              >
                <span className="w-6 shrink-0 text-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
