"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

const COLORS: [string, string] = ["#4867f5", "#ff5a78"];
const SHADOW: [string, string] = ["#2358c8", "#cc2244"];

export function FractionBarsGame({
  n1, d1, n2, d2,
  disabled = false,
  onSelect,
}: {
  n1: number; d1: number; n2: number; d2: number;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const [picked,   setPicked]   = useState<0 | 1 | null>(null);
  const [shakeIdx, setShakeIdx] = useState<0 | 1 | null>(null);

  const correctIdx: 0 | 1 = n1 / d1 >= n2 / d2 ? 0 : 1;
  const fracs = [
    { n: n1, d: d1 },
    { n: n2, d: d2 },
  ] as const;

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
        Toca la fracción más grande
      </p>

      <div className="flex flex-col gap-3 w-full">
        {fracs.map((f, idx) => {
          const color  = COLORS[idx];
          const shadow = SHADOW[idx];
          const isCorrect = picked === idx;
          const isShake   = shakeIdx === idx;
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
                {/* Fraction label */}
                <div
                  className="shrink-0 w-14 flex flex-col items-center font-fredoka font-bold leading-none"
                  style={{ color }}
                >
                  <span className="text-2xl">{f.n}</span>
                  <div className="w-8 h-0.5 my-0.5" style={{ background: color }} />
                  <span className="text-2xl">{f.d}</span>
                </div>

                {/* Bar — full width, segments fill left-to-right */}
                <div className="flex-1 flex flex-col gap-1">
                  <div
                    className="w-full h-10 flex rounded-xl overflow-hidden"
                    style={{ boxShadow: `0 2px 0 ${shadow}22` }}
                  >
                    {Array.from({ length: f.d }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 border-r-2 border-white/70 last:border-r-0"
                        style={{
                          background: i < f.n ? color : "#EDE8DF",
                          transition: "background .15s",
                        }}
                      />
                    ))}
                  </div>
                  {isCorrect && (
                    <span className="text-xs font-bold font-fredoka text-mint ml-1">
                      ¡Correcto! ✓
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {picked === null && (
        <p className="text-xs font-bold text-ink-soft">
          Compara cuánto ocupa cada barra
        </p>
      )}
    </div>
  );
}
