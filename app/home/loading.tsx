function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-slate-100 ${className}`} />
  );
}

export default function HomeLoading() {
  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-7 px-4 py-6 md:grid-cols-[390px_minmax(0,1fr)] md:px-8 md:py-10">
        {/* Sidebar skeleton */}
        <aside className="order-2 space-y-5 md:order-1">
          <div className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_2px_0_rgba(15,23,42,0.06)] md:block">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-full" />
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-3 w-4" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-24 rounded-2xl md:rounded-3xl" />
          <Skeleton className="hidden h-56 rounded-3xl md:block" />
        </aside>

        {/* Course card skeleton */}
        <section className="order-1 md:order-2">
          <div className="flex min-h-[500px] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_2px_0_rgba(15,23,42,0.06)] md:min-h-[620px] md:p-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2 text-center">
                <Skeleton className="mx-auto h-5 w-24 rounded-full" />
                <Skeleton className="mx-auto h-9 w-64" />
              </div>
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>

            <Skeleton className="mx-auto mt-8 h-28 w-36 rounded-[2rem]" />

            <div className="mx-auto mt-6 w-full max-w-sm space-y-2">
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="mx-auto h-3 w-40" />
            </div>

            <div className="mt-8 space-y-3">
              <Skeleton className="mx-auto h-4 w-32" />
              <Skeleton className="h-14 w-full rounded-2xl" />
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>

            <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-[1fr_auto]">
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 w-32 rounded-2xl" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
