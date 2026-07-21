"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Props {
  rows: number;
  cols: number; // must be even; axis is vertical at cols/2
  leftCells: [number, number][]; // filled cells on the left half [row, col]
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

function keyOf(r: number, c: number) {
  return `${r},${c}`;
}

export function SymmetryGridGame({
  rows,
  cols,
  leftCells,
  color = "#60a5fa",
  disabled = false,
  onSelect,
}: Props) {
  const mid = cols / 2;

  // Given (pre-filled) left cells
  const given = new Set(leftCells.map(([r, c]) => keyOf(r, c)));
  // Mirror targets on the right half
  const targets = new Set(leftCells.map(([r, c]) => keyOf(r, cols - 1 - c)));

  const [filled, setFilled] = useState<Set<string>>(new Set());
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function tap(r: number, c: number) {
    if (disabled || done) return;
    if (c < mid) return; // only the right half is interactive
    const k = keyOf(r, c);
    if (filled.has(k)) return;
    if (targets.has(k)) {
      playTap();
      const next = new Set(filled);
      next.add(k);
      setFilled(next);
      if (next.size === targets.size) {
        setDone(true);
        setTimeout(() => onSelect(1), 700);
      }
    } else {
      playWrong();
      setShake(k);
      setTimeout(() => setShake(null), 500);
    }
  }

  const cellPx = Math.max(26, Math.min(40, Math.floor(300 / cols)));

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Completa el reflejo. Toca los cuadros del lado derecho para que la figura
        sea simétrica.
      </p>

      <div className="relative bg-white rounded-2xl border-2 border-slate-200 p-3">
        {/* Symmetry axis */}
        <div
          className="absolute top-3 bottom-3 border-l-2 border-dashed border-violet-400 z-10"
          style={{ left: `calc(0.75rem + ${mid * (cellPx + 4)}px)` }}
        />
        <div className="flex flex-col gap-1">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex gap-1">
              {Array.from({ length: cols }).map((_, c) => {
                const k = keyOf(r, c);
                const isGiven = given.has(k);
                const isFilled = filled.has(k);
                const isShake = shake === k;
                const isLeft = c < mid;
                const shaded = isGiven || isFilled;
                return (
                  <button
                    key={c}
                    onClick={() => tap(r, c)}
                    disabled={disabled || isLeft}
                    style={{
                      width: cellPx,
                      height: cellPx,
                      backgroundColor: shaded ? color : undefined,
                    }}
                    className={`rounded-md border transition-all duration-150
                      ${shaded ? "border-transparent" : "bg-slate-50 border-slate-200"}
                      ${!isLeft && !shaded ? "hover:bg-violet-50 hover:border-violet-300" : ""}
                      ${isShake ? "bg-red-200 border-red-400 animate-bounce" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ ¡Figura simétrica!
        </p>
      )}
    </div>
  );
}
