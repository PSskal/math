"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Props {
  target: number;
  candidates: number[];
  mode: "factor" | "multiple";
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function FactorTapGame({
  target,
  candidates,
  mode,
  disabled = false,
  onSelect,
}: Props) {
  const isCorrect = (n: number) =>
    mode === "factor" ? target % n === 0 : n % target === 0;

  const correctSet = candidates.filter(isCorrect);

  const [found, setFound] = useState<Set<number>>(new Set());
  const [shake, setShake] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function tap(n: number) {
    if (disabled || done || found.has(n)) return;
    if (isCorrect(n)) {
      playTap();
      const next = new Set(found);
      next.add(n);
      setFound(next);
      if (next.size === correctSet.length) {
        setDone(true);
        setTimeout(() => onSelect(1), 700);
      }
    } else {
      playWrong();
      setShake(n);
      setTimeout(() => setShake(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Toca todos los{" "}
        <span className="font-bold text-violet-600">
          {mode === "factor" ? "factores" : "múltiplos"}
        </span>{" "}
        de <span className="font-bold text-violet-600">{target}</span>.
      </p>

      <div className="grid grid-cols-4 gap-2 w-full">
        {candidates.map((n) => {
          const isFound = found.has(n);
          const isShake = shake === n;
          return (
            <button
              key={n}
              onClick={() => tap(n)}
              disabled={disabled || done}
              className={`aspect-square rounded-2xl border-2 font-fredoka font-bold text-lg transition-all duration-200
                ${isFound ? "border-green-400 bg-green-100 text-green-600 scale-95" : "border-slate-200 bg-white text-slate-700 hover:border-violet-400"}
                ${isShake ? "border-red-400 bg-red-50 animate-bounce" : ""}`}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 font-fredoka">
        <span className="text-slate-500 text-sm">Encontrados:</span>
        <span className="text-xl font-bold text-violet-600">{found.size}</span>
        <span className="text-slate-400 text-sm">/ {correctSet.length}</span>
      </div>
    </div>
  );
}
