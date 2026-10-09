import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
            <span className="text-8xl mb-4 select-none">🧺</span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">৪-০-৪</h1>
            <h2 className="text-xl font-bold text-gray-800 mb-2">পেজটি পাওয়া যায়নি</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
                আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা নাম পরিবর্তন করা হয়েছে।
            </p>
            <Link
                href="/"
                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}