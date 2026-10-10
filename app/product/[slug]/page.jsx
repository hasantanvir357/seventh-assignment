'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { toBengaliNumber } from '@/lib/bengali';

function ProductDetailContent() {
  const router = useRouter();
  const urlParams = useParams();
  const slug = urlParams?.slug;

  const { data: session, isPending } = useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session && slug) {
      const currentPath = `/product/${slug}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [session, isPending, router, slug]);

  useEffect(() => {
    if (!slug || !session) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.nameBn) {
            setProduct(data);
            return;
          }
        }

        const allRes = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
          cache: 'no-store',
        });
        if (allRes.ok) {
          const allProducts = await allRes.json();
          const found = allProducts.find(
            (p) => p.slug === slug || p.id === slug || p.id === Number(slug)
          );

          if (found) {
            setProduct(found);
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug, session]);

  if (isPending || !session) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-emerald-800">অনুমতি যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  if (loading || !slug) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  if (!product || !product.nameBn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <span className="text-5xl block mb-4">🔍</span>
        <h2 className="text-xl font-bold text-gray-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="px-4 py-2 bg-emerald-600 text-white rounded-lg inline-block text-sm">
          হোম পেজে ফিরুন
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  const todayPrice = product.today || 0;
  const yesterdayPrice = product.yesterday || todayPrice;
  const priceDiff = Math.abs(todayPrice - yesterdayPrice);

  const marketsList = Array.isArray(product.markets) ? product.markets : [];

  let minOverallPrice = marketsList.length > 0
    ? Math.min(...marketsList.map(m => m.min))
    : todayPrice;

  let maxOverallPrice = marketsList.length > 0
    ? Math.max(...marketsList.map(m => m.max))
    : todayPrice;

  return (
    <div className="bg-[#f4f6f4] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">

        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-emerald-700">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
            {product.categoryNameBn || product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl border border-gray-100 shrink-0">
              {product.image || '🛒'}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                প্রতি {product.unit} - {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-600 font-medium pt-1">
                গতকালকের তুলনায় আজ দাম{' '}
                <span className={isUp ? 'text-rose-600 font-bold' : isDown ? 'text-emerald-700 font-bold' : 'text-gray-700 font-bold'}>
                  {isUp ? `বেড়েছে - ${toBengaliNumber(priceDiff)} টাকা` : isDown ? `কমেছে - ${toBengaliNumber(priceDiff)} টাকা` : 'অপরিবর্তিত'}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#f0f7f2] p-5 rounded-2xl border border-emerald-100/80 w-full sm:w-auto text-center min-w-50">
            <span className="text-[11px] text-gray-500 font-medium block mb-1">আজকের দাম</span>
            <div className="text-3xl font-extrabold text-gray-900">
              {toBengaliNumber(todayPrice)}
            </div>
            <span className="text-xs text-gray-500 block font-medium mt-0.5">টাকা / {product.unit}</span>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-rose-600 border border-rose-100">
              <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
              <span>{toBengaliNumber(product.change?.pct)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-800">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
              <span className="text-[11px] text-gray-400 font-semibold block">সর্বনিম্ন দাম</span>
              <div className="text-2xl font-bold text-emerald-600">
                {toBengaliNumber(minOverallPrice)} টাকা
              </div>
              <p className="text-[10px] text-gray-400 font-medium">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
              <span className="text-[11px] text-gray-400 font-semibold block">সর্বাধিক দাম</span>
              <div className="text-2xl font-bold text-rose-500">
                {toBengaliNumber(maxOverallPrice)} টাকা
              </div>
              <p className="text-[10px] text-gray-400 font-medium">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
              <span className="text-[11px] text-gray-400 font-semibold block">গড় দাম</span>
              <div className="text-2xl font-bold text-emerald-800">
                {toBengaliNumber(todayPrice)} টাকা
              </div>
              <p className="text-[10px] text-gray-400 font-medium">প্রতি {product.unit}-এর হিসাব</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px]">
                  <th className="py-3 px-2 font-semibold">বাজার</th>
                  <th className="py-3 px-2 font-semibold">বিভাগ</th>
                  <th className="py-3 px-2 font-semibold">সর্বনিম্ন</th>
                  <th className="py-3 px-2 font-semibold">সর্বাধিক</th>
                  <th className="py-3 px-2 text-right font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {marketsList.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 px-2 font-semibold text-gray-800">{m.market}</td>
                      <td className="py-3.5 px-2 text-gray-500 font-medium">{m.division}</td>
                      <td className="py-3.5 px-2 text-gray-800 font-bold">{toBengaliNumber(m.min)} টাকা</td>
                      <td className="py-3.5 px-2 text-gray-800 font-bold">{toBengaliNumber(m.max)} টাকা</td>
                      <td className="py-3.5 px-2 text-right font-extrabold text-gray-900">
                        {toBengaliNumber(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-emerald-800">পণ্যের বিস্তারিত লোড হচ্ছে...</p>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}