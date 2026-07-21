"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

const UNIT_ICON: Record<string, string> = {
  metros:      "📏",
  centímetros: "📏",
  kilogramos:  "⚖️",
  gramos:      "⚖️",
  litros:      "💧",
  mililitros:  "💧",
};

export function UnitTapGame({
  emoji,
  units,
  correctIdx,
  disabled = false,
  onSelect,
}: {
  emoji:      string;
  units:      string[];
  correctIdx: number;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [picked,   setPicked]   = useState<number | null>(null);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  function tap(idx: number) {
    if (disabled || picked !== null) return;
    playTap();
    if (idx === correctIdx) {
      setPicked(idx);
      setTimeout(() => onSelect(correctIdx), 700);
    } else {
      playWrong();
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      {/* Item emoji */}
      <div
        className="text-8xl leading-none drag-pop"
        style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))" }}
      >
        {emoji}
      </div>

      {/* Unit buttons */}
      <div className="flex gap-3 flex-wrap justify-center w-full">
        {units.map((unit, idx) => {
          const isCorrect = picked === idx;
          const isShake   = shakeIdx === idx;
          const icon      = UNIT_ICON[unit] ?? "📐";
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => tap(idx)}
              className="flex flex-col items-center gap-1.5 px-5 py-3.5 rounded-2xl border-2 font-fredoka font-bold active:scale-90 transition-transform"
              style={{
                borderColor: isCorrect ? "#34c759" : isShake ? "#ff5a78" : "#E8E0D4",
                background:  isCorrect ? "#EAFAF0"  : isShake ? "#FFF0F0"  : "white",
                boxShadow:   `0 4px 0 ${isCorrect ? "#9FD9B0" : isShake ? "#FFBAC8" : "#E0D8CC"}`,
                animation:   isShake ? "shakeX .42s ease" : undefined,
                minWidth:    "88px",
              }}
            >
              <span className="text-3xl">{icon}</span>
              <span
                className="text-sm text-center leading-tight"
                style={{ color: isCorrect ? "#34c759" : "#2C2A26" }}
              >
                {unit}
              </span>
              {isCorrect && (
                <span className="text-xs text-mint font-bold">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <p className="font-fredoka font-bold text-sm text-mint">
          ¡Correcto! Se mide en {units[correctIdx]} 🎉
        </p>
      )}
    </div>
  );
}
