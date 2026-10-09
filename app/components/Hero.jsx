'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero() {
    const handleScrollToProducts = (e) => {
        e.preventDefault();
        const section = document.getElementById('সব-পণ্য');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-emerald-50/60 py-8 md:py-12 border-b border-emerald-100/60">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">


                <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold mb-3">
                        নিত্যপ্রয়োজনীয় পণ্যের সঠিক তথ্য
                    </span>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        আজকের বাজারের দাম <br className="hidden sm:block" />
                        <span className="text-emerald-700">এক নজরে দেখুন</span>
                    </h1>

                    <p className="text-gray-600 text-sm md:text-base mb-6 max-w-lg mx-auto md:mx-0">
                        চাল, ডাল, তেল, সবজি, মাছ ও মসলা সহ নিত্যপ্রয়োজনীয় পণ্যের বাজারভিত্তিক বিস্তারিত তথ্য।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        onClick={handleScrollToProducts}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium text-sm md:text-base rounded-xl hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-200"
                    >
                        <span>সব পণ্য দেখুন</span>
                        <span>↓</span>
                    </a>
                </div>


                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center p-2">
                        <Image
                            src="/bazar-hero.png"
                            alt="বাজার দর হিরো ব্যানার"
                            width={350}
                            height={350}
                            className="object-contain drop-shadow-md"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}