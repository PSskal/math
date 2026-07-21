"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Props {
  rows: number;
  cols: number;
  prompt?: string;
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function AreaGridGame({
  rows,
  cols,
  prompt,
  color = "#a78bfa",
  disabled = false,
  onSelect,
}: Props) {
  const total = rows * cols;
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  function tap(idx: number) {
    if (disabled || done || tapped.has(idx)) return;
    playTap();
    const next = new Set(tapped);
    next.add(idx);
    setTapped(next);
    if (next.size === total) {
      setDone(true);
      setTimeout(() => onSelect(total), 600);
    }
  }

  // Limit cell size so grid fits on screen
  const maxCellPx = Math.min(44, Math.floor(280 / Math.max(cols, rows)));
  const cellPx = Math.max(28, maxCellPx);

  return (
    <div className="flex flex-col items-center gap-3">
      {prompt && (
        <p className="text-center font-fredoka text-slate-700 text-sm px-2">
          {prompt}
        </p>
      )}

      <div className="flex flex-col items-center gap-1 bg-white rounded-2xl p-4 border-2 border-slate-200">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-1">
            {Array.from({ length: cols }).map((_, c) => {
              const idx = r * cols + c;
              const isTapped = tapped.has(idx);
              return (
                <button
                  key={c}
                  onClick={() => tap(idx)}
                  disabled={disabled}
                  style={{
                    width: cellPx,
                    height: cellPx,
                    backgroundColor: isTapped ? color : undefined,
                    borderColor: isTapped ? color : undefined,
                  }}
                  className={`rounded-md border-2 transition-all duration-200 text-xs font-bold leading-none
                    ${
                      isTapped
                        ? "text-white scale-95"
                        : "bg-slate-50 border-slate-300 hover:border-violet-400 hover:bg-violet-50"
                    }`}
                >
                  {isTapped ? "✓" : ""}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 font-fredoka">
        <span className="text-slate-500 text-sm">Cuadrados:</span>
        <span className="text-2xl font-bold" style={{ color }}>
          {tapped.size}
        </span>
        <span className="text-slate-400 text-sm">/ {total}</span>
      </div>
    </div>
  );
}
