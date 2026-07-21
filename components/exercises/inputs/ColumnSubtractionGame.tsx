"use client";
// Resta en columnas: el niño completa el resultado dígito por dígito
// de derecha a izquierda (U → T → H). Maneja "pedir prestado" en cadena.
// Cada dígito se valida al instante; error = sacudida sin penalizar al runner.
// Al terminar las 3 columnas correctamente llama onSelect(a − b).
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

type Step = "u" | "t" | "h" | "done";

const PLACE_CELL = {
  h: "bg-sun-soft  text-amber-800",
  t: "bg-mint-soft text-emerald-800",
  u: "bg-sky-soft  text-blue-800",
} as const;

export function ColumnSubtractionGame({
  a,
  b,
  disabled = false,
  onSelect,
}: {
  a: number;   // minuendo (mayor)
  b: number;   // sustraendo
  disabled?: boolean;
  onSelect: (value: number) => void;
}) {
  const ad = { h: Math.floor(a / 100), t: Math.floor((a % 100) / 10), u: a % 10 };
  const bd = { h: Math.floor(b / 100), t: Math.floor((b % 100) / 10), u: b % 10 };

  // Pre-calcular préstamos y dígitos del resultado
  const uBorrow = ad.u < bd.u;           // ¿necesita pedir prestado a las decenas?
  const uEff    = uBorrow ? ad.u + 10 : ad.u;
  const uDigit  = uEff - bd.u;

  const atEff   = uBorrow ? ad.t - 1 : ad.t; // decenas del minuendo tras prestar
  const tBorrow = atEff < bd.t;              // ¿decenas necesitan pedir a centenas?
  const tEff    = tBorrow ? atEff + 10 : atEff;
  const tDigit  = tEff - bd.t;

  const ahEff   = tBorrow ? ad.h - 1 : ad.h;
  const hDigit  = ahEff - bd.h;

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
        setTimeout(() => onSelect(a - b), 600);
      }
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  }

  // Celda de respuesta (igual que en ColumnAdditionGame)
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
          className={`h-[72px] rounded-2xl border-2 border-dashed font-fredoka font-bold text-4xl flex items-center justify-center ${
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

  // Instrucción contextual con el valor efectivo (después de pedir prestado)
  let instruction = "";
  if (step === "u") {
    instruction = uBorrow
      ? `Pide prestado: ${uEff} − ${bd.u}`
      : `Resta las unidades: ${ad.u} − ${bd.u}`;
  } else if (step === "t") {
    instruction = tBorrow
      ? `Pide prestado: ${tEff} − ${bd.t}`
      : `Ahora decenas: ${atEff} − ${bd.t}`;
  } else if (step === "h") {
    instruction = `Ahora centenas: ${ahEff} − ${bd.h}`;
  } else {
    instruction = "¡Bien hecho! 🎉";
  }

  // Insignias "−1" sobre la columna que prestó.
  // Caso normal:  uBorrow=true, tBorrow=false → badge sobre T (dio 1 a U)
  // Cadena:       uBorrow=true, tBorrow=true  → badge sobre H (dio 1 a T, T dio 1 a U)
  //               NO badge sobre T porque T recibió de H y lo pasó a U (queda en 9)
  const showBorrowT = uBorrow && !tBorrow && stepIdx >= 1; // solo T prestó (sin cadena)
  const showBorrowH = tBorrow && stepIdx >= 1;              // H prestó (cadena o solo T)

  // Dígitos del minuendo a mostrar en la fila superior.
  // En préstamo en cadena (e.g. 703: T=0 → pide de H, H: 7→6, T: 0→10→9):
  //   - stepIdx >= 1: H ya prestó a T → mostrar ahEff (6 en vez de 7)
  //   - stepIdx >= 1: T muestra tEff (9), NO atEff (-1)
  const topH = stepIdx >= 1 ? ahEff : ad.h;
  // ahEff = ad.h cuando tBorrow=false (sin cambio), = ad.h-1 cuando tBorrow=true (prestó)
  const topT = stepIdx >= 1 ? (tBorrow ? tEff : atEff) : ad.t;
  // tBorrow: muestra tEff (valor tras recibir de H, e.g. 9). Sin préstamo: atEff (ad.t-1).
  const topU = ad.u;

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5">
      {/* Instrucción */}
      <p className="font-fredoka font-bold text-lg text-ink text-center min-h-7">
        {instruction}
      </p>

      {/* Tablero de resta en columna */}
      <div
        className="bg-white rounded-3xl border border-ink/5 p-5 w-full flex flex-col items-center gap-3"
        style={{ boxShadow: "0 6px 0 #F0E2C8" }}
      >
        <div
          className="grid gap-x-2"
          style={{ gridTemplateColumns: "38px 1fr 1fr 1fr", rowGap: "10px", width: "100%" }}
        >
          {/* Fila de préstamos (encima del minuendo) */}
          <div />
          <div className="flex items-end justify-center h-7">
            {showBorrowH && (
              <span className="drag-pop w-7 h-7 rounded-full bg-pink text-white font-black text-xs flex items-center justify-center">
                −1
              </span>
            )}
          </div>
          <div className="flex items-end justify-center h-7">
            {showBorrowT && (
              <span className="drag-pop w-7 h-7 rounded-full bg-pink text-white font-black text-xs flex items-center justify-center">
                −1
              </span>
            )}
          </div>
          <div className="h-7" />

          {/* Minuendo (fila superior) — muestra el dígito efectivo */}
          <div />
          {([
            { p: "h" as const, val: topH },
            { p: "t" as const, val: topT },
            { p: "u" as const, val: topU },
          ]).map(({ p, val }) => (
            <div
              key={p}
              className={`h-[68px] rounded-2xl ${PLACE_CELL[p]} font-fredoka font-bold text-4xl flex items-center justify-center`}
            >
              {val === 0 && p === "h" ? <span className="opacity-25">0</span> : val}
            </div>
          ))}

          {/* Sustraendo + signo − */}
          <div className="font-fredoka font-bold text-3xl text-pink flex items-center justify-center">
            −
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
