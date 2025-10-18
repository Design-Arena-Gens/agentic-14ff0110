'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, TrendingUp, XCircle } from 'lucide-react';
import { products } from '@/lib/data';
import { searchProducts } from '@/lib/search';
import Link from 'next/link';

type PredictiveSearchProps = {
  placeholder?: string;
  onSelect?: (productId: string) => void;
};

const trendingSearches = [
  'Weekly deals',
  'Organic eggs',
  'Matcha powder',
  'Meal prep kits'
];

export function PredictiveSearch({
  placeholder = 'Search produce, meals & more',
  onSelect
}: PredictiveSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className="relative w-full">
      <label htmlFor="site-search" className="sr-only">
        Search for products
      </label>
      <div className="flex items-center rounded-full border border-cream-200 bg-white px-4 py-3 shadow-soft focus-within:border-mint-500 focus-within:ring-2 focus-within:ring-mint-300">
        <Search className="mr-3 h-5 w-5 text-mint-600" aria-hidden="true" />
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full border-none text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="rounded-full p-1 text-slate-400 transition hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
            aria-label="Clear search"
          >
            <XCircle className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {(isFocused || query.length > 0) && (
        <div className="absolute left-0 right-0 top-[72px] z-20 max-h-80 overflow-y-auto rounded-3xl border border-cream-200 bg-white shadow-soft">
          {suggestions.length > 0 ? (
            <ul role="list" className="divide-y divide-cream-100">
              {suggestions.map((suggestion) => (
                <li key={suggestion.product.id}>
                  <Link
                    href={`/shop#${suggestion.product.id}`}
                    onClick={() => {
                      setIsFocused(false);
                      onSelect?.(suggestion.product.id);
                    }}
                    className="flex items-start gap-4 px-5 py-4 transition hover:bg-mint-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {suggestion.product.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {suggestion.product.category} · $
                        {suggestion.product.price.toFixed(2)}{' '}
                        {suggestion.product.unit}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-mint-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-mint-700">
                        Trending ingredients
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3 px-5 py-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <TrendingUp className="h-4 w-4 text-mint-500" />
                Trending this week
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setQuery(item)}
                    className="rounded-full bg-cream-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-mint-100 hover:text-mint-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictiveSearch;
