"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Lumi } from "@/components/Lumi";
import { brand } from "@/lib/brand";

export function TrialChoice({ trialDays }: { trialDays: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function continueToSubjects() {
    router.replace("/subjects");
    router.refresh();
  }

  async function activateTrial() {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/trial/start", { method: "POST" });

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        if (body?.error === "trial_not_available") {
          continueToSubjects();
          return;
        }

        setError("No pudimos activar la prueba. Inténtalo nuevamente.");
        setLoading(false);
        return;
      }

      continueToSubjects();
    } catch {
      setError("Revisa tu conexión e inténtalo nuevamente.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-linear-to-b from-sky-soft via-white to-cream px-4 py-8">
      <section className="w-full max-w-lg rounded-3xl border-2 border-white bg-white p-6 text-center shadow-[0_12px_40px_rgba(72,103,245,0.14)] sm:p-9">
        <div className="mx-auto flex w-fit items-end justify-center rounded-full bg-sky-soft p-3 ring-4 ring-white shadow-[0_6px_20px_rgba(72,103,245,0.15)]">
          <Lumi size={92} mood="happy" />
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#4867f5]">
          <Sparkles className="h-4 w-4" aria-hidden />
          Tu cuenta está lista
        </div>

        <h1 className="mt-4 font-fredoka text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Explora todo {brand.appName} por {trialDays} días
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-ink-soft sm:text-base">
          Activa la prueba para abrir todos los cursos y encontrar el nivel que
          mejor acompaña a tu peque.
        </p>

        <div className="mx-auto mt-6 grid max-w-sm gap-3 text-left">
          {[
            "Todos los cursos y lecciones Premium",
            "Sin tarjeta ni pagos automáticos",
            "Puedes continuar gratis cuando termine",
          ].map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-ink"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint-soft text-emerald-600">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              </span>
              {benefit}
            </div>
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-bold text-rose-500">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={activateTrial}
          disabled={loading}
          className="btn-chunky mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4867f5] px-6 py-4 font-fredoka text-lg font-bold text-white shadow-[0_5px_0_#2445d8] disabled:cursor-wait disabled:opacity-60"
        >
          <Sparkles className="h-5 w-5" aria-hidden />
          {loading ? "Activando..." : `Activar ${trialDays} días gratis`}
        </button>

        <button
          type="button"
          onClick={continueToSubjects}
          disabled={loading}
          className="mt-4 w-full rounded-xl px-4 py-3 text-sm font-black text-ink-soft transition hover:bg-slate-50 hover:text-[#4867f5] disabled:opacity-50"
        >
          Continuar con el plan gratuito
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-ink-mute">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          La prueba se activa una sola vez por cuenta
        </div>
      </section>
    </main>
  );
}
