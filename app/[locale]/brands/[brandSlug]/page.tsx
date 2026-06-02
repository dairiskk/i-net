import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { brands, getBrand, getProductsByBrand, localizeBrand } from "@/lib/catalog";
import { isLocale, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.flatMap((locale) => brands.map((brand) => ({ locale, brandSlug: brand.slug })));
}

export default async function LocalizedBrandPage({
  params,
}: {
  params: Promise<{ locale: string; brandSlug: string }>;
}) {
  const { locale: localeParam, brandSlug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const copy = t(locale);
  const brand = getBrand(brandSlug);

  if (!brand) {
    notFound();
  }

  const localizedBrand = localizeBrand(brand, locale);
  const brandProducts = getProductsByBrand(brand.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href={localizedPath(locale, "/")} className="hover:text-orange-700">
          {copy.nav.home}
        </Link>
        <span className="px-2">/</span>
        <Link href={localizedPath(locale, "/brands")} className="hover:text-orange-700">
          {copy.nav.brands}
        </Link>
        <span className="px-2">/</span>
        {localizedBrand.name}
      </nav>

      <section className="mt-8 rounded-lg bg-emerald-950 p-8 text-white md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">{copy.brandsPage.brand}</p>
        <h1 className="mt-3 text-5xl font-black">{localizedBrand.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-100">{localizedBrand.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-stone-950">
          {brandProducts.length} {copy.brandsPage.products}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}
