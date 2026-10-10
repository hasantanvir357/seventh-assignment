'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut, authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [name, setName] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [updating, setUpdating] = useState(false);


    useEffect(() => {
        if (!isPending && !session) {
            router.push('/login');
        } else if (session?.user?.name && !isInitialized) {
            setName(session.user.name);
            setIsInitialized(true);
        }
    }, [session, isPending, router, isInitialized]);

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
        router.refresh();
    };

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('নাম ফাঁকা রাখা যাবে না!');
            return;
        }

        setUpdating(true);
        try {
            const res = await authClient.updateUser({
                name: name.trim(),
            });

            if (res?.error) {
                toast.error(res.error.message || 'নাম আপডেট করা সম্ভব হয়নি');
            } else {
                toast.success('নাম সফলভাবে পরিবর্তন করা হয়েছে!');
                router.refresh();
            }
        } catch (err) {
            toast.error('কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন');
        } finally {
            setUpdating(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-semibold text-emerald-800">প্রোফাইল লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f8faf8] min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-6">


                <div>
                    <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-xs text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>


                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white text-xl font-bold flex items-center justify-center overflow-hidden border border-emerald-100 shadow-xs">
                            {session.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="User"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    unoptimized
                                />
                            ) : (
                                session.user?.name?.charAt(0) || 'U'
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{session.user?.name}</h2>
                            <p className="text-xs text-gray-500 font-medium">{session.user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                        <span>↳</span> সাইন আউট
                    </button>
                </div>

                {/* Update Form Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">তথ্য</h3>

                    <form onSubmit={handleUpdateName} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                নাম
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors disabled:opacity-50 shadow-xs"
                        >
                            {updating ? 'আপডেট হচ্ছে...' : 'আপডেট'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}