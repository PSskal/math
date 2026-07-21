"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

export function ArrayPackerGame({
  rows,
  cols,
  icon = "⭐",
  disabled = false,
  onSelect,
}: {
  rows: number;
  cols: number;
  icon?: string;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const total = rows * cols;
  const [rowsFilled, setRowsFilled] = useState(0);
  const done = rowsFilled >= rows;

  function packRow() {
    if (disabled || done) return;
    playTap();
    const next = rowsFilled + 1;
    setRowsFilled(next);
    if (next >= rows) {
      setTimeout(() => onSelect(total), 1500);
    }
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4">

      {/* Equation header */}
      <div className="flex items-center gap-2 font-fredoka font-bold text-xl text-ink">
        <span>{rows}</span>
        <span className="text-ink-mute">filas</span>
        <span>×</span>
        <span>{cols}</span>
        <span className="text-ink-mute">columnas</span>
        <span>=</span>
        <span
          className={`min-w-10 text-center rounded-xl px-2 transition-colors ${
            done ? "text-mint drag-pop" : "text-ink/25"
          }`}
        >
          {done ? total : "?"}
        </span>
      </div>

      {/* Packing grid */}
      <div
        className="bg-white rounded-3xl p-4 w-full"
        style={{ boxShadow: "0 6px 0 #F0E2C8" }}
      >
        <div className="flex flex-col gap-2">
          {Array.from({ length: rows }, (_, r) => {
            const isFilled = r < rowsFilled;
            const isNew    = r === rowsFilled - 1;
            return (
              <div key={r} className="flex items-center gap-2">
                {/* Row number pill */}
                <div
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                    isFilled ? "bg-sky text-white" : "bg-cream text-ink/30 border border-dashed border-ink/20"
                  }`}
                >
                  {r + 1}
                </div>

                {/* Cells */}
                <div className="flex gap-1.5 flex-1">
                  {Array.from({ length: cols }, (_, c) => (
                    <div
                      key={c}
                      className={`flex-1 aspect-square rounded-xl flex items-center justify-center text-xl border-2 ${
                        isFilled
                          ? "bg-sky-soft border-sky/30"
                          : "bg-cream border-dashed border-ink/15"
                      }`}
                      style={
                        isNew
                          ? {
                              animationName: "drag-pop-in",
                              animationDuration: "280ms",
                              animationTimingFunction: "ease-out",
                              animationDelay: `${c * 50}ms`,
                              animationFillMode: "both",
                            }
                          : undefined
                      }
                    >
                      {isFilled ? icon : ""}
                    </div>
                  ))}
                </div>

                {/* Per-row count */}
                <div
                  className={`w-8 shrink-0 text-right font-fredoka font-bold text-sm transition-opacity ${
                    isFilled ? "text-ink-mute opacity-100" : "opacity-0"
                  }`}
                >
                  ×{cols}
                </div>
              </div>
            );
          })}
        </div>

        {/* Done: full equation reveal */}
        {done && (
          <div className="mt-4 text-center font-fredoka font-bold text-2xl text-mint drag-pop">
            {rows} × {cols} = {total} ✓
          </div>
        )}
      </div>

      {/* Pack button */}
      {!done ? (
        <button
          type="button"
          disabled={disabled}
          onClick={packRow}
          className="w-full max-w-xs py-4 rounded-2xl bg-sky font-fredoka font-bold text-xl text-white active:scale-95 transition-transform disabled:opacity-50"
          style={{ boxShadow: "0 4px 0 #2358c8" }}
        >
          Empaquetar fila {rowsFilled + 1} {icon}
        </button>
      ) : (
        <p className="font-fredoka font-bold text-base text-mint">
          ¡{total} objetos empaquetados! 🎉
        </p>
      )}

      {/* Progress caption */}
      {!done && (
        <p className="text-xs font-bold text-ink-mute">
          {rowsFilled * cols} de {total} empaquetados
        </p>
      )}
    </div>
  );
}
