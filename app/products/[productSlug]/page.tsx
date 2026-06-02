import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import {
  formatPrice,
  getBrandById,
  getCategoryById,
  getProduct,
  products,
} from "@/lib/catalog";

export const revalidate = 300;

export function generateStaticParams() {
  return products.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProduct(productSlug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.mainImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);

  if (!product) {
    notFound();
  }

  const brand = getBrandById(product.brandId);
  const category = getCategoryById(product.categoryId);
  const parentCategory = category?.parentId ? getCategoryById(category.parentId) : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: brand?.name,
    category: category?.name,
    image: product.mainImage,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability:
        product.availability === "In stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
    },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="text-sm font-semibold text-stone-500">
        <Link href="/" className="hover:text-orange-700">
          Home
        </Link>
        <span className="px-2">/</span>
        {category ? (
          <>
            {parentCategory ? (
              <>
                <Link href={`/categories/${parentCategory.slug}`} className="hover:text-orange-700">
                  {parentCategory.name}
                </Link>
                <span className="px-2">/</span>
              </>
            ) : null}
            <Link href={`/categories/${category.slug}`} className="hover:text-orange-700">
              {category.name}
            </Link>
          </>
        ) : null}
        <span className="px-2">/</span>
        {product.name}
      </nav>

      <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200">
            <Image
              src={product.mainImage}
              alt={product.name}
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
                alt={`${product.name} gallery`}
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
            {brand?.name} / {category?.name}
          </p>
          <h1 className="mt-3 text-5xl font-black leading-none text-emerald-950">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">{product.description}</p>

          <div className="mt-6 grid gap-3 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">Price</span>
              <span className="text-3xl font-black text-emerald-950">{formatPrice(product.price)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">Availability</span>
              <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-950">
                {product.availability}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-stone-500">Product code</span>
              <span className="font-mono text-sm font-bold text-stone-900">{product.sku}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#request"
              className="inline-flex h-12 items-center justify-center rounded-md bg-orange-600 px-6 text-base font-bold text-white hover:bg-orange-700"
            >
              Request Product
            </a>
            <a
              href="#request"
              className="inline-flex h-12 items-center justify-center rounded-md border border-stone-300 px-6 text-base font-bold text-stone-950 hover:bg-stone-100"
            >
              Ask Question
            </a>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-black text-stone-950">Technical specifications</h2>
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
          <InquiryForm productName={product.name} />
        </div>
      </section>
    </main>
  );
}
