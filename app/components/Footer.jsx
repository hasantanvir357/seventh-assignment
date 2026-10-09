'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-8 text-gray-600 text-sm">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                    <Link href="/" className="flex items-center justify-center sm:justify-start gap-2 text-xl font-bold text-emerald-700 mb-1">
                        <span>🛒</span>
                        <span>বাজার দর</span>
                    </Link>
                    <p className="text-xs text-gray-500">
                        নিত্যপ্রয়োজনীয় পণ্যের সঠিক ও আপডেট বাজার দর জানার বিশ্বস্ত মাধ্যম।
                    </p>
                </div>

                <div className="text-xs text-gray-400">
                    © {year} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
                </div>
            </div>
        </footer>
    );
}