"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Point {
  label: string;
  value: number;
}

interface Props {
  points: Point[];
  question: string;
  answerLabel: string;
  scale?: number;
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const W = 260;
const H = 150;
const PAD_L = 26;
const PAD_B = 24;
const PAD_T = 12;
const PAD_R = 12;

export function LineGraphGame({
  points,
  question,
  answerLabel,
  scale = 1,
  color = "#6366f1",
  disabled = false,
  onSelect,
}: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const maxVal = Math.max(...points.map((p) => p.value));
  const gridMax = Math.ceil(maxVal / scale) * scale || scale;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  const coords = points.map((p, i) => {
    const x = PAD_L + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW);
    const y = PAD_T + plotH - (p.value / gridMax) * plotH;
    return { x, y, p };
  });

  const rows = gridMax / scale;

  function tap(label: string) {
    if (disabled || done) return;
    if (label === answerLabel) {
      playTap();
      setPicked(label);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(label);
      setTimeout(() => setShake(null), 500);
    }
  }

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">{question}</p>

      <div className="bg-white rounded-2xl border-2 border-slate-200 p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: W }}>
          {/* Horizontal grid lines + y labels */}
          {Array.from({ length: rows + 1 }).map((_, i) => {
            const y = PAD_T + plotH - (i / rows) * plotH;
            return (
              <g key={i}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_L - 4} y={y + 3} textAnchor="end" fontSize="8" fill="#94a3b8">
                  {i * scale}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={PAD_L} y1={PAD_T + plotH} x2={W - PAD_R} y2={PAD_T + plotH} stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Line */}
          <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

          {/* Points (tappable) */}
          {coords.map(({ x, y, p }) => {
            const isPicked = picked === p.label;
            const isShake = shake === p.label;
            return (
              <g key={p.label} className={isShake ? "animate-bounce" : ""}>
                <circle
                  cx={x}
                  cy={y}
                  r={isPicked ? 8 : 12}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => tap(p.label)}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isPicked ? 6 : 4.5}
                  fill={isPicked ? "#22c55e" : isShake ? "#ef4444" : color}
                  stroke="#fff"
                  strokeWidth="1.5"
                  pointerEvents="none"
                />
                {/* X label */}
                <text x={x} y={PAD_T + plotH + 14} textAnchor="middle" fontSize="8" fill="#64748b">
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">✓ ¡{answerLabel}!</p>
      )}
    </div>
  );
}
