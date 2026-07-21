"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

const ORDINALS = ["","1.º","2.º","3.º","4.º","5.º","6.º","7.º","8.º","9.º","10.º"];

export function OrdinalTapGame({
  items,
  targetPos,
  disabled = false,
  onSelect,
}: {
  items:      string[];
  targetPos:  number;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const [done,   setDone]   = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [shake,  setShake]  = useState<number | null>(null);

  function tap(idx: number) {
    if (disabled || done) return;
    if (idx + 1 === targetPos) {
      playTap();
      setPicked(idx);
      setDone(true);
      setTimeout(() => onSelect(1), 700);
    } else {
      playWrong();
      setShake(idx);
      setTimeout(() => setShake(null), 500);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex gap-2 justify-center flex-wrap">
        {items.map((emoji, idx) => {
          const isCorrect = picked === idx;
          const isShake   = shake === idx;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled || done}
              onClick={() => tap(idx)}
              className="flex flex-col items-center gap-1 rounded-2xl p-2 border-2 transition-all active:scale-95 select-none"
              style={{
                borderColor: isCorrect ? "#34c759" : "#E8E0D4",
                background:  isCorrect ? "#EAFAF0" : "white",
                boxShadow:   `0 4px 0 ${isCorrect ? "#9FD9B0" : "#E0D8CC"}`,
                animation:   isShake ? "shakeX .42s ease" : undefined,
                minWidth:    56,
              }}
            >
              <span className="text-3xl">{emoji}</span>
              <span
                className="font-fredoka font-bold text-xs"
                style={{ color: isCorrect ? "#34c759" : "#94a3b8" }}
              >
                {ORDINALS[idx + 1] ?? `${idx + 1}.º`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
