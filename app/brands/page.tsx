import Link from "next/link";
import { brands, getProductsByBrand } from "@/lib/catalog";

export const metadata = {
  title: "Brands",
  description: "Browse featured hunting and outdoor equipment brands.",
};

export const revalidate = 300;

export default function BrandsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href="/" className="hover:text-orange-700">
          Home
        </Link>
        <span className="px-2">/</span>
        Brands
      </nav>
      <div className="mt-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">Brands</p>
        <h1 className="mt-3 text-5xl font-black text-emerald-950">Featured brands</h1>
        <p className="mt-4 text-lg leading-8 text-stone-700">
          Explore trusted manufacturers and their active catalog products.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}`}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm hover:border-orange-500"
          >
            <span className="text-3xl font-black text-emerald-950">{brand.logo}</span>
            <p className="mt-3 leading-7 text-stone-600">{brand.description}</p>
            <p className="mt-4 text-sm font-bold text-orange-700">
              {getProductsByBrand(brand.id).length} products
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
