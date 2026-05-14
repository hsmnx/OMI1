'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

const items = [
  { ordinal: '01', titleKey: 'item1Title', bodyKey: 'item1Body' },
  { ordinal: '02', titleKey: 'item2Title', bodyKey: 'item2Body' },
  { ordinal: '03', titleKey: 'item3Title', bodyKey: 'item3Body' },
] as const;

export default function WhyOMI() {
  const t = useTranslations('whyOmi');

  return (
    <section className="py-24 px-4 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-3">
            {t('sectionTitle')}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">{t('sectionSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {items.map(({ ordinal, titleKey, bodyKey }, index) => (
            <motion.div
              key={ordinal}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <span className="text-6xl font-light text-neutral-300 leading-none">
                {ordinal}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900">
                {t(titleKey)}
              </h3>
              <p className="text-neutral-500 leading-relaxed">{t(bodyKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
