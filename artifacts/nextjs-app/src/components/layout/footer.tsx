import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <span>Foundation &copy; {year}</span>
        <span>{t('rights')}</span>
      </div>
    </footer>
  );
}
