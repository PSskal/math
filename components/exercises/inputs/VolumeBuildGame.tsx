"use client";
import { useState } from "react";
import { playTap } from "@/lib/gamification/audio";

interface Props {
  length: number; // cols per layer
  width: number; // rows per layer
  height: number; // number of layers
  color?: string;
  disabled?: boolean;
  onSelect: (n: number) => void;
}

function keyOf(layer: number, r: number, c: number) {
  return `${layer},${r},${c}`;
}

export function VolumeBuildGame({
  length,
  width,
  height,
  color = "#818cf8",
  disabled = false,
  onSelect,
}: Props) {
  const total = length * width * height;
  const [filled, setFilled] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  function tap(k: string) {
    if (disabled || done || filled.has(k)) return;
    playTap();
    const next = new Set(filled);
    next.add(k);
    setFilled(next);
    if (next.size === total) {
      setDone(true);
      setTimeout(() => onSelect(total), 600);
    }
  }

  const cubePx = Math.max(18, Math.min(30, Math.floor(200 / (length * width))));

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Construye el cuboide de{" "}
        <span className="font-bold text-indigo-500">
          {length} × {width} × {height}
        </span>
        . Toca cada cubo.
      </p>

      <div className="flex flex-col gap-3 bg-white rounded-2xl border-2 border-slate-200 p-3">
        {Array.from({ length: height }).map((_, layer) => (
          <div key={layer} className="flex flex-col items-center gap-1">
            <span className="text-xs font-fredoka text-slate-400">
              Capa {layer + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              {Array.from({ length: width }).map((_, r) => (
                <div key={r} className="flex gap-0.5">
                  {Array.from({ length: length }).map((_, c) => {
                    const k = keyOf(layer, r, c);
                    const isFilled = filled.has(k);
                    return (
                      <button
                        key={c}
                        onClick={() => tap(k)}
                        disabled={disabled}
                        style={{
                          width: cubePx,
                          height: cubePx,
                          backgroundColor: isFilled ? color : undefined,
                          boxShadow: isFilled
                            ? "inset -3px -3px 0 rgba(0,0,0,0.15), inset 3px 3px 0 rgba(255,255,255,0.35)"
                            : undefined,
                        }}
                        className={`rounded-sm border transition-all duration-150 ${
                          isFilled
                            ? "border-transparent scale-95"
                            : "bg-slate-50 border-slate-300 hover:bg-indigo-50 hover:border-indigo-300"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 font-fredoka">
        <span className="text-slate-500 text-sm">Cubos:</span>
        <span className="text-2xl font-bold" style={{ color }}>
          {filled.size}
        </span>
        <span className="text-slate-400 text-sm">/ {total}</span>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ Volumen = {length} × {width} × {height} = {total} cubos
        </p>
      )}
    </div>
  );
}
