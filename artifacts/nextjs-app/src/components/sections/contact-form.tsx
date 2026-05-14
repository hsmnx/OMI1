'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
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
      <div
        role="alert"
        className="bg-green-50 border border-green-200 text-green-800 rounded-sm p-6 text-sm"
      >
        {t('formSuccess')}
      </div>
    );
  }

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

      <div className="flex flex-col gap-1.5">
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
          className="border border-neutral-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
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
          className="border border-neutral-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
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
          className="border border-neutral-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
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
        className="bg-neutral-900 text-white px-8 py-3 text-sm font-semibold rounded-sm hover:bg-neutral-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'sending' ? t('formSending') : t('formSubmit')}
      </button>
    </form>
  );
}
