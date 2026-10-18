import "./globals.css";

/**
 * Корневой layout только пробрасывает children: <html> и <body> (с нужным lang)
 * рендерит layout сегмента [locale], а глобальный not-found задаёт свои.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
