"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

export type NetType = "cube" | "cuboid" | "pyramid" | "cylinder" | "cone";

interface NetOption {
  id: number;
  type: NetType;
}

interface Props {
  solidName: string;
  solidEmoji: string;
  nets: NetOption[];
  correctType: NetType;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const FILL = "#c4b5fd";
const STROKE = "#7c3aed";

function NetSvg({ type }: { type: NetType }) {
  const common = { fill: FILL, stroke: STROKE, strokeWidth: 2, strokeLinejoin: "round" as const };
  switch (type) {
    case "cube":
      // Cross of 6 squares
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="38" y="8" width="24" height="24" {...common} />
          <rect x="14" y="32" width="24" height="24" {...common} />
          <rect x="38" y="32" width="24" height="24" {...common} />
          <rect x="62" y="32" width="24" height="24" {...common} />
          <rect x="38" y="56" width="24" height="24" {...common} />
          <rect x="38" y="80" width="24" height="14" {...common} />
        </svg>
      );
    case "cuboid":
      // Cross of rectangles (taller center column)
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="40" y="6" width="20" height="20" {...common} />
          <rect x="12" y="26" width="28" height="30" {...common} />
          <rect x="40" y="26" width="20" height="30" {...common} />
          <rect x="60" y="26" width="28" height="30" {...common} />
          <rect x="40" y="56" width="20" height="20" {...common} />
          <rect x="40" y="76" width="20" height="18" {...common} />
        </svg>
      );
    case "pyramid":
      // Square base with 4 triangles fanned out
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="38" y="38" width="24" height="24" {...common} />
          <polygon points="38,38 62,38 50,14" {...common} />
          <polygon points="62,38 62,62 86,50" {...common} />
          <polygon points="38,62 62,62 50,86" {...common} />
          <polygon points="38,38 38,62 14,50" {...common} />
        </svg>
      );
    case "cylinder":
      // Two circles + a rectangle (the lateral surface)
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="26" cy="24" r="14" {...common} />
          <rect x="18" y="40" width="64" height="24" {...common} />
          <circle cx="26" cy="80" r="14" {...common} />
        </svg>
      );
    case "cone":
      // Sector + circle
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 18 A 34 34 0 0 1 82 54 Z" {...common} />
          <circle cx="34" cy="76" r="14" {...common} />
        </svg>
      );
  }
}

export function NetMatchGame({
  solidName,
  solidEmoji,
  nets,
  correctType,
  disabled = false,
  onSelect,
}: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function tap(net: NetOption) {
    if (disabled || done) return;
    if (net.type === correctType) {
      playTap();
      setPicked(net.id);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(net.id);
      setTimeout(() => setShake(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        ¿Qué plantilla (red) se dobla para formar un{" "}
        <span className="font-bold text-violet-600">{solidName}</span>?
      </p>

      <div className="text-5xl">{solidEmoji}</div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {nets.map((net) => {
          const isPicked = picked === net.id;
          const isShake = shake === net.id;
          return (
            <button
              key={net.id}
              onClick={() => tap(net)}
              disabled={disabled || done}
              className={`aspect-square bg-white rounded-2xl border-2 p-2 transition-all duration-200
                ${isPicked ? "border-green-400 bg-green-50 scale-105" : "border-slate-200 hover:border-violet-400"}
                ${isShake ? "border-red-400 bg-red-50 animate-bounce" : ""}`}
            >
              <NetSvg type={net.type} />
            </button>
          );
        })}
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">✓ ¡Correcto!</p>
      )}
    </div>
  );
}
