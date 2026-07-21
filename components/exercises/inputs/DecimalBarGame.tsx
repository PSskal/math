"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Props {
  tenths: number; // target number of tenths to shade (1-10)
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function DecimalBarGame({
  tenths,
  color = "#a78bfa",
  disabled = false,
  onSelect,
}: Props) {
  const [filled, setFilled] = useState(0);
  const [done, setDone] = useState(false);

  const decimalStr = (tenths / 10).toFixed(1);

  function tap(idx: number) {
    if (disabled || done) return;
    // Fill sequentially: allow tapping the next empty segment
    if (idx !== filled) return;
    playTap();
    const next = filled + 1;
    setFilled(next);
    if (next === tenths) {
      setDone(true);
      setTimeout(() => onSelect(tenths), 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm">
        Colorea <span className="font-bold text-violet-600">{decimalStr}</span> de la barra
        (toca los cuadros).
      </p>

      {/* Bar of 10 tenths */}
      <div className="flex w-full gap-0.5 bg-white rounded-xl border-2 border-slate-200 p-1">
        {Array.from({ length: 10 }).map((_, i) => {
          const isFilled = i < filled;
          const isNext = i === filled && !done;
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={disabled || done}
              style={{ backgroundColor: isFilled ? color : undefined }}
              className={`flex-1 h-14 rounded-md transition-all duration-200
                ${isFilled ? "" : "bg-slate-50"}
                ${isNext ? "ring-2 ring-violet-300 ring-inset" : ""}`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3 font-fredoka">
        <span className="text-2xl font-bold" style={{ color }}>
          {(filled / 10).toFixed(1)}
        </span>
        <span className="text-slate-400 text-sm">= {filled}/10</span>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ {decimalStr} = {tenths}/10
        </p>
      )}
    </div>
  );
}
