"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  brands,
  getMainCategories,
  localizeBrand,
  localizeCategory,
  localizeProduct,
  searchCatalog,
} from "@/lib/catalog";
import { defaultLocale, isLocale, languageNames, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  const locale: Locale = isLocale(firstSegment) ? firstSegment : defaultLocale;
  const pathWithoutLocale =
    locale === defaultLocale ? pathname : `/${pathname.split("/").slice(2).join("/")}` || "/";
  const copy = t(locale);
  const categories = getMainCategories();
  const results = useMemo(() => searchCatalog(query), [query]);
  const hasResults =
    query.trim().length > 0 &&
    (results.products.length > 0 || results.brands.length > 0 || results.categories.length > 0);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <Link href={localizedPath(locale, "/")} className="shrink-0">
          <span className="block text-xl font-black tracking-wide text-emerald-950">{copy.brandName}</span>
          <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
            {copy.brandSubline}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group">
            <Link
              href={localizedPath(locale, "/categories")}
              className="rounded-md px-3 py-2 text-sm font-bold text-stone-800 hover:bg-stone-100"
            >
              {copy.nav.categories}
            </Link>
            <div className="invisible absolute left-0 right-0 top-full border-b border-stone-200 bg-white opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <div className="mx-auto grid max-w-7xl grid-cols-5 gap-4 px-6 py-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={localizedPath(locale, `/categories/${category.slug}`)}
                    className="rounded-lg border border-stone-200 p-4 hover:border-orange-500 hover:bg-stone-50"
                  >
                    <span className="text-base font-bold text-emerald-950">
                      {localizeCategory(category, locale).name}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-stone-600">
                      {localizeCategory(category, locale).description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href={localizedPath(locale, "/brands")}
            className="rounded-md px-3 py-2 text-sm font-bold text-stone-800 hover:bg-stone-100"
          >
            {copy.nav.brands}
          </Link>
          <Link
            href={localizedPath(locale, "/search")}
            className="rounded-md px-3 py-2 text-sm font-bold text-stone-800 hover:bg-stone-100"
          >
            {copy.nav.search}
          </Link>
        </nav>

        <div className="relative ml-auto hidden w-full max-w-md md:block">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.nav.searchPlaceholder}
            className="h-11 w-full rounded-md border border-stone-300 bg-stone-50 px-4 text-base outline-none focus:border-orange-600 focus:bg-white"
          />
          {hasResults ? (
            <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl">
              {results.products.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={localizedPath(locale, `/products/${product.slug}`)}
                  className="block border-b border-stone-100 px-4 py-3 hover:bg-stone-50"
                  onClick={() => setQuery("")}
                >
                  <span className="block text-sm font-bold text-stone-950">
                    {localizeProduct(product, locale).name}
                  </span>
                  <span className="block text-xs text-stone-500">{product.sku}</span>
                </Link>
              ))}
              {results.categories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  href={localizedPath(locale, `/categories/${category.slug}`)}
                  className="block border-b border-stone-100 px-4 py-3 hover:bg-stone-50"
                  onClick={() => setQuery("")}
                >
                  <span className="block text-sm font-bold text-emerald-950">
                    {localizeCategory(category, locale).name}
                  </span>
                  <span className="block text-xs text-stone-500">{copy.catalog.category}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <Link
          href={localizedPath(locale, "/#contact")}
          className="hidden h-11 items-center rounded-md bg-orange-600 px-4 text-sm font-bold text-white hover:bg-orange-700 sm:flex"
        >
          {copy.nav.request}
        </Link>

        <div className="hidden items-center gap-1 rounded-md bg-stone-100 p-1 md:flex">
          {locales.map((targetLocale) => (
            <Link
              key={targetLocale}
              href={localizedPath(targetLocale, pathWithoutLocale)}
              title={languageNames[targetLocale]}
              className={`rounded px-2 py-1 text-xs font-black uppercase ${
                targetLocale === locale ? "bg-white text-emerald-950 shadow-sm" : "text-stone-600"
              }`}
            >
              {targetLocale}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="h-11 rounded-md border border-stone-300 px-3 text-sm font-bold text-stone-900 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {copy.nav.menu}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-stone-200 bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.nav.searchCatalog}
              className="h-12 rounded-md border border-stone-300 px-3 text-base outline-none focus:border-orange-600"
            />
            <Link href={localizedPath(locale, "/categories")} className="py-2 text-base font-bold text-stone-950">
              {copy.nav.categories}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={localizedPath(locale, `/categories/${category.slug}`)}
                className="rounded-md bg-stone-50 px-3 py-3 text-sm font-semibold text-stone-700"
                onClick={() => setMenuOpen(false)}
              >
                {localizeCategory(category, locale).name}
              </Link>
            ))}
            <Link href={localizedPath(locale, "/brands")} className="py-2 text-base font-bold text-stone-950">
              {copy.nav.brands}
            </Link>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={localizedPath(locale, `/brands/${brand.slug}`)}
                  className="rounded-md border border-stone-200 px-3 py-2 text-sm font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  {localizeBrand(brand, locale).name}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={localizedPath(targetLocale, pathWithoutLocale)}
                  className={`rounded-md px-3 py-2 text-sm font-black uppercase ${
                    targetLocale === locale ? "bg-emerald-950 text-white" : "bg-stone-100 text-stone-700"
                  }`}
                >
                  {targetLocale}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
