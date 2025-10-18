'use client';

import CategoryGrid from '@/components/home/category-grid';
import PredictiveSearch from '@/components/home/predictive-search';
import { motion } from 'framer-motion';

export default function ShopPage() {
  return (
    <div className="bg-gradient-to-b from-cream-50 to-white pb-16 pt-12">
      <div className="section-container space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200"
        >
          <h1 className="text-3xl font-bold text-slate-900">Shop the Market</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Build your cart from curated grocery aisles with seasonal highlights,
            local favorites, and pantry staples. Use predictive search to find
            exactly what you need in seconds.
          </p>
          <div className="mt-6 max-w-2xl">
            <PredictiveSearch placeholder="Search the entire market" />
          </div>
        </motion.div>
      </div>
      <CategoryGrid />
    </div>
  );
}
