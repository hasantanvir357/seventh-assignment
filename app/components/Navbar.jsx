'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTodayBanglaDate, toBengaliNumber } from '@/lib/bengali';

export default function Navbar() {
    const pathname = usePathname();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch categories and products for marquee ticker
    useEffect(() => {
        async function fetchData() {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch('https://api.api-store.workers.dev/api/bazardor/categories'),
                    fetch('https://api.api-store.workers.dev/api/bazardor/products')
                ]);
                const catData = await catRes.json();
                const prodData = await prodRes.json();
                setCategories(catData);
                setProducts(prodData);
            } catch (err) {
                console.error('Error fetching navbar data:', err);
            }
        }
        fetchData();
    }, []);

    const banglaDate = getTodayBanglaDate();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            {/* Top Main Navbar */}
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">

                {/* Left: Logo & Bangla Date */}
                <Link href="/" className="flex flex-col group">
                    <div className="flex items-center gap-2 text-2xl font-bold text-emerald-700">
                        <span>🛒</span>
                        <span>বাজার দর</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium ml-8">
                        {banglaDate}
                    </span>
                </Link>

                {/* Right: Auth Buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/signin"
                        className="px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-all"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
                    >
                        সাইন আপ
                    </Link>
                </div>
            </div>

            {/* Navigation Row: Categories */}
            <div className="border-t border-gray-100 bg-emerald-50/50">
                <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
                    <Link
                        href="/"
                        className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium ${pathname === '/'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-emerald-100/60'
                            }`}
                    >
                        🏠 সব পণ্য
                    </Link>
                    {categories.map((cat) => {
                        const href = `/category/${cat.slug}`;
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={cat.id}
                                href={href}
                                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-medium flex items-center gap-1.5 ${isActive
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-emerald-100/60'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameBn}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Marquee Ticker */}
            {products.length > 0 && (
                <div className="bg-gray-900 text-white py-2 text-xs overflow-hidden relative border-t border-gray-800">
                    <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .scroll-marquee {
              display: inline-flex;
              animation: marquee 50s linear infinite;
            }
            .scroll-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

                    <div className="scroll-marquee whitespace-nowrap flex items-center gap-8">
                        {products.concat(products).map((prod, idx) => {
                            const isUp = prod.change?.dir === 'up';
                            const isDown = prod.change?.dir === 'down';
                            return (
                                <div key={idx} className="inline-flex items-center gap-2 font-medium">
                                    <span>{prod.image || '🛒'}</span>
                                    <span className="text-gray-200">{prod.nameBn}</span>
                                    <span className="text-amber-400">
                                        {toBengaliNumber(prod.today)} টাকা/{prod.unit}
                                    </span>
                                    <span
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isUp
                                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                                : isDown
                                                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                                    : 'bg-gray-800 text-gray-300'
                                            }`}
                                    >
                                        {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                                        {toBengaliNumber(prod.change?.pct)}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}