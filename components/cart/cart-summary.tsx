'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/providers/cart-provider';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function CartSummary() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <section
        id="cart"
        aria-labelledby="cart-heading"
        className="section-container py-12 sm:py-16"
      >
        <div className="card rounded-[2rem] bg-white text-center">
          <h2 id="cart-heading" className="section-heading">
            Your cart is empty
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Discover weekly deals and add items to your cart for fast checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-mint-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
          >
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cart"
      aria-labelledby="cart-heading"
      className="section-container py-12 sm:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
        <div className="space-y-4">
          <h2 id="cart-heading" className="section-heading">
            Review your cart
          </h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex flex-col gap-4 rounded-3xl border border-cream-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-2xl sm:h-20 sm:w-20">
                  <Image
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ${item.product.price.toFixed(2)} · {item.product.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`${item.product.id}-quantity`} className="sr-only">
                      Quantity for {item.product.name}
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-200 text-slate-600 transition hover:border-mint-200 hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
                      aria-label={`Decrease quantity for ${item.product.name}`}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <input
                      id={`${item.product.id}-quantity`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.product.id, Number(event.target.value))
                      }
                      className="h-9 w-14 rounded-full border border-cream-200 bg-cream-50 text-center text-sm font-semibold text-slate-700 focus:border-mint-300 focus:outline-none focus:ring-2 focus:ring-mint-200"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-200 text-slate-600 transition hover:border-mint-200 hover:text-mint-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-300 focus-visible:ring-offset-2"
                      aria-label={`Increase quantity for ${item.product.name}`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="rounded-full p-2 text-slate-400 transition hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-cream-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Order summary</h3>
            <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-700">
              {items.length} items
            </span>
          </div>
          <dl className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-slate-800">
                ${subtotal.toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Estimated delivery</dt>
              <dd className="font-semibold text-slate-800">$5.99</dd>
            </div>
            <div className="flex justify-between">
              <dt>FreshRewards savings</dt>
              <dd className="font-semibold text-mint-700">-$3.00</dd>
            </div>
            <div className="flex justify-between border-t border-cream-200 pt-4 text-base font-semibold text-slate-900">
              <dt>Total due today</dt>
              <dd>${(subtotal + 5.99 - 3).toFixed(2)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-mint-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
          >
            Proceed to checkout
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            Secure checkout with credit &amp; debit cards, Apple Pay, and local
            pickup scheduling.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default CartSummary;
