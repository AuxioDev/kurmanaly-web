import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/I18nProvider";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.titleDefault, template: dict.meta.titleTemplate },
    description: dict.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0908",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function LocaleLayout({ children, params }: LayoutProps) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Без JS картинки не должны оставаться прозрачными */}
        <noscript>
          <style>{`[data-fade]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${display.variable} ${body.variable} min-h-screen bg-canvas text-fg`}
      >
        <I18nProvider locale={locale} dict={dict}>
          <MotionProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <Header />
              <main className="pt-16 sm:pt-20">{children}</main>
              <Footer locale={locale} />
              <BottomNav />
              <FloatingContact />
            </SmoothScrollProvider>
          </MotionProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
