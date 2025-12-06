'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t.howItWorks.step1.title,
      desc: t.howItWorks.step1.desc,
      icon: '🧑‍🍳',
    },
    {
      title: t.howItWorks.step2.title,
      desc: t.howItWorks.step2.desc,
      icon: '🧩',
    },
    {
      title: t.howItWorks.step3.title,
      desc: t.howItWorks.step3.desc,
      icon: '💸',
    },
    {
      title: t.howItWorks.step4.title,
      desc: t.howItWorks.step4.desc,
      icon: '🛒',
    },
  ];

  return (
    <section id="how" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="text-center text-2xl md:text-4xl font-semibold text-gray-900 mb-12">{t.howItWorks.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((s, idx) => (
            <div key={s.title} className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm animate-fade-in" style={{ animationDelay: `${100 * (idx + 1)}ms` }}>
              <div className="flex items-center justify-center text-3xl md:text-4xl mb-4" aria-hidden>{s.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


