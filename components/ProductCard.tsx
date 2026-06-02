import Link from "next/link";
import Image from "next/image";
import {
  formatPrice,
  getBrandById,
  getCategoryById,
  localizeAvailability,
  localizeBrand,
  localizeCategory,
  localizeProduct,
  type Product,
} from "@/lib/catalog";
import { localizedPath, t, type Locale } from "@/lib/i18n";

type ProductCardProps = {
  product: Product;
  locale?: Locale;
};

export function ProductCard({ product, locale = "en" }: ProductCardProps) {
  const copy = t(locale);
  const localizedProduct = localizeProduct(product, locale);
  const brand = getBrandById(product.brandId);
  const category = getCategoryById(product.categoryId);
  const localizedBrand = brand ? localizeBrand(brand, locale) : undefined;
  const localizedCategory = category ? localizeCategory(category, locale) : undefined;

  return (
    <article className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={localizedPath(locale, `/products/${product.slug}`)} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <Image
            src={product.mainImage}
            alt={localizedProduct.name}
            width={640}
            height={480}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
            <span>{localizedBrand?.name}</span>
            <span>{localizeAvailability(product, locale)}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold leading-6 text-stone-950">{localizedProduct.name}</h3>
            <p className="mt-1 text-sm text-stone-600">{localizedCategory?.name}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-emerald-950">{formatPrice(product.price)}</span>
            <span className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white">
              {copy.common.request}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
