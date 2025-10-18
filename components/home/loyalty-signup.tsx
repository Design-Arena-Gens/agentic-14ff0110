'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2 } from 'lucide-react';

export function LoyaltySignup() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="loyalty"
      aria-labelledby="loyalty-heading"
      className="section-container py-12 sm:py-16"
    >
      <motion.div
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mint-200/60 via-cream-100 to-butter-100 p-8 shadow-soft"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -left-12 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-mint-300/30 blur-3xl lg:block" />
        <div className="absolute -right-12 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-butter-200/40 blur-3xl lg:block" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr,1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
              <Gift className="h-4 w-4" aria-hidden="true" />
              FreshRewards Loyalty
            </span>
            <h2 id="loyalty-heading" className="mt-4 text-3xl font-bold text-slate-900">
              Earn rewards every time you shop.
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Join our loyalty program for members-only pricing, recipe drops,
              and invites to tasting events. New members earn a 15% welcome
              bonus on their first order.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>· 1 point per dollar spent in-store or online</li>
              <li>· Curated recipes synced to seasonal deliveries</li>
              <li>· Early access to local farmer spotlights</li>
            </ul>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200"
            aria-label="FreshRewards signup form"
          >
            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="loyalty-name"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="loyalty-name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                  placeholder="Alex Martinez"
                />
              </div>
              <div>
                <label
                  htmlFor="loyalty-email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  id="loyalty-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="loyalty-zip"
                  className="text-sm font-semibold text-slate-700"
                >
                  ZIP code
                </label>
                <input
                  id="loyalty-zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  required
                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
                  placeholder="11222"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    You&apos;re in! Check your email.
                  </>
                ) : (
                  'Join FreshRewards'
                )}
              </button>
              <p className="text-xs text-slate-500">
                By joining, you agree to receive emails about seasonal offers,
                recipes, and events. Unsubscribe anytime.
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default LoyaltySignup;
