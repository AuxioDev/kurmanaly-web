import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line pb-24 md:pb-0">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">
              {siteConfig.name}
              <span className="text-ink-muted">.com</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.designer}. {siteConfig.tagline}. Проекты в Бишкеке и
              Москве, работа дистанционно.
            </p>
          </div>

          <nav aria-label="Разделы сайта">
            <p className="eyebrow">Разделы</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Связаться</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="text-ink-soft hover:text-ink"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-ink-muted">
          © {year} {siteConfig.designer}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
