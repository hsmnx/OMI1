'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[var(--background)]">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        <div className="text-6xl font-light text-neutral-300">!</div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Une erreur est survenue
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Quelque chose s&apos;est mal passé. Veuillez réessayer ou revenir à l&apos;accueil.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-neutral-900 text-white px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-neutral-800 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-neutral-300 text-neutral-700 px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-neutral-100 active:scale-[0.98] transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
