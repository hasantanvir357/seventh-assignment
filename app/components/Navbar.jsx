'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { toBengaliNumber } from '@/lib/bengali';

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tickerProducts, setTickerProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formattedDate, setFormattedDate] = useState('');


    useEffect(() => {
        const today = new Date();
        const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
        const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

        const dayName = days[today.getDay()];
        const dateNum = toBengaliNumber(today.getDate());
        const monthName = months[today.getMonth()];
        const yearNum = toBengaliNumber(today.getFullYear());

        setFormattedDate(`${dayName}, ${dateNum} ${monthName}, ${yearNum}`);
    }, []);


    useEffect(() => {
        async function fetchData() {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch('https://api.api-store.workers.dev/api/bazardor/products'),
                    fetch('https://api.api-store.workers.dev/api/bazardor/categories')
                ]);

                if (prodRes.ok) {
                    const prods = await prodRes.json();
                    if (Array.isArray(prods) && prods.length > 0) {
                        setTickerProducts(prods);
                    }
                }

                if (catRes.ok) {
                    const cats = await catRes.json();
                    if (Array.isArray(cats)) {
                        setCategories(cats);
                    }
                }
            } catch (err) {
                console.error('Navbar API fetch error:', err);
            }
        }
        fetchData();
    }, []);


    const handleSignOut = async () => {
        setDropdownOpen(false);
        await signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-2xs">


            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">


                <Link href="/" className="flex items-center gap-2.5 group">
                    <span className="text-2xl p-1.5 bg-emerald-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center w-10 h-10">
                        🛒
                    </span>
                    <div>
                        <div className="text-xl font-bold text-gray-900 leading-tight">বাজার দর</div>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {formattedDate || 'আজকের বাজারের হালচাল'}
                        </p>
                    </div>
                </Link>


                <div className="flex items-center gap-3 relative">
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-colors border border-gray-100"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden">
                                    {session.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="User"
                                            width={32}
                                            height={32}
                                            unoptimized
                                            className="w-full h-full object-cover rounded-full"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        session.user?.name?.charAt(0) || 'U'
                                    )}
                                </div>
                                <span className="text-xs font-semibold text-gray-800 hidden sm:inline">
                                    {session.user?.name}
                                </span>
                                <span className="text-[10px] text-gray-400">▼</span>
                            </button>


                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-xs">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="font-bold text-gray-900">{session.user?.name}</p>
                                        <p className="text-gray-400 truncate text-[11px]">{session.user?.email}</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-emerald-50 text-gray-700 font-medium transition-colors"
                                    >
                                        <span>👤</span> আমার প্রোফাইল
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold border-t border-gray-100 transition-colors"
                                    >
                                        <span>↳</span> সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="text-xs font-semibold border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-3.5 py-1.5 rounded-lg transition-colors"
                            >
                                সাইন ইন
                            </Link>
                            <Link
                                href="/register"
                                className="text-xs font-semibold bg-emerald-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    )}
                </div>

            </div>


            {categories.length > 0 && (
                <div className="border-t border-gray-100 bg-emerald-50/30 overflow-x-auto scrollbar-none">
                    <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id || cat.slug}
                                href={`/category/${cat.slug}`}
                                className="hover:text-emerald-700 transition-colors flex items-center gap-1"
                            >
                                <span>{cat.icon || '📦'}</span>
                                <span>{cat.nameBn || cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}


            {tickerProducts.length > 0 && (
                <div className="bg-gray-50 border-t border-gray-100 overflow-hidden py-2 text-xs text-gray-600">
                    <div className="animate-marquee flex whitespace-nowrap">
                        {tickerProducts.concat(tickerProducts).map((item, i) => {
                            const isUp = item.change?.dir === 'up';
                            const isDown = item.change?.dir === 'down';
                            return (
                                <div key={i} className="inline-flex items-center gap-1.5 px-4 shrink-0">
                                    <span>{item.image || '🛒'}</span>
                                    <span className="font-semibold text-gray-800">{item.nameBn}:</span>
                                    <span className="font-bold">{toBengaliNumber(item.today)} টাকা/{item.unit}</span>
                                    <span className={`text-[10px] font-bold ${isUp ? 'text-rose-600' : isDown ? 'text-emerald-700' : 'text-gray-500'}`}>
                                        {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(item.change?.pct)}%
                                    </span>
                                    <span className="text-gray-300 ml-2">•</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </header>
    );
}