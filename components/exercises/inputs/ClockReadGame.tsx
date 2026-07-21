"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

type ClockOption = { hour: number; minute: number };

function ClockSvg({ hour, minute, size }: { hour: number; minute: number; size: number }) {
  const cx = size / 2, cy = size / 2;
  const r  = size / 2 - size * 0.05;
  const hourDeg   = (hour % 12) * 30 + minute * 0.5;
  const minuteDeg = minute * 6;
  const hLen = r * 0.52;
  const mLen = r * 0.76;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Face */}
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#e2e8f0" strokeWidth={size * 0.05} />
      {/* Hour tick marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        const inner = r * 0.80;
        const outer = r * 0.96;
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(a)} y1={cy + inner * Math.sin(a)}
            x2={cx + outer * Math.cos(a)} y2={cy + outer * Math.sin(a)}
            stroke="#94a3b8"
            strokeWidth={i % 3 === 0 ? size * 0.025 : size * 0.012}
            strokeLinecap="round"
          />
        );
      })}
      {/* Hour hand */}
      <line
        x1={cx} y1={cy}
        x2={cx + hLen * Math.sin(hourDeg * Math.PI / 180)}
        y2={cy - hLen * Math.cos(hourDeg * Math.PI / 180)}
        stroke="#1e293b" strokeWidth={size * 0.055} strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={cx} y1={cy}
        x2={cx + mLen * Math.sin(minuteDeg * Math.PI / 180)}
        y2={cy - mLen * Math.cos(minuteDeg * Math.PI / 180)}
        stroke="#4867f5" strokeWidth={size * 0.035} strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.045} fill="#1e293b" />
    </svg>
  );
}

export function ClockReadGame({
  hour,
  minute,
  options,
  correctIdx,
  disabled = false,
  onSelect,
}: {
  hour:       number;
  minute:     number;
  options:    ClockOption[];
  correctIdx: number;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [picked,   setPicked]   = useState<number | null>(null);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  function tap(idx: number) {
    if (disabled || picked !== null) return;
    playTap();
    if (idx === correctIdx) {
      setPicked(idx);
      setTimeout(() => onSelect(correctIdx), 900);
    } else {
      playWrong();
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
    }
  }

  const fmtTime = (h: number, m: number) =>
    `${h}:${String(m).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Main clock — no label so the child reads it */}
      <div
        className="rounded-full p-3 bg-white"
        style={{ boxShadow: "0 6px 0 #E0D8CC" }}
      >
        <ClockSvg hour={hour} minute={minute} size={160} />
      </div>

      {/* Option clocks */}
      <div className="flex gap-3 justify-center w-full">
        {options.map((opt, idx) => {
          const isCorrect = picked === idx;
          const isShake   = shakeIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => tap(idx)}
              className="flex flex-col items-center gap-1.5 rounded-2xl p-2.5 border-2 active:scale-95 transition-transform"
              style={{
                borderColor: isCorrect ? "#34c759" : isShake ? "#ff5a78" : "#E8E0D4",
                background:  isCorrect ? "#EAFAF0"  : isShake ? "#FFF0F0"  : "white",
                boxShadow:   `0 4px 0 ${isCorrect ? "#9FD9B0" : isShake ? "#FFBAC8" : "#E0D8CC"}`,
                animation:   isShake ? "shakeX .42s ease" : undefined,
                minWidth:    "88px",
              }}
            >
              <ClockSvg hour={opt.hour} minute={opt.minute} size={80} />
              <span
                className="font-fredoka font-bold text-sm"
                style={{ color: isCorrect ? "#34c759" : "#2C2A26" }}
              >
                {fmtTime(opt.hour, opt.minute)}
              </span>
              {isCorrect && (
                <span className="text-xs font-fredoka font-bold text-mint">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
