'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PredictiveSearch from './predictive-search';
import { products, weeklyDeals } from '@/lib/data';

export function HeroSection() {
  const featuredDeal = weeklyDeals[0];
  const featuredProduct = featuredDeal
    ? products.find((product) => product.id === featuredDeal.productId)
    : undefined;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-mint-100 via-cream-50 to-butter-50 py-16 sm:py-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-l-[4rem] bg-white/60 backdrop-blur-lg lg:block" />
      <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mint-700 shadow-soft">
            FreshHarvest Market
          </span>
          <div>
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            >
              Fresh finds for vibrant home cooking &amp; effortless everyday
              meals.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              Discover weekly deals, seasonal produce, and neighborhood favorites
              curated for food-loving households. Shop in minutes, schedule
              delivery, and explore chef-inspired recipes.
            </p>
          </div>
          <PredictiveSearch />
          {featuredDeal && featuredProduct && (
            <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-mint-100 sm:max-w-lg">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.imageAlt}
                  fill
                  className="object-cover"
                  sizes="56px"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-mint-700">
                  {featuredDeal.savings}
                </p>
                <p className="text-sm text-slate-700">{featuredDeal.title}</p>
                <Link
                  href="/shop#weekly-deals"
                  className="mt-1 inline-flex items-center text-xs font-semibold text-mint-700 underline-offset-2 hover:underline"
                >
                  Browse deals
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="relative z-10 hidden h-full min-h-[420px] rounded-[3rem] bg-white p-8 shadow-soft ring-1 ring-cream-200 md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          aria-hidden="true"
        >
          <div className="absolute -top-6 right-10 rounded-full bg-butter-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-butter-900 shadow">
            Seasonal Spotlight
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mint-200 via-cream-100 to-butter-100">
            <Image
              src="https://images.unsplash.com/photo-1450858933126-0c0150286608?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh produce assortment including lemons, herbs, and avocados"
              fill
              priority
              className="object-cover"
              sizes="540px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
