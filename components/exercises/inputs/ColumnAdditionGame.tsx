"use client";
// Suma en columnas: el niño completa el resultado dígito por dígito
// de derecha a izquierda (U → T → H). Cada dígito se valida al instante;
// un error sacude la celda activa sin penalizar al runner. Al completar
// las 3 columnas correctamente se llama onSelect(a + b).
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

type Step = "u" | "t" | "h" | "done";

const PLACE_CELL = {
  h: "bg-sun-soft  text-amber-800",
  t: "bg-mint-soft text-emerald-800",
  u: "bg-sky-soft  text-blue-800",
} as const;

export function ColumnAdditionGame({
  a,
  b,
  disabled = false,
  onSelect,
}: {
  a: number;
  b: number;
  disabled?: boolean;
  onSelect: (value: number) => void;
}) {
  // Descomponer sumandos
  const ad = { h: Math.floor(a / 100), t: Math.floor((a % 100) / 10), u: a % 10 };
  const bd = { h: Math.floor(b / 100), t: Math.floor((b % 100) / 10), u: b % 10 };

  // Pre-calcular resultado y llevadas
  const uTotal = ad.u + bd.u;
  const carryU  = uTotal >= 10 ? 1 : 0;
  const uDigit  = uTotal % 10;

  const tTotal = ad.t + bd.t + carryU;
  const carryT  = tTotal >= 10 ? 1 : 0;
  const tDigit  = tTotal % 10;

  const hTotal  = ad.h + bd.h + carryT;
  const hDigit  = hTotal % 10; // el seed garantiza que no desborde a 4 cifras

  const [step,   setStep]   = useState<Step>("u");
  const [filled, setFilled] = useState<Record<string, number>>({});
  const [shake,  setShake]  = useState(false);

  const stepOrder: Step[] = ["u", "t", "h", "done"];
  const stepIdx = stepOrder.indexOf(step);

  function pressKey(n: number) {
    if (disabled || step === "done") return;
    const expected = step === "u" ? uDigit : step === "t" ? tDigit : hDigit;
    if (n === expected) {
      playTap();
      const next = { ...filled, [step]: n };
      setFilled(next);
      if (step === "u")      setStep("t");
      else if (step === "t") setStep("h");
      else {
        setStep("done");
        // Pequeño delay para que el niño vea la última celda llenarse
        setTimeout(() => onSelect(a + b), 600);
      }
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  }

  // Celda de respuesta para cada posición
  function answerCell(place: "h" | "t" | "u") {
    const isActive = step === place;
    const isDone   = filled[place] !== undefined;

    if (isDone) {
      return (
        <div className="h-[72px] rounded-2xl bg-mint-soft border-2 border-mint/40 font-fredoka font-bold text-4xl text-mint flex items-center justify-center drag-pop">
          {filled[place]}
        </div>
      );
    }
    if (isActive) {
      return (
        <div
          className={`h-[72px] rounded-2xl border-2 border-dashed font-fredoka font-bold text-4xl flex items-center justify-center transition-colors ${
            shake ? "bg-peach-soft border-pink" : "bg-cream border-sun animate-pulse"
          }`}
          style={shake ? { animation: "shakeX .42s ease" } : undefined}
        />
      );
    }
    return (
      <div className="h-[72px] rounded-2xl bg-cream border-2 border-dashed border-ink/10 flex items-center justify-center" />
    );
  }

  // Instrucción contextual
  let instruction = "";
  if (step === "u") {
    instruction = `Suma las unidades: ${ad.u} + ${bd.u}`;
  } else if (step === "t") {
    instruction = carryU
      ? `Ahora decenas: ${ad.t} + ${bd.t} + 1 (llevada)`
      : `Ahora decenas: ${ad.t} + ${bd.t}`;
  } else if (step === "h") {
    instruction = carryT
      ? `Ahora centenas: ${ad.h} + ${bd.h} + 1 (llevada)`
      : `Ahora centenas: ${ad.h} + ${bd.h}`;
  } else {
    instruction = "¡Bien hecho! 🎉";
  }

  // Mostrar llevada cuando ya se pasó esa columna
  const showCarryU = carryU === 1 && stepIdx >= 1; // encima de Decenas
  const showCarryT = carryT === 1 && stepIdx >= 2; // encima de Centenas

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5">
      {/* Instrucción */}
      <p className="font-fredoka font-bold text-lg text-ink text-center min-h-7">
        {instruction}
      </p>

      {/* Tablero de suma en columna */}
      <div className="bg-white rounded-3xl border border-ink/5 p-5 w-full flex flex-col items-center gap-3"
        style={{ boxShadow: "0 6px 0 #F0E2C8" }}>

        {/* Grid: [op_col] [H] [T] [U]  */}
        <div
          className="grid gap-x-2"
          style={{ gridTemplateColumns: "38px 1fr 1fr 1fr", rowGap: "10px", width: "100%" }}
        >
          {/* Fila de llevadas */}
          <div />
          <div className="flex items-end justify-center h-7">
            {showCarryT && (
              <span className="drag-pop w-7 h-7 rounded-full bg-sun text-amber-900 font-black text-xs flex items-center justify-center">
                1
              </span>
            )}
          </div>
          <div className="flex items-end justify-center h-7">
            {showCarryU && (
              <span className="drag-pop w-7 h-7 rounded-full bg-sun text-amber-900 font-black text-xs flex items-center justify-center">
                1
              </span>
            )}
          </div>
          <div className="h-7" />

          {/* Sumando A */}
          <div />
          {(["h", "t", "u"] as const).map((p) => (
            <div
              key={p}
              className={`h-[68px] rounded-2xl ${PLACE_CELL[p]} font-fredoka font-bold text-4xl flex items-center justify-center`}
            >
              {ad[p] === 0 && p === "h" ? <span className="opacity-25">0</span> : ad[p]}
            </div>
          ))}

          {/* Sumando B + signo + */}
          <div className="font-fredoka font-bold text-3xl text-mint flex items-center justify-center">
            +
          </div>
          {(["h", "t", "u"] as const).map((p) => (
            <div
              key={p}
              className={`h-[68px] rounded-2xl ${PLACE_CELL[p]} font-fredoka font-bold text-4xl flex items-center justify-center`}
            >
              {bd[p] === 0 && p === "h" ? <span className="opacity-25">0</span> : bd[p]}
            </div>
          ))}

          {/* Línea divisora */}
          <div className="col-span-4">
            <div className="border-t-4 border-ink/30 rounded-full" />
          </div>

          {/* Fila de respuestas */}
          <div />
          {(["h", "t", "u"] as const).map((p) => (
            <div key={p}>{answerCell(p)}</div>
          ))}
        </div>
      </div>

      {/* Teclado numérico 0–9 */}
      {step !== "done" && (
        <div className="grid grid-cols-5 gap-2 w-full max-w-xs">
          {Array.from({ length: 10 }, (_, n) => (
            <button
              key={n}
              type="button"
              disabled={disabled}
              onClick={() => pressKey(n)}
              className="h-14 rounded-2xl bg-cream font-fredoka font-bold text-2xl text-ink active:scale-95 transition-transform disabled:opacity-50"
              style={{ boxShadow: "0 3px 0 #E3D8C3" }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
