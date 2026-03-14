import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";
import "../globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return {
    title: {
      default: "Ethan Roworth | Web Design, AI Automation & SEO",
      template: "%s | Ethan Roworth",
    },
    description: t("subtitle"),
    metadataBase: new URL("https://ethanroworth.com"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_GB",
      siteName: "Ethan Roworth",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
