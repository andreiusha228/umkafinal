'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      title: t.features.feature1.title,
      desc: t.features.feature1.desc,
    },
    {
      title: t.features.feature2.title,
      desc: t.features.feature2.desc,
    },
    {
      title: t.features.feature3.title,
      desc: t.features.feature3.desc,
    },
    {
      title: t.features.feature4.title,
      desc: t.features.feature4.desc,
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="text-center text-2xl md:text-4xl font-semibold text-gray-900 mb-12">{t.features.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((f, idx) => (
            <div key={f.title} className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm animate-fade-in" style={{ animationDelay: `${100 * (idx + 1)}ms` }}>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


