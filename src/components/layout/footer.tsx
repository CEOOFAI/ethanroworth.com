"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-accent/20">
      <div className="px-6 md:px-16 lg:px-24 py-8">
        {/* Single row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs tracking-[0.1em] text-text-muted">
            &copy; {year} Ethan Roworth. {t("footer.rights")}
          </p>

          <nav className="flex items-center gap-6">
            {["work", "services", "about", "contact"].map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="font-body text-xs tracking-[0.1em] uppercase text-text-muted hover:text-accent transition-colors duration-300"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Email centered below */}
        <div className="mt-6 text-center">
          <a
            href="mailto:hello@ethanroworth.com"
            className="font-body text-xs tracking-[0.1em] text-text-muted hover:text-accent transition-colors duration-300"
          >
            hello@ethanroworth.com
          </a>
        </div>
      </div>
    </footer>
  );
}
