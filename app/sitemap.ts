import type { MetadataRoute } from "next";
import { brands, categories, products, subcategories } from "@/lib/catalog";
import { locales, localizedPath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";

  const englishPaths = [
    "",
    "/categories",
    "/brands",
    "/search",
    ...categories.map((category) => `/categories/${category.slug}`),
    ...subcategories.map((category) => `/categories/${category.slug}`),
    ...brands.map((brand) => `/brands/${brand.slug}`),
    ...products.map((product) => `/products/${product.slug}`),
  ];

  const localizedPaths = locales.flatMap((locale) =>
    englishPaths.map((path) => localizedPath(locale, path || "/")),
  );

  return [...new Set(localizedPaths)].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}
