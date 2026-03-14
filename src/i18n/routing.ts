import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/work": {
      en: "/work",
      es: "/trabajo",
    },
    "/work/[slug]": {
      en: "/work/[slug]",
      es: "/trabajo/[slug]",
    },
    "/services": {
      en: "/services",
      es: "/servicios",
    },
    "/about": {
      en: "/about",
      es: "/sobre-mi",
    },
    "/blog": {
      en: "/blog",
      es: "/blog",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      es: "/blog/[slug]",
    },
    "/contact": {
      en: "/contact",
      es: "/contacto",
    },
  },
});
