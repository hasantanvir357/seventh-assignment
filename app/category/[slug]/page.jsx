'use client';

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