import type { MetadataRoute } from "next";

const baseUrl = "https://ethanroworth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", es: "" },
    { path: "/work", es: "/es/trabajo" },
    { path: "/services", es: "/es/servicios" },
    { path: "/about", es: "/es/sobre-mi" },
    { path: "/blog", es: "/es/blog" },
    { path: "/contact", es: "/es/contacto" },
  ];

  return pages.map(({ path, es }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        es: `${baseUrl}${es}`,
      },
    },
  }));
}
