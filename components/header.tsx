'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBasket, MapPin, Phone } from 'lucide-react';
import type { Route } from 'next';

const links: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/checkout', label: 'Checkout' }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/80 backdrop-blur">
      <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold uppercase tracking-wide text-mint-700 shadow-soft transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint-300"
          aria-label="FreshHarvest Home"
        >
          <ShoppingBasket className="h-5 w-5" aria-hidden="true" />
          FreshHarvest Market
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2 ${
                pathname === link.href
                  ? 'bg-mint-600 text-white shadow-soft'
                  : 'text-slate-700 hover:bg-mint-100/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="hidden items-center gap-2 sm:flex">
            <MapPin className="h-4 w-4 text-mint-600" aria-hidden="true" />
            <span className="font-semibold text-slate-800">3 NYC Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-mint-600" aria-hidden="true" />
            <a href="tel:17185551042" className="font-semibold text-slate-800">
              (718) 555-1042
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
