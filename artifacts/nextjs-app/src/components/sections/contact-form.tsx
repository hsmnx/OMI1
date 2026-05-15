'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
  const shouldReduce = useReducedMotion();
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '', honeypot: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        role="alert"
        className="bg-green-50 border border-green-200 text-green-800 rounded-sm p-6 text-sm flex items-start gap-3"
      >
        <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>{t('formSuccess')}</span>
      </motion.div>
    );
  }

  const inputClass = "border border-neutral-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent hover:border-neutral-400 transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-neutral-900">{t('formTitle')}</h2>

      {/* Honeypot */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-neutral-700">
          {t('formName')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={t('formNamePlaceholder')}
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">
          {t('formEmail')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t('formEmailPlaceholder')}
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700">
          {t('formMessage')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('formMessagePlaceholder')}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === 'error' && (
        <p role="alert" className="text-red-600 text-sm">
          {t('formError')}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {state === 'sending' ? (
          <>
            <svg
              className="animate-spin h-4 w-4 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('formSending')}
          </>
        ) : (
          t('formSubmit')
        )}
      </button>
    </form>
  );
}
