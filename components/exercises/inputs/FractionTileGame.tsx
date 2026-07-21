"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

// Addition:    `a` tiles locked amber → child taps b empty tiles to fill (sky blue)
// Subtraction: `a` tiles start amber → first (a-b) locked, last b removable (pink border)
//              child taps removable tiles to mark them removed (×, faded)

export function FractionTileGame({
  a, b, d, op,
  disabled = false,
  onSelect,
}: {
  a: number; b: number; d: number; op: "+" | "-";
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const answer  = op === "+" ? a + b : a - b;
  const [toggled, setToggled] = useState<Set<number>>(new Set());
  const [done,    setDone]    = useState(false);

  function tappable(i: number) {
    if (op === "+") return i >= a && i < d;
    return i >= a - b && i < a;
  }

  function tap(i: number) {
    if (disabled || !tappable(i) || done) return;
    playTap();
    const next = new Set(toggled);
    if (next.has(i)) next.delete(i); else next.add(i);
    setToggled(next);
    const cur = op === "+" ? a + next.size : a - next.size;
    if (cur === answer) {
      setDone(true);
      setTimeout(() => onSelect(answer), 600);
    }
  }

  function tile(i: number): { bg: string; border: string; label: string; dim: boolean } {
    if (op === "+") {
      if (i < a)           return { bg: "#ffc94a", border: "#d4a820", label: "",  dim: false };
      if (toggled.has(i))  return { bg: "#4867f5", border: "#2358c8", label: "",  dim: false };
                           return { bg: "#EDE8DF", border: "#C8C0B4", label: "+", dim: false };
    } else {
      if (i >= a)          return { bg: "#EDE8DF", border: "#C8C0B4", label: "",  dim: false };
      if (i < a - b)       return { bg: "#ffc94a", border: "#d4a820", label: "",  dim: false };
      if (toggled.has(i))  return { bg: "#FFE8ED", border: "#ff5a78", label: "×", dim: true  };
                           return { bg: "#ffc94a", border: "#ff5a78", label: "−", dim: false };
    }
  }

  const cur = op === "+" ? a + toggled.size : a - toggled.size;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">

      {/* Equation header */}
      <div className="flex items-center gap-2 font-fredoka font-bold">
        <Frac n={a} d={d} color="#4867f5" />
        <span className="text-xl text-ink">{op}</span>
        <Frac n={b} d={d} color="#ff5a78" />
        <span className="text-xl text-ink">=</span>
        <Frac n={cur} d={d} color={done ? "#34c759" : "#B0A89A"} />
      </div>

      {/* Tile bar */}
      <div className="w-full bg-white rounded-2xl p-4" style={{ boxShadow: "0 4px 0 #E0D8CC" }}>
        <div className="flex gap-1.5 w-full">
          {Array.from({ length: d }, (_, i) => {
            const t = tile(i);
            return (
              <div
                key={i}
                onClick={() => tap(i)}
                className="flex-1 aspect-square rounded-xl flex items-center justify-center font-fredoka font-bold text-base border-2 transition-all active:scale-90 select-none"
                style={{
                  background:  t.bg,
                  borderColor: t.border,
                  cursor:      tappable(i) ? "pointer" : "default",
                  opacity:     t.dim ? 0.45 : 1,
                  color:       t.label === "×" ? "#ff5a78" : t.label === "+" ? "#B0A89A" : "#d4a820",
                }}
              >
                {t.label}
              </div>
            );
          })}
        </div>

        <p className="mt-2 text-center font-fredoka text-xs text-ink-soft">
          {op === "+"
            ? `Toca ${b} casilla${b > 1 ? "s" : ""} vacía${b > 1 ? "s" : ""} para sumar`
            : `Toca ${b} casilla${b > 1 ? "s" : ""} para quitar`}
        </p>
      </div>

      {/* Status */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡${cur}/${d}! 🎉`
          : toggled.size === 0
            ? op === "+" ? `¿Cuánto es ${a}/${d} + ${b}/${d}?` : `¿Cuánto es ${a}/${d} − ${b}/${d}?`
            : `${cur}/${d} — ${op === "+" ? `faltan ${b - toggled.size} más` : toggled.size < b ? `quedan ${b - toggled.size} por quitar` : ""}`}
      </p>
    </div>
  );
}

function Frac({ n, d, color }: { n: number; d: number; color: string }) {
  return (
    <div className="flex flex-col items-center leading-tight font-fredoka font-bold" style={{ color }}>
      <span className="text-2xl">{n}</span>
      <div className="w-5 h-0.5 my-0.5 rounded-full" style={{ background: color }} />
      <span className="text-2xl">{d}</span>
    </div>
  );
}
