"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Props {
  percent: number; // multiple of 10, from 10 to 100
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

export function PercentGridGame({
  percent,
  color = "#f472b6",
  disabled = false,
  onSelect,
}: Props) {
  const targetRows = Math.round(percent / 10);
  const [filledRows, setFilledRows] = useState(0);
  const [done, setDone] = useState(false);

  function tapRow(rowIdx: number) {
    if (disabled || done) return;
    if (rowIdx !== filledRows) return; // only the next row is active
    playTap();
    const next = filledRows + 1;
    setFilledRows(next);
    if (next === targetRows) {
      setDone(true);
      setTimeout(() => onSelect(percent), 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Colorea <span className="font-bold text-pink-500">{percent}%</span> de la
        cuadrícula (toca fila por fila).
      </p>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-2">
        <div className="flex flex-col gap-0.5">
          {Array.from({ length: 10 }).map((_, r) => {
            const isFilled = r < filledRows;
            const isNext = r === filledRows && !done;
            return (
              <button
                key={r}
                onClick={() => tapRow(r)}
                disabled={disabled || !isNext}
                className={`flex gap-0.5 rounded transition-all duration-150 ${
                  isNext ? "ring-2 ring-pink-300" : ""
                }`}
              >
                {Array.from({ length: 10 }).map((_, c) => (
                  <span
                    key={c}
                    style={{ backgroundColor: isFilled ? color : undefined }}
                    className={`w-5 h-5 rounded-sm ${isFilled ? "" : "bg-slate-100"}`}
                  />
                ))}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 font-fredoka">
        <span className="text-2xl font-bold" style={{ color }}>
          {filledRows * 10}%
        </span>
        <span className="text-slate-400 text-sm">= {filledRows * 10}/100</span>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ {percent}% = {percent}/100
        </p>
      )}
    </div>
  );
}
