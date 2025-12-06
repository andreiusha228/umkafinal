'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cs' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white hover:shadow-md transition-all text-sm font-medium text-gray-700 hover:text-gray-900"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{language === 'en' ? 'EN' : 'CS'}</span>
    </button>
  );
}

