"use client";
// Motor de multiplicación: el niño CONSTRUYE el arreglo fila por fila en vez
// de marcar una alternativa. Cada fila que agrega muestra el conteo saltado
// acumulado (6, 12, 18…) y la ecuación viva se actualiza (3 × 6 = 18), así
// descubre que multiplicar es sumar filas iguales. Cuando arma las filas
// correctas la ecuación se pone verde y toca Comprobar como siempre.
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

const MAX_ROWS = 12;

export function MultiplicationBuildGame({
  targetRows,
  cols,
  item = "🔵",
  disabled = false,
  onSelect,
}: {
  targetRows: number;
  cols: number;
  item?: string;
  disabled?: boolean;
  onSelect: (value: number) => void;
}) {
  const [built, setBuilt] = useState(0);

  const total = built * cols;
  const onTarget = built === targetRows;

  function addRow() {
    if (disabled || built >= MAX_ROWS) return;
    playTap();
    const next = built + 1;
    setBuilt(next);
    onSelect(next * cols);
  }

  function removeRow() {
    if (disabled || built <= 0) return;
    playTap();
    const next = built - 1;
    setBuilt(next);
    if (next > 0) onSelect(next * cols);
  }

  // Tamaño de los objetos según el ancho de la fila.
  const dotCls = cols >= 9 ? "text-base" : cols >= 6 ? "text-xl" : "text-2xl";

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      {/* Ecuación viva: filas × columnas = total. Verde al llegar al objetivo. */}
      <div
        className={`flex items-center gap-2 rounded-2xl px-4 py-2 transition-colors ${
          onTarget ? "bg-mint-soft" : "bg-white"
        }`}
        style={{ boxShadow: "var(--shadow-chunky-sm)" }}
      >
        <span className={`font-fredoka text-2xl font-bold ${onTarget ? "text-mint" : built > 0 ? "text-ink" : "text-ink-mute"}`}>
          {built > 0 ? built : "?"}
        </span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">×</span>
        <span className="font-fredoka text-2xl font-bold text-ink">{cols}</span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">=</span>
        <span className={`font-fredoka text-2xl font-bold ${onTarget ? "text-mint" : built > 0 ? "text-ink" : "text-ink-mute"}`}>
          {built > 0 ? total : "?"}
        </span>
      </div>

      {/* Tablero: las filas construidas + una fila fantasma para agregar */}
      <div className="flex w-full flex-col items-center gap-1.5 rounded-3xl border-4 border-sun/30 bg-white p-4">
        {built === 0 && (
          <p className="py-2 text-sm font-bold text-ink-mute">
            El tablero está vacío — agrega filas de {cols} {item}
          </p>
        )}

        {Array.from({ length: built }, (_, r) => {
          const isLast = r === built - 1;
          return (
            <div key={r} className="flex items-center gap-1">
              {Array.from({ length: cols }, (_, c) => (
                <span
                  key={c}
                  className={`${dotCls} leading-none ${isLast ? "drag-pop" : ""}`}
                  style={isLast ? { animationDelay: `${c * 45}ms`, animationFillMode: "backwards" } : undefined}
                >
                  {item}
                </span>
              ))}
              {/* Conteo saltado acumulado: la magia de ver 6, 12, 18… */}
              <span
                className={`ml-2 min-w-9 rounded-full px-2 py-0.5 text-center font-fredoka text-sm font-bold ${
                  isLast ? "bg-mint text-white" : "bg-mint-soft text-mint"
                }`}
              >
                {(r + 1) * cols}
              </span>
            </div>
          );
        })}

        {/* Fila fantasma: muestra cómo sería la siguiente fila y también suma */}
        {built < MAX_ROWS && (
          <button
            type="button"
            disabled={disabled}
            onClick={addRow}
            aria-label="Agregar una fila"
            className="mt-1 flex items-center gap-1 rounded-xl border-2 border-dashed border-ink/20 px-2 py-1 opacity-50 transition-opacity hover:opacity-90"
          >
            {Array.from({ length: cols }, (_, c) => (
              <span key={c} className={`${dotCls} leading-none grayscale`}>
                {item}
              </span>
            ))}
            <span className="ml-2 font-fredoka text-sm font-bold text-ink-mute">+</span>
          </button>
        )}
      </div>

      {/* Controles */}
      <div className="flex w-full items-center gap-2">
        <button
          type="button"
          disabled={disabled || built <= 0}
          onClick={removeRow}
          className={`rounded-full px-4 py-3 text-sm font-black ${
            built > 0 && !disabled ? "bg-cream text-ink-soft" : "bg-ink-mute/10 text-ink-mute"
          }`}
        >
          − Quitar
        </button>
        <button
          type="button"
          disabled={disabled || built >= MAX_ROWS}
          onClick={addRow}
          className={`btn-chunky flex-1 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wide ${
            built < MAX_ROWS && !disabled ? "bg-sun-soft text-ink" : "bg-ink-mute/10 text-ink-mute"
          }`}
          style={{ boxShadow: built < MAX_ROWS && !disabled ? "var(--shadow-chunky-sm)" : undefined }}
        >
          + 1 fila de {cols}
        </button>
      </div>

      {onTarget ? (
        <p className="text-sm font-bold text-mint">
          🌟 ¡{targetRows} filas de {cols} = {total}! Toca Comprobar 👇
        </p>
      ) : built > 0 ? (
        <p className="text-sm font-bold text-ink-soft">
          Llevas {built} {built === 1 ? "fila" : "filas"} → {total}
        </p>
      ) : (
        <p className="text-sm font-bold text-ink-soft">
          Multiplicar es sumar filas iguales — ¡constrúyelo!
        </p>
      )}
    </div>
  );
}
