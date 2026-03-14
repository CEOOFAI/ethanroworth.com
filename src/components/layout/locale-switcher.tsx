"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "es" : "en";

    // Remove current locale prefix and add new one
    let newPath = pathname;

    // Remove /es prefix if present
    if (pathname.startsWith("/es")) {
      newPath = pathname.slice(3) || "/";
    }

    // Add /es prefix for Spanish
    if (newLocale === "es") {
      newPath = `/es${newPath === "/" ? "" : newPath}`;
    }

    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium tracking-wide text-dark-text-muted hover:text-accent transition-colors uppercase"
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
