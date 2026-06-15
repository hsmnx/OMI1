import { Link } from '@/i18n/navigation';

interface CategoryCardProps {
  categoryId: string;
  name: string;
  countLabel: string;
  href: string;
}

export default function CategoryCard({ name, countLabel, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
      aria-label={`${name} — ${countLabel}`}
    >
      <div className="min-h-[80px] flex items-center justify-between gap-4 px-5 py-4 bg-white rounded-sm border border-neutral-200 transition-all duration-200 group-hover:bg-neutral-900 group-hover:border-neutral-900 group-active:scale-[0.98] motion-reduce:transition-none">
        <div>
          <p className="text-base font-semibold text-neutral-900 group-hover:text-white transition-colors duration-200">{name}</p>
          <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200 mt-0.5">{countLabel}</p>
        </div>
        <svg
          className="w-4 h-4 shrink-0 text-neutral-400 group-hover:text-white transition-all duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
