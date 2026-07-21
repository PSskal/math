"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";

export function FlashCardMultGame({
  a,
  b,
  disabled = false,
  onSelect,
}: {
  a: number;
  b: number;
  disabled?: boolean;
  onSelect: (v: number) => void;
}) {
  const correct    = a * b;
  const answerLen  = String(correct).length;

  const [entry,   setEntry]   = useState("");
  const [flipped, setFlipped] = useState(false);
  const [shake,   setShake]   = useState(false);

  function press(n: number) {
    if (disabled || flipped || entry.length >= answerLen) return;
    playTap();
    const next = entry + String(n);
    setEntry(next);
    if (next.length === answerLen) {
      if (Number(next) === correct) {
        setFlipped(true);
        setTimeout(() => onSelect(correct), 1600);
      } else {
        playWrong();
        setShake(true);
        setTimeout(() => { setShake(false); setEntry(""); }, 520);
      }
    }
  }

  function del() {
    if (disabled || flipped) return;
    setEntry((e) => e.slice(0, -1));
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5">

      {/* Flash card — 3D flip on correct */}
      <div style={{ perspective: "800px", width: "260px", height: "164px" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(.4,0,.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face — question */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "24px",
              background: "#FFF8D6",
              boxShadow: "0 6px 0 #d4a820",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <span
              className="font-fredoka font-bold text-amber-800"
              style={{ fontSize: "52px", lineHeight: 1 }}
            >
              {a} × {b}
            </span>
            <span className="font-fredoka font-bold text-amber-400 text-2xl">= ?</span>
          </div>

          {/* Back face — answer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "24px",
              background: "#34c759",
              boxShadow: "0 6px 0 #1a9e3e",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <span
              className="font-fredoka font-bold text-white drag-pop"
              style={{ fontSize: "68px", lineHeight: 1 }}
            >
              {correct}
            </span>
            <span className="font-fredoka font-bold text-white/75 text-lg">
              {a} × {b} = {correct} ✓
            </span>
          </div>
        </div>
      </div>

      {/* Digit entry boxes */}
      {!flipped && (
        <div
          className="flex gap-2"
          style={shake ? { animation: "shakeX .42s ease" } : undefined}
        >
          {Array.from({ length: answerLen }, (_, i) => (
            <div
              key={i}
              className={`w-16 h-[68px] rounded-2xl flex items-center justify-center font-fredoka font-bold text-4xl border-2 ${
                shake
                  ? "bg-peach-soft text-pink border-pink/40"
                  : entry[i] !== undefined
                  ? "bg-sun-soft text-amber-700 border-sun/40"
                  : "bg-cream border-dashed border-ink/15"
              }`}
            >
              {entry[i] ?? ""}
            </div>
          ))}
          <button
            type="button"
            disabled={disabled}
            onClick={del}
            className="w-12 h-[68px] rounded-2xl bg-cream text-ink-mute text-xl disabled:opacity-50 active:scale-95 transition-transform"
            style={{ boxShadow: "0 3px 0 #E3D8C3" }}
          >
            ⌫
          </button>
        </div>
      )}

      {/* Numpad */}
      {!flipped && (
        <div className="grid grid-cols-5 gap-2 w-full max-w-xs">
          {Array.from({ length: 10 }, (_, n) => (
            <button
              key={n}
              type="button"
              disabled={disabled}
              onClick={() => press(n)}
              className="h-12 rounded-2xl bg-cream font-fredoka font-bold text-xl text-ink active:scale-95 transition-transform disabled:opacity-50"
              style={{ boxShadow: "0 3px 0 #E3D8C3" }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
