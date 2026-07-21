"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

type MoneyItem = { label: string; value: number; type: "bill" | "coin" };

function fmtSoles(cents: number): string {
  if (cents === 0) return "S/ 0.00";
  if (cents % 100 === 0) return `S/ ${cents / 100}.00`;
  return `S/ ${(cents / 100).toFixed(2)}`;
}

// Bill colors based on denomination
function billColor(value: number): { bg: string; shadow: string } {
  if (value >= 5000) return { bg: "linear-gradient(135deg,#7B3F9E,#5E2280)", shadow: "#3D1260" };
  if (value >= 2000) return { bg: "linear-gradient(135deg,#D4631A,#B04E0F)", shadow: "#7A3308" };
  if (value >= 1000) return { bg: "linear-gradient(135deg,#C8801A,#A86410)", shadow: "#6E4008" };
  return { bg: "linear-gradient(135deg,#2E8B57,#1A6B3C)", shadow: "#0F4726" };
}

const SLIGHT_ROTATE = [-4, 3, -2, 5, -3, 2, 4, -1, 3, -5];

export function MoneyCountGame({
  items,
  disabled = false,
  onSelect,
}: {
  items: MoneyItem[];
  disabled?: boolean;
  onSelect: (cents: number) => void;
}) {
  const [collected, setCollected] = useState<Set<number>>(new Set());

  const totalCents   = items.reduce((s, it) => s + it.value, 0);
  const runningCents = items.reduce((s, it, i) => collected.has(i) ? s + it.value : s, 0);
  const done         = collected.size === items.length;

  function tap(idx: number) {
    if (disabled || collected.has(idx)) return;
    playTap();
    const next = new Set(collected);
    next.add(idx);
    setCollected(next);
    if (next.size === items.length) {
      setTimeout(() => onSelect(totalCents), 600);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">

      {/* Wallet panel */}
      <div
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">👛</span>
          <span className="font-fredoka font-bold text-sm text-ink-soft">Total</span>
        </div>
        <span
          className="font-fredoka font-bold text-2xl transition-all duration-300"
          style={{ color: done ? "#34c759" : runningCents > 0 ? "#4867f5" : "#B0A89A" }}
        >
          {fmtSoles(runningCents)}
        </span>
      </div>

      {/* Money items */}
      <div className="flex flex-wrap gap-3 justify-center w-full px-2">
        {items.map((item, idx) => {
          const gone = collected.has(idx);
          const rot  = SLIGHT_ROTATE[idx % SLIGHT_ROTATE.length];

          return (
            <div
              key={idx}
              onClick={() => tap(idx)}
              className="transition-all duration-300 select-none"
              style={{
                transform: gone ? "scale(0) rotate(0deg)" : `scale(1) rotate(${rot}deg)`,
                opacity:   gone ? 0 : 1,
                pointerEvents: gone || disabled ? "none" : "auto",
              }}
            >
              {item.type === "bill" ? (
                <Bill label={item.label} value={item.value} />
              ) : (
                <Coin label={item.label} />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress / done message */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡${fmtSoles(totalCents)} en total! 🎉`
          : collected.size === 0
            ? "Toca cada billete y moneda para contarlos"
            : `${collected.size} de ${items.length} contados · ${fmtSoles(runningCents)}`}
      </p>
    </div>
  );
}

function Bill({ label, value }: { label: string; value: number }) {
  const { bg, shadow } = billColor(value);
  return (
    <div
      className="px-3 py-2.5 rounded-xl flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
      style={{
        background:  bg,
        boxShadow:   `0 3px 0 ${shadow}`,
        minWidth:    "72px",
      }}
    >
      <span className="font-fredoka font-bold text-white/50 text-[10px] uppercase tracking-wide">Perú</span>
      <span className="font-fredoka font-bold text-white text-lg leading-tight">{label}</span>
    </div>
  );
}

function Coin({ label }: { label: string }) {
  return (
    <div
      className="w-[62px] h-[62px] rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
      style={{
        background:  "radial-gradient(circle at 35% 30%, #FFE066, #C8960A)",
        boxShadow:   "0 3px 0 #7A5A00, inset 0 2px 3px rgba(255,240,150,0.7)",
      }}
    >
      <span className="font-fredoka font-bold text-amber-900 text-sm text-center leading-tight px-1">
        {label}
      </span>
    </div>
  );
}
