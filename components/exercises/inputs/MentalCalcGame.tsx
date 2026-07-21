"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

function generateStones(start: number, correct: number, amount: number): number[] {
  const step = amount % 100 === 0 ? 100 : amount % 10 === 0 ? 10 : amount;
  const lo = Math.min(start, correct);
  const hi = Math.max(start, correct);

  const all: number[] = [];
  for (let v = lo - 2 * step; v <= hi + 2 * step; v += step) {
    if (v >= 0) all.push(v);
  }

  while (all.length > 5) {
    if (all[0] !== start && all[0] !== correct) all.shift();
    else if (all[all.length - 1] !== start && all[all.length - 1] !== correct) all.pop();
    else break;
  }
  return all;
}

export function MentalCalcGame({
  start,
  op,
  amount,
  disabled = false,
  onSelect,
}: {
  start: number;
  op: "+" | "-";
  amount: number;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const isAdd  = op === "+";
  const correct = isAdd ? start + amount : start - amount;
  const stones  = generateStones(start, correct, amount);

  const startIdx = stones.indexOf(start);
  const [charIdx,  setCharIdx]  = useState(startIdx);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [landed,   setLanded]   = useState(false);

  function tap(value: number, idx: number) {
    if (disabled || landed) return;
    if (value === correct) {
      playTap();
      setCharIdx(idx);
      setLanded(true);
      setTimeout(() => onSelect(correct), 1300);
    } else {
      playWrong();
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 450);
    }
  }

  const opColor  = isAdd ? "bg-mint"  : "bg-pink";
  const opShadow = isAdd ? "#1a9e3e"  : "#c4374f";

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5">

      {/* Operation card */}
      <div
        className="bg-white rounded-3xl px-5 py-4 w-full flex items-center justify-between gap-3"
        style={{ boxShadow: "0 6px 0 #F0E2C8" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-ink-mute leading-none mb-1">Empiezas en</span>
          <span className="font-fredoka font-bold text-4xl text-ink">{start}</span>
        </div>

        <div
          className={`px-4 py-2 rounded-2xl font-fredoka font-bold text-2xl text-white ${opColor}`}
          style={{ boxShadow: `0 3px 0 ${opShadow}` }}
        >
          {op}{amount}
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold text-ink-mute leading-none mb-1">¿Terminas en?</span>
          <div className="w-20 h-[48px] rounded-2xl bg-cream flex items-center justify-center font-fredoka font-bold text-3xl text-amber-600">
            {landed ? correct : "?"}
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p className="font-fredoka font-bold text-base text-ink-mute text-center -mb-1">
        {landed ? "¡Perfecto! 🎉" : "Toca la piedra donde aterriza"}
      </p>

      {/* Stone path */}
      <div
        className="bg-white rounded-3xl p-5 w-full"
        style={{ boxShadow: "0 6px 0 #F0E2C8" }}
      >
        {/* Character + stones */}
        <div className="relative" style={{ paddingTop: "56px" }}>

          {/* Frog character — slides above the stones */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              bottom: "calc(100% - 56px + 8px)",
              left: `${((charIdx + 0.5) / stones.length) * 100}%`,
              transform: "translateX(-50%)",
              transition: "left 0.55s cubic-bezier(.4,1.4,.6,1)",
              fontSize: "36px",
              lineHeight: 1,
            }}
          >
            🐸
          </div>

          {/* Stones row */}
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${stones.length}, 1fr)` }}
          >
            {stones.map((v, i) => {
              const isStart  = v === start && !landed;
              const isLanded = landed && v === correct;
              const isWrong  = wrongIdx === i;

              return (
                <button
                  key={v}
                  type="button"
                  disabled={disabled || landed}
                  onClick={() => tap(v, i)}
                  className={`h-14 rounded-2xl font-fredoka font-bold text-xl transition-all active:scale-95
                    ${isLanded
                      ? "bg-mint text-white drag-pop"
                      : isStart
                      ? "bg-sun-soft text-amber-700"
                      : isWrong
                      ? "bg-peach-soft text-pink"
                      : "bg-cream text-ink hover:bg-sky-soft"
                    } disabled:cursor-default`}
                  style={{
                    boxShadow: isLanded ? `0 4px 0 ${opShadow}` : "0 4px 0 #D9D0C0",
                    animation: isWrong ? "shakeX .45s ease" : undefined,
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>

          {/* Ground line */}
          <div className="mt-2 border-t-2 border-dashed border-ink/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
