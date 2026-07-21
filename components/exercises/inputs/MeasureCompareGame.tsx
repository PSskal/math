"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

// Generic two-option comparison with proportional bars — same UX as MoneyCompareGame
// but uses custom string labels instead of cent amounts.

export function MeasureCompareGame({
  aLabel,
  aValue,
  bLabel,
  bValue,
  askLarger = true,
  disabled  = false,
  onSelect,
}: {
  aLabel:     string;
  aValue:     number;
  bLabel:     string;
  bValue:     number;
  askLarger?: boolean;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [picked,   setPicked]   = useState<0 | 1 | null>(null);
  const [shakeIdx, setShakeIdx] = useState<0 | 1 | null>(null);

  const correctIdx: 0 | 1 = askLarger
    ? (aValue >= bValue ? 0 : 1)
    : (aValue <= bValue ? 0 : 1);

  const items   = [{ label: aLabel, value: aValue }, { label: bLabel, value: bValue }];
  const maxVal  = Math.max(aValue, bValue);
  const COLORS: [string, string] = ["#4867f5", "#ff5a78"];

  function tap(idx: 0 | 1) {
    if (disabled || picked !== null) return;
    playTap();
    if (idx === correctIdx) {
      setPicked(idx);
      setTimeout(() => onSelect(correctIdx), 900);
    } else {
      playWrong();
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <p className="font-fredoka font-bold text-lg text-ink text-center">
        Toca la medida {askLarger ? "mayor" : "menor"}
      </p>

      <div className="flex flex-col gap-3 w-full">
        {items.map((it, idx) => {
          const isCorrect = picked === idx;
          const isShake   = shakeIdx === idx;
          const color     = COLORS[idx];
          const barPct    = maxVal > 0 ? Math.round((it.value / maxVal) * 100) : 0;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => tap(idx as 0 | 1)}
              className="w-full rounded-2xl p-3 border-2 active:scale-[0.98] transition-transform text-left"
              style={{
                borderColor: isCorrect ? "#34c759" : isShake ? "#ff5a78" : "#E8E0D4",
                background:  isCorrect ? "#EAFAF0"  : isShake ? "#FFF0F0"  : "white",
                boxShadow:   `0 4px 0 ${isCorrect ? "#9FD9B0" : isShake ? "#FFBAC8" : "#E0D8CC"}`,
                animation:   isShake ? "shakeX .42s ease" : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="shrink-0 w-20 font-fredoka font-bold text-xl text-right"
                  style={{ color }}
                >
                  {it.label}
                </span>
                <div className="flex-1 h-9 rounded-xl overflow-hidden bg-ink/5">
                  <div
                    className="h-full rounded-xl transition-all duration-500"
                    style={{ width: `${barPct}%`, background: color, opacity: 0.65 }}
                  />
                </div>
              </div>
              {isCorrect && (
                <div className="mt-1 text-xs font-bold font-fredoka text-mint ml-1">
                  ¡Correcto! ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      {picked === null && (
        <p className="text-xs font-bold text-ink-soft">
          La barra más {askLarger ? "larga" : "corta"} indica la medida {askLarger ? "mayor" : "menor"}
        </p>
      )}
    </div>
  );
}
