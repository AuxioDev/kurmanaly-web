import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CtaSection";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Обо мне",
  description: `${siteConfig.designer}: дизайнер интерьеров, Бишкек. Подход к работе и принципы.`,
};

const principles = [
  {
    title: "Начинаю с образа",
    text: "Мудборд помогает договориться о настроении и материалах до того, как появятся первые линии на плане.",
  },
  {
    title: "Доводю до чертежей",
    text: "Проект не заканчивается картинкой: рабочие листы, спецификации и узлы нужны, чтобы результат совпал с визуализацией.",
  },
  {
    title: "Показываю результат заранее",
    text: "Фотореалистичные визуализации позволяют поправить детали на бумаге, а не на стройке.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page pt-10 sm:pt-16">
        <p className="eyebrow">Обо мне</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">{siteConfig.designer}</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* TODO: заменить блок на портретное фото */}
          <div
            aria-hidden
            className="flex aspect-[4/5] items-center justify-center border border-line bg-paper-sunken text-sm text-ink-muted"
          >
            Здесь будет портрет
          </div>
          <div className="max-w-xl space-y-5 leading-relaxed text-ink-soft">
            {/* TODO: заменить на реальный текст от Малики */}
            <p>
              Я дизайнер интерьеров из Бишкека. Работаю с квартирами и домами в
              Кыргызстане и России, в том числе дистанционно.
            </p>
            <p>
              Мои проекты разные по стилю: от спокойной классики до тёмного
              контемпорари. Объединяет их одно: продуманная планировка,
              чертежи, по которым удобно строить, и честная визуализация.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <h2 className="text-4xl sm:text-5xl">Принципы работы</h2>
        <ul className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="bg-paper p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection />
    </>
  );
}
