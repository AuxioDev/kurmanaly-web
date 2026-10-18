import Link from "next/link";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { servicePackages } from "@/data/services";

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      {showHeading && (
        <RevealItem>
          <p className="eyebrow">Услуги</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">
            Выберите объём работы под вашу задачу
          </h2>
        </RevealItem>
      )}

      <ul className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${showHeading ? "mt-12" : ""}`}>
        {servicePackages.map((pkg) => (
          <li
            key={pkg.id}
            className={pkg.highlighted ? "md:col-span-2 lg:col-span-1" : undefined}
          >
            <RevealItem className="h-full">
              <article
                className={`card-glow surface-gradient relative flex h-full flex-col border p-6 sm:p-8 ${
                  pkg.highlighted ? "border-red-deep" : "border-line"
                }`}
              >
                {pkg.highlighted && (
                  <p className="absolute left-6 top-0 -translate-y-1/2 bg-gradient-to-r from-red-deep to-red px-2.5 py-1 text-xs text-white sm:left-8">
                    Самый полный
                  </p>
                )}
                <h3 className="text-2xl sm:text-3xl">{pkg.name}</h3>
                <p className="mt-2 text-sm text-fg-muted">{pkg.tagline}</p>

                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gradient-to-r from-red to-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 space-y-1 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-muted">Срок</dt>
                    <dd>{pkg.duration}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-fg-muted">Стоимость</dt>
                    <dd className="text-right">{pkg.priceNote}</dd>
                  </div>
                </dl>

                <Link
                  href={`/contact?package=${pkg.id}`}
                  className={`mt-6 ${pkg.highlighted ? "btn-primary" : "btn-outline"}`}
                >
                  Обсудить
                </Link>
              </article>
            </RevealItem>
          </li>
        ))}
      </ul>
    </SectionReveal>
  );
}
