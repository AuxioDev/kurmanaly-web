import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kurmanaly — Art Portfolio & Digital Gallery",
  description:
    "Contemporary art portfolio at kurmanaly.com — oil paintings, digital works, graphics, and mixed media.",
  metadataBase: new URL("https://kurmanaly.com"),
  openGraph: {
    title: "Kurmanaly — Art Portfolio",
    description: "Explore works, virtual studio tours, and commission inquiries.",
    url: "https://kurmanaly.com",
    siteName: "kurmanaly.com",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${outfit.variable} min-h-screen bg-surface text-zinc-100`}
      >
        <ThemeProvider>
          <AmbientBackground />
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
