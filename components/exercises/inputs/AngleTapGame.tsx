"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface AngleItem {
  degrees: number;
  id: number;
}

type AngleType = "right" | "acute" | "obtuse";

interface Props {
  angles: AngleItem[];
  targetType: AngleType;
  prompt: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

const TYPE_NAMES: Record<AngleType, string> = {
  right: "ángulo recto",
  acute: "ángulo agudo",
  obtuse: "ángulo obtuso",
};

function getType(degrees: number): AngleType {
  const d = Math.round(degrees);
  if (d === 90) return "right";
  if (d < 90) return "acute";
  return "obtuse";
}

interface AngleSvgProps {
  degrees: number;
  highlight: boolean;
  wrong: boolean;
}

function AngleSvg({ degrees, highlight, wrong }: AngleSvgProps) {
  // Vertex at (48, 72) inside a 96×96 viewBox
  const cx = 48;
  const cy = 72;
  const arm = 34;
  const rad = (degrees * Math.PI) / 180;

  // First arm: rightward (0°)
  const x1 = cx + arm;
  const y1 = cy;

  // Second arm: `degrees` counter-clockwise from first arm
  const x2 = cx + Math.cos(rad) * arm;
  const y2 = cy - Math.sin(rad) * arm; // SVG y flipped

  const isRight = getType(degrees) === "right";

  // Arc from 0° to degrees showing the angle opening
  const arcR = 18;
  const arcEndX = cx + arcR * Math.cos(rad);
  const arcEndY = cy - arcR * Math.sin(rad);
  const largeArc = degrees > 180 ? 1 : 0;

  const stroke = highlight ? "#22c55e" : wrong ? "#ef4444" : "#475569";
  const arcStroke = highlight ? "#86efac" : wrong ? "#fca5a5" : "#94a3b8";

  return (
    <svg viewBox="0 0 96 96" className="w-full h-full">
      {/* First arm (rightward) */}
      <line
        x1={x1} y1={y1} x2={cx} y2={cy}
        stroke={stroke} strokeWidth="3" strokeLinecap="round"
      />
      {/* Second arm (at degrees from horizontal) */}
      <line
        x1={cx} y1={cy} x2={x2} y2={y2}
        stroke={stroke} strokeWidth="3" strokeLinecap="round"
      />
      {/* Right-angle square indicator */}
      {isRight && (
        <polyline
          points={`${cx + 12},${cy} ${cx + 12},${cy - 12} ${cx},${cy - 12}`}
          fill="none" stroke={stroke} strokeWidth="2"
        />
      )}
      {/* Arc showing the angle (non-right angles only) */}
      {!isRight && (
        <path
          d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`}
          fill="none" stroke={arcStroke} strokeWidth="2" strokeDasharray="3 2"
        />
      )}
      {/* Vertex dot */}
      <circle cx={cx} cy={cy} r="3" fill={stroke} />
    </svg>
  );
}

export function AngleTapGame({
  angles,
  targetType,
  prompt,
  disabled = false,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [shake, setShake] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function tap(angle: AngleItem) {
    if (disabled || done) return;
    if (getType(angle.degrees) === targetType) {
      playTap();
      setSelected(angle.id);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(angle.id);
      setTimeout(() => setShake(null), 500);
    }
  }

  const typeLabel = TYPE_NAMES[targetType];

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        {prompt}{" "}
        <span className="text-violet-600 font-bold">{typeLabel}</span>.
      </p>

      <div className="grid grid-cols-2 gap-3 w-full">
        {angles.map((angle) => {
          const isSel = selected === angle.id;
          const isShake = shake === angle.id;
          return (
            <button
              key={angle.id}
              onClick={() => tap(angle)}
              disabled={disabled || done}
              className={`aspect-square bg-white rounded-2xl border-2 p-3 transition-all duration-200
                ${isSel ? "border-green-400 bg-green-50 scale-105" : "border-slate-200 hover:border-violet-400"}
                ${isShake ? "border-red-400 bg-red-50 animate-bounce" : ""}
              `}
            >
              <AngleSvg
                degrees={angle.degrees}
                highlight={isSel}
                wrong={isShake}
              />
            </button>
          );
        })}
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ ¡Correcto!
        </p>
      )}
    </div>
  );
}
