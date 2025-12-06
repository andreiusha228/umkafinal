'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function StartCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-14 text-center shadow-sm animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{t.cta.title} 🐻</h3>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="mt-8">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-4 text-lg font-medium shadow-sm hover:bg-gray-900 transition"
            >
              {t.cta.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


