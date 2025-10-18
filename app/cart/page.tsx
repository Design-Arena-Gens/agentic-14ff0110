'use client';

import CartSummary from '@/components/cart/cart-summary';
import { motion } from 'framer-motion';

export default function CartPage() {
  return (
    <div className="bg-gradient-to-b from-cream-50 via-white to-cream-100 pb-16 pt-12">
      <div className="section-container space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200"
        >
          <h1 className="text-3xl font-bold text-slate-900">Your shopping cart</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Review your selections, update quantities, and continue to secure
            checkout when you&apos;re ready. Schedule delivery or pickup on the
            next step.
          </p>
        </motion.header>
      </div>
      <CartSummary />
    </div>
  );
}
