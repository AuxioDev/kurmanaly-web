import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 pb-24 md:pb-0">
      <div className="rule-gradient" />
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
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
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-fg-soft hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label">Связаться</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="text-fg-soft hover:text-fg"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-soft hover:text-fg"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-soft hover:text-fg"
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
