"use client";
// Juego de Mercado: el niño construye un número tocando columnas de
// Centenas / Decenas / Unidades. Basado en el diseño "Mercado de Frutas".
// Sólo muestra las columnas relevantes para el target (>= 100 → 3 cols,
// >= 10 → 2 cols, < 10 → 1 col). Llama a onSelect(total) en cada cambio
// para que el runner siempre tenga el valor actual.
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

type Counts = { c: number; d: number; u: number };

const COLS = [
  {
    key: "c" as const,
    label: "Centenas",
    sub: "1 centena = 100",
    bg: "bg-sun-soft",
    border: "border-sun/40",
    textClass: "text-amber-700",
    iconBg: "bg-sun",
    iconRadius: "10px",           // cuadrado redondeado
    shadowColor: "#d4a820",
  },
  {
    key: "d" as const,
    label: "Decenas",
    sub: "1 decena = 10",
    bg: "bg-mint-soft",
    border: "border-mint/40",
    textClass: "text-emerald-700",
    iconBg: "bg-mint",
    iconRadius: "40% 40% 8px 8px", // barra con tope redondeado
    shadowColor: "#1a9e3e",
  },
  {
    key: "u" as const,
    label: "Unidades",
    sub: "1 por 1",
    bg: "bg-sky-soft",
    border: "border-sky/40",
    textClass: "text-blue-700",
    iconBg: "bg-sky",
    iconRadius: "50%",             // círculo
    shadowColor: "#2358c8",
  },
] as const;

export function PlaceValueMarketGame({
  target,
  disabled = false,
  onSelect,
}: {
  target: number;
  disabled?: boolean;
  onSelect: (value: number) => void;
}) {
  const [counts, setCounts] = useState<Counts>({ c: 0, d: 0, u: 0 });
  const [toast, setToast] = useState("");
  const [toastKey, setToastKey] = useState(0);

  const showC = target >= 100;
  const showD = target >= 10;
  const visibleCols = COLS.filter(
    (col) => (col.key === "c" ? showC : col.key === "d" ? showD : true),
  );

  const total = counts.c * 100 + counts.d * 10 + counts.u;
  const isMatch = total === target;
  const isOver = total > target;

  function flashToast(msg: string) {
    setToast(msg);
    setToastKey((k) => k + 1);
    setTimeout(() => setToast(""), 1600);
  }

  function add(place: keyof Counts) {
    if (disabled) return;
    playTap();
    const next = { ...counts };
    let msg = "";

    if (place === "u") {
      if (next.u < 9) {
        next.u++;
      } else if (showD && next.d < 9) {
        next.u = 0;
        next.d++;
        msg = "¡10 unidades = 1 decena! 🔟";
      }
    } else if (place === "d") {
      if (next.d < 9) {
        next.d++;
      } else if (showC && next.c < 9) {
        next.d = 0;
        next.c++;
        msg = "¡10 decenas = 1 centena! 💯";
      }
    } else {
      if (next.c < 9) next.c++;
    }

    setCounts(next);
    onSelect(next.c * 100 + next.d * 10 + next.u);
    if (msg) flashToast(msg);
  }

  function remove(place: keyof Counts, e: React.MouseEvent) {
    e.stopPropagation();
    if (disabled) return;
    playTap();
    const next = { ...counts, [place]: Math.max(0, counts[place] - 1) };
    setCounts(next);
    onSelect(next.c * 100 + next.d * 10 + next.u);
  }

  function clear() {
    if (disabled) return;
    const cleared: Counts = { c: 0, d: 0, u: 0 };
    setCounts(cleared);
    onSelect(0);
  }

  const isEmpty = counts.c === 0 && counts.d === 0 && counts.u === 0;

  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-4">
      {/* Target vs total */}
      <div className="w-full grid grid-cols-2 gap-3">
        <div className="bg-sun-soft border-2 border-sun/30 rounded-2xl p-4 flex flex-col">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
            Arma este número
          </span>
          <span className="font-fredoka text-5xl font-bold text-amber-800 leading-none">
            {target}
          </span>
        </div>

        <div
          className={`border-2 rounded-2xl p-4 flex flex-col transition-colors duration-300 ${
            isMatch
              ? "bg-mint-soft border-mint/40"
              : isOver
                ? "bg-peach-soft border-pink/40"
                : "bg-cream border-ink/10"
          }`}
        >
          <span className="text-[10px] font-black text-ink-mute uppercase tracking-widest mb-1">
            Tu número
          </span>
          <span
            className={`font-fredoka text-5xl font-bold leading-none transition-colors duration-300 ${
              isMatch ? "text-mint" : isOver ? "text-pink" : "text-ink-soft"
            }`}
          >
            {isEmpty ? "—" : total}
          </span>
        </div>
      </div>

      {/* Toast de reagrupación */}
      {toast && (
        <div
          key={toastKey}
          className="drag-pop bg-sun text-white font-fredoka font-bold text-sm px-4 py-1.5 rounded-full shadow-md"
        >
          {toast}
        </div>
      )}

      {/* Columnas */}
      <div className="w-full flex gap-2">
        {visibleCols.map((col) => {
          const count = counts[col.key];
          return (
            <div
              key={col.key}
              onClick={() => add(col.key)}
              className={`flex-1 min-w-0 ${col.bg} border-2 ${col.border} rounded-2xl p-3 flex flex-col gap-2 select-none ${
                disabled ? "opacity-60 pointer-events-none" : "cursor-pointer active:scale-95 transition-transform"
              }`}
              style={{ boxShadow: `0 4px 0 ${col.shadowColor}` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className={`font-fredoka font-bold text-sm ${col.textClass}`}>
                  {col.label}
                </span>
                <button
                  type="button"
                  onClick={(e) => remove(col.key, e)}
                  disabled={disabled || count === 0}
                  className={`w-6 h-6 rounded-full bg-white/70 flex items-center justify-center font-black text-base leading-none ${col.textClass} disabled:opacity-30`}
                >
                  −
                </button>
              </div>

              <p className={`text-[10px] font-bold ${col.textClass} opacity-70 text-left`}>
                {col.sub}
              </p>

              {/* Iconos animados */}
              <div className="grid grid-cols-3 gap-1 min-h-[56px] content-start">
                {Array.from({ length: count }, (_, idx) => (
                  <div
                    key={idx}
                    className={`w-full aspect-square ${col.iconBg} drag-pop`}
                    style={{
                      borderRadius: col.iconRadius,
                      animationDelay: `${idx * 25}ms`,
                      animationFillMode: "backwards",
                    }}
                  />
                ))}
              </div>

              {/* Contador */}
              <span className={`font-fredoka font-bold text-3xl ${col.textClass} text-center`}>
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Botón vaciar */}
      <button
        type="button"
        onClick={clear}
        disabled={disabled || isEmpty}
        className="text-xs font-bold text-ink-mute underline underline-offset-2 disabled:opacity-0 transition-opacity"
      >
        Vaciar todo
      </button>
    </div>
  );
}
