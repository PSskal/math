"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

type Row = { label: string; count: number };

export function PictogramReadGame({
  symbol,
  scale,
  scaleUnit,
  rows,
  targetLabel,
  answer,
  disabled = false,
  onSelect,
}: {
  symbol:      string;
  scale:       number;
  scaleUnit:   string;
  rows:        Row[];
  targetLabel: string;
  answer:      number;
  disabled?:   boolean;
  onSelect:    (v: number) => void;
}) {
  const [tapped, setTapped] = useState<Set<string>>(new Set());
  const [done,   setDone]   = useState(false);

  const targetRow   = rows.find((r) => r.label === targetLabel)!;
  const tappedCount = [...tapped].filter((k) => k.startsWith(targetLabel + "-")).length;
  const running     = tappedCount * scale;

  function tap(rowLabel: string, idx: number) {
    if (disabled || done || rowLabel !== targetLabel) return;
    const key = `${rowLabel}-${idx}`;
    if (tapped.has(key)) return;
    playTap();
    const next = new Set(tapped);
    next.add(key);
    setTapped(next);
    const newCount = [...next].filter((k) => k.startsWith(targetLabel + "-")).length;
    if (newCount === targetRow.count) {
      setDone(true);
      setTimeout(() => onSelect(answer), 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {/* Scale badge */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white font-fredoka font-bold text-sm"
        style={{ boxShadow: "0 3px 0 #E0D8CC" }}
      >
        <span className="text-2xl">{symbol}</span>
        <span className="text-ink-soft">=</span>
        <span style={{ color: "#4867f5" }}>{scale} {scaleUnit}</span>
      </div>

      {/* Pictogram table */}
      <div
        className="w-full rounded-2xl bg-white overflow-hidden"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        {rows.map((row, ri) => {
          const isTarget = row.label === targetLabel;
          return (
            <div
              key={ri}
              className="flex items-center gap-2 px-3 py-3 border-b last:border-b-0"
              style={{ borderColor: "#f1f5f9", background: isTarget ? "#eff6ff" : "white" }}
            >
              {/* Category label */}
              <span
                className="font-fredoka font-semibold text-sm shrink-0"
                style={{ width: 72, color: isTarget ? "#4867f5" : "#94a3b8" }}
              >
                {row.label}
              </span>

              {/* Symbols */}
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: row.count }, (_, i) => {
                  const key      = `${row.label}-${i}`;
                  const isTapped = tapped.has(key);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabled || !isTarget || isTapped || done}
                      onClick={() => tap(row.label, i)}
                      className="text-2xl leading-none transition-all duration-200 select-none active:scale-90"
                      style={{
                        opacity: isTarget ? 1 : 0.35,
                        cursor:  isTarget && !isTapped && !done ? "pointer" : "default",
                      }}
                    >
                      {isTapped ? "✅" : symbol}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Running multiplication */}
      <div
        className="w-full flex items-center justify-center px-4 py-3 rounded-2xl bg-white font-fredoka font-bold text-xl"
        style={{
          boxShadow: "0 4px 0 #E0D8CC",
          color: done ? "#34c759" : tappedCount > 0 ? "#4867f5" : "#B0A89A",
        }}
      >
        {tappedCount > 0
          ? `${tappedCount} × ${scale} = ${running}`
          : <span className="text-sm font-normal text-ink-soft">Toca los {symbol} de {targetLabel}</span>}
      </div>

      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done ? `¡${tappedCount} × ${scale} = ${answer} ${scaleUnit}! 🎉` : ""}
      </p>
    </div>
  );
}
