"use client";
// Valor Posicional: muestra un número con dígitos coloreados por posición.
// Un dígito tiene borde resaltado — el niño elige cuánto VALE ese dígito
// (e.g., el 5 en 542 vale 500, no 5). Basado en "Juego de Valor Posicional".
import { useMemo } from "react";
import { playTap } from "@/lib/gamification/audio";

// Centenas=sun, Decenas=mint, Unidades=sky — mismo esquema que PlaceValueMarketGame.
const PLACE_STYLE = [
  { bg: "bg-sun",  text: "text-amber-800", shadow: "0 4px 0 #d4a820", ring: "ring-amber-800" },
  { bg: "bg-mint", text: "text-white",      shadow: "0 4px 0 #1a9e3e", ring: "ring-emerald-700" },
  { bg: "bg-sky",  text: "text-white",      shadow: "0 4px 0 #2358c8", ring: "ring-blue-700" },
] as const;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function PlaceValueDigitGame({
  number,
  askIndex,
  choices,
  disabled = false,
  selected = null,
  onPick,
}: {
  number: number;
  askIndex: number;    // índice desde la izquierda (0 = dígito más a la izq.)
  choices: number[];   // 3 opciones; la correcta está incluida
  disabled?: boolean;
  selected?: number | null;
  onPick: (value: number) => void;
}) {
  const digits = String(number).split("");
  const len = digits.length;

  // placeIdx: 0=centenas, 1=decenas, 2=unidades (relativo a 3 posiciones)
  function placeIdx(i: number) {
    return 3 - len + i;
  }

  // Baraja las opciones una sola vez por montaje
  const displayChoices = useMemo(() => shuffle(choices), [choices.join(",")]);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      {/* Número con dígitos coloreados */}
      <div className="flex gap-3 justify-center">
        {digits.map((ch, i) => {
          const pIdx = placeIdx(i);
          const s = PLACE_STYLE[pIdx] ?? PLACE_STYLE[2];
          const isAsked = i === askIndex;
          return (
            <div
              key={i}
              className={`flex items-center justify-center font-fredoka font-bold text-5xl rounded-2xl
                ${s.bg} ${s.text}
                transition-all duration-200
                ${isAsked
                  ? `ring-4 ring-offset-2 ${s.ring} scale-110 shadow-xl`
                  : "opacity-70"
                }`}
              style={{
                width: len === 3 ? "76px" : "86px",
                height: "96px",
                boxShadow: isAsked ? undefined : s.shadow,
              }}
            >
              {ch}
            </div>
          );
        })}
      </div>

      <p className="text-xs font-bold text-ink-mute text-center">
        El dígito enmarcado es el que preguntamos
      </p>

      {/* Opciones */}
      <div className="flex gap-3 flex-wrap justify-center">
        {displayChoices.map((v) => {
          const isPicked = selected === v;
          return (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => {
                playTap();
                onPick(v);
              }}
              className={`min-w-20 px-7 py-4 rounded-2xl font-fredoka font-bold text-3xl transition-all duration-150 ${
                isPicked
                  ? "bg-sky text-white scale-105 shadow-lg"
                  : "bg-sun-soft text-amber-800 hover:bg-sun/40 active:scale-95"
              } disabled:opacity-50`}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
