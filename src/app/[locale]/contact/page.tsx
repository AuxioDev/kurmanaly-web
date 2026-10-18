import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { getChannels } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/params";

interface PageProps {
  params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).contact;
  return pageMetadata({
    locale,
    path: "/contact",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function ContactPage({ params }: PageProps) {
  const locale = requireLocale(params.locale);
  const t = getDictionary(locale).contact;
  const channels = getChannels();

  return (
    <section className="container-page pt-10 sm:pt-16">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 className="mt-3 text-5xl sm:text-7xl">
        {t.titleBefore}
        <span className="text-gradient">{t.titleAccent}</span>
      </h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="mb-8 max-w-xl leading-relaxed text-fg-soft">{t.lead}</p>
          <ContactForm />
        </div>

        <aside className="surface-gradient h-fit border border-line p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl">{t.aside.title}</h2>
          <ul className="mt-6 space-y-2 text-sm">
            {channels.map((channel) => (
              <li key={channel.id}>
                <p className="label">{channel.label}</p>
                <a
                  href={channel.profileUrl}
                  target={channel.id === "email" ? undefined : "_blank"}
                  rel={channel.id === "email" ? undefined : "noopener noreferrer"}
                  className="tap transition-colors duration-300 hover:text-orange"
                >
                  {channel.display}
                </a>
              </li>
            ))}
            <li>
              <p className="label">{t.aside.where}</p>
              <p className="tap">{t.aside.whereText}</p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
