import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SortableProductGrid } from "@/components/SortableProductGrid";
import {
  getCategory,
  getCategoryById,
  getMainCategories,
  getProductsByCategory,
  getSubcategories,
  localizeCategory,
  products,
  subcategories,
} from "@/lib/catalog";
import { isLocale, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [...getMainCategories(), ...subcategories].map((category) => ({
      locale,
      categorySlug: category.slug,
    })),
  );
}

export default async function LocalizedCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale: localeParam, categorySlug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const copy = t(locale);
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const localizedCategory = localizeCategory(category, locale);
  const parentCategory = category.parentId ? getCategoryById(category.parentId) : undefined;
  const localizedParentCategory = parentCategory ? localizeCategory(parentCategory, locale) : undefined;
  const categoryProducts = getProductsByCategory(category.id);
  const childCategories = getSubcategories(category.id);
  const hasSubcategories = childCategories.length > 0;
  const availableTypes = [...new Set(products.map((product) => product.type))];
  const sortOptions = [
    { value: "newest", label: copy.catalog.newest },
    { value: "name", label: copy.catalog.name },
    { value: "price", label: copy.catalog.price },
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href={localizedPath(locale, "/")} className="hover:text-orange-700">
          {copy.nav.home}
        </Link>
        <span className="px-2">/</span>
        <Link href={localizedPath(locale, "/categories")} className="hover:text-orange-700">
          {copy.nav.categories}
        </Link>
        <span className="px-2">/</span>
        {parentCategory ? (
          <>
            <Link
              href={localizedPath(locale, `/categories/${parentCategory.slug}`)}
              className="hover:text-orange-700"
            >
              {localizedParentCategory?.name}
            </Link>
            <span className="px-2">/</span>
          </>
        ) : null}
        {localizedCategory.name}
      </nav>

      <section className="mt-8 overflow-hidden rounded-lg bg-emerald-950 text-white">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">{copy.catalog.category}</p>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">{localizedCategory.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-100 md:text-lg">
              {localizedCategory.description}
            </p>
          </div>
          <Image
            src={category.image}
            alt={localizedCategory.name}
            width={900}
            height={600}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-44 w-full object-cover sm:h-52 lg:h-64"
          />
        </div>
      </section>

      <div className={`mt-8 grid gap-8 ${hasSubcategories ? "lg:grid-cols-[280px_1fr]" : ""}`}>
        {hasSubcategories ? (
          <aside className="self-start rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-stone-950">{copy.catalog.filters}</h2>
            <div className="mt-5 grid gap-5 text-sm">
              <div>
                <p className="font-bold text-stone-900">{copy.catalog.subcategory}</p>
                <div className="mt-2 grid gap-2">
                  {childCategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={localizedPath(locale, `/categories/${subcategory.slug}`)}
                      className="rounded-md bg-stone-100 px-3 py-2 font-semibold hover:bg-orange-100"
                    >
                      {localizeCategory(subcategory, locale).name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-stone-900">{copy.catalog.productType}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableTypes.slice(0, 8).map((type) => (
                    <span key={type} className="rounded-md border border-stone-200 px-2 py-1 text-stone-600">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        ) : null}

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-stone-950">
              {categoryProducts.length} {copy.catalog.productsCount}
            </h2>
            <Link href={localizedPath(locale, "/search")} className="font-bold text-orange-700 hover:text-orange-800">
              {copy.catalog.searchAll}
            </Link>
          </div>
          <SortableProductGrid
            products={categoryProducts}
            locale={locale}
            sortLabel={copy.catalog.sorting}
            sortOptions={sortOptions}
          />
          {categoryProducts.length === 0 ? (
            <p className="rounded-lg bg-white p-5 text-stone-600">{copy.catalog.noProducts}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
