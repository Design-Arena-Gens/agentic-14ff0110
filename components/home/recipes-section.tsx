'use client';

import Image from 'next/image';
import Link from 'next/link';
import { recipes, products } from '@/lib/data';
import { Clock, ChefHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function RecipesSection() {
  return (
    <section
      id="recipes"
      aria-labelledby="recipes-heading"
      className="section-container py-12 sm:py-16"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="recipes-heading" className="section-heading">
            Recipes &amp; Meal Inspiration
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Tap into our culinary team&apos;s favorite seasonal dishes. Each
            recipe links directly to ingredients you can add to your cart in a
            click.
          </p>
        </div>
        <Link
          href="/recipes"
          className="inline-flex items-center justify-center rounded-full bg-butter-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-butter-900 transition hover:bg-butter-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter-300 focus-visible:ring-offset-2"
        >
          Explore all recipes
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {recipes.map((recipe) => (
          <motion.article
            key={recipe.id}
            className="card flex h-full flex-col rounded-[2rem] bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={recipe.image}
                alt={recipe.imageAlt}
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="mt-5 flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-mint-700">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {recipe.preparationTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cream-100 px-3 py-1 text-slate-600">
                  <ChefHat className="h-4 w-4" aria-hidden="true" />
                  {recipe.difficulty}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {recipe.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{recipe.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ingredients
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {recipe.ingredients.map((ingredient) => {
                    const product = products.find(
                      (item) => item.id === ingredient.productId
                    );

                    return (
                      <li key={ingredient.productId} className="flex items-center gap-2">
                        <span>{ingredient.quantity}</span>
                        {product ? (
                          <Link
                            href={`/shop#${product.id}`}
                            className="flex items-center gap-1 font-semibold text-mint-700 hover:text-mint-600"
                          >
                            {product.name}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        ) : (
                          <span>{ingredient.productId}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default RecipesSection;
