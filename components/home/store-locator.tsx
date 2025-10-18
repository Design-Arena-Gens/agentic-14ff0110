'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock3 } from 'lucide-react';
import { storeLocations } from '@/lib/data';
import { motion } from 'framer-motion';

export function StoreLocator() {
  const [activeStoreId, setActiveStoreId] = useState(storeLocations[0]?.id);
  const activeStore = storeLocations.find((store) => store.id === activeStoreId);

  return (
    <section
      id="store-locator"
      aria-labelledby="store-locator-heading"
      className="section-container py-12 sm:py-16"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <h2 id="store-locator-heading" className="section-heading">
            Visit Our Neighborhood Markets
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Three NYC locations, one shared commitment to friendly faces, local
            farmers, and pantry staples you count on. Select a store to view
            directions, contact info, and hours.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <div className="space-y-4">
          {storeLocations.map((store) => {
            const isActive = store.id === activeStoreId;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveStoreId(store.id)}
                className={`w-full rounded-3xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-mint-300 bg-white shadow-soft'
                    : 'border-cream-200 bg-cream-50 hover:border-mint-200'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {store.name}
                    </h3>
                    <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
                      {store.neighborhood}
                    </span>
                  </div>
                  <p className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="mt-0.5 h-4 w-4 text-mint-600" aria-hidden="true" />
                    {store.address}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-mint-600" aria-hidden="true" />
                    {store.phone}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock3 className="h-4 w-4 text-mint-600" aria-hidden="true" />
                    {store.hours}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <motion.div
          key={activeStore?.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-soft"
        >
          {activeStore ? (
            <iframe
              title={`Map to ${activeStore.name}`}
              src={activeStore.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center text-sm text-slate-500">
              Select a store to view the map.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default StoreLocator;
