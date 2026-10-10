'use client';
'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toBengaliNumber } from '@/lib/bengali';

export default function CategoryPage() {
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
import { use, useEffect, useState } from 'react';
import ProductCard from '@/app/components/ProductCard';
import CardSkeleton from '@/app/components/CardSkeleton';
import Link from 'next/link';
import { toBengaliNumber } from '@/lib/bengali';

export default function CategoryPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [prodRes, catRes] = await Promise.all([
                    fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`),
                    fetch('https://api.api-store.workers.dev/api/bazardor/categories')
                ]);
                const prodData = await prodRes.json();
                const catData = await catRes.json();

                setProducts(prodData);
                setCategories(catData);
            } catch (err) {
                console.error('Error fetching category data:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);


    const currentCategory = categories.find((c) => c.slug === slug) || {
        nameBn: products[0]?.categoryNameBn || slug,
        icon: products[0]?.categoryIcon || '📦'
    };


    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.today - b.today;
        if (sortBy === 'price-high') return b.today - a.today;
        return 0;
    });

    return (
        <div className="bg-[#f8faf8] min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 space-y-6">


                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl p-3 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        {currentCategory.icon}
                    </span>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {currentCategory.nameBn}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            প্রতি সপ্তাহের পণ্যের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>


                <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                    <div className="text-sm text-gray-600 font-medium">
                        মোট <span className="font-bold text-emerald-700">{toBengaliNumber(products.length)}</span> টি পণ্য পাওয়া গেছে
                    </div>

                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-sm shadow-sm">
                        <label className="text-xs font-semibold text-gray-500">সাজান:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent font-medium text-gray-800 outline-none cursor-pointer"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-low">দাম: কম থেকে বেশি</option>
                            <option value="price-high">দাম: বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>


                {loading ? (
                    <CardSkeleton count={6} />
                ) : sortedProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-sm">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
                        <p className="text-sm text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
                        <Link
                            href="/"
                            className="px-5 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition-all inline-block"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}