'use client';

import React from 'react';
import Link from 'next/link';
import { toBengaliNumber } from '@/lib/bengali';

export default function ProductCard({ product }) {
    if (!product) return null;

    const isUp = product.change?.dir === 'up';
    const isDown = product.change?.dir === 'down';

    return (
        <Link href={`/product/${product.slug || product.id}`}>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer flex flex-col justify-between h-full group">


                <div>
                    <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl p-2 bg-emerald-50/60 rounded-lg group-hover:scale-105 transition-transform">
                            {product.image || '🛒'}
                        </span>
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                {product.nameBn}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                                প্রতি {product.unit}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <span className="text-[11px] text-gray-400 block font-medium">আজকের দাম</span>
                        <span className="text-lg font-bold text-gray-900">
                            {toBengaliNumber(product.today)} টাকা
                        </span>
                    </div>


                    <div
                        className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${isUp
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : isDown
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : 'bg-gray-50 text-gray-600 border border-gray-100'
                            }`}
                    >
                        <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                        <span>{toBengaliNumber(product.change?.pct)}%</span>
                    </div>
                </div>

            </div>
        </Link>
    );
}