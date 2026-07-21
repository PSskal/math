"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

// 5×5 grid: index = row*5 + col
const GRID = 5;
const SPACING = 38; // px between dots
const PAD = 14;
const TOTAL = PAD * 2 + SPACING * (GRID - 1); // ~166px

function dotXY(idx: number) {
  const col = idx % GRID;
  const row = Math.floor(idx / GRID);
  return { x: PAD + col * SPACING, y: PAD + row * SPACING };
}

export function GridTraceGame({
  vertices,   // ordered dot indices to connect: e.g. [0, 4, 24, 20, 0]
  shapeLabel, // e.g. "un cuadrado"
  disabled = false,
  onSelect,
}: {
  vertices:   number[];
  shapeLabel: string;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [step, setStep]   = useState(0);   // which vertex the child must tap next
  const [shake, setShake] = useState(false);
  const [done, setDone]   = useState(false);

  // Lines already drawn (from start up to current step)
  const drawnEdges = vertices.slice(0, step + 1).map((v, i, arr) =>
    i === 0 ? null : { from: arr[i - 1], to: v }
  ).filter(Boolean) as { from: number; to: number }[];

  // Reference edges (full shape)
  const refEdges = vertices.slice(1).map((v, i) => ({ from: vertices[i], to: v }));

  function tapDot(idx: number) {
    if (disabled || done) return;
    const expected = vertices[step];
    if (idx === expected) {
      playTap();
      const next = step + 1;
      if (next >= vertices.length) {
        setDone(true);
        setTimeout(() => onSelect(1), 700);
      } else {
        setStep(next);
      }
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  const nextDot = done ? -1 : vertices[step];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="font-fredoka font-bold text-sm text-ink-soft">
        Copia {shapeLabel} en la cuadrícula de la derecha
      </p>

      <div className="flex gap-4 items-start justify-center">
        {/* Reference grid */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-fredoka text-xs text-ink-soft">Modelo</span>
          <svg width={TOTAL} height={TOTAL} style={{ userSelect: "none" }}>
            {/* Reference edges */}
            {refEdges.map((e, i) => {
              const a = dotXY(e.from), b = dotXY(e.to);
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#4867f5" strokeWidth={2.5} strokeLinecap="round" />;
            })}
            {/* Dots */}
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const { x, y } = dotXY(i);
              const isVertex = vertices.includes(i);
              return <circle key={i} cx={x} cy={y} r={isVertex ? 4 : 2.5} fill={isVertex ? "#4867f5" : "#cbd5e1"} />;
            })}
          </svg>
        </div>

        {/* Trace grid */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-fredoka text-xs text-ink-soft">Tu turno</span>
          <svg
            width={TOTAL}
            height={TOTAL}
            style={{ userSelect: "none", animation: shake ? "shakeX 0.4s ease" : undefined }}
          >
            {/* Drawn edges */}
            {drawnEdges.map((e, i) => {
              const a = dotXY(e.from), b = dotXY(e.to);
              return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={done ? "#34c759" : "#4867f5"} strokeWidth={2.5} strokeLinecap="round" />;
            })}
            {/* Dots */}
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const { x, y } = dotXY(i);
              const isNext    = i === nextDot;
              const isVisited = vertices.slice(0, step).includes(i);
              const isVertex  = vertices.includes(i);
              return (
                <circle
                  key={i}
                  cx={x} cy={y}
                  r={isNext ? 7 : isVertex ? 4 : 2.5}
                  fill={
                    done       ? "#34c759" :
                    isNext     ? "#ffc94a" :
                    isVisited  ? "#4867f5" :
                    isVertex   ? "#93c5fd" :
                                 "#cbd5e1"
                  }
                  style={{ cursor: (isVertex && !disabled && !done) ? "pointer" : "default" }}
                  onClick={() => tapDot(i)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡Copiaste ${shapeLabel}! 🎉`
          : step === 0
          ? "Toca el punto amarillo para comenzar"
          : `Paso ${step} de ${vertices.length - 1}`}
      </p>
    </div>
  );
}
