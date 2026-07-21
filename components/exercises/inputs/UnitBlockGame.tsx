"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

const UNIT_EMOJI: Record<string, string> = {
  cm: "📏", m: "📏",
  g: "⚖️", kg: "⚖️",
  mL: "💧", L: "💧",
};

export function UnitBlockGame({
  n,
  sourceLabel,
  targetFactor,
  targetUnit,
  disabled = false,
  onSelect,
}: {
  n: number;
  sourceLabel: string;
  targetFactor: number;
  targetUnit: string;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());

  const total  = tapped.size * targetFactor;
  const answer = n * targetFactor;
  const done   = tapped.size === n;
  const emoji  = UNIT_EMOJI[targetUnit] ?? "📐";

  function tap(idx: number) {
    if (disabled || tapped.has(idx)) return;
    playTap();
    const next = new Set(tapped);
    next.add(idx);
    setTapped(next);
    if (next.size === n) {
      setTimeout(() => onSelect(answer), 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {/* Running total */}
      <div
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <span className="font-fredoka font-bold text-sm text-ink-soft">Total</span>
        </div>
        <span
          className="font-fredoka font-bold text-2xl transition-all duration-300"
          style={{ color: done ? "#34c759" : total > 0 ? "#4867f5" : "#B0A89A" }}
        >
          {total} {targetUnit}
        </span>
      </div>

      {/* Tappable blocks */}
      <div className="flex gap-3 justify-center flex-wrap w-full">
        {Array.from({ length: n }, (_, i) => {
          const counted = tapped.has(i);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || counted}
              onClick={() => tap(i)}
              className="flex flex-col items-center gap-1.5 rounded-2xl px-4 py-3 border-2 active:scale-90 transition-all duration-300 select-none"
              style={{
                background:  counted ? "#EAFAF0" : "linear-gradient(135deg,#4867f5,#2358c8)",
                borderColor: counted ? "#34c759" : "#2358c8",
                boxShadow:   `0 4px 0 ${counted ? "#9FD9B0" : "#1a3d9e"}`,
                minWidth:    n <= 2 ? "110px" : "80px",
                cursor:      counted ? "default" : "pointer",
              }}
            >
              <span className="text-3xl">{counted ? "✅" : emoji}</span>
              <span
                className="font-fredoka font-bold text-base"
                style={{ color: counted ? "#34c759" : "white" }}
              >
                {sourceLabel}
              </span>
              <span
                className="font-fredoka text-xs"
                style={{ color: counted ? "#9FD9B0" : "rgba(255,255,255,0.6)" }}
              >
                = {targetFactor} {targetUnit}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡${answer} ${targetUnit}! 🎉`
          : tapped.size === 0
            ? "Toca cada bloque para contar"
            : `${tapped.size} de ${n} · ${total} ${targetUnit}`}
      </p>
    </div>
  );
}
