"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

export function PatternContinueGame({
  sequence,
  answer,
  disabled = false,
  onSelect,
}: {
  sequence: string[];
  answer:   string;
  disabled?: boolean;
  onSelect: (v: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [shake,  setShake]  = useState<string | null>(null);

  // Unique shapes from the sequence (no external distractors needed)
  const shapes = [...new Set(sequence)];

  function tap(s: string) {
    if (disabled || picked !== null) return;
    if (s === answer) {
      setPicked(s);
      playTap();
      setTimeout(() => onSelect(s), 600);
    } else {
      playWrong();
      setShake(s);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Pattern sequence + blank slot */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 w-full rounded-3xl bg-white p-4"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        {sequence.map((s, i) => (
          <div
            key={i}
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-cream text-3xl md:text-4xl select-none"
          >
            {s}
          </div>
        ))}

        {/* Blank slot */}
        <div
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl border-[3px] border-dashed text-3xl md:text-4xl select-none transition-all duration-300"
          style={{
            borderColor: picked ? "#34c759" : "#7dd3fc",
            background:  picked ? "#EAFAF0" : "white",
          }}
        >
          {picked ?? (
            <span className="font-fredoka font-bold" style={{ color: "#7dd3fc" }}>?</span>
          )}
        </div>
      </div>

      {/* Tappable shapes */}
      {!picked && (
        <div className="flex gap-4 justify-center flex-wrap">
          {shapes.map((s) => {
            const isShaking = shake === s;
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => tap(s)}
                className="w-20 h-20 flex items-center justify-center rounded-3xl text-5xl active:scale-90 transition-transform select-none"
                style={{
                  background: "white",
                  boxShadow:  isShaking
                    ? "0 0 0 3px #ff5a78, 0 3px 0 #ffbac8"
                    : "0 4px 0 #E0D8CC",
                  animation:  isShaking ? "shakeX 0.42s ease" : undefined,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      )}

      <p className={`font-fredoka font-bold text-sm ${picked ? "text-mint" : "text-ink-soft"}`}>
        {picked ? "¡Así se repite el patrón! 🎉" : "¿Qué figura sigue?"}
      </p>
    </div>
  );
}
