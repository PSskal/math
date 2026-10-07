"use client";

import Link from "next/link";
import { Crown } from "lucide-react";

type Props = {
  isPremium: boolean;
  premiumStatus: "free" | "active" | "expiring_soon" | "expired";
  premiumUntilLabel: string | null;
};

export function PremiumBanner({ isPremium, premiumStatus, premiumUntilLabel }: Props) {
  return (
    <Link
      href="/premium"
      className={`block overflow-hidden rounded-2xl border border-slate-200 p-3 shadow-[0_2px_0_rgba(15,23,42,0.06)] md:rounded-3xl md:p-5 ${
        isPremium
          ? "bg-[#f7fff9]"
          : "bg-linear-to-br from-[#f0ecff] via-[#ffe5f2] to-[#fff5c7]"
      }`}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/80 text-[#4867f5] shadow-sm md:h-16 md:w-16 md:rounded-2xl">
          <Crown className="h-6 w-6 md:h-9 md:w-9" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="font-fredoka text-sm font-bold text-slate-950 md:text-lg">
            {isPremium
              ? "Premium activo"
              : premiumStatus === "expired"
                ? "Premium vencido"
                : "Desbloquea todo con Premium"}
          </div>
          <div className="line-clamp-1 text-xs font-semibold text-slate-700 md:line-clamp-none md:text-sm md:leading-6">
            {isPremium
              ? premiumUntilLabel
                ? `Acceso hasta ${premiumUntilLabel}.`
                : "Tu cuenta ya tiene acceso a cursos premium."
              : premiumStatus === "expired"
                ? "Renueva para volver a entrar a cursos premium."
                : "Más cursos, repasos y retos para avanzar mejor."}
          </div>
        </div>
      </div>
      {!isPremium && (
        <div className="mt-3 rounded-full bg-linear-to-r from-[#8f7cf7] via-[#f276c8] to-[#ffc247] px-4 py-2 text-center text-xs font-black text-slate-950 shadow-[0_4px_0_rgba(86,54,7,0.25)] md:mt-5 md:px-5 md:py-3 md:text-sm md:shadow-[0_5px_0_rgba(86,54,7,0.25)]">
          Explorar Premium
        </div>
      )}
    </Link>
  );
}
