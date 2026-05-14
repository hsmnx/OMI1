import { Link } from '@/i18n/navigation';

const ICONS: Record<string, string> = {
  'detergent': '🧺',
  'lave-main': '🧴',
  'javel': '🧹',
  'savon': '🧼',
  'vitres': '🪟',
  'surface': '✨',
  'vaisselle': '🍽️',
};

interface CategoryCardProps {
  categoryId: string;
  name: string;
  countLabel: string;
  href: string;
}

export default function CategoryCard({ categoryId, name, countLabel, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
      aria-label={`${name} — ${countLabel}`}
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-sm border border-neutral-100 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] group-active:scale-[0.98] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {/* 3D icon container */}
        <div
          className="w-16 h-16 flex items-center justify-center rounded-sm bg-[#f8f7f5] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          aria-hidden="true"
          style={{ perspective: '300px' }}
        >
          <span
            className="text-3xl leading-none select-none"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              transform: 'rotateX(5deg)',
              display: 'block',
            }}
          >
            {ICONS[categoryId] ?? '🧽'}
          </span>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-neutral-900 leading-snug">{name}</p>
          <p className="text-xs text-neutral-400 mt-1">{countLabel}</p>
        </div>
      </div>
    </Link>
  );
}
