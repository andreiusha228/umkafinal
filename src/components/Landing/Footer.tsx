'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{t.footer.tagline}</p>
        <p className="text-sm text-gray-400">{t.footer.credits}</p>
      </div>
    </footer>
  );
}


