"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Bar {
  label: string;
  value: number;
  color: string;
}

interface Props {
  bars: Bar[];
  question: string;
  answerLabel: string;
  scale?: number;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const CHART_H = 140;

export function BarGraphGame({
  bars,
  question,
  answerLabel,
  scale = 1,
  disabled = false,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const maxVal = Math.max(...bars.map((b) => b.value));
  const gridMax = Math.ceil(maxVal / scale) * scale;
  const rows = gridMax / scale;

  function tap(bar: Bar) {
    if (disabled || done) return;
    if (bar.label === answerLabel) {
      playTap();
      setSelected(bar.label);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(bar.label);
      setTimeout(() => setShake(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm px-1">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        {question}
      </p>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-3 w-full">
        <div className="flex gap-1 items-end">
          {/* Y-axis labels */}
          <div
            className="flex flex-col-reverse items-end pr-1 flex-shrink-0"
            style={{ height: `${CHART_H}px`, minWidth: "20px" }}
          >
            {Array.from({ length: rows + 1 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-end text-xs text-slate-400 leading-none"
              >
                {i * scale}
              </div>
            ))}
          </div>

          {/* Grid + bars */}
          <div className="flex-1 relative" style={{ height: `${CHART_H}px` }}>
            {/* Horizontal grid lines */}
            {Array.from({ length: rows + 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-slate-100"
                style={{ bottom: `${(i / rows) * 100}%` }}
              />
            ))}

            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-2 px-1">
              {bars.map((bar) => {
                const hPct = gridMax > 0 ? (bar.value / gridMax) * 100 : 0;
                const isSel = selected === bar.label;
                const isShake = shake === bar.label;
                return (
                  <button
                    key={bar.label}
                    onClick={() => tap(bar)}
                    disabled={disabled || done}
                    className={`flex-1 flex flex-col items-center group transition-all duration-150 ${
                      isShake ? "animate-bounce" : ""
                    }`}
                    style={{ height: "100%" }}
                  >
                    {/* value above bar */}
                    <span
                      className="text-xs font-bold mb-0.5 transition-opacity"
                      style={{ color: bar.color, opacity: bar.value > 0 ? 1 : 0 }}
                    >
                      {bar.value}
                    </span>

                    {/* bar itself */}
                    <div className="relative w-full flex items-end" style={{ flex: 1 }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isSel
                            ? "ring-4 ring-green-400 scale-105"
                            : "group-hover:brightness-110 active:scale-95"
                        } ${isShake ? "opacity-40" : ""}`}
                        style={{
                          backgroundColor: bar.color,
                          height: `${Math.max(4, hPct)}%`,
                        }}
                      />
                    </div>

                    {/* label below bar */}
                    <span className="text-xs text-slate-600 font-fredoka mt-1 leading-tight text-center">
                      {bar.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ ¡{answerLabel}!
        </p>
      )}
    </div>
  );
}
