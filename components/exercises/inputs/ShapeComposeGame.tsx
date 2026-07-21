"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";
import { ShapeSvg, SHAPE_LABEL } from "./TapShapesGame";

// ── Predefined compound figures ────────────────────────────────────────────
type RegionDef = {
  id:        string;
  label:     string;
  shape:     string;
  svgActive: string; // SVG markup when highlighted (dashed, waiting)
  svgSolved: string; // SVG markup when correctly filled
};

type FigureDef = {
  viewBox:  string;
  base:     string; // always-visible SVG (door, window cross, etc.)
  regions:  RegionDef[];
  palette:  string[]; // shape types shown in picker
};

const FIGURES: Record<string, FigureDef> = {
  casa: {
    viewBox: "0 0 100 100",
    base: `<rect x="38" y="68" width="24" height="27" fill="#fde68a"/>`,
    regions: [
      {
        id: "techo", label: "el techo", shape: "triangle",
        svgActive: `<polygon points="50,5 93,47 7,47" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<polygon points="50,5 93,47 7,47" fill="#f87171"/>`,
      },
      {
        id: "paredes", label: "las paredes", shape: "rectangle",
        svgActive: `<rect x="15" y="47" width="70" height="48" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<rect x="15" y="47" width="70" height="48" fill="#93c5fd"/>`,
      },
    ],
    palette: ["triangle", "rectangle", "circle", "square"],
  },
  helado: {
    viewBox: "0 0 100 120",
    base: "",
    regions: [
      {
        id: "cono", label: "el cono", shape: "triangle",
        svgActive: `<polygon points="50,115 17,75 83,75" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<polygon points="50,115 17,75 83,75" fill="#fbbf24"/>`,
      },
      {
        id: "bola", label: "la bola", shape: "circle",
        svgActive: `<circle cx="50" cy="50" r="36" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<circle cx="50" cy="50" r="36" fill="#f9a8d4"/>`,
      },
    ],
    palette: ["circle", "triangle", "rectangle", "square"],
  },
  seta: {
    viewBox: "0 0 100 120",
    base: "",
    regions: [
      {
        id: "tallo", label: "el tallo", shape: "rectangle",
        svgActive: `<rect x="35" y="65" width="30" height="48" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<rect x="35" y="65" width="30" height="48" fill="#d9f99d"/>`,
      },
      {
        id: "sombrero", label: "el sombrero", shape: "half-circle",
        svgActive: `<path d="M 8,65 A 42,42 0 0 1 92,65 Z" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<path d="M 8,65 A 42,42 0 0 1 92,65 Z" fill="#4ade80"/>`,
      },
    ],
    palette: ["half-circle", "rectangle", "circle", "triangle"],
  },
  reloj: {
    viewBox: "0 0 100 130",
    base: `<line x1="50" y1="42" x2="50" y2="22" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
           <line x1="50" y1="42" x2="65" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>`,
    regions: [
      {
        id: "esfera", label: "la esfera", shape: "circle",
        svgActive: `<circle cx="50" cy="42" r="36" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<circle cx="50" cy="42" r="36" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>`,
      },
      {
        id: "base", label: "la base", shape: "rectangle",
        svgActive: `<rect x="32" y="76" width="36" height="44" fill="#f1f5f9" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="5,3"/>`,
        svgSolved: `<rect x="32" y="76" width="36" height="44" fill="#94a3b8"/>`,
      },
    ],
    palette: ["circle", "rectangle", "triangle", "square"],
  },
};

// ── Component ──────────────────────────────────────────────────────────────
export function ShapeComposeGame({
  figureName,
  disabled = false,
  onSelect,
}: {
  figureName: string;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const fig = FIGURES[figureName];
  const [step,  setStep]  = useState(0);
  const [shake, setShake] = useState(false);
  const [done,  setDone]  = useState(false);

  if (!fig) return null;

  const current = fig.regions[step];
  const solved  = fig.regions.slice(0, step);

  function tapShape(type: string) {
    if (disabled || done) return;
    if (type === current.shape) {
      playTap();
      const next = step + 1;
      if (next >= fig.regions.length) {
        setDone(true);
        setStep(next);
        setTimeout(() => onSelect(1), 700);
      } else {
        setStep(next);
      }
    } else {
      playWrong();
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Instruction */}
      <p className="font-fredoka font-bold text-sm text-ink-soft">
        {done
          ? "¡Figura completa! 🎉"
          : `¿Qué figura es ${current.label}?`}
      </p>

      {/* Figure SVG */}
      <div
        className="rounded-3xl bg-white p-4"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        <svg viewBox={fig.viewBox} width="160" height="160" overflow="visible">
          {/* Solved regions */}
          {solved.map((r) => (
            <g key={r.id} dangerouslySetInnerHTML={{ __html: r.svgSolved }} />
          ))}
          {/* Current region (active / highlighted) */}
          {!done && current && (
            <g dangerouslySetInnerHTML={{ __html: current.svgActive }} />
          )}
          {/* Remaining regions (grey outlines) */}
          {!done && fig.regions.slice(step + 1).map((r) => (
            <g key={r.id} dangerouslySetInnerHTML={{ __html: r.svgActive.replace("#7dd3fc", "#e2e8f0").replace("5,3", "3,3") }} />
          ))}
          {/* Done — show last solved */}
          {done && fig.regions.map((r) => (
            <g key={r.id} dangerouslySetInnerHTML={{ __html: r.svgSolved }} />
          ))}
          {/* Always-visible base elements (door, clock hands, etc.) */}
          {fig.base && <g dangerouslySetInnerHTML={{ __html: fig.base }} />}
        </svg>
      </div>

      {/* Shape palette */}
      {!done && (
        <div
          className="flex gap-3 justify-center flex-wrap"
          style={{ animation: shake ? "shakeX 0.42s ease" : undefined }}
        >
          {fig.palette.map((type) => (
            <button
              key={type}
              type="button"
              disabled={disabled}
              onClick={() => tapShape(type)}
              className="flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2.5 bg-white active:scale-90 transition-transform select-none"
              style={{ boxShadow: "0 4px 0 #E0D8CC", minWidth: 64 }}
            >
              <ShapeSvg type={type} fill="#4867f5" size={36} />
              <span className="font-fredoka text-xs text-ink-soft">{SHAPE_LABEL[type]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
