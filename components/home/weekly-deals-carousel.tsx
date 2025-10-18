'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { weeklyDeals, products } from '@/lib/data';
import { useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/providers/cart-provider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function WeeklyDealsCarousel() {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (productId: string) => {
      addToCart(productId, 1);
    },
    [addToCart]
  );

  return (
    <section
      id="weekly-deals"
      aria-labelledby="weekly-deals-heading"
      className="section-container py-12 sm:py-16"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="weekly-deals-heading" className="section-heading">
            Weekly Market Deals
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Stretch your grocery budget with fresh picks curated by our buyers.
            Deals update every Wednesday—stock up before they&apos;re gone.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-mint-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
        >
          Shop all deals
        </Link>
      </div>

      <div className="relative mt-8 rounded-[2.5rem] bg-gradient-to-br from-white via-cream-50 to-mint-50 p-6 shadow-soft ring-1 ring-cream-200">
        <Swiper
          modules={[Navigation, Autoplay, A11y, Pagination]}
          autoplay={{ delay: 6500 }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {weeklyDeals.map((deal) => {
            const product = products.find(
              (item) => item.id === deal.productId
            );

            if (!product) return null;

            return (
              <SwiperSlide key={deal.id}>
                <article className="card flex h-full flex-col gap-4 rounded-[2rem]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="inline-flex items-center gap-2 rounded-full bg-butter-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-butter-700">
                      {deal.savings}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {deal.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">
                      {deal.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-700">
                      <span>${product.price.toFixed(2)}</span>
                      <span>{deal.validThrough}</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-mint-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-mint-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2"
                      >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        Add to cart
                      </button>
                      <Link
                        href={`/shop#${product.id}`}
                        className="text-center text-xs font-semibold uppercase tracking-wide text-mint-700 underline-offset-2 hover:underline"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default WeeklyDealsCarousel;
