"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Props {
  values: number[]; // sum must be divisible by length
  labels?: string[];
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const UNIT_PX = 20;

export function AverageLevelGame({
  values,
  labels,
  color = "#34d399",
  disabled = false,
  onSelect,
}: Props) {
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / values.length);

  const [heights, setHeights] = useState<number[]>(values);
  const [done, setDone] = useState(false);

  function tap(i: number) {
    if (disabled || done) return;
    if (heights[i] <= avg) return; // only "givers" (above average) can donate
    // find current lowest bar that is below average
    let minIdx = -1;
    let minVal = Infinity;
    heights.forEach((h, idx) => {
      if (idx !== i && h < minVal) {
        minVal = h;
        minIdx = idx;
      }
    });
    if (minIdx === -1 || heights[minIdx] >= avg) return;
    playTap();
    const next = [...heights];
    next[i] -= 1;
    next[minIdx] += 1;
    setHeights(next);
    if (next.every((h) => h === avg)) {
      setDone(true);
      setTimeout(() => onSelect(avg), 700);
    }
  }

  const maxH = Math.max(...values);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Empareja las torres para hallar el{" "}
        <span className="font-bold text-emerald-600">promedio</span>. Toca las torres
        altas para repartir a las bajas.
      </p>

      <div
        className="relative flex items-end justify-center gap-3 bg-white rounded-2xl border-2 border-slate-200 p-3 w-full"
        style={{ height: `${maxH * UNIT_PX + 40}px` }}
      >
        {/* Average target line */}
        <div
          className="absolute left-2 right-2 border-t-2 border-dashed border-emerald-400 flex items-center"
          style={{ bottom: `${avg * UNIT_PX + 28}px` }}
        >
          <span className="text-[10px] font-bold text-emerald-500 bg-white px-1 -mt-3">
            promedio
          </span>
        </div>

        {heights.map((h, i) => {
          const isGiver = h > avg && !done;
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={disabled || !isGiver}
              className="flex flex-col items-center justify-end gap-1 group"
            >
              <div
                className={`w-10 rounded-t-lg transition-all duration-200 ${
                  isGiver ? "cursor-pointer group-hover:brightness-110" : ""
                }`}
                style={{
                  height: `${h * UNIT_PX}px`,
                  backgroundColor: done ? "#22c55e" : color,
                  boxShadow: isGiver ? "0 0 0 2px rgba(52,211,153,0.5)" : undefined,
                }}
              />
              <span className="text-xs font-fredoka font-bold text-slate-500">
                {h}
              </span>
              {labels && (
                <span className="text-[10px] font-fredoka text-slate-400">
                  {labels[i]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {done ? (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ El promedio es {avg}
        </p>
      ) : (
        <p className="font-fredoka text-slate-400 text-xs">
          Total {sum} ÷ {values.length} torres
        </p>
      )}
    </div>
  );
}
