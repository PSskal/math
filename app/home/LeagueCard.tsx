"use client";

import { Shield } from "lucide-react";

type LeaderboardRow = {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isMe: boolean;
};

type Props = {
  league: string;
  weeklyXp: number;
  myRank: number | null;
  rows: LeaderboardRow[];
};

function formatLeagueName(league: string) {
  const normalized = league.toLowerCase();
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)} League`;
}

export function LeagueCard({ league, weeklyXp, myRank, rows }: Props) {
  return (
    <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_2px_0_rgba(15,23,42,0.06)] md:block">
      <div className="flex items-center gap-4 border-b border-slate-100 p-5">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#fff3d3] text-[#b56a00]">
          <Shield className="h-8 w-8" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-black uppercase tracking-wide text-slate-950">
            {formatLeagueName(league)}
          </div>
          <div className="text-sm font-semibold text-slate-500">
            {weeklyXp} XP esta semana
          </div>
        </div>
        <div className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-black text-[#4867f5]">
          {myRank ? `#${myRank}` : "Nuevo"}
        </div>
      </div>
      <div className="space-y-2 px-5 py-4">
        {rows.length > 0 ? (
          rows.map((row) => (
            <div
              key={`${row.rank}-${row.name}`}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${
                row.isMe ? "bg-[#eef3ff] ring-2 ring-[#b9c6ff]" : "bg-slate-50"
              }`}
            >
              <div
                className={`grid h-8 w-8 place-items-center rounded-full font-fredoka text-sm font-bold ${
                  row.rank <= 3 ? "bg-[#ffd76a] text-slate-950" : "bg-white text-slate-500"
                }`}
              >
                {row.rank}
              </div>
              <div className="text-2xl" aria-hidden>{row.avatar}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-fredoka text-sm font-bold text-slate-950">
                  {row.name}{row.isMe ? " (tú)" : ""}
                </div>
              </div>
              <div className="text-xs font-black text-slate-500">{row.xp} XP</div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-slate-50 px-4 py-6 text-center">
            <div className="text-4xl" aria-hidden>🏁</div>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
              La liga aparece cuando completas tu primera lección.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
