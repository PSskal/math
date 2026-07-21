"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

export function ClockSetGame({
  hour,
  minute,
  disabled = false,
  onSelect,
}: {
  hour:     number;
  minute:   number;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const [curMin, setCurMin] = useState((minute + 30) % 60);
  const [done,   setDone]   = useState(false);

  const SIZE = 230;
  const cx   = SIZE / 2, cy = SIZE / 2;
  const r    = SIZE / 2 - 10;
  const hLen = r * 0.52;
  const mLen = r * 0.76;

  function step(delta: number) {
    if (disabled || done) return;
    const next = ((curMin + delta) % 60 + 60) % 60;
    setCurMin(next);
    playTap();
    if (next === minute) {
      setDone(true);
      setTimeout(() => onSelect(hour * 100 + minute), 700);
    }
  }

  const hourDeg   = (hour % 12) * 30 + curMin * 0.5;
  const minuteDeg = curMin * 6;
  const fmt = (h: number, m: number) => `${h}:${String(m).padStart(2, "0")}`;

  const targetA = (minute * 6 - 90) * (Math.PI / 180);
  const dotR    = mLen * 0.98;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Digital display */}
      <div className="px-6 py-2 rounded-2xl bg-white" style={{ boxShadow: "0 4px 0 #E0D8CC" }}>
        <span
          className="font-fredoka font-bold text-3xl transition-colors duration-150"
          style={{ color: done ? "#34c759" : "#4867f5" }}
        >
          {fmt(hour, curMin)}
        </span>
      </div>

      {/* Clock face (read-only) */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ userSelect: "none" }}
      >
        <circle cx={cx} cy={cy} r={r} fill="white" stroke={done ? "#34c759" : "#e2e8f0"} strokeWidth={done ? 5 : 3} />

        {Array.from({ length: 60 }, (_, i) => {
          const a     = (i * 6 - 90) * (Math.PI / 180);
          const major = i % 5 === 0;
          const inner = r * (major ? 0.82 : 0.90);
          const outer = r * 0.96;
          return (
            <line
              key={i}
              x1={cx + inner * Math.cos(a)} y1={cy + inner * Math.sin(a)}
              x2={cx + outer * Math.cos(a)} y2={cy + outer * Math.sin(a)}
              stroke={major ? "#94a3b8" : "#dde3ea"}
              strokeWidth={major ? 2.5 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Golden target dot */}
        {!done && (
          <circle
            cx={cx + dotR * Math.cos(targetA)}
            cy={cy + dotR * Math.sin(targetA)}
            r={9}
            fill="#ffc94a"
          />
        )}

        {/* Hour hand */}
        <line
          x1={cx} y1={cy}
          x2={cx + hLen * Math.sin(hourDeg * Math.PI / 180)}
          y2={cy - hLen * Math.cos(hourDeg * Math.PI / 180)}
          stroke="#1e293b" strokeWidth={7} strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1={cx} y1={cy}
          x2={cx + mLen * Math.sin(minuteDeg * Math.PI / 180)}
          y2={cy - mLen * Math.cos(minuteDeg * Math.PI / 180)}
          stroke={done ? "#34c759" : "#4867f5"}
          strokeWidth={4}
          strokeLinecap="round"
        />

        <circle cx={cx} cy={cy} r={6} fill="#1e293b" />
      </svg>

      {/* ±5 min buttons */}
      {!done && (
        <div className="flex gap-5 items-center">
          <button
            type="button"
            disabled={disabled}
            onClick={() => step(-5)}
            className="w-16 h-16 rounded-full font-fredoka font-bold text-xl text-white active:scale-90 transition-transform select-none"
            style={{ background: "linear-gradient(135deg,#f87171,#dc2626)", boxShadow: "0 4px 0 #991b1b" }}
          >
            −5
          </button>
          <span className="font-fredoka font-semibold text-sm text-ink-soft">min</span>
          <button
            type="button"
            disabled={disabled}
            onClick={() => step(5)}
            className="w-16 h-16 rounded-full font-fredoka font-bold text-xl text-white active:scale-90 transition-transform select-none"
            style={{ background: "linear-gradient(135deg,#4867f5,#2358c8)", boxShadow: "0 4px 0 #1a3d9e" }}
          >
            +5
          </button>
        </div>
      )}

      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡Las ${fmt(hour, minute)}! 🎉`
          : "Mueve la aguja azul al punto dorado ●"}
      </p>
    </div>
  );
}
