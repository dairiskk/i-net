import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMainCategories, getSubcategories, localizeCategory } from "@/lib/catalog";
import { isLocale, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const copy = t(locale);
  const categories = getMainCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href={localizedPath(locale, "/")} className="hover:text-orange-700">
          {copy.nav.home}
        </Link>
        <span className="px-2">/</span>
        {copy.nav.categories}
      </nav>
      <div className="mt-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
          {copy.catalog.catalog}
        </p>
        <h1 className="mt-3 text-5xl font-black text-emerald-950">{copy.catalog.categoriesTitle}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">{copy.catalog.categoriesIntro}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {categories.map((category) => {
          const localizedCategory = localizeCategory(category, locale);

          return (
            <section key={category.id} className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200">
              <Link href={localizedPath(locale, `/categories/${category.slug}`)} className="group block">
                <div className="aspect-[16/7] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={localizedCategory.name}
                    width={860}
                    height={376}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-black text-emerald-950">{localizedCategory.name}</h2>
                  <p className="mt-2 leading-7 text-stone-600">{localizedCategory.description}</p>
                </div>
              </Link>
              <div className="flex flex-wrap gap-2 border-t border-stone-100 p-5">
                {getSubcategories(category.id).map((subcategory) => {
                  const localizedSubcategory = localizeCategory(subcategory, locale);

                  return (
                    <Link
                      key={subcategory.id}
                      href={localizedPath(locale, `/categories/${subcategory.slug}`)}
                      className="rounded-md bg-stone-100 px-3 py-2 text-sm font-bold text-stone-800 hover:bg-orange-100 hover:text-orange-800"
                    >
                      {localizedSubcategory.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
