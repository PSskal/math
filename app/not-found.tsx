import Link from "next/link";
import { brand } from "@/lib/brand";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <img
        src={brand.assets.mascotSad}
        alt={brand.mascotName}
        className="h-40 w-40 object-contain animate-bob"
      />
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
          Error 404
        </p>
        <h1 className="mt-2 font-fredoka text-4xl font-bold text-ink">
          ¡Ups! Esta página no existe.
        </h1>
        <p className="mt-3 max-w-sm text-lg font-bold text-ink-soft">
          Parece que te perdiste en la aventura. Volvamos al mapa.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/home"
          className="btn-chunky inline-flex items-center justify-center rounded-2xl bg-sky px-7 py-3.5 font-black text-white shadow-[0_5px_0_#2445d8] transition-transform hover:-translate-y-0.5"
        >
          Ir al mapa 🗺️
        </Link>
        <Link
          href="/"
          className="btn-chunky inline-flex items-center justify-center rounded-2xl border-2 border-sky-soft bg-white px-7 py-3.5 font-black text-ink shadow-[0_5px_0_rgba(72,103,245,0.12)] transition-transform hover:-translate-y-0.5"
        >
          Inicio
        </Link>
      </div>
    </main>
  );
}
