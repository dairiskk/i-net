"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { localizeBrand, localizeCategory, searchCatalog } from "@/lib/catalog";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

export function SearchExperience({ locale = "en" }: { locale?: Locale }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);
  const copy = t(locale).searchPage;

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 lg:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">{copy.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black text-emerald-950 md:text-6xl">{copy.title}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">
          {copy.intro}
        </p>
      </div>

      <input
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.placeholder}
        className="mt-8 h-14 w-full rounded-md border border-stone-300 bg-white px-4 text-lg shadow-sm outline-none focus:border-orange-600"
      />

      <div className="mt-8 grid gap-8">
        {query.trim() ? (
          <>
            <div>
              <h2 className="text-2xl font-bold text-stone-950">{copy.products}</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {results.products.length ? (
                  results.products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)
                ) : (
                  <p className="text-stone-600">{copy.noProducts}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-stone-950">{copy.categories}</h2>
                <div className="mt-4 grid gap-3">
                  {results.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={localizedPath(locale, `/categories/${category.slug}`)}
                      className="rounded-lg border border-stone-200 bg-white p-4 font-bold text-emerald-950 hover:border-orange-500"
                    >
                      {localizeCategory(category, locale).name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-950">{copy.brands}</h2>
                <div className="mt-4 grid gap-3">
                  {results.brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={localizedPath(locale, `/brands/${brand.slug}`)}
                      className="rounded-lg border border-stone-200 bg-white p-4 font-bold text-emerald-950 hover:border-orange-500"
                    >
                      {localizeBrand(brand, locale).name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="rounded-lg bg-stone-100 p-5 text-stone-700">
            {copy.startTyping}
          </p>
        )}
      </div>
    </section>
  );
}
