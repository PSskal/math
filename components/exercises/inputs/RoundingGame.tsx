"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Props {
  value: number;
  roundTo: number; // 10, 100 or 1000
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function RoundingGame({ value, roundTo, disabled = false, onSelect }: Props) {
  const lower = Math.floor(value / roundTo) * roundTo;
  const upper = lower + roundTo;
  const nearest = Math.round(value / roundTo) * roundTo;
  const pct = ((value - lower) / roundTo) * 100;

  const [picked, setPicked] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function tap(n: number) {
    if (disabled || done) return;
    if (n === nearest) {
      playTap();
      setPicked(n);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(n);
      setTimeout(() => setShake(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm">
        ¿A qué {roundTo === 10 ? "decena" : roundTo === 100 ? "centena" : "millar"} está
        más cerca <span className="font-bold text-violet-600">{value.toLocaleString("es")}</span>?
      </p>

      {/* Number line */}
      <div className="relative w-full h-16 px-2">
        <div className="absolute left-2 right-2 top-9 h-1 bg-slate-300 rounded" />
        {/* Midpoint tick */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-slate-200" />

        {/* Value marker */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all"
          style={{ left: `calc(${Math.min(96, Math.max(4, pct))}% )` }}
        >
          <span className="text-lg">📍</span>
          <span className="text-xs font-bold text-violet-600 -mt-1">
            {value.toLocaleString("es")}
          </span>
        </div>

        {/* Endpoints */}
        <div className="absolute left-2 top-10 w-2 h-2 rounded-full bg-slate-400" />
        <div className="absolute right-2 top-10 w-2 h-2 rounded-full bg-slate-400" />
      </div>

      {/* Two round-number choices */}
      <div className="flex gap-4">
        {[lower, upper].map((n) => {
          const isPicked = picked === n;
          const isShake = shake === n;
          return (
            <button
              key={n}
              onClick={() => tap(n)}
              disabled={disabled || done}
              className={`px-6 py-3 rounded-2xl border-2 font-fredoka font-bold text-xl transition-all duration-200
                ${isPicked ? "border-green-400 bg-green-50 text-green-600 scale-105" : "border-slate-200 bg-white text-slate-700 hover:border-violet-400"}
                ${isShake ? "border-red-400 bg-red-50 animate-bounce" : ""}`}
            >
              {n.toLocaleString("es")}
            </button>
          );
        })}
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ {value.toLocaleString("es")} ≈ {nearest.toLocaleString("es")}
        </p>
      )}
    </div>
  );
}
