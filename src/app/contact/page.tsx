import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Обсудить проект интерьера: форма заявки, email, Telegram и Instagram.",
};

const packageIds = ["layout", "sketch", "full"];

export default function ContactPage({
  searchParams,
}: {
  searchParams: { package?: string };
}) {
  const { contacts } = siteConfig;
  const defaultPackage = packageIds.includes(searchParams.package ?? "")
    ? searchParams.package
    : "unsure";

  return (
    <section className="container-page pt-10 sm:pt-16">
      <p className="eyebrow">Контакты</p>
      <h1 className="mt-3 text-5xl sm:text-7xl">Обсудим проект</h1>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="mb-8 max-w-xl leading-relaxed text-fg-soft">
            Опишите объект и задачу. Я отвечу в течение двух рабочих дней и
            предложу время для короткого созвона.
          </p>
          <InquiryForm defaultPackage={defaultPackage} />
        </div>

        <aside className="h-fit border border-line p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl">Написать напрямую</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <p className="label">Email</p>
              <a href={`mailto:${contacts.email}`} className="mt-1 block hover:text-orange">
                {contacts.email}
              </a>
            </li>
            <li>
              <p className="label">Telegram</p>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block hover:text-orange"
              >
                {contacts.telegram.replace("https://t.me/", "@")}
              </a>
            </li>
            <li>
              <p className="label">Instagram</p>
              <a
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block hover:text-orange"
              >
                {contacts.instagram.replace("https://instagram.com/", "@")}
              </a>
            </li>
            <li>
              <p className="label">Где работаю</p>
              <p className="mt-1">{siteConfig.base}, проекты по всему СНГ дистанционно</p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
