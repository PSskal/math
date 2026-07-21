"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Group {
  label: string;
  target: number;
  emoji: string;
}

interface Props {
  groups: Group[]; // 2 or 3 groups defining the ratio
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function RatioBuildGame({ groups, disabled = false, onSelect }: Props) {
  const [counts, setCounts] = useState<number[]>(groups.map(() => 0));
  const [done, setDone] = useState(false);

  const ratioLabel = groups.map((g) => g.target).join(" : ");

  function add(i: number) {
    if (disabled || done) return;
    if (counts[i] >= groups[i].target) return;
    playTap();
    const next = [...counts];
    next[i] += 1;
    setCounts(next);
    if (next.every((c, idx) => c === groups[idx].target)) {
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Construye la razón{" "}
        <span className="font-bold text-violet-600">{ratioLabel}</span>. Toca cada
        canasta para llenarla.
      </p>

      <div className="flex gap-3 w-full justify-center">
        {groups.map((g, i) => {
          const filled = counts[i];
          const isComplete = filled === g.target;
          return (
            <button
              key={g.label}
              onClick={() => add(i)}
              disabled={disabled || done}
              className={`flex-1 max-w-[110px] flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all duration-200
                ${isComplete ? "border-green-400 bg-green-50" : "border-slate-200 bg-white hover:border-violet-400"}`}
            >
              <span className="text-xs font-fredoka font-bold text-slate-500">
                {g.label}
              </span>
              <div className="flex flex-wrap justify-center gap-1 min-h-[64px] content-start">
                {Array.from({ length: g.target }).map((_, k) => (
                  <span
                    key={k}
                    className={`text-xl transition-all duration-200 ${
                      k < filled ? "opacity-100 scale-100" : "opacity-20 scale-75"
                    }`}
                  >
                    {g.emoji}
                  </span>
                ))}
              </div>
              <span className="font-fredoka font-bold text-lg text-violet-600">
                {filled} / {g.target}
              </span>
            </button>
          );
        })}
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ ¡Razón {ratioLabel} lista!
        </p>
      )}
    </div>
  );
}
