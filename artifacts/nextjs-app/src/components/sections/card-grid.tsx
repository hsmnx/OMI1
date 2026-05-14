'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const icons = ['🌐', '🧩', '✨', '🔒'] as const;
const keys = ['item1', 'item2', 'item3', 'item4'] as const;

export default function CardGrid() {
  const t = useTranslations('cards');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {keys.map((key, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-2xl mb-3" aria-hidden="true">
            {icons[i]}
          </div>
          <h3 className="font-semibold text-slate-900 mb-1 text-sm">
            {t(`${key}.title`)}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t(`${key}.description`)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
