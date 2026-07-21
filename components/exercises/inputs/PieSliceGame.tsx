"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

const CX = 110, CY = 110, R = 96, SIZE = 220;

function slicePath(total: number, i: number): string {
  const a0 = (i / total) * 2 * Math.PI - Math.PI / 2;
  const a1 = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2;
  const x1 = CX + R * Math.cos(a0);
  const y1 = CY + R * Math.sin(a0);
  const x2 = CX + R * Math.cos(a1);
  const y2 = CY + R * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${CX} ${CY} L ${x1.toFixed(3)} ${y1.toFixed(3)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
}

export function PieSliceGame({
  slices,
  target,
  disabled = false,
  onSelect,
}: {
  slices: number;
  target: number;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [locked,   setLocked]   = useState(false);

  function toggle(i: number) {
    if (disabled || locked) return;
    playTap();
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
    if (next.size === target) {
      setLocked(true);
      setTimeout(() => onSelect(target), 600);
    }
  }

  const count = selected.size;
  const done  = locked;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Fraction label */}
      <div className="flex items-center gap-2 font-fredoka font-bold">
        <span className="text-base text-ink-soft">Colorea</span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-3xl text-sky font-black">{target}</span>
          <div className="w-7 h-0.5 bg-ink/30 my-0.5" />
          <span className="text-3xl text-ink">{slices}</span>
        </div>
        <span className="text-base text-ink-soft">del pastel</span>
      </div>

      {/* SVG Pie */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ touchAction: "none", cursor: disabled ? "default" : "pointer" }}
      >
        {/* Base circle */}
        <circle cx={CX} cy={CY} r={R} fill="#FFF0E0" />
        {/* Slices */}
        {Array.from({ length: slices }, (_, i) => (
          <path
            key={i}
            d={slicePath(slices, i)}
            fill={selected.has(i) ? "#ffc94a" : "#FFF0E0"}
            stroke="white"
            strokeWidth="3"
            style={{ transition: "fill .15s", cursor: disabled ? "default" : "pointer" }}
            onClick={() => !disabled && toggle(i)}
          />
        ))}
        {/* Border ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#D4B896" strokeWidth="2.5" />
        {/* Center dot */}
        <circle cx={CX} cy={CY} r={4} fill="#D4B896" />
      </svg>

      {/* Status */}
      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡${count}/${slices} coloreados! 🎉`
          : `${count} de ${target} gajos coloreados`}
      </p>
    </div>
  );
}
