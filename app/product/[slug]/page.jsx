'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { toBengaliNumber } from '@/lib/bengali';

export default function ProductDetailPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams?.slug;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
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
            <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-6">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                <div className="h-28 bg-gray-200 rounded-2xl"></div>
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


    let minMarketPrice = product.today;
    let maxMarketPrice = product.today;
    let minMarketName = '';
    let maxMarketName = '';

    if (product.markets && product.markets.length > 0) {
        const mins = product.markets.map((m) => m.min);
        const maxs = product.markets.map((m) => m.max);
        minMarketPrice = Math.min(...mins);
        maxMarketPrice = Math.max(...maxs);

        const minMkt = product.markets.find((m) => m.min === minMarketPrice);
        const maxMkt = product.markets.find((m) => m.max === maxMarketPrice);
        minMarketName = minMkt ? minMkt.market : '';
        maxMarketName = maxMkt ? maxMkt.market : '';
    }

    return (
        <div className="bg-[#f8faf8] min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 space-y-6">

               
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Link href="/" className="hover:text-emerald-700">হোম</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
                        {product.categoryNameBn || product.category}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-semibold">{product.nameBn}</span>
                </div>


                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60 select-none">
                            {product.image || '🛒'}
                        </span>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                                প্রতি {product.unit} - {product.categoryNameBn}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                গতকালকের তুলনায় আজ বেড়েছে: {toBengaliNumber(Math.abs(product.today - product.yesterday))} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 w-full sm:w-auto text-center sm:text-right min-w-45">
                        <span className="text-xs text-emerald-800 font-semibold block mb-0.5">আজকের গড় দাম</span>
                        <div className="text-3xl font-bold text-emerald-800">
                            {toBengaliNumber(product.today)}
                        </div>
                        <span className="text-xs text-gray-500 block font-medium">টাকা / {product.unit}</span>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded bg-white border border-emerald-200">
                            <span className={isUp ? 'text-rose-600' : isDown ? 'text-emerald-700' : 'text-gray-600'}>
                                {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(product.change?.pct)}%
                            </span>
                        </div>
                    </div>
                </div>


                <div>
                    <h2 className="text-base font-bold text-gray-900 mb-3">
                        দামের সারসংক্ষেপ
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <span className="text-xs text-gray-500 font-medium block mb-1">সর্বনিম্ন দাম</span>
                            <div className="text-2xl font-bold text-emerald-700">
                                {toBengaliNumber(minMarketPrice)} টাকা
                            </div>
                            {minMarketName && (
                                <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম: {minMarketName}</span>
                            )}
                        </div>


                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <span className="text-xs text-gray-500 font-medium block mb-1">সর্বোচ্চ দাম</span>
                            <div className="text-2xl font-bold text-rose-600">
                                {toBengaliNumber(maxMarketPrice)} টাকা
                            </div>
                            {maxMarketName && (
                                <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি: {maxMarketName}</span>
                            )}
                        </div>


                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <span className="text-xs text-gray-500 font-medium block mb-1">গড় দাম</span>
                            <div className="text-2xl font-bold text-gray-800">
                                {toBengaliNumber(product.today)} টাকা
                            </div>
                            <span className="text-[11px] text-gray-400 mt-1 block">প্রতি {product.unit}-এর হিসাব</span>
                        </div>
                    </div>
                </div>


                {product.markets && product.markets.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-base font-bold text-gray-900 mb-4">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 bg-gray-50/60">
                                        <th className="p-3">বাজার</th>
                                        <th className="p-3">বিভাগ</th>
                                        <th className="p-3 text-center">সর্বনিম্ন</th>
                                        <th className="p-3 text-center">সর্বোচ্চ</th>
                                        <th className="p-3 text-right">গড়</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {product.markets.map((mkt, idx) => {
                                        const avg = Math.round((mkt.min + mkt.max) / 2);
                                        return (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-3 font-medium text-gray-900">{mkt.market}</td>
                                                <td className="p-3 text-gray-500 text-xs">{mkt.division}</td>
                                                <td className="p-3 text-center text-emerald-700 font-semibold">
                                                    {toBengaliNumber(mkt.min)} টাকা
                                                </td>
                                                <td className="p-3 text-center text-rose-600 font-semibold">
                                                    {toBengaliNumber(mkt.max)} টাকা
                                                </td>
                                                <td className="p-3 text-right font-bold text-gray-800">
                                                    {toBengaliNumber(avg)} টাকা
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}