import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";
import { processSteps } from "@/data/services";

export function ProcessSection({ className = "" }: { className?: string }) {
  return (
    <SectionReveal className={`border-y border-line bg-paper-sunken py-16 sm:py-24 ${className}`}>
      <div className="container-page">
        <RevealItem>
          <p className="eyebrow">Как я работаю</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">
            Три шага, которые видно на каждом проекте
          </h2>
        </RevealItem>

        <ol className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {processSteps.map((step, i) => (
            <li key={step.id} className="bg-paper-sunken">
              <RevealItem className="h-full">
                <div className="flex h-full flex-col p-6 sm:p-8 md:pr-10">
                  <span className="font-display text-5xl text-olive">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{step.description}</p>
                </div>
              </RevealItem>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
