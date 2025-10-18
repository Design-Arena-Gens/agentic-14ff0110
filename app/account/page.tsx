'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserRound,
  MapPin,
  CreditCard,
  Bell,
  CheckCircle2
} from 'lucide-react';

export default function AccountPage() {
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  return (
    <div className="bg-gradient-to-b from-cream-50 via-white to-mint-50 pb-16 pt-12">
      <div className="section-container space-y-10">
        <header className="flex flex-col gap-4 rounded-[2.5rem] bg-white p-8 shadow-soft ring-1 ring-cream-200 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Welcome back, Taylor
            </span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Your account dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Manage addresses, saved payment methods, and loyalty preferences in
              one place. Checkout moves faster when your details stay up to date.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="card space-y-6 rounded-[2rem]"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Saved delivery addresses
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-cream-200 bg-cream-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <MapPin className="h-4 w-4 text-mint-600" aria-hidden="true" />
                  Home · Greenpoint
                </div>
                <p className="mt-2">
                  124 Berry Street, Apt 3C
                  <br />
                  Brooklyn, NY 11222
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mint-700 shadow hover:bg-mint-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                >
                  Edit address
                </button>
              </div>
              <div className="rounded-2xl border border-dashed border-cream-300 bg-white p-4 text-center">
                <p className="text-sm font-semibold text-slate-600">
                  Add a new delivery or pickup location
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-mint-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                >
                  Add address
                </button>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="card space-y-6 rounded-[2rem]"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Saved payment methods
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-mint-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Visa ending in 1042
                    </p>
                    <p className="text-xs text-slate-500">Expires 09/27</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-wide text-mint-700 hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                >
                  Set default
                </button>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-full border border-dashed border-cream-300 bg-white px-4 py-3 text-sm font-semibold text-mint-700 hover:border-mint-300 hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
              >
                Add new payment method
              </button>
            </div>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="card max-w-3xl rounded-[2rem]"
        >
          <h2 className="text-xl font-semibold text-slate-900">
            Notifications &amp; preferences
          </h2>
          <form
            className="mt-4 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setPreferencesSaved(true);
              setTimeout(() => setPreferencesSaved(false), 2000);
            }}
          >
            <label className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50 p-4 text-sm text-slate-600">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 h-4 w-4 rounded border-cream-300 text-mint-600 focus:ring-mint-500"
              />
              <span>
                <span className="flex items-center gap-2 font-semibold text-slate-800">
                  <Bell className="h-4 w-4 text-mint-600" aria-hidden="true" />
                  Weekly produce report
                </span>
                Receive Sunday updates about seasonal arrivals and farmers&apos;
                market highlights.
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50 p-4 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-cream-300 text-mint-600 focus:ring-mint-500"
              />
              <span>
                <span className="font-semibold text-slate-800">
                  SMS delivery notifications
                </span>
                Get text updates when your delivery driver is on the way.
              </span>
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-mint-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
            >
              {preferencesSaved ? (
                <>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Preferences saved
                </>
              ) : (
                'Save preferences'
              )}
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
