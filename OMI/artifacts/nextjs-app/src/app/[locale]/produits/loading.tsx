export default function ProduitsLoading() {
  return (
    <div>
      <section className="bg-[#f8f7f5] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-52 bg-neutral-200 rounded animate-pulse mb-3" />
          <div className="h-5 w-80 bg-neutral-100 rounded animate-pulse" />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 w-20 bg-neutral-100 rounded-full animate-pulse" />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-[3/4] bg-neutral-100 rounded-sm animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-neutral-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
