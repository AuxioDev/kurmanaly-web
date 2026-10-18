"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getChannels, messageUrl } from "@/data/site";
import { stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

/** Приоритет мессенджеров для быстрой связи: Telegram → WhatsApp → Instagram. */
const channel = getChannels().find((c) => c.id !== "email");

/**
 * Плавающая кнопка «Написать» на телефоне: открывает основной мессенджер.
 * Появляется после небольшой прокрутки и скрыта на странице контактов.
 */
export function FloatingContact() {
  const { dict } = useI18n();
  const pathname = stripLocale(usePathname());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!channel || pathname === "/contact") return null;

  return (
    <a
      href={messageUrl(channel.id, "", "")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${dict.floating.aria} (${channel.label})`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 z-40 flex min-h-12 items-center gap-2 bg-gradient-to-br from-[#C42818] to-red-deep px-4 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(229,57,43,0.7)] transition-[opacity,transform] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(5rem + env(safe-area-inset-bottom))" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 5h16v11H9l-5 4V5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {dict.floating.label}
    </a>
  );
}
