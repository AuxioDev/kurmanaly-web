import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden pb-24 md:pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(229,57,43,0.14),transparent)]"
      />
      <div className="rule-gradient" />
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-display text-2xl">
              {siteConfig.name}
              <span className="text-fg-muted">.com</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
              {siteConfig.designer}. {siteConfig.tagline}. Проекты в Бишкеке и
              Москве, работа дистанционно.
            </p>
          </div>

          <nav aria-label="Разделы сайта">
            <p className="label">Разделы</p>
            <ul className="mt-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="tap text-fg-soft transition-colors duration-300 hover:text-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 md:col-span-1">
            <p className="label">Связаться</p>
            <ul className="mt-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-fg-muted">
          © {year} {siteConfig.designer}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
