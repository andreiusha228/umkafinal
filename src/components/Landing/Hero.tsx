'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden w-full min-h-screen flex items-center justify-center bg-white">
      <LanguageSwitcher />
      <div className="mx-auto max-w-6xl px-6 w-full">
        <div className="text-center">
          <p className="text-sm md:text-base tracking-wide text-gray-500 mb-4 animate-fade-in">{t.hero.tagline}</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 animate-fade-in [animation-delay:100ms]">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in [animation-delay:300ms]">
            <Link
              href="/chat"
              className="rounded-full bg-black text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium shadow-sm hover:bg-gray-900 transition"
            >
              {t.hero.startButton}
            </Link>
            <a
              href="#how"
              className="rounded-full border border-gray-300 text-gray-900 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium hover:bg-gray-50 transition"
            >
              {t.hero.howItWorksButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


