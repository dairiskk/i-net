import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getProductsByBrand, localizeBrand } from "@/lib/catalog";
import { isLocale, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedBrandsPage({
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href={localizedPath(locale, "/")} className="hover:text-orange-700">
          {copy.nav.home}
        </Link>
        <span className="px-2">/</span>
        {copy.nav.brands}
      </nav>
      <div className="mt-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">{copy.nav.brands}</p>
        <h1 className="mt-3 text-5xl font-black text-emerald-950">{copy.brandsPage.title}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">{copy.brandsPage.intro}</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => {
          const localizedBrand = localizeBrand(brand, locale);

          return (
            <Link
              key={brand.id}
              href={localizedPath(locale, `/brands/${brand.slug}`)}
              className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm hover:border-orange-500"
            >
              <span className="text-3xl font-black text-emerald-950">{localizedBrand.logo}</span>
              <p className="mt-3 leading-7 text-stone-600">{localizedBrand.description}</p>
              <p className="mt-4 text-sm font-bold text-orange-700">
                {getProductsByBrand(brand.id).length} {copy.brandsPage.products}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
