"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

type Denom = { label: string; value: number; type: "bill" | "coin" };

const ALL_DENOMS: Denom[] = [
  { label: "S/5",  value: 500, type: "bill" },
  { label: "S/2",  value: 200, type: "coin" },
  { label: "S/1",  value: 100, type: "coin" },
  { label: "50c",  value: 50,  type: "coin" },
  { label: "25c",  value: 25,  type: "coin" },
  { label: "10c",  value: 10,  type: "coin" },
];

function fmt(cents: number) {
  if (cents % 100 === 0) return `S/ ${cents / 100}.00`;
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function billBg(value: number) {
  if (value >= 500) return { bg: "linear-gradient(135deg,#D4631A,#B04E0F)", sh: "#7A3308" };
  return { bg: "linear-gradient(135deg,#2E8B57,#1A6B3C)", sh: "#0F4726" };
}

export function ChangeMakingGame({
  price,
  payment,
  disabled = false,
  onSelect,
}: {
  price:    number;
  payment:  number;
  disabled?: boolean;
  onSelect: (cents: number) => void;
}) {
  const change   = payment - price;
  const avail    = ALL_DENOMS.filter(d => d.value <= change);
  const [chips,  setChips]  = useState<Denom[]>([]);
  const [solved, setSolved] = useState(false);
  const total = chips.reduce((s, c) => s + c.value, 0);
  const done  = total === change;
  const over  = total > change;

  function add(d: Denom) {
    if (disabled || solved || total + d.value > change) return;
    playTap();
    const next = [...chips, d];
    setChips(next);
    const newTotal = next.reduce((s, c) => s + c.value, 0);
    if (newTotal === change) {
      setSolved(true);
      setTimeout(() => onSelect(change), 700);
    }
  }

  function remove(idx: number) {
    if (disabled || solved) return;
    playTap();
    setChips(chips.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">

      {/* Price + Payment row */}
      <div className="flex items-stretch gap-3 w-full">
        <div className="flex-1 bg-white rounded-2xl px-3 py-2.5 text-center"
          style={{ boxShadow: "0 3px 0 #E0D8CC" }}>
          <div className="font-fredoka font-bold text-xs text-ink-soft">🏷️ Precio</div>
          <div className="font-fredoka font-bold text-xl text-pink">{fmt(price)}</div>
        </div>
        <div className="flex items-center">
          <span className="font-fredoka font-bold text-lg text-ink-soft">→</span>
        </div>
        <div className="flex-1 bg-white rounded-2xl px-3 py-2.5 text-center"
          style={{ boxShadow: "0 3px 0 #E0D8CC" }}>
          <div className="font-fredoka font-bold text-xs text-ink-soft">💵 Pagas</div>
          <div className="font-fredoka font-bold text-xl text-sky">{fmt(payment)}</div>
        </div>
      </div>

      {/* Selected chips tray */}
      <div className="w-full bg-white rounded-2xl p-3 min-h-[80px]"
        style={{ boxShadow: "0 3px 0 #E0D8CC" }}>
        <div className="font-fredoka font-bold text-xs text-ink-soft mb-2">👛 Tu cambio:</div>
        <div className="flex flex-wrap gap-1.5 min-h-[32px]">
          {chips.map((c, i) => {
            const { bg, sh } = billBg(c.value);
            return (
              <button
                key={i}
                type="button"
                onClick={() => remove(i)}
                className="px-2.5 py-1 rounded-xl font-fredoka font-bold text-sm text-white active:scale-90 transition-transform"
                style={{ background: c.type === "bill" ? bg : "radial-gradient(circle at 35% 30%,#FFE066,#C8960A)", color: c.type === "coin" ? "#7A4F00" : "white", boxShadow: `0 2px 0 ${c.type === "bill" ? sh : "#7A5A00"}` }}
              >
                {c.label} ×
              </button>
            );
          })}
          {chips.length === 0 && (
            <span className="font-fredoka text-xs text-ink/30 italic self-center">
              Toca las monedas y billetes de abajo
            </span>
          )}
        </div>
        <div className={`mt-2 text-right font-fredoka font-bold text-lg transition-colors ${
          done ? "text-mint" : over ? "text-pink" : total > 0 ? "text-sky" : "text-ink/25"
        }`}>
          = {fmt(total)}{done ? " ✓" : ""}
        </div>
      </div>

      {/* Available denomination buttons */}
      <div className="w-full">
        <p className="font-fredoka text-xs text-ink-soft text-center mb-2">
          Usa estas monedas y billetes:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {avail.map((d, i) => {
            const { bg, sh } = billBg(d.value);
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => add(d)}
                className="active:scale-90 transition-transform"
              >
                {d.type === "bill" ? (
                  <div
                    className="px-3 py-2 rounded-xl font-fredoka font-bold text-white text-base"
                    style={{ background: bg, boxShadow: `0 3px 0 ${sh}`, minWidth: "58px", textAlign: "center" }}
                  >
                    {d.label}
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-fredoka font-bold text-amber-900 text-sm"
                    style={{ background: "radial-gradient(circle at 35% 30%,#FFE066,#C8960A)", boxShadow: "0 3px 0 #7A5A00,inset 0 2px 3px rgba(255,240,150,0.7)" }}
                  >
                    {d.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : over ? "text-pink" : "text-ink-soft"}`}>
        {done
          ? "¡Cambio correcto! 🎉"
          : over
            ? "¡Demasiado! Toca una moneda arriba para quitarla"
            : total > 0
              ? `Falta: ${fmt(change - total)}`
              : "Suma monedas hasta llegar al cambio exacto"}
      </p>
    </div>
  );
}
