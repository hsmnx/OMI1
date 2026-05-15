export default function AProposLoading() {
  return (
    <div>
      {/* Dark hero skeleton */}
      <section className="bg-neutral-900 py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse mb-6" />
          <div className="h-12 w-80 bg-white/20 rounded-sm animate-pulse" />
          <div className="h-5 w-full max-w-2xl bg-white/10 rounded animate-pulse" />
          <div className="h-5 w-4/5 max-w-2xl bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="bg-white border-b border-neutral-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-10 w-16 bg-neutral-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-neutral-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Image + story skeleton */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] bg-neutral-100 rounded-sm animate-pulse" />
          <div className="flex flex-col gap-6">
            <div className="h-7 w-56 bg-neutral-200 rounded-sm animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-neutral-100 rounded animate-pulse" />
            </div>
            <div className="h-7 w-48 bg-neutral-200 rounded-sm animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission skeleton */}
      <section className="py-16 px-4 bg-[#f8f7f5]">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="h-7 w-full max-w-lg bg-neutral-200 rounded animate-pulse" />
          <div className="h-11 w-40 bg-neutral-200 rounded-sm animate-pulse" />
        </div>
      </section>
    </div>
  );
}
