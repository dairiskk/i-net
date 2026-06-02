"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";

type SortOption = {
  value: "newest" | "name" | "price";
  label: string;
};

type SortableProductGridProps = {
  products: Product[];
  locale?: Locale;
  sortLabel: string;
  sortOptions: readonly SortOption[];
};

export function SortableProductGrid({
  products,
  locale = "en",
  sortLabel,
  sortOptions,
}: SortableProductGridProps) {
  const [sort, setSort] = useState<SortOption["value"]>(() => {
    if (typeof window === "undefined") {
      return "newest";
    }

    const params = new URLSearchParams(window.location.search);
    const value = params.get("sort");

    if (value === "name" || value === "price" || value === "newest") {
      return value;
    }

    return "newest";
  });

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "price") {
        return a.price - b.price;
      }

      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });
  }, [products, sort]);

  function updateSort(value: SortOption["value"]) {
    setSort(value);

    const url = new URL(window.location.href);
    url.searchParams.set("sort", value);
    window.history.pushState({}, "", url);
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-stone-700">{sortLabel}</p>
        <div className="grid grid-cols-3 gap-2 sm:w-auto">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateSort(option.value)}
              className={`rounded-md px-3 py-2 text-center text-sm font-semibold ${
                sort === option.value
                  ? "bg-emerald-950 text-white"
                  : "bg-stone-100 text-stone-800 hover:bg-orange-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </>
  );
}
