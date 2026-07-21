"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

const FEATURE: Record<string, { chip: string; color: string; shadow: string }> = {
  cara:           { chip: "C", color: "#4867f5", shadow: "#1a3d9e" },
  vértice:        { chip: "V", color: "#f97316", shadow: "#c2410c" },
  arista:         { chip: "A", color: "#8b5cf6", shadow: "#6d28d9" },
  "cara circular":{ chip: "C", color: "#0ea5e9", shadow: "#0369a1" },
};

export function ShapeCountGame({
  total,
  feature,
  noun,
  solidEmoji,
  disabled = false,
  onSelect,
}: {
  total:      number;
  feature:    string;
  noun:       string;
  solidEmoji: string;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [done,   setDone]   = useState(false);

  const cfg   = FEATURE[feature] ?? { chip: "?", color: "#4867f5", shadow: "#1a3d9e" };
  const count = tapped.size;
  const chipSz = total <= 6 ? 52 : total <= 9 ? 44 : 38;

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

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {/* Solid emoji */}
      <div className="text-8xl select-none leading-none">{solidEmoji}</div>

      {/* Running count badge */}
      <div
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        <span
          className="font-fredoka font-semibold text-sm capitalize"
          style={{ color: cfg.color }}
        >
          {noun}
        </span>
        <span
          className="font-fredoka font-bold text-2xl transition-all duration-300"
          style={{ color: done ? "#34c759" : count > 0 ? cfg.color : "#B0A89A" }}
        >
          {count} / {total}
        </span>
      </div>

      {/* Tappable chips */}
      <div className="flex gap-2 justify-center flex-wrap w-full">
        {Array.from({ length: total }, (_, i) => {
          const counted = tapped.has(i);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || counted}
              onClick={() => tap(i)}
              className="rounded-xl flex items-center justify-center font-fredoka font-bold border-2 active:scale-90 transition-all duration-200 select-none"
              style={{
                width:       chipSz,
                height:      chipSz,
                fontSize:    chipSz >= 50 ? "1.1rem" : "0.9rem",
                background:  counted ? "#EAFAF0" : `${cfg.color}18`,
                borderColor: counted ? "#34c759" : cfg.color,
                boxShadow:   `0 3px 0 ${counted ? "#9FD9B0" : cfg.shadow}`,
                color:       counted ? "#34c759" : cfg.color,
                cursor:      counted ? "default" : "pointer",
              }}
            >
              {counted ? "✓" : cfg.chip}
            </button>
          );
        })}
      </div>

      {/* Status */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡${total} ${noun}! 🎉`
          : count === 0
          ? `Toca cada ${feature} para contar`
          : `${count} de ${total} · ¡sigue contando!`}
      </p>
    </div>
  );
}
