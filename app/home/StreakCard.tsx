"use client";

import { Heart, Zap } from "lucide-react";

type Props = {
  childName: string;
  streak: number;
  xp: number;
  gems: number;
  hearts: number;
  activeDaysThisWeek: number;
};

const weekDays = ["L", "M", "X", "J", "V"];

export function StreakCard({ childName, streak, xp, gems, hearts, activeDaysThisWeek }: Props) {
  return (
    <section className="hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_2px_0_rgba(15,23,42,0.06)] md:block">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-fredoka text-5xl font-bold text-slate-950">
              {streak}
            </div>
            <Zap className="h-8 w-8 text-slate-200" aria-hidden />
          </div>
          <p className="mt-3 text-lg font-semibold text-slate-800">
            {streak > 0
              ? `${childName} mantiene su racha`
              : "Resuelve 3 problemas para iniciar una racha"}
          </p>
          <div className="mt-2 flex gap-3 text-xs font-black text-slate-400">
            <span>⭐ {xp} XP</span>
            <span>💎 {gems}</span>
          </div>
        </div>
        <div className="flex gap-1 text-slate-200">
          {Array.from({ length: Math.max(1, Math.min(5, hearts)) }).map((_, i) => (
            <Heart key={i} className="h-5 w-5" aria-hidden />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-3">
        {weekDays.map((day, index) => {
          const active = index < activeDaysThisWeek;
          return (
            <div key={day} className="text-center">
              <div
                className={`mx-auto grid h-12 w-12 place-items-center rounded-full border-2 ${
                  active
                    ? "border-[#4867f5] bg-[#eef3ff] text-[#4867f5]"
                    : "border-slate-100 bg-white text-slate-200"
                }`}
              >
                <Zap className="h-5 w-5" aria-hidden />
              </div>
              <div className="mt-2 text-xs font-black text-slate-600">{day}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
