import Link from "next/link";
import { RevealItem, SectionReveal } from "@/components/motion/SectionReveal";

export function CtaSection({
  title = "Расскажите о вашей квартире",
  text = "Опишите объект и задачу, и я отвечу в течение двух рабочих дней с предложением по формату работы.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <SectionReveal className="container-page py-16 sm:py-24">
      <RevealItem>
        <div className="border border-ink p-8 sm:p-14">
          <h2 className="max-w-2xl text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{text}</p>
          <Link href="/contact" className="btn-primary mt-8">
            Обсудить проект
          </Link>
        </div>
      </RevealItem>
    </SectionReveal>
  );
}
