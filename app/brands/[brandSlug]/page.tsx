import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { brands, getBrand, getProductsByBrand } from "@/lib/catalog";

export const revalidate = 300;

export function generateStaticParams() {
  return brands.map((brand) => ({ brandSlug: brand.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const brand = getBrand(brandSlug);
  return brand ? { title: brand.name, description: brand.description } : {};
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const brand = getBrand(brandSlug);

  if (!brand) {
    notFound();
  }

  const brandProducts = getProductsByBrand(brand.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href="/" className="hover:text-orange-700">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/brands" className="hover:text-orange-700">
          Brands
        </Link>
        <span className="px-2">/</span>
        {brand.name}
      </nav>

      <section className="mt-8 rounded-lg bg-emerald-950 p-8 text-white md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Brand</p>
        <h1 className="mt-3 text-5xl font-black">{brand.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-100">{brand.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-stone-950">{brandProducts.length} products</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
