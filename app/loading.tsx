export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-sky-soft border-t-sky" />
        <p className="font-fredoka text-lg font-bold text-ink-soft">Cargando…</p>
      </div>
    </div>
  );
}
