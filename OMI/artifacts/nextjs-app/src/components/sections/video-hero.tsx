'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '@/i18n/navigation';

export default function VideoHero() {
  const t = useTranslations('hero');
  const shouldReduce = useReducedMotion();
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener('stalled', tryPlay);

    return () => video.removeEventListener('stalled', tryPlay);
  }, []);

  return (
    <section className="relative bg-[#171717] overflow-hidden flex flex-col md:block md:min-h-[100svh]">
      {/* Always-visible dark fallback */}
      <div className="absolute inset-0 bg-[#171717] -z-10" aria-hidden="true" />

      {/* ── MOBILE TOP: badge + headline (above video) ── */}
      <div className="md:hidden px-4 pt-20 pb-4 flex flex-col gap-4">
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-sm self-start">
          {t('badge')}
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
          {t('headline')}
        </h1>
      </div>

      {/* ── VIDEO ──
          Mobile: in document flow, full width, 16:9 aspect ratio
          Desktop: absolute fullscreen background, object-cover */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          className="w-full aspect-video object-contain md:absolute md:inset-0 md:h-full md:aspect-auto md:object-cover md:-z-10"
          aria-hidden="true"
          onError={() => setVideoError(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay — only needed on desktop where video is the fullscreen bg */}
      <div
        className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/40 -z-[5]"
        aria-hidden="true"
      />

      {/* ── MOBILE BOTTOM: subheadline + CTAs (below video) ── */}
      <div className="md:hidden px-4 pt-6 pb-16 flex flex-col gap-6">
        <p className="text-base text-white/80 leading-relaxed">
          {t('subheadline')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/produits"
            className="inline-flex items-center justify-center bg-white text-neutral-900 px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-100 active:bg-neutral-200 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/a-propos"
            className="inline-flex items-center justify-center border border-white/60 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-white/10 active:bg-white/20 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* ── DESKTOP: full overlay with motion animation ── */}
      <div className="hidden md:flex md:absolute md:inset-0 md:z-10 md:items-center md:px-4 md:py-24">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl flex flex-col items-start gap-6"
          >
            {/* Badge */}
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-sm">
              {t('badge')}
            </span>

            {/* Headline */}
            <h1 className="text-5xl lg:text-[5.5rem] font-bold leading-none tracking-tight text-white">
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/produits"
                className="inline-flex items-center justify-center bg-white text-neutral-900 px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-100 active:bg-neutral-200 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center justify-center border border-white/60 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-white/10 active:bg-white/20 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
