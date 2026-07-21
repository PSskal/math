"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

export type CirclePart = "center" | "radius" | "diameter" | "circumference";

interface Props {
  targetPart: CirclePart;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const PART_NAME: Record<CirclePart, string> = {
  center: "el centro",
  radius: "el radio",
  diameter: "el diámetro",
  circumference: "la circunferencia (el borde)",
};

const CX = 110;
const CY = 110;
const R = 78;

export function CirclePartsGame({ targetPart, disabled = false, onSelect }: Props) {
  const [picked, setPicked] = useState<CirclePart | null>(null);
  const [shake, setShake] = useState<CirclePart | null>(null);
  const [done, setDone] = useState(false);

  function tap(part: CirclePart) {
    if (disabled || done) return;
    if (part === targetPart) {
      playTap();
      setPicked(part);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(part);
      setTimeout(() => setShake(null), 500);
    }
  }

  const hl = (part: CirclePart) =>
    picked === part ? "#22c55e" : shake === part ? "#ef4444" : undefined;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Toca <span className="font-bold text-violet-600">{PART_NAME[targetPart]}</span>{" "}
        del círculo.
      </p>

      <svg viewBox="0 0 220 220" className="w-64 h-64">
        {/* Circumference (ring) — clickable */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke={hl("circumference") ?? "#7c3aed"}
          strokeWidth={hl("circumference") ? 8 : 4}
          className={`cursor-pointer ${shake === "circumference" ? "animate-bounce" : ""}`}
          onClick={() => tap("circumference")}
        />
        {/* faint fill for context */}
        <circle cx={CX} cy={CY} r={R} fill="#ede9fe" opacity="0.4" pointerEvents="none" />

        {/* Diameter (vertical line) — clickable */}
        <line
          x1={CX} y1={CY - R} x2={CX} y2={CY + R}
          stroke={hl("diameter") ?? "#f59e0b"}
          strokeWidth={hl("diameter") ? 7 : 4}
          className={`cursor-pointer ${shake === "diameter" ? "animate-bounce" : ""}`}
          onClick={() => tap("diameter")}
        />

        {/* Radius (horizontal line to the right) — clickable */}
        <line
          x1={CX} y1={CY} x2={CX + R} y2={CY}
          stroke={hl("radius") ?? "#ec4899"}
          strokeWidth={hl("radius") ? 7 : 4}
          className={`cursor-pointer ${shake === "radius" ? "animate-bounce" : ""}`}
          onClick={() => tap("radius")}
        />

        {/* Center dot — clickable */}
        <circle
          cx={CX} cy={CY} r={hl("center") ? 10 : 7}
          fill={hl("center") ?? "#1e293b"}
          className={`cursor-pointer ${shake === "center" ? "animate-bounce" : ""}`}
          onClick={() => tap("center")}
        />
      </svg>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">✓ ¡Correcto!</p>
      )}
    </div>
  );
}
