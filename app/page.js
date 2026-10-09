'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CardSkeleton from './components/CardSkeleton';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const risers = products.filter((p) => p.change?.dir === 'up').slice(0, 6);
  const fallers = products.filter((p) => p.change?.dir === 'down').slice(0, 6);

  return (
    <div className="bg-[#f8faf8] min-h-screen pb-16">
      <Hero />

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔺</span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>
          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {risers.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔻</span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">আজ দাম কমেছে</h2>
          </div>
          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fallers.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>

        <section id="সব-পণ্য" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
            <p className="text-sm text-gray-500">বাজারের সব নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও আপডেট দাম।</p>
          </div>
          {loading ? (
            <CardSkeleton count={12} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
