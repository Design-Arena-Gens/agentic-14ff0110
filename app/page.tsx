'use client';

import HeroSection from '@/components/home/hero';
import WeeklyDealsCarousel from '@/components/home/weekly-deals-carousel';
import CategoryGrid from '@/components/home/category-grid';
import RecipesSection from '@/components/home/recipes-section';
import StoreLocator from '@/components/home/store-locator';
import LoyaltySignup from '@/components/home/loyalty-signup';
import CartSummary from '@/components/cart/cart-summary';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WeeklyDealsCarousel />
      <CategoryGrid />
      <RecipesSection />
      <StoreLocator />
      <LoyaltySignup />
      <CartSummary />
    </>
  );
}
