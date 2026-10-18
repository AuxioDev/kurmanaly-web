"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const objectTypes = [
  { value: "apartment", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "commercial", label: "Коммерческое помещение" },
  { value: "other", label: "Другое" },
];

const packages = [
  { value: "unsure", label: "Пока не знаю" },
  { value: "layout", label: "Планировочное решение" },
  { value: "sketch", label: "Эскизный проект" },
  { value: "full", label: "Полный дизайн-проект" },
];

export function InquiryForm({ defaultPackage = "unsure" }: { defaultPackage?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Антиспам: поле-ловушка, которое человек не видит и не заполняет
    if (data.get("website")) return;

    setLoading(true);
    // TODO: подключить отправку (email / Telegram bot / CRM)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="border border-olive bg-olive-soft p-8"
      >
        <p className="font-display text-2xl">Заявка получена</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Спасибо! Я отвечу в течение двух рабочих дней и предложу время для
          короткого созвона.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Имя" htmlFor="name">
          <input id="name" name="name" required autoComplete="name" className="field" placeholder="Как к вам обращаться" />
        </Field>
        <Field label="Email или Telegram" htmlFor="contact">
          <input id="contact" name="contact" required autoComplete="email" className="field" placeholder="you@example.com или @username" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Тип объекта" htmlFor="objectType">
          <select id="objectType" name="objectType" className="field" defaultValue="apartment">
            {objectTypes.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Площадь, м²" htmlFor="area">
          <input id="area" name="area" type="number" min={1} inputMode="numeric" className="field" placeholder="Например, 86" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Город" htmlFor="city">
          <input id="city" name="city" className="field" placeholder="Бишкек, Москва…" />
        </Field>
        <Field label="Что нужно" htmlFor="package">
          <select id="package" name="package" className="field" defaultValue={defaultPackage}>
            {packages.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Расскажите о проекте" htmlFor="message">
        <textarea id="message" name="message" required rows={5} className="field resize-y" placeholder="Сроки, пожелания по стилю, особенности планировки…" />
      </Field>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Не заполняйте это поле</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-olive-deep" />
        <span>Согласен(на) на обработку персональных данных для связи по проекту.</span>
      </label>

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? "Отправляю…" : "Отправить заявку"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
