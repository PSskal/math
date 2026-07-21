"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

export type ShapeItem = { type: string; color: string };

export function ShapeSvg({ type, fill, size = 44 }: { type: string; fill: string; size?: number }) {
  if (type === "triangle")
    return <svg viewBox="0 0 100 100" width={size} height={size}><polygon points="50,6 94,92 6,92" fill={fill} /></svg>;
  if (type === "square")
    return <svg viewBox="0 0 100 100" width={size} height={size}><rect x="6" y="6" width="88" height="88" rx="4" fill={fill} /></svg>;
  if (type === "rectangle")
    return <svg viewBox="0 0 100 60" width={size} height={Math.round(size * 0.6)}><rect x="4" y="4" width="92" height="52" rx="4" fill={fill} /></svg>;
  if (type === "circle")
    return <svg viewBox="0 0 100 100" width={size} height={size}><circle cx="50" cy="50" r="44" fill={fill} /></svg>;
  if (type === "half-circle")
    return <svg viewBox="0 0 100 56" width={size} height={Math.round(size * 0.56)}><path d="M 6,50 A 44,44 0 0 1 94,50 Z" fill={fill} /></svg>;
  if (type === "quarter-circle")
    return <svg viewBox="0 0 100 100" width={size} height={size}><path d="M 6,94 A 88,88 0 0 1 94,6 L 6,6 Z" fill={fill} /></svg>;
  return null;
}

export const SHAPE_LABEL: Record<string, string> = {
  "triangle":       "triángulo",
  "square":         "cuadrado",
  "rectangle":      "rectángulo",
  "circle":         "círculo",
  "half-circle":    "semicírculo",
  "quarter-circle": "cuarto de círculo",
};

export function TapShapesGame({
  shapes,
  target,
  disabled = false,
  onSelect,
}: {
  shapes:   ShapeItem[];
  target:   string;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [shake,  setShake]  = useState<Set<number>>(new Set());
  const [done,   setDone]   = useState(false);

  const correctIndices = shapes
    .map((s, i) => (s.type === target ? i : -1))
    .filter((i) => i >= 0);

  function tap(idx: number) {
    if (disabled || done || tapped.has(idx)) return;
    if (shapes[idx].type === target) {
      playTap();
      const next = new Set(tapped);
      next.add(idx);
      setTapped(next);
      if (next.size === correctIndices.length) {
        setDone(true);
        setTimeout(() => onSelect(1), 600);
      }
    } else {
      playWrong();
      const next = new Set(shake);
      next.add(idx);
      setShake(next);
      setTimeout(() => {
        setShake((prev) => { const s = new Set(prev); s.delete(idx); return s; });
      }, 420);
    }
  }

  const label = SHAPE_LABEL[target] ?? target;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Instruction badge */}
      <div
        className="px-5 py-2 rounded-2xl bg-white font-fredoka font-bold text-base"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        Toca todos los{" "}
        <span style={{ color: "#4867f5" }}>{label}s</span>
      </div>

      {/* Shape grid */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {shapes.map((s, i) => {
          const isTapped  = tapped.has(i);
          const isShaking = shake.has(i);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || isTapped}
              onClick={() => tap(i)}
              className="flex items-center justify-center rounded-2xl p-3 active:scale-90 transition-all duration-200 select-none"
              style={{
                background:  isTapped ? "#EAFAF0" : "white",
                border:      `2px solid ${isTapped ? "#34c759" : "transparent"}`,
                boxShadow:   isTapped ? "0 3px 0 #9FD9B0" : isShaking ? "0 0 0 3px #ff5a78" : "0 4px 0 #E0D8CC",
                animation:   isShaking ? "shakeX 0.42s ease" : undefined,
                cursor:      isTapped ? "default" : "pointer",
              }}
            >
              <ShapeSvg type={s.type} fill={isTapped ? "#34c759" : s.color} />
            </button>
          );
        })}
      </div>

      <p className={`font-fredoka font-bold text-sm ${done ? "text-mint" : "text-ink-soft"}`}>
        {done
          ? `¡Encontraste todos los ${label}s! 🎉`
          : tapped.size === 0
          ? `Hay ${correctIndices.length} ${label}s`
          : `${tapped.size} de ${correctIndices.length} · ¡sigue!`}
      </p>
    </div>
  );
}
