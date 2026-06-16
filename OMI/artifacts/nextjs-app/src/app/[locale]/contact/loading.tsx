export default function ContactLoading() {
  return (
    <div>
      <section className="bg-[var(--background)] py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse mb-4" />
          <div className="h-10 w-60 bg-neutral-200 rounded-sm animate-pulse" />
          <div className="h-5 w-80 bg-neutral-100 rounded animate-pulse" />
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto flex flex-col gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse" />
              <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
