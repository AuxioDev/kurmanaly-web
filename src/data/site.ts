import type { NavLink } from "@/lib/types";

export const siteConfig = {
  name: "Kurmanaly",
  designer: "Малика Курманалиева",
  url: "https://kurmanaly.com",
  tagline: "Интерьер от идеи до чертежа",
  description:
    "Дизайн интерьеров: мудборды, полные комплекты чертежей и фотореалистичные визуализации. Проекты в Бишкеке и Москве.",
  // TODO: заменить на реальные контакты
  contacts: {
    email: "hello@kurmanaly.com",
    telegram: "https://t.me/kurmanaly",
    instagram: "https://instagram.com/kurmanaly",
  },
  base: "Бишкек",
} as const;

export const navLinks: NavLink[] = [
  { href: "/projects", label: "Проекты" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
];
