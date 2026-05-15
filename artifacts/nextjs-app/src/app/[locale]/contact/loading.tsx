export default function ContactLoading() {
  return (
    <div>
      <section className="bg-[#f8f7f5] py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="h-10 w-60 bg-neutral-200 rounded-sm animate-pulse" />
          <div className="h-5 w-80 bg-neutral-100 rounded animate-pulse" />
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse" />
                <div className="h-6 w-44 bg-neutral-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div className="h-7 w-48 bg-neutral-200 rounded-sm animate-pulse" />
            <div className="h-12 w-full bg-neutral-100 rounded-sm animate-pulse" />
            <div className="h-12 w-full bg-neutral-100 rounded-sm animate-pulse" />
            <div className="h-32 w-full bg-neutral-100 rounded-sm animate-pulse" />
            <div className="h-12 w-36 bg-neutral-200 rounded-sm animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
