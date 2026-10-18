"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getChannels, messageUrl, type ChannelId } from "@/data/site";
import { fmt } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

type ObjectType = "apartment" | "house" | "commercial" | "other";
type PackageId = "unsure" | "layout" | "sketch" | "full";

interface FormState {
  name: string;
  objectType: ObjectType;
  area: string;
  city: string;
  need: PackageId;
  message: string;
}

const channels = getChannels();
const PACKAGE_IDS: PackageId[] = ["layout", "sketch", "full"];

/**
 * Конструктор заявки: собирает из брифа готовое сообщение и открывает выбранный канал.
 * Сайт ничего не отправляет и не хранит.
 */
export function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contact.form;
  const [state, setState] = useState<FormState>({
    name: "",
    objectType: "apartment",
    area: "",
    city: "",
    need: "unsure",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();

  // Пакет из ссылки со страницы услуг (?package=full). Читаем после монтирования:
  // так страница остаётся статической, а форма попадает в исходный HTML.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("package") as PackageId | null;
    if (requested && PACKAGE_IDS.includes(requested)) {
      setState((prev) => ({ ...prev, need: requested }));
    }
  }, []);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const ready = state.name.trim() !== "" && state.message.trim() !== "";

  const text = useMemo(() => {
    const object = [
      t.objectTypes[state.objectType],
      state.area.trim() ? `${state.area.trim()} ${dict.project.areaUnit}` : "",
      state.city.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    return [
      t.greeting,
      fmt(t.intro, { name: state.name.trim() || "…" }),
      "",
      fmt(t.lineObject, { value: object }),
      state.need !== "unsure" ? fmt(t.lineNeed, { value: t.packages[state.need] }) : null,
      fmt(t.lineMessage, { value: state.message.trim() || "…" }),
    ]
      .filter((line) => line !== null)
      .join("\n");
  }, [state, t, dict.project.areaUnit]);

  const subject = fmt(t.emailSubject, { name: state.name.trim() || "…" });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // запасной путь для браузеров без доступа к буферу обмена
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2200);
  }

  const buttonClass = (index: number) => (index === 0 ? "btn-primary" : "btn-outline");

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="field"
            placeholder={t.namePlaceholder}
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </Field>
        <Field label={t.objectType} htmlFor="objectType">
          <select
            id="objectType"
            name="objectType"
            className="field"
            value={state.objectType}
            onChange={(e) => update("objectType", e.target.value as ObjectType)}
          >
            {(Object.keys(t.objectTypes) as ObjectType[]).map((key) => (
              <option key={key} value={key}>
                {t.objectTypes[key]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label={t.area} htmlFor="area">
          <input
            id="area"
            name="area"
            type="number"
            min={1}
            inputMode="numeric"
            className="field"
            placeholder={t.areaPlaceholder}
            value={state.area}
            onChange={(e) => update("area", e.target.value)}
          />
        </Field>
        <Field label={t.city} htmlFor="city">
          <input
            id="city"
            name="city"
            className="field"
            placeholder={t.cityPlaceholder}
            value={state.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </Field>
        <Field label={t.need} htmlFor="need">
          <select
            id="need"
            name="need"
            className="field"
            value={state.need}
            onChange={(e) => update("need", e.target.value as PackageId)}
          >
            {(Object.keys(t.packages) as PackageId[]).map((key) => (
              <option key={key} value={key}>
                {t.packages[key]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field resize-y"
          placeholder={t.messagePlaceholder}
          value={state.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </Field>

      <div>
        <p className="label">{t.previewTitle}</p>
        <pre className="surface-gradient mt-2 whitespace-pre-wrap border border-line p-4 font-body text-sm leading-relaxed text-fg-soft">
          {text}
        </pre>
      </div>

      <div>
        <p className="label">{t.sendVia}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {channels.map((channel, index) => {
            const isEmail = channel.id === "email";
            const isInstagram = channel.id === "instagram";

            if (!ready) {
              return (
                <button
                  key={channel.id}
                  type="button"
                  disabled
                  className={`${buttonClass(index)} cursor-not-allowed opacity-40`}
                >
                  {channel.label}
                </button>
              );
            }

            return (
              <a
                key={channel.id}
                href={messageUrl(channel.id as ChannelId, text, subject)}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                onClick={isInstagram ? () => void copyText() : undefined}
                className={buttonClass(index)}
              >
                {channel.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => void copyText()}
            disabled={!ready}
            className="btn-outline disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-fg-muted">
          {!ready ? t.fillHint : copied ? t.instagramHint : ""}
        </p>
      </div>

      <p className="border-t border-line pt-5 text-xs leading-relaxed text-fg-muted">{t.privacy}</p>
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
      <label htmlFor={htmlFor} className="block text-sm text-fg-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
