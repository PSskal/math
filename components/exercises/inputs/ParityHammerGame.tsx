"use client";
// Motor de par/impar: el niño usa un martillo 🔨 para partir el grupo en dos
// bandejas. Los objetos vuelan alternando izquierda/derecha (repartir de a 2)
// y si el número es impar, uno queda solito en el medio sin lugar — ESA es la
// imagen de "impar". Para números grandes se parte solo la última cifra, que
// es exactamente la regla que deben aprender. Después de partir, el niño
// responde Par/Impar y el runner evalúa como siempre.
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";
import { ChoiceButtonsInput } from "@/components/exercises/inputs/ChoiceButtonsInput";

// Espacio de coordenadas del tablero; se rendea responsive vía porcentajes.
const W = 320;
const H = 240;

export function ParityHammerGame({
  value,
  disabled = false,
  selected = null,
  onPick,
}: {
  value: number;
  disabled?: boolean;
  selected?: string | null;
  onPick: (value: string) => void;
}) {
  const [split, setSplit] = useState(false);
  const [hasSplit, setHasSplit] = useState(false);

  const str = String(value);
  const last = value % 10;
  // Si termina en 0 partimos 10 puntos (0 puntos no se pueden partir).
  const n = last === 0 ? 10 : last;
  const isOdd = n % 2 === 1;
  const leftover = isOdd ? n - 1 : -1; // índice del punto que sobra
  const perSide = Math.floor(n / 2);

  function toggle() {
    if (disabled) return;
    playTap();
    setSplit(!split);
    if (!split) setHasSplit(true);
  }

  // Posición de cada punto: fila centrada al inicio; tras el martillazo,
  // alterna izquierda/derecha apilándose — el que sobra queda en el medio.
  function dotPos(i: number) {
    if (!split) {
      return { x: W / 2 - ((n - 1) * 30) / 2 + i * 30, y: 36 };
    }
    if (i === leftover) {
      return { x: W / 2, y: 150 };
    }
    const slot = Math.floor(i / 2);
    return {
      x: i % 2 === 0 ? 85 : W - 85,
      y: 92 + slot * 28,
    };
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      {/* El número, con la última cifra resaltada si es grande */}
      <div className="text-center">
        <div className="font-fredoka text-6xl md:text-7xl font-bold leading-none">
          {str.length > 1 && <span className="text-ink-mute">{str.slice(0, -1)}</span>}
          <span className="text-pink underline decoration-4 underline-offset-4">
            {str.slice(-1)}
          </span>
        </div>
        {str.length > 1 && (
          <p className="mt-1 text-xs font-bold text-ink-soft">
            Mira solo la última cifra: partimos {n} puntos
          </p>
        )}
      </div>

      {/* Tablero */}
      <div
        className="relative w-full max-w-90 overflow-hidden rounded-3xl border-4 border-sun/30 bg-white"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        {/* Bandejas — aparecen al partir */}
        <div
          className={`absolute rounded-2xl border-4 border-dashed transition-opacity duration-500 ${
            split ? "border-sky/40 opacity-100" : "border-sky/40 opacity-0"
          }`}
          style={{ left: "9%", top: "30%", width: "29%", height: "62%" }}
        />
        <div
          className={`absolute rounded-2xl border-4 border-dashed transition-opacity duration-500 ${
            split ? "border-sky/40 opacity-100" : "border-sky/40 opacity-0"
          }`}
          style={{ right: "9%", top: "30%", width: "29%", height: "62%" }}
        />

        {/* Conteo de cada bandeja */}
        {split && (
          <>
            <span className="drag-pop absolute left-[16%] top-[32%] z-10 rounded-full bg-sky px-2 py-0.5 font-fredoka text-sm font-bold text-white" style={{ animationDelay: `${n * 80}ms`, animationFillMode: "backwards" }}>
              {perSide}
            </span>
            <span className="drag-pop absolute right-[16%] top-[32%] z-10 rounded-full bg-sky px-2 py-0.5 font-fredoka text-sm font-bold text-white" style={{ animationDelay: `${n * 80}ms`, animationFillMode: "backwards" }}>
              {perSide}
            </span>
            {isOdd && (
              <span className="drag-pop absolute left-1/2 top-[75%] z-10 -translate-x-1/2 rounded-full bg-pink px-2.5 py-0.5 text-xs font-black text-white" style={{ animationDelay: `${n * 90}ms`, animationFillMode: "backwards" }}>
                ¡Sobra 1!
              </span>
            )}
          </>
        )}

        {/* Los puntos */}
        {Array.from({ length: n }, (_, i) => {
          const p = dotPos(i);
          const isLeftover = split && i === leftover;
          return (
            <span
              key={i}
              className={`absolute h-6 w-6 rounded-full transition-all duration-500 ease-out ${
                isLeftover ? "animate-bob bg-pink ring-2 ring-pink/40" : "bg-sky"
              }`}
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
                transform: "translate(-50%, -50%)",
                transitionDelay: split ? `${i * 80}ms` : "0ms",
              }}
            />
          );
        })}
      </div>

      {/* El martillo */}
      <button
        type="button"
        disabled={disabled}
        onClick={toggle}
        className={`btn-chunky w-full rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-wide ${
          split ? "bg-cream text-ink-soft" : "bg-sun-soft text-ink"
        }`}
        style={{ boxShadow: "var(--shadow-chunky-sm)" }}
      >
        {split ? "↺ Volver a juntar" : "🔨 ¡Partir en 2!"}
      </button>

      {!hasSplit && (
        <p className="text-sm font-bold text-ink-soft">
          Usa el martillo y mira si sobra alguno 👀
        </p>
      )}

      {/* Par / Impar — se habilita después del primer martillazo */}
      <ChoiceButtonsInput
        choices={[
          { value: "Par", label: "Par", sub: "se parte en 2 iguales" },
          { value: "Impar", label: "Impar", sub: "sobra uno solo" },
        ]}
        disabled={disabled || !hasSplit}
        selected={selected as "Par" | "Impar" | null}
        onPick={onPick}
      />
    </div>
  );
}
