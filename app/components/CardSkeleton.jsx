'use client';

import React from 'react';

export default function CardSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <div className="space-y-1">
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                            <div className="h-5 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}