import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import SelectedWork from "@/components/sections/selected-work";
import ServicesOverview from "@/components/sections/services-overview";
import AboutSnippet from "@/components/sections/about-snippet";
import CTASection from "@/components/sections/cta-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <ServicesOverview />
      <AboutSnippet />
      <CTASection />
    </>
  );
}
