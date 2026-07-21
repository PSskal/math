"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface Props {
  slices: Slice[];
  question: string;
  answerLabel: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const CX = 90;
const CY = 90;
const R = 78;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polar(CX, CY, R, endAngle);
  const end = polar(CX, CY, R, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${CX} ${CY} L ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export function PieChartGame({
  slices,
  question,
  answerLabel,
  disabled = false,
  onSelect,
}: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const total = slices.reduce((s, x) => s + x.value, 0);

  // Compute cumulative angles
  let acc = 0;
  const arcs = slices.map((s) => {
    const startAngle = (acc / total) * 360;
    acc += s.value;
    const endAngle = (acc / total) * 360;
    const midAngle = (startAngle + endAngle) / 2;
    const labelPos = polar(CX, CY, R * 0.6, midAngle);
    return { ...s, startAngle, endAngle, labelPos };
  });

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

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">{question}</p>

      <svg viewBox="0 0 180 180" className="w-56 h-56">
        {arcs.map((a) => {
          const isPicked = picked === a.label;
          const isShake = shake === a.label;
          const pctLabel = Math.round((a.value / total) * 100);
          return (
            <g key={a.label} className={isShake ? "animate-bounce" : ""}>
              <path
                d={arcPath(a.startAngle, a.endAngle)}
                fill={a.color}
                stroke="#fff"
                strokeWidth="2"
                opacity={isPicked ? 1 : isShake ? 0.5 : 0.9}
                className="cursor-pointer transition-all"
                style={isPicked ? { filter: "drop-shadow(0 0 4px rgba(34,197,94,0.9))" } : undefined}
                onClick={() => tap(a.label)}
              />
              <text
                x={a.labelPos.x}
                y={a.labelPos.y}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#fff"
                pointerEvents="none"
              >
                {pctLabel}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-xs font-fredoka text-slate-600">{s.label}</span>
          </div>
        ))}
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">✓ ¡{answerLabel}!</p>
      )}
    </div>
  );
}
