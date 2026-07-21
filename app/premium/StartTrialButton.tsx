"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export function StartTrialButton({ trialDays }: { trialDays: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trial/start", { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(
          body?.error === "trial_not_available"
            ? "Tu prueba gratis ya fue usada."
            : "No se pudo iniciar la prueba. Intenta de nuevo.",
        );
        setLoading(false);
        return;
      }
      // Refresca los datos del servidor para reflejar el acceso premium.
      router.refresh();
    } catch {
      setError("No se pudo iniciar la prueba. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={start}
        disabled={loading}
        className="btn-chunky inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4867f5] px-6 py-4 text-center text-sm font-black text-white shadow-[0_5px_0_#2445d8] disabled:opacity-60"
      >
        <Sparkles className="h-5 w-5" aria-hidden />
        {loading
          ? "Activando…"
          : `Comienza tu prueba gratis de ${trialDays} días`}
      </button>
      {error && (
        <p className="text-center text-xs font-bold text-rose-500">{error}</p>
      )}
    </div>
  );
}
