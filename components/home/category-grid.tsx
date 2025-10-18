'use client';

import Image from 'next/image';
import { useState } from 'react';
import { categories, products } from '@/lib/data';
import { useCart } from '@/components/providers/cart-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, CheckCircle2 } from 'lucide-react';

const filterProductsByCategory = (category: string | null) => {
  if (!category) return products;
  return products.filter((product) => product.category === category);
};

export function CategoryGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = filterProductsByCategory(activeCategory);

  return (
    <section
      id="shop"
      aria-labelledby="shop-heading"
      className="section-container py-12 sm:py-16"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="shop-heading" className="section-heading">
            Shop by Aisle
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse curated departments built around neighborhood cooking habits.
            Filter by category or scroll to explore bestsellers and seasonal
            favorites.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 ${
            activeCategory === null
              ? 'bg-mint-600 text-white'
              : 'bg-cream-100 text-slate-700 hover:bg-mint-100 hover:text-mint-700'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 ${
              activeCategory === category
                ? 'bg-mint-600 text-white'
                : 'bg-cream-100 text-slate-700 hover:bg-mint-100 hover:text-mint-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.article
              id={product.id}
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="card flex h-full flex-col rounded-[2rem] border border-cream-100"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition duration-500 ease-out hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.bestseller && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-mint-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Bestseller
                    </span>
                  )}
                  {product.seasonal && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-butter-200/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-butter-900">
                      Seasonal
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-1 flex-col gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    ${product.price.toFixed(2)} · {product.unit}
                  </p>
                </div>
                <p className="text-sm text-slate-600">{product.description}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-500">
                    <Star className="h-4 w-4 text-butter-400" aria-hidden="true" />
                    {product.rating?.toFixed(1)}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product.id, 1);
                      setAddedProductId(product.id);
                      setTimeout(() => setAddedProductId(null), 1600);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    {addedProductId === product.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default CategoryGrid;
