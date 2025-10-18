'use client';

import Link from 'next/link';
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-200 bg-white">
      <div className="section-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              FreshHarvest Market
            </h3>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Your neighborhood supermarket for vibrant produce, thoughtful
              pantry staples, and chef-inspired meal ideas.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Customer Care
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/checkout" className="hover:text-mint-600">
                  Delivery &amp; Pickup
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-mint-600">
                  Account &amp; Orders
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-mint-600">
                  Browse Departments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Stay in Touch
            </h4>
            <form className="mt-3 flex gap-2" aria-label="Email updates sign up">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-full border border-cream-300 bg-cream-50 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-200"
              />
              <button
                type="submit"
                className="rounded-full bg-mint-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
              >
                Join
              </button>
            </form>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Follow us
              </span>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full bg-cream-100 p-2 text-slate-600 transition hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-full bg-cream-100 p-2 text-slate-600 transition hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                aria-label="YouTube"
                className="rounded-full bg-cream-100 p-2 text-slate-600 transition hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link
                href="mailto:hello@freshharvest.com"
                aria-label="Email FreshHarvest Market"
                className="rounded-full bg-cream-100 p-2 text-slate-600 transition hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FreshHarvest Market. Crafted with care for
          our neighbors.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
