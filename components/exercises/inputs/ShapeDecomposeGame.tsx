"use client";
import { useState } from "react";
import { playTap, playWrong } from "@/lib/gamification/audio";
import { ShapeSvg, SHAPE_LABEL } from "./TapShapesGame";

type RegionDef = {
  id:       string;
  label:    string;
  shape:    string;         // correct shape type
  svgFill:  string;         // always-visible filled SVG markup
  cx:       number;         // center x for label bubble
  cy:       number;         // center y for label bubble
};

type FigureDef = {
  viewBox: string;
  base?:   string;
  regions: RegionDef[];
  palette: string[];
};

const FIGURES: Record<string, FigureDef> = {
  casa: {
    viewBox: "0 0 100 100",
    base: `<rect x="38" y="68" width="24" height="27" fill="#fde68a"/>`,
    regions: [
      {
        id: "techo", label: "el techo", shape: "triangle", cx: 50, cy: 28,
        svgFill: `<polygon points="50,5 93,47 7,47" fill="#f87171"/>`,
      },
      {
        id: "paredes", label: "las paredes", shape: "rectangle", cx: 50, cy: 71,
        svgFill: `<rect x="15" y="47" width="70" height="48" fill="#93c5fd"/>`,
      },
    ],
    palette: ["triangle", "rectangle", "circle", "square"],
  },
  helado: {
    viewBox: "0 0 100 120",
    regions: [
      {
        id: "bola", label: "la bola", shape: "circle", cx: 50, cy: 48,
        svgFill: `<circle cx="50" cy="50" r="36" fill="#f9a8d4"/>`,
      },
      {
        id: "cono", label: "el cono", shape: "triangle", cx: 50, cy: 97,
        svgFill: `<polygon points="50,115 17,75 83,75" fill="#fbbf24"/>`,
      },
    ],
    palette: ["circle", "triangle", "rectangle", "half-circle"],
  },
  flecha: {
    viewBox: "0 0 120 80",
    regions: [
      {
        id: "cuerpo", label: "el cuerpo", shape: "rectangle", cx: 37, cy: 40,
        svgFill: `<rect x="5" y="28" width="65" height="24" fill="#86efac"/>`,
      },
      {
        id: "punta", label: "la punta", shape: "triangle", cx: 92, cy: 40,
        svgFill: `<polygon points="70,10 115,40 70,70" fill="#4ade80"/>`,
      },
    ],
    palette: ["rectangle", "triangle", "circle", "square"],
  },
  seta: {
    viewBox: "0 0 100 120",
    regions: [
      {
        id: "sombrero", label: "el sombrero", shape: "half-circle", cx: 50, cy: 40,
        svgFill: `<path d="M 8,65 A 42,42 0 0 1 92,65 Z" fill="#4ade80"/>`,
      },
      {
        id: "tallo", label: "el tallo", shape: "rectangle", cx: 50, cy: 93,
        svgFill: `<rect x="35" y="65" width="30" height="48" fill="#d9f99d"/>`,
      },
    ],
    palette: ["half-circle", "rectangle", "circle", "triangle"],
  },
  cohete: {
    viewBox: "0 0 100 130",
    regions: [
      {
        id: "nariz", label: "la nariz", shape: "triangle", cx: 50, cy: 22,
        svgFill: `<polygon points="50,5 30,48 70,48" fill="#7c3aed"/>`,
      },
      {
        id: "cuerpo", label: "el cuerpo", shape: "rectangle", cx: 50, cy: 78,
        svgFill: `<rect x="30" y="48" width="40" height="60" fill="#a78bfa"/>`,
      },
    ],
    palette: ["triangle", "rectangle", "circle", "square"],
  },
};

// ── Component ──────────────────────────────────────────────────────────────
export function ShapeDecomposeGame({
  figureName,
  disabled = false,
  onSelect,
}: {
  figureName: string;
  disabled?:  boolean;
  onSelect:   (v: number) => void;
}) {
  const fig = FIGURES[figureName];
  const [step,    setStep]    = useState(0);
  const [solved,  setSolved]  = useState<Set<string>>(new Set());
  const [shake,   setShake]   = useState<string | null>(null);
  const [done,    setDone]    = useState(false);

  if (!fig) return null;

  const current = fig.regions[step];

  function tapShape(type: string) {
    if (disabled || done) return;
    if (type === current.shape) {
      playTap();
      const next = new Set(solved);
      next.add(current.id);
      setSolved(next);
      if (step + 1 >= fig.regions.length) {
        setDone(true);
        setTimeout(() => onSelect(1), 700);
      } else {
        setStep(step + 1);
      }
    } else {
      playWrong();
      setShake(type);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Figure with region labels */}
      <div
        className="rounded-3xl bg-white p-4"
        style={{ boxShadow: "0 4px 0 #E0D8CC" }}
      >
        <svg viewBox={fig.viewBox} width="170" height="170" overflow="visible">
          {/* Render all regions */}
          {fig.regions.map((r) => {
            const isSolved  = solved.has(r.id);
            const isCurrent = !done && r.id === current?.id;
            return (
              <g key={r.id}>
                {/* Region shape */}
                <g
                  dangerouslySetInnerHTML={{ __html: r.svgFill }}
                  opacity={isSolved || done ? 1 : 0.25}
                />
                {/* Highlight ring for active region */}
                {isCurrent && (
                  <g
                    dangerouslySetInnerHTML={{
                      __html: r.svgFill
                        .replace(/fill="[^"]*"/g, 'fill="none"')
                        .replace(/>/, ' stroke="#4867f5" stroke-width="3" stroke-dasharray="5,3"/>'),
                    }}
                  />
                )}
                {/* Label bubble */}
                {!done && (
                  <g>
                    <circle cx={r.cx} cy={r.cy} r="10"
                      fill={isSolved ? "#34c759" : isCurrent ? "#4867f5" : "#e2e8f0"}
                    />
                    <text x={r.cx} y={r.cy + 4} textAnchor="middle"
                      fontSize="10" fontWeight="bold" fill="white" fontFamily="system-ui"
                    >
                      {fig.regions.indexOf(r) + 1}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          {fig.base && <g dangerouslySetInnerHTML={{ __html: fig.base }} />}
        </svg>
      </div>

      {/* Question */}
      <p className="font-fredoka font-bold text-sm text-center" style={{ color: done ? "#34c759" : "#1e293b" }}>
        {done
          ? "¡Identificaste todas las partes! 🎉"
          : `¿Qué figura es ${current?.label}?`}
      </p>

      {/* Shape picker */}
      {!done && (
        <div className="flex gap-3 justify-center flex-wrap">
          {fig.palette.map((type) => {
            const isShaking = shake === type;
            return (
              <button
                key={type}
                type="button"
                disabled={disabled}
                onClick={() => tapShape(type)}
                className="flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2.5 bg-white active:scale-90 transition-transform select-none"
                style={{
                  boxShadow: isShaking
                    ? "0 0 0 3px #ff5a78, 0 3px 0 #ffbac8"
                    : "0 4px 0 #E0D8CC",
                  animation: isShaking ? "shakeX 0.42s ease" : undefined,
                  minWidth: 64,
                }}
              >
                <ShapeSvg type={type} fill="#4867f5" size={36} />
                <span className="font-fredoka text-xs text-ink-soft">{SHAPE_LABEL[type]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
