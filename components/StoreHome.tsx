import Image from "next/image";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductCard } from "@/components/ProductCard";
import {
  brands,
  getFeaturedProducts,
  getMainCategories,
  getNewArrivals,
  localizeBrand,
  localizeCategory,
  localizeProduct,
  products,
} from "@/lib/catalog";
import { localizedPath, t, type Locale } from "@/lib/i18n";

export function StoreHome({ locale = "en" }: { locale?: Locale }) {
  const copy = t(locale).home;
  const categories = getMainCategories();
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const promoted = products.filter((product) => product.promotion);

  return (
    <main>
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover opacity-35"
          />
        </div>
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl content-center gap-10 px-4 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-300">
              {copy.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-black leading-none text-white md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedPath(locale, "/categories")}
                className="inline-flex h-12 items-center justify-center rounded-md bg-orange-600 px-6 text-base font-bold text-white hover:bg-orange-700"
              >
                {copy.browse}
              </Link>
              <Link
                href={localizedPath(locale, "/search")}
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 px-6 text-base font-bold text-white hover:bg-white/10"
              >
                {copy.search}
              </Link>
            </div>
          </div>
          <div className="self-end rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-3xl font-black">{products.length}</span>
                <span className="text-sm text-stone-200">{copy.products}</span>
              </div>
              <div>
                <span className="block text-3xl font-black">{categories.length}</span>
                <span className="text-sm text-stone-200">{copy.categories}</span>
              </div>
              <div>
                <span className="block text-3xl font-black">{brands.length}</span>
                <span className="text-sm text-stone-200">{copy.brands}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
                {copy.mainCategories}
              </p>
              <h2 className="mt-2 text-4xl font-black text-emerald-950">{copy.navigate}</h2>
            </div>
            <Link href={localizedPath(locale, "/categories")} className="font-bold text-orange-700 hover:text-orange-800">
              {copy.viewAll}
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const localizedCategory = localizeCategory(category, locale);

              return (
                <Link
                  key={category.id}
                  href={localizedPath(locale, `/categories/${category.slug}`)}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={localizedCategory.name}
                      width={520}
                      height={390}
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-emerald-950">{localizedCategory.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{localizedCategory.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
                {copy.featured}
              </p>
              <h2 className="mt-2 text-4xl font-black text-emerald-950">{copy.recommended}</h2>
            </div>
            <Link href={localizedPath(locale, "/search")} className="font-bold text-orange-700 hover:text-orange-800">
              {copy.openSearch}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
            {copy.featuredBrands}
          </p>
          <h2 className="mt-2 text-4xl font-black">{copy.trusted}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => {
              const localizedBrand = localizeBrand(brand, locale);

              return (
                <Link
                  key={brand.id}
                  href={localizedPath(locale, `/brands/${brand.slug}`)}
                  className="rounded-lg border border-white/15 bg-white/10 p-5 hover:bg-white/15"
                >
                  <span className="text-2xl font-black tracking-wide">{localizedBrand.logo}</span>
                  <p className="mt-3 text-sm leading-6 text-stone-200">{localizedBrand.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              {copy.newArrivals}
            </p>
            <h2 className="mt-2 text-4xl font-black text-emerald-950">{copy.fresh}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </div>
          <aside className="self-start rounded-lg bg-stone-950 p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">{copy.promotions}</p>
            <h2 className="mt-2 text-3xl font-black">{copy.current}</h2>
            <div className="mt-6 grid gap-4">
              {promoted.map((product) => {
                const localizedProduct = localizeProduct(product, locale);

                return (
                  <Link
                    key={product.id}
                    href={localizedPath(locale, `/products/${product.slug}`)}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                  >
                    <span className="text-sm font-bold text-orange-300">{localizedProduct.promotion}</span>
                    <span className="mt-1 block text-lg font-bold">{localizedProduct.name}</span>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
              {copy.aboutEyebrow}
            </p>
            <h2 className="mt-2 text-4xl font-black text-emerald-950">
              {copy.aboutTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              {copy.about}
            </p>
          </div>
          <div id="contact">
            <InquiryForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
