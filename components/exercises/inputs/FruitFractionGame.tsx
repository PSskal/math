"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

export function FruitFractionGame({
  total,
  target,
  targetIcon = "🍎",
  otherIcon  = "🟡",
  disabled   = false,
  onSelect,
}: {
  total:       number;
  target:      number;
  targetIcon?: string;
  otherIcon?:  string;
  disabled?:   boolean;
  onSelect:    (v: number) => void;
}) {
  const [num,  setNum]  = useState(0);
  const [done, setDone] = useState(false);

  function adjust(delta: number) {
    if (disabled || done) return;
    playTap();
    const next = Math.max(0, Math.min(total, num + delta));
    setNum(next);
    if (next === target) {
      setDone(true);
      setTimeout(() => onSelect(target), 600);
    }
  }
  const cols = Math.min(total, 5);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {/* Fruit grid */}
      <div className="bg-white rounded-3xl p-4 w-full" style={{ boxShadow: "0 6px 0 #F0E2C8" }}>
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-2xl"
              style={{ background: i < target ? "#FFF0D0" : "#F0ECE5" }}
            >
              {i < target ? targetIcon : otherIcon}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center font-fredoka font-bold text-sm text-ink-soft">
          ¿Cuántos {targetIcon} hay de {total} frutas?
        </p>
      </div>

      {/* Numerator spinner */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          disabled={disabled || num === 0}
          onClick={() => adjust(-1)}
          className="w-12 h-12 rounded-2xl bg-cream font-fredoka font-bold text-2xl text-ink active:scale-95 transition-transform disabled:opacity-30"
          style={{ boxShadow: "0 3px 0 #E0D8CC" }}
        >
          −
        </button>

        {/* Fraction display */}
        <div className="flex flex-col items-center font-fredoka font-bold leading-tight">
          <span
            className="text-4xl transition-all"
            style={{ color: done ? "#34c759" : "#4867f5" }}
          >
            {num}
          </span>
          <div className="w-10 h-0.5 bg-ink/30 my-1" />
          <span className="text-4xl text-ink">{total}</span>
        </div>

        <button
          type="button"
          disabled={disabled || num === total}
          onClick={() => adjust(1)}
          className="w-12 h-12 rounded-2xl bg-cream font-fredoka font-bold text-2xl text-ink active:scale-95 transition-transform disabled:opacity-30"
          style={{ boxShadow: "0 3px 0 #E0D8CC" }}
        >
          +
        </button>
      </div>

      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡Correcto! ${num}/${total} 🎉`
          : `Ajusta el numerador`}
      </p>
    </div>
  );
}
