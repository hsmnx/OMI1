'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

export default function MarqueeBanner() {
  const t = useTranslations('hero');
  const shouldReduce = useReducedMotion();

  const items = [
    t('marquee1'),
    t('marquee2'),
    t('marquee3'),
    t('marquee4'),
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-neutral-900 text-white py-3 overflow-hidden select-none">
      <div className="relative flex">
        <motion.div
          className="flex shrink-0 gap-8 items-center"
          animate={shouldReduce ? {} : { x: [0, '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-medium tracking-widest uppercase">
              {item}
              <span className="text-neutral-500" aria-hidden="true">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
