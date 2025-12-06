'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export function StoreIntegrationSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          {/* Text Content */}
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">
              {t.storeIntegration.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8">
              {t.storeIntegration.intro}
              <br /><br />
              {t.storeIntegration.intro2}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/store-pp.jpeg"
              alt="Um grocery store at CZU"
              fill
              className="object-cover"
              aria-label="Um grocery store at CZU"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
              {t.storeIntegration.realProducts.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {t.storeIntegration.realProducts.desc}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
              {t.storeIntegration.realPrices.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {t.storeIntegration.realPrices.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

