import type { Metadata } from 'next';
import { Open_Sans, Lato } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/providers/cart-provider';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import Footer from '@/components/footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: 'FreshHarvest Market | Neighborhood e-commerce grocery hub',
  description:
    'Discover weekly deals, seasonal produce, and chef-inspired recipes at FreshHarvest Market. Shop online, schedule delivery or pickup, and join our loyalty program.',
  applicationName: 'FreshHarvest Market',
  keywords: [
    'supermarket',
    'grocery delivery',
    'local market',
    'fresh produce',
    'recipes',
    'loyalty program'
  ],
  authors: [{ name: 'FreshHarvest Market' }]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${lato.variable}`}>
      <body className="bg-cream-50 text-slate-800">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-mint-700 focus:shadow-lg"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
