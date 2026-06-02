import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import {
  formatPrice,
  getBrandById,
  getCategoryById,
  getProduct,
  localizeAvailability,
  localizeBrand,
  localizeCategory,
  localizeProduct,
  products,
} from "@/lib/catalog";
import { isLocale, locales, localizedPath, t, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, productSlug: product.slug })),
  );
}

export default async function LocalizedProductPage({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  const { locale: localeParam, productSlug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const copy = t(locale);
  const product = getProduct(productSlug);

  if (!product) {
    notFound();
  }

  const localizedProduct = localizeProduct(product, locale);
  const brand = getBrandById(product.brandId);
  const category = getCategoryById(product.categoryId);
  const parentCategory = category?.parentId ? getCategoryById(category.parentId) : undefined;
  const localizedBrand = brand ? localizeBrand(brand, locale) : undefined;
  const localizedCategory = category ? localizeCategory(category, locale) : undefined;
  const localizedParentCategory = parentCategory ? localizeCategory(parentCategory, locale) : undefined;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href={localizedPath(locale, "/")} className="hover:text-orange-700">
          {copy.nav.home}
        </Link>
        <span className="px-2">/</span>
        {category ? (
          <>
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
            <Link href={localizedPath(locale, `/categories/${category.slug}`)} className="hover:text-orange-700">
              {localizedCategory?.name}
            </Link>
          </>
        ) : null}
        <span className="px-2">/</span>
        {localizedProduct.name}
      </nav>

      <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200">
            <Image
              src={product.mainImage}
              alt={localizedProduct.name}
              width={900}
              height={675}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <Image
                key={image}
                src={image}
                alt={localizedProduct.name}
                width={300}
                height={225}
                sizes="(min-width: 1024px) 18vw, 33vw"
                className="aspect-[4/3] rounded-md object-cover ring-1 ring-stone-200"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
            {localizedBrand?.name} / {localizedCategory?.name}
          </p>
          <h1 className="mt-3 text-5xl font-black leading-none text-emerald-950">{localizedProduct.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">{localizedProduct.description}</p>

          <div className="mt-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">{copy.product.price}</span>
              <span className="text-3xl font-black text-emerald-950">{formatPrice(product.price)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">{copy.product.availability}</span>
              <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-950 dark:bg-emerald-900/45 dark:text-emerald-100">
                {localizeAvailability(product, locale)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">{copy.product.code}</span>
              <span className="font-mono text-sm font-bold text-stone-900">{product.sku}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#request" className="inline-flex h-12 items-center justify-center rounded-md bg-orange-600 px-6 text-base font-bold text-white hover:bg-orange-700">
              {copy.product.requestProduct}
            </a>
            <a href="#request" className="inline-flex h-12 items-center justify-center rounded-md border border-stone-300 px-6 text-base font-bold text-stone-950 hover:bg-stone-100">
              {copy.product.askQuestion}
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-black text-stone-950">{copy.product.specs}</h2>
          <dl className="mt-5 grid gap-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[140px_1fr] gap-4 border-b border-stone-100 pb-3">
                <dt className="font-bold text-stone-500">{key}</dt>
                <dd className="font-semibold text-stone-950">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div id="request">
          <InquiryForm productName={localizedProduct.name} locale={locale} />
        </div>
      </section>
    </main>
  );
}
