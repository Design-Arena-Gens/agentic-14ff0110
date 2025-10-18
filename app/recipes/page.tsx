'use client';

import Image from 'next/image';
import Link from 'next/link';
import { recipes, products } from '@/lib/data';
import { motion } from 'framer-motion';
import { Clock, ChefHat, UtensilsCrossed } from 'lucide-react';

export default function RecipesPage() {
  return (
    <div className="bg-gradient-to-b from-cream-50 via-white to-mint-50 pb-16 pt-12">
      <div className="section-container space-y-10">
        <header className="rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
            Recipe Studio
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Cook What&apos;s Fresh This Week
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Our culinary team collaborates with local farmers and producers to
            craft approachable recipes. Ingredient links take you straight to
            the matching product pages, so dinner plans stay effortless.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card flex h-full flex-col gap-5 rounded-[2rem]"
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
                <h2 className="text-xl font-semibold text-slate-900">
                  {recipe.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{recipe.description}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ingredients
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {recipe.ingredients.map((ingredient) => {
                    const product = products.find(
                      (item) => item.id === ingredient.productId
                    );
                    return (
                      <li key={ingredient.productId}>
                        <span className="font-semibold text-slate-800">
                          {ingredient.quantity}
                        </span>{' '}
                        ·{' '}
                        {product ? (
                          <Link
                            href={`/shop#${product.id}`}
                            className="font-semibold text-mint-700 hover:text-mint-600"
                          >
                            {product.name}
                          </Link>
                        ) : (
                          ingredient.productId
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Directions
                </h3>
                <ol className="mt-2 space-y-2 text-sm text-slate-600">
                  {recipe.steps.map((step, index) => (
                    <li key={step}>
                      <span className="font-semibold text-mint-700">
                        Step {index + 1}:
                      </span>{' '}
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
