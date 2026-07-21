"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

interface Props {
  known: number; // the +constant on the left
  total: number; // the right side value
  disabled?: boolean;
  onSelect: (n: number) => void;
}

function Dots({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-0.5 max-w-[90px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-3.5 h-3.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function AlgebraScaleGame({
  known,
  total,
  disabled = false,
  onSelect,
}: Props) {
  const answer = total - known;
  const [xVal, setXVal] = useState(0);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState(false);

  const left = xVal + known;
  const balanced = left === total;
  // Beam tilt: left heavier → left down (positive angle)
  const diff = left - total;
  const angle = done ? 0 : Math.max(-10, Math.min(10, diff * 2.5));

  function addX() {
    if (disabled || done) return;
    playTap();
    const next = xVal + 1;
    setXVal(next);
    if (next + known === total) {
      setDone(true);
      setTimeout(() => onSelect(answer), 800);
    } else if (next + known > total) {
      playWrong();
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
    }
  }

  function removeX() {
    if (disabled || done || xVal === 0) return;
    playTap();
    setXVal(xVal - 1);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <p className="text-center font-fredoka text-slate-700 text-sm px-2">
        Equilibra la balanza: pon peras en la caja{" "}
        <span className="font-bold text-violet-600">x</span> hasta que los dos lados
        pesen igual.
      </p>
      <p className="font-fredoka font-bold text-2xl text-slate-700">
        x + {known} = {total}
      </p>

      {/* Balance */}
      <div className="relative w-full h-40 flex justify-center">
        {/* Beam */}
        <div
          className="absolute top-4 w-64 transition-transform duration-300"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="h-2 bg-slate-400 rounded-full" />
          {/* Left pan */}
          <div className="absolute left-0 top-2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-0.5 h-6 bg-slate-300" />
            <div
              className={`rounded-xl border-2 p-2 flex gap-1 items-center bg-white ${
                wrong ? "border-red-400 animate-bounce" : "border-slate-300"
              }`}
            >
              {/* x-box */}
              <div className="flex flex-col items-center rounded-lg bg-violet-100 border-2 border-violet-300 px-1.5 py-1">
                <span className="text-[10px] font-bold text-violet-600">x</span>
                <Dots count={xVal} color="#a78bfa" />
              </div>
              {/* known dots */}
              <Dots count={known} color="#94a3b8" />
            </div>
          </div>
          {/* Right pan */}
          <div className="absolute right-0 top-2 translate-x-1/2 flex flex-col items-center">
            <div className="w-0.5 h-6 bg-slate-300" />
            <div className="rounded-xl border-2 border-slate-300 p-2 bg-white min-w-[60px] flex justify-center">
              <Dots count={total} color="#60a5fa" />
            </div>
          </div>
        </div>
        {/* Fulcrum */}
        <div className="absolute bottom-0 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-slate-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={removeX}
          disabled={disabled || done || xVal === 0}
          className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 font-fredoka font-bold text-2xl text-slate-500 disabled:opacity-40 active:scale-95"
        >
          −
        </button>
        <span className="font-fredoka font-bold text-xl text-violet-600 w-16 text-center">
          x = {xVal}
        </span>
        <button
          onClick={addX}
          disabled={disabled || done}
          className="w-12 h-12 rounded-2xl bg-violet-500 text-white font-fredoka font-bold text-2xl disabled:opacity-40 active:scale-95"
        >
          +
        </button>
      </div>

      {done && (
        <p className="text-green-600 font-fredoka font-bold text-sm">
          ✓ ¡Equilibrada! x = {answer}
        </p>
      )}
    </div>
  );
}
