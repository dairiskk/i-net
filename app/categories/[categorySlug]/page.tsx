import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SortableProductGrid } from "@/components/SortableProductGrid";
import {
  getCategory,
  getCategoryById,
  getMainCategories,
  getProductsByCategory,
  getSubcategories,
  products,
  subcategories,
} from "@/lib/catalog";

export const revalidate = 300;

export function generateStaticParams() {
  return [...getMainCategories(), ...subcategories].map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const parentCategory = category.parentId ? getCategoryById(category.parentId) : undefined;
  const categoryProducts = getProductsByCategory(category.id);
  const subcategories = getSubcategories(category.id);
  const availableTypes = [...new Set(products.map((product) => product.type))];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="text-sm font-semibold text-stone-500">
        <Link href="/" className="hover:text-orange-700">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/categories" className="hover:text-orange-700">
          Categories
        </Link>
        <span className="px-2">/</span>
        {parentCategory ? (
          <>
            <Link href={`/categories/${parentCategory.slug}`} className="hover:text-orange-700">
              {parentCategory.name}
            </Link>
            <span className="px-2">/</span>
          </>
        ) : null}
        {category.name}
      </nav>

      <section className="mt-8 overflow-hidden rounded-lg bg-emerald-950 text-white">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Category</p>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">{category.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-100 md:text-lg">
              {category.description}
            </p>
          </div>
          <Image
            src={category.image}
            alt={category.name}
            width={900}
            height={600}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-44 w-full object-cover sm:h-52 lg:h-64"
          />
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="self-start rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-stone-950">Filters</h2>
          <div className="mt-5 grid gap-5 text-sm">
            <div>
              <p className="font-bold text-stone-900">Subcategory</p>
              <div className="mt-2 grid gap-2">
                {subcategories.length ? (
                  subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/categories/${subcategory.slug}`}
                      className="rounded-md bg-stone-100 px-3 py-2 font-semibold hover:bg-orange-100"
                    >
                      {subcategory.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-stone-500">No deeper category</span>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold text-stone-900">Product type</p>
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

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-stone-950">{categoryProducts.length} products</h2>
            <Link href="/search" className="font-bold text-orange-700 hover:text-orange-800">
              Search all
            </Link>
          </div>
          <SortableProductGrid
            products={categoryProducts}
            sortLabel="Sorting"
            sortOptions={sortOptions}
          />
          {categoryProducts.length === 0 ? (
            <p className="rounded-lg bg-white p-5 text-stone-600">No active products in this category yet.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
