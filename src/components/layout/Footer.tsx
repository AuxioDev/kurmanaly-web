import Link from "next/link";
import { getChannels, siteConfig } from "@/data/site";
import { localePath, type Locale } from "@/i18n/config";
import { LanguageLinks } from "@/components/layout/LanguageLinks";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();
  const channels = getChannels();

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
              {dict.brand.designer}. {dict.brand.tagline}. {dict.brand.footerLine}
            </p>
            <p className="label mt-6">{dict.footer.language}</p>
            <LanguageLinks />
          </div>

          <nav aria-label={dict.footer.sectionsLabel}>
            <p className="label">{dict.footer.sections}</p>
            <ul className="mt-2 text-sm">
              {dict.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    prefetch={false}
                    className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label">{dict.footer.contact}</p>
            <ul className="mt-2 text-sm">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.profileUrl}
                    target={channel.id === "email" ? undefined : "_blank"}
                    rel={channel.id === "email" ? undefined : "noopener noreferrer"}
                    className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                  >
                    {channel.id === "email" ? channel.display : channel.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/portfolio.pdf"
                  download
                  className="tap text-fg-soft transition-colors duration-300 hover:text-orange"
                >
                  {dict.about.portfolio}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-fg-muted">
          © {year} {dict.brand.designer}. {dict.brand.rights}
        </p>
      </div>
    </footer>
  );
}
