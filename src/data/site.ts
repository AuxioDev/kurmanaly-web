import { siteUrl } from "@/i18n/config";

/** Контакты. Пустая строка у telegram/whatsapp скрывает этот канал на сайте. */
const contacts = {
  email: "kurmanalievamalika9@gmail.com",
  instagramHandle: "m.kurmanallyy",
  telegramHandle: "", // например "kurmanaly" (без @)
  whatsappNumber: "", // международный формат без плюса, например "996555123456"
};

export const siteConfig = {
  name: "Kurmanaly",
  url: siteUrl,
  contacts,
} as const;

export type ChannelId = "telegram" | "whatsapp" | "instagram" | "email";

export interface Channel {
  id: ChannelId;
  label: string;
  /** Адрес профиля или почты для отображения в списке контактов */
  display: string;
  /** Ссылка на профиль (без готового текста) */
  profileUrl: string;
}

/** Каналы связи, которые реально настроены. */
export function getChannels(): Channel[] {
  const channels: Channel[] = [];
  if (contacts.telegramHandle) {
    channels.push({
      id: "telegram",
      label: "Telegram",
      display: `@${contacts.telegramHandle}`,
      profileUrl: `https://t.me/${contacts.telegramHandle}`,
    });
  }
  if (contacts.whatsappNumber) {
    channels.push({
      id: "whatsapp",
      label: "WhatsApp",
      display: `+${contacts.whatsappNumber}`,
      profileUrl: `https://wa.me/${contacts.whatsappNumber}`,
    });
  }
  channels.push({
    id: "instagram",
    label: "Instagram",
    display: `@${contacts.instagramHandle}`,
    profileUrl: `https://www.instagram.com/${contacts.instagramHandle}/`,
  });
  channels.push({
    id: "email",
    label: "Email",
    display: contacts.email,
    profileUrl: `mailto:${contacts.email}`,
  });
  return channels;
}

/** Ссылка, открывающая чат с уже подставленным текстом (где мессенджер это поддерживает). */
export function messageUrl(channel: ChannelId, text: string, subject: string): string {
  const body = encodeURIComponent(text);
  switch (channel) {
    case "telegram":
      return `https://t.me/${contacts.telegramHandle}?text=${body}`;
    case "whatsapp":
      return `https://wa.me/${contacts.whatsappNumber}?text=${body}`;
    case "email":
      return `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    case "instagram":
      // Instagram не принимает готовый текст: форма копирует его в буфер
      return `https://ig.me/m/${contacts.instagramHandle}`;
  }
}

/** Профили для schema.org (sameAs). */
export function getSameAs(): string[] {
  return getChannels()
    .filter((c) => c.id === "instagram" || c.id === "telegram")
    .map((c) => c.profileUrl);
}
