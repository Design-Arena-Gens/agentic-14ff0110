'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  UserRound
} from 'lucide-react';
import { useCart } from '@/components/providers/cart-provider';
import type { Route } from 'next';
import type { LucideIcon } from 'lucide-react';

const links: { href: Route; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/account', label: 'Account', icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav
      aria-label="Sticky primary navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-200 bg-white/95 backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative flex flex-col items-center gap-1 py-2 text-xs font-semibold transition ${
                  isActive ? 'text-mint-600' : 'text-slate-500 hover:text-mint-500'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {link.label}
                {link.href === '/cart' && itemCount > 0 && (
                  <span
                    aria-label={`${itemCount} items in cart`}
                    className="absolute -right-2 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-butter-400 px-1 text-[10px] font-bold text-slate-800 shadow"
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;
