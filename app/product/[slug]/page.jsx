'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { toBengaliNumber } from '@/lib/bengali';

export default function ProductDetailPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
        );
    }

    if (!product) {
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

    return (
        <div className="bg-[#f8faf8] min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 space-y-6">


                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Link href="/" className="hover:text-emerald-700">হোম</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
                        {product.categoryNameBn || product.category}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.nameBn}</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            {product.image || '🛒'}
                        </span>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-sm text-gray-500 font-medium mt-1">
                                ক্যাটাগরি: <span className="text-emerald-700">{product.categoryNameBn}</span> | এককে: <span className="text-gray-700">{product.unit}</span>
                            </p>
                        </div>
                    </div>


                    <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 w-full md:w-auto text-right">
                        <span className="text-xs text-emerald-800 font-semibold block mb-0.5">আজকের গড় দাম</span>
                        <div className="text-2xl md:text-3xl font-bold text-emerald-800">
                            {toBengaliNumber(product.today)} টাকা/{product.unit}
                        </div>
                        <div className="mt-1 flex items-center justify-end gap-1 text-xs font-bold">
                            <span className={isUp ? 'text-rose-600' : isDown ? 'text-emerald-700' : 'text-gray-600'}>
                                {isUp ? '▲ দাম বেড়েছে' : isDown ? '▼ দাম কমেছে' : '— অপরিবর্তিত'} {toBengaliNumber(product.change?.pct)}%
                            </span>
                        </div>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>📊</span>
                        <span>সাম্প্রতিক মূল্যের ইতিহাস</span>
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">আজ</span>
                            <span className="text-lg font-bold text-gray-900">{toBengaliNumber(product.today)} ৳</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">গতকাল</span>
                            <span className="text-lg font-bold text-gray-800">{toBengaliNumber(product.yesterday)} ৳</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">গত সপ্তাহ</span>
                            <span className="text-lg font-bold text-gray-800">{toBengaliNumber(product.lastWeek)} ৳</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs text-gray-500 block mb-1">গত মাস</span>
                            <span className="text-lg font-bold text-gray-800">{toBengaliNumber(product.lastMonth)} ৳</span>
                        </div>
                    </div>
                </div>


                {product.markets && product.markets.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span>🏪</span>
                            <span>বিভিন্ন বাজারের তথ্য</span>
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 bg-gray-50/50">
                                        <th className="p-3">বাজারের নাম</th>
                                        <th className="p-3">বিভাগ</th>
                                        <th className="p-3 text-right">সর্বনিম্ন - সর্বোচ্চ দাম</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {product.markets.map((mkt, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-3 font-medium text-gray-900">{mkt.market}</td>
                                            <td className="p-3 text-gray-500">
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-xs font-medium">
                                                    {mkt.division}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right font-bold text-emerald-700">
                                                {toBengaliNumber(mkt.min)} - {toBengaliNumber(mkt.max)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}