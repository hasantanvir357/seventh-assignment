'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toBengaliNumber } from '@/lib/bengali';

function CategoryContent() {
    const params = useParams();
    const slug = params?.slug;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        async function fetchCategoryProducts() {
            try {
                setLoading(true);
                const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
                    cache: 'no-store',
                });
                if (res.ok) {
                    const allProducts = await res.json();
                    const filtered = allProducts.filter(
                        (p) => p.category === slug || p.categorySlug === slug
                    );
                    setProducts(filtered);
                }
            } catch (err) {
                console.error('Error fetching category products:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchCategoryProducts();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8faf8] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 space-y-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Link href="/" className="hover:text-emerald-700">হোম</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-semibold uppercase">{slug}</span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    ক্যাটাগরি: <span className="text-emerald-700 uppercase">{slug}</span>
                </h1>

                {products.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center border border-gray-100 shadow-xs">
                        <p className="text-gray-500 text-sm">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((item) => {
                            const isUp = item.change?.dir === 'up';
                            const isDown = item.change?.dir === 'down';

                            return (
                                <Link
                                    key={item.id || item.slug}
                                    href={`/product/${item.slug || item.id}`}
                                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                                >
                                    <div className="space-y-3">
                                        <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center text-5xl">
                                            {item.image || '🛒'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base">{item.nameBn}</h3>
                                            <p className="text-xs text-gray-500">প্রতি {item.unit}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-gray-400 block font-medium">আজকের দাম</span>
                                            <span className="text-lg font-extrabold text-gray-900">
                                                {toBengaliNumber(item.today || 0)} টাকা
                                            </span>
                                        </div>
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${isUp ? 'bg-rose-50 text-rose-600' : isDown ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(item.change?.pct || 0)}%
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-emerald-800">
                ক্যাটাগরি লোড হচ্ছে...
            </div>
        }>
            <CategoryContent />
        </Suspense>
    );
}