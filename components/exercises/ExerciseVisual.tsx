// components/exercises/ExerciseVisual.tsx
// Visual del ejercicio. NO depende del `kind` (que es la interacción), sino
// de `payload.visual` — un hint del seeder/generator sobre qué dibujar.
//
// Esto permite que dos exercises con el mismo kind (MULTIPLE_CHOICE) tengan
// visuales totalmente distintos: uno cuenta estrellas, otro compara números,
// otro pregunta paridad. El motor sigue siendo el mismo.
import type { ExerciseDTO } from "./types";
import { countCols, countSizeCls } from "@/lib/learning/visual-layout";

const ITEM_CLS = "text-5xl md:text-7xl";

export function ExerciseVisual({ ex }: { ex: ExerciseDTO }) {
  const visual = typeof ex.payload.visual === "string" ? ex.payload.visual : null;

  switch (visual) {
    case "count": {
      const { item, count } = ex.payload as { item: string; count: number };
      const cols = countCols(count);
      const sizeCls = countSizeCls(count);
      return (
        <div
          className="grid justify-center gap-2 md:gap-3 max-w-lg mx-auto"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, auto))` }}
        >
          {Array.from({ length: count }).map((_, idx) => (
            <span key={idx} className={`${sizeCls} leading-none`}>{item}</span>
          ))}
        </div>
      );
    }

    case "subtract": {
      const { total, removed, item } = ex.payload as { total: number; removed: number; item: string };
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-lg">
            {Array.from({ length: total }).map((_, i) => {
              const isRemoved = i < removed;
              return (
                <span
                  key={i}
                  className={`${ITEM_CLS} relative inline-block ${isRemoved ? "subtract-removed" : ""}`}
                  style={isRemoved ? { animationDelay: `${i * 120}ms` } : undefined}
                  aria-hidden={isRemoved}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div className="text-xs md:text-sm font-bold text-ink-soft">
            <span className="text-pink">−{removed}</span>{" "}
            <span aria-hidden>{item.repeat(Math.min(removed, 3))}</span>
            {removed > 3 ? "…" : ""}
          </div>
        </div>
      );
    }

    case "fill": {
      const { a, result } = ex.payload as { a: number; result: number };
      return (
        <div className="font-fredoka text-5xl md:text-7xl font-bold text-ink">
          {a} + ? = {result}
        </div>
      );
    }

    case "compare": {
      const { left, right } = ex.payload as { left: number; right: number };
      return (
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <NumberCard n={left}/>
          <span className="font-fredoka text-3xl md:text-5xl font-bold text-ink-mute">?</span>
          <NumberCard n={right}/>
        </div>
      );
    }

    // "parity" no se renderea aquí: el ExerciseRunner lo rutea al
    // ParityHammerGame, donde partir el grupo con el martillo ES el visual.

    case "number-card": {
      const { digit } = ex.payload as { digit: number };
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-[2rem] border-4 border-white bg-sky-soft px-12 py-8 shadow-[var(--shadow-chunky)]">
            <span className="font-fredoka text-[130px] md:text-[190px] font-bold leading-none text-sky">
              {digit}
            </span>
          </div>
          <div className="text-[10px] font-black tracking-widest text-ink-mute">
            MIRA SU FORMA
          </div>
        </div>
      );
    }

    case "empty-box": {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-36 w-48 items-center justify-center rounded-[2rem] border-4 border-dashed border-ink/15 bg-cream text-6xl shadow-(--shadow-chunky-sm)">
            📦
          </div>
          <div className="font-fredoka text-2xl font-bold text-ink-soft">
            vacío
          </div>
        </div>
      );
    }

    case "pattern": {
      const { visible, step } = ex.payload as { visible: number[]; step: number };
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
            {visible.map((n, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <NumberCard n={n}/>
                <span className="font-fredoka text-2xl md:text-3xl font-bold text-ink-mute" aria-hidden>→</span>
              </div>
            ))}
            <NumberCard placeholder/>
          </div>
          <div className="text-[10px] font-bold text-ink-mute tracking-widest mt-1">
            VAN DE A {step}
          </div>
        </div>
      );
    }

    case "neighbor": {
      const { value, direction } = ex.payload as { value: number; direction: "before" | "after" };
      return (
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {direction === "before" ? (
            <>
              <NumberCard placeholder/>
              <span className="font-fredoka text-2xl md:text-3xl font-bold text-ink-mute" aria-hidden>→</span>
              <NumberCard n={value}/>
            </>
          ) : (
            <>
              <NumberCard n={value}/>
              <span className="font-fredoka text-2xl md:text-3xl font-bold text-ink-mute" aria-hidden>→</span>
              <NumberCard placeholder/>
            </>
          )}
        </div>
      );
    }

    case "drag": {
      // El visual real lo dibuja DragInput. Aquí no mostramos nada extra.
      return null;
    }

    case "draw": {
      // Idem TraceCanvas.
      return null;
    }

    case "same-match": {
      const { left = [], right = [] } = ex.payload as {
        left?: { emoji: string }[];
        right?: { emoji: string }[];
      };
      return (
        <div className="flex items-center justify-center gap-4 text-3xl md:text-4xl">
          <EmojiStrip items={left.map((i) => i.emoji)} />
          <span className="font-fredoka font-bold text-ink-mute">↔</span>
          <EmojiStrip items={right.map((i) => i.emoji)} />
        </div>
      );
    }

    case "sort-attribute": {
      const { items = [], categories = [] } = ex.payload as {
        items?: { emoji: string }[];
        categories?: { label: string; emoji?: string }[];
      };
      return (
        <div className="flex flex-col items-center gap-3">
          <EmojiStrip items={items.map((i) => i.emoji)} />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c, i) => (
              <span key={i} className="rounded-full bg-mint-soft px-3 py-1 text-xs font-black text-ink-soft">
                {c.emoji ? `${c.emoji} ` : ""}{c.label}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case "compare-attribute": {
      const { left, right } = ex.payload as {
        left?: { emoji: string; label?: string; size?: number };
        right?: { emoji: string; label?: string; size?: number };
      };
      return (
        <div className="flex items-end justify-center gap-8">
          {left && <ScaledEmoji emoji={left.emoji} label={left.label} size={left.size ?? 1} />}
          {right && <ScaledEmoji emoji={right.emoji} label={right.label} size={right.size ?? 1} />}
        </div>
      );
    }

    case "order-objects": {
      const { objects = [] } = ex.payload as { objects?: { emoji: string; size?: number; label?: string }[] };
      return (
        <div className="flex items-end justify-center gap-3 md:gap-4 flex-wrap">
          {objects.map((object, i) => (
            <ScaledEmoji key={i} emoji={object.emoji} label={object.label} size={object.size ?? 1} />
          ))}
        </div>
      );
    }

    case "pattern-next": {
      const { sequence = [] } = ex.payload as { sequence?: string[] };
      return (
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
          {sequence.map((item, i) => (
            <span key={i} className="text-4xl md:text-6xl leading-none">{item}</span>
          ))}
          <NumberCard placeholder />
        </div>
      );
    }

    case "flash-quantity": {
      const { item, count, arrangement } = ex.payload as { item: string; count: number; arrangement?: string };
      return (
        <div className="flex flex-col items-center gap-2">
          <div className={`grid gap-2 ${arrangement === "dice" ? "grid-cols-3" : count === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
            {Array.from({ length: count }).map((_, i) => (
              <span key={i} className="text-4xl md:text-6xl leading-none">{item}</span>
            ))}
          </div>
          <div className="text-[10px] font-black text-ink-mute tracking-widest">MIRA EL GRUPO COMPLETO</div>
        </div>
      );
    }

    case "conservation": {
      const { item, count } = ex.payload as { item: string; count: number };
      return (
        <div className="flex flex-col items-center gap-4">
          <EmojiStrip items={Array.from({ length: count }, () => item)} />
          <EmojiStrip spread items={Array.from({ length: count }, () => item)} />
        </div>
      );
    }

    case "compare-groups": {
      const { left, right } = ex.payload as {
        left?: { item: string; count: number };
        right?: { item: string; count: number };
      };
      return (
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <GroupBox label="Izquierda" group={left} />
          <GroupBox label="Derecha" group={right} />
        </div>
      );
    }

    case "part-whole": {
      const { item, total } = ex.payload as { item: string; total: number };
      return <EmojiStrip items={Array.from({ length: total }, () => item)} />;
    }

    case "place-value": {
      const { hundreds = 0, tens = 0, ones = 0, value } = ex.payload as {
        hundreds?: number;
        tens?: number;
        ones?: number;
        value?: number;
      };
      return (
        <div className="flex flex-col items-center gap-4">
          {typeof value === "number" && (
            <div className="font-fredoka text-4xl font-bold text-sky">{value}</div>
          )}
          <div className="flex flex-wrap justify-center gap-5">
            {hundreds > 0 && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] font-black tracking-widest text-ink-mute">CENTENAS</div>
                <div className="flex flex-wrap justify-center gap-2 max-w-56">
                  {Array.from({ length: hundreds }).map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-px rounded-xl bg-lilac/20 p-1.5 shadow-(--shadow-chunky-sm)">
                      {Array.from({ length: 25 }).map((_, j) => (
                        <span key={j} className="h-2 w-2 rounded-sm bg-lilac" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tens > 0 && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] font-black tracking-widest text-ink-mute">DECENAS</div>
                <div className="flex flex-wrap justify-center gap-2 max-w-48">
                  {Array.from({ length: tens }).map((_, i) => (
                    <div key={i} className="grid grid-cols-2 gap-0.5 rounded-xl bg-sky-soft p-1.5 shadow-(--shadow-chunky-sm)">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <span key={j} className="h-2.5 w-2.5 rounded-full bg-sky" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {ones > 0 && (
              <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] font-black tracking-widest text-ink-mute">UNIDADES</div>
                <div className="flex flex-wrap justify-center gap-1.5 max-w-36">
                  {Array.from({ length: ones }).map((_, i) => (
                    <span key={i} className="h-5 w-5 rounded-full bg-sun shadow-(--shadow-chunky-sm)" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // "mult-array-build" no se renderea aquí: el ExerciseRunner lo rutea al
    // MultiplicationBuildGame, donde construir el arreglo ES el visual.

    case "fraction-bar": {
      const { numerator, denominator } = ex.payload as {
        numerator: number;
        denominator: number;
      };
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            {Array.from({ length: denominator }).map((_, i) => (
              <div
                key={i}
                className={`h-14 rounded-xl border-2 border-white shadow-(--shadow-chunky-sm) transition-colors ${
                  i < numerator ? "bg-sky" : "bg-cream"
                }`}
                style={{ width: `${Math.min(56, Math.floor(280 / denominator))}px` }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center leading-none font-fredoka font-bold">
            <span className="text-4xl text-sky">{numerator}</span>
            <div className="my-1 h-0.5 w-10 rounded-full bg-ink" />
            <span className="text-4xl text-ink">{denominator}</span>
          </div>
        </div>
      );
    }

    case "clock-face": {
      const { hours = 0, minutes = 0 } = ex.payload as {
        hours?: number;
        minutes?: number;
      };
      const hourDeg = (hours % 12) * 30 + minutes * 0.5;
      const minuteDeg = minutes * 6;
      return (
        <div className="flex flex-col items-center gap-3">
          <svg width="160" height="160" viewBox="0 0 160 160" aria-label={`${hours}:${String(minutes).padStart(2, "0")}`}>
            {/* Cara */}
            <circle cx="80" cy="80" r="74" fill="white" stroke="#e2e8f0" strokeWidth="8" />
            {/* Marcas de hora */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 80 + 60 * Math.cos(a);
              const y1 = 80 + 60 * Math.sin(a);
              const x2 = 80 + 70 * Math.cos(a);
              const y2 = 80 + 70 * Math.sin(a);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={i % 3 === 0 ? 3 : 1.5} strokeLinecap="round" />;
            })}
            {/* Manecilla hora */}
            <line
              x1="80" y1="80"
              x2={80 + 38 * Math.sin(hourDeg * Math.PI / 180)}
              y2={80 - 38 * Math.cos(hourDeg * Math.PI / 180)}
              stroke="#1e293b" strokeWidth="5" strokeLinecap="round"
            />
            {/* Manecilla minutos */}
            <line
              x1="80" y1="80"
              x2={80 + 54 * Math.sin(minuteDeg * Math.PI / 180)}
              y2={80 - 54 * Math.cos(minuteDeg * Math.PI / 180)}
              stroke="#4867f5" strokeWidth="3" strokeLinecap="round"
            />
            {/* Centro */}
            <circle cx="80" cy="80" r="4" fill="#1e293b" />
          </svg>
          <div className="font-fredoka text-2xl font-bold text-ink">
            {hours}:{String(minutes).padStart(2, "0")}
          </div>
        </div>
      );
    }

    case "number-line": {
      const { sequence = [] } = ex.payload as { sequence?: Array<number | null> };
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sequence.map((n, i) => (
              <div key={i} className="flex items-center gap-2">
                <NumberCard n={typeof n === "number" ? n : undefined} placeholder={n === null} />
                {i < sequence.length - 1 && (
                  <span className="font-fredoka text-xl font-bold text-ink-mute" aria-hidden>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "ordinal-line": {
      const { items = [], targetIndex } = ex.payload as {
        items?: string[];
        targetIndex?: number;
      };
      return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex h-16 w-16 flex-col items-center justify-center rounded-2xl border-4 bg-white font-black shadow-(--shadow-chunky-sm) ${
                i === targetIndex ? "border-sky text-sky" : "border-cream text-ink-soft"
              }`}
            >
              <span className="text-2xl leading-none">{item}</span>
              <span className="text-[10px]">{i + 1}</span>
            </div>
          ))}
        </div>
      );
    }

    case "money": {
      const { coins = [] } = ex.payload as { coins?: number[] };
      return (
        <div className="flex flex-wrap justify-center gap-3">
          {coins.map((coin, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-sun-soft font-fredoka text-lg font-bold text-ink shadow-(--shadow-chunky-sm)"
            >
              S/{coin}
            </div>
          ))}
        </div>
      );
    }

    case "length-bars": {
      const { bars = [] } = ex.payload as {
        bars?: { id: string; label: string; length: number; color?: string }[];
      };
      return (
        <div className="flex w-full max-w-md flex-col gap-3">
          {bars.map((bar) => (
            <div key={bar.id} className="flex items-center gap-3">
              <div className="w-20 text-right text-sm font-black text-ink-soft">{bar.label}</div>
              <div
                className={`h-8 rounded-full ${bar.color ?? "bg-sky"}`}
                style={{ width: `${Math.max(20, bar.length * 10)}px` }}
              />
            </div>
          ))}
        </div>
      );
    }

    case "clock": {
      const { time } = ex.payload as { time?: string };
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-sky-soft bg-white shadow-[var(--shadow-chunky)]">
            <div className="font-fredoka text-4xl font-bold text-sky">{time}</div>
          </div>
          <div className="text-[10px] font-black tracking-widest text-ink-mute">LEE LA HORA</div>
        </div>
      );
    }

    case "shapes": {
      const { shapes = [] } = ex.payload as {
        shapes?: { symbol: string; label?: string; color?: string }[];
      };
      return (
        <div className="flex flex-wrap justify-center gap-3">
          {shapes.map((shape, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-cream text-5xl ${shape.color ?? "text-sky"}`}>
                {shape.symbol}
              </div>
              {shape.label && <span className="text-[10px] font-black text-ink-soft">{shape.label}</span>}
            </div>
          ))}
        </div>
      );
    }

    case "picture-graph": {
      const { rows = [] } = ex.payload as {
        rows?: { label: string; icon: string; count: number }[];
      };
      return (
        <div className="flex w-full max-w-md flex-col gap-3">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[90px_1fr] items-center gap-3">
              <div className="text-right text-sm font-black text-ink-soft">{row.label}</div>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: row.count }).map((_, i) => (
                  <span key={i} className="text-2xl leading-none">{row.icon}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // ── NUMBER BOND ─────────────────────────────────────────────────────────
    // Singapore-style part-whole diagram. partA / partB / whole: null = the "?".
    case "number-bond": {
      const { whole, partA, partB } = ex.payload as {
        whole: number | null;
        partA: number | null;
        partB: number | null;
      };
      return (
        <div className="flex flex-col items-center gap-1 py-2">
          <div className="flex items-end gap-10">
            <BondCircle value={partA} variant="part" />
            <BondCircle value={partB} variant="part" />
          </div>
          <svg width="180" height="44" viewBox="0 0 180 44" className="overflow-visible" aria-hidden>
            {/* Lines from part circles to whole circle */}
            <line x1="42" y1="2" x2="90" y2="42" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="138" y1="2" x2="90" y2="42" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <BondCircle value={whole} variant="whole" />
        </div>
      );
    }

    // ── BALANCE SCALE ────────────────────────────────────────────────────────
    // SVG balance scale. Tilts to show which side is heavier — the child must
    // then pick <, =, or > to name the relationship.
    case "balance-scale": {
      const { left, right } = ex.payload as { left: number | string; right: number | string };
      const lv = parseFloat(String(left));
      const rv = parseFloat(String(right));
      // Fixed tilt: 10° toward the heavier side. 0° if equal or unparseable.
      const tilt = (!isNaN(lv) && !isNaN(rv)) ? (lv > rv ? 10 : lv < rv ? -10 : 0) : 0;
      const rad  = (tilt * Math.PI) / 180;
      const CX = 110; const CY = 62;
      const ARM = 76; // half-beam length
      const lx = CX - ARM * Math.cos(rad);
      const ly = CY - ARM * Math.sin(rad);
      const rx = CX + ARM * Math.cos(rad);
      const ry = CY + ARM * Math.sin(rad);
      const ROPE = 32;
      return (
        <div className="flex flex-col items-center gap-2">
          <svg width="220" height="160" viewBox="0 0 220 160" aria-label={`${left} comparado con ${right}`}>
            {/* Stand */}
            <rect x="106" y={CY} width="8" height="72" fill="#94a3b8" rx="3"/>
            <ellipse cx="110" cy="134" rx="30" ry="7" fill="#64748b"/>
            {/* Beam */}
            <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#334155" strokeWidth="6" strokeLinecap="round"/>
            {/* Left ropes + pan */}
            <line x1={lx-12} y1={ly+2} x2={lx-16} y2={ly+ROPE} stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1={lx+12} y1={ly+2} x2={lx+16} y2={ly+ROPE} stroke="#94a3b8" strokeWidth="1.5"/>
            <ellipse cx={lx} cy={ly+ROPE+5} rx="22" ry="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
            {/* Right ropes + pan */}
            <line x1={rx-12} y1={ry+2} x2={rx-16} y2={ry+ROPE} stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1={rx+12} y1={ry+2} x2={rx+16} y2={ry+ROPE} stroke="#94a3b8" strokeWidth="1.5"/>
            <ellipse cx={rx} cy={ry+ROPE+5} rx="22" ry="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
            {/* Pivot */}
            <circle cx={CX} cy={CY} r="5" fill="#1e293b"/>
          </svg>
          {/* Values below pans */}
          <div className="flex items-center gap-24 -mt-1">
            <span className="font-fredoka text-3xl font-bold text-sky">{left}</span>
            <span className="font-fredoka text-3xl font-bold text-pink">{right}</span>
          </div>
        </div>
      );
    }

    // ── BAR MODEL ────────────────────────────────────────────────────────────
    // Singapore-style tape diagram. total null = unknown whole.
    // parts: array of { value: number|null, label?: string }.
    case "bar-model": {
      const { total, parts = [] } = ex.payload as {
        total: number | null;
        parts: { value: number | null; label?: string }[];
      };
      const BAR_COLORS = [
        "bg-sky text-white",
        "bg-mint text-white",
        "bg-sun text-ink",
        "bg-lilac text-white",
        "bg-peach text-ink",
      ];
      const knownSum = parts.reduce((s, p) => s + (p.value ?? 0), 0);
      const scaleBase = total ?? Math.max(knownSum, 1);
      return (
        <div className="flex flex-col items-center gap-2 w-full max-w-sm px-2">
          {/* ── Whole bar (total) ─ shown above if known */}
          {total !== null && (
            <div className="flex items-center gap-2 w-full">
              <span className="font-fredoka text-2xl font-bold text-ink w-12 text-right shrink-0">{total}</span>
              <div className="flex-1 h-12 rounded-xl bg-mint/20 border-2 border-mint flex items-center justify-center">
                <span className="font-fredoka font-bold text-mint text-lg">todo</span>
              </div>
            </div>
          )}
          {/* ── Parts bar ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 w-full">
            {total === null && (
              <span className="font-fredoka text-2xl font-bold text-ink-mute w-12 text-right shrink-0">?</span>
            )}
            {total !== null && <span className="w-12 shrink-0" />}
            <div className="flex flex-1 gap-1 h-12">
              {parts.map((p, i) => {
                const flex = p.value !== null
                  ? Math.max(0.15, p.value / scaleBase)
                  : Math.max(0.15, (scaleBase - knownSum) / scaleBase);
                const isUnknown = p.value === null;
                const cls = isUnknown
                  ? "border-2 border-dashed border-ink/25 bg-cream/80"
                  : BAR_COLORS[i % BAR_COLORS.length];
                return (
                  <div
                    key={i}
                    className={`rounded-xl flex items-center justify-center font-fredoka font-bold text-lg transition-all ${cls}`}
                    style={{ flex }}
                  >
                    {isUnknown
                      ? <span className="text-ink-mute text-2xl">?</span>
                      : <span>{p.label ?? p.value}</span>
                    }
                  </div>
                );
              })}
            </div>
          </div>
          {/* ── Bracket showing total=? when unknown ──────────────────────── */}
          {total === null && (
            <div className="flex items-center gap-2 w-full">
              <span className="w-12 shrink-0" />
              <div className="flex-1 flex flex-col items-center gap-0.5 pt-0.5">
                <div className="w-full border-t-2 border-ink/20" />
                <span className="text-xs font-black text-ink-mute tracking-widest">TOTAL = ?</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ── FRACTION COMPARE ─────────────────────────────────────────────────────
    // Two fraction bars of equal width so their filled areas are truly comparable.
    case "fraction-compare": {
      const { n1, d1, n2, d2 } = ex.payload as {
        n1: number; d1: number; n2: number; d2: number;
      };
      return (
        <div className="flex items-center gap-6 md:gap-10">
          <FractionBar n={n1} d={d1} color="sky" />
          <span className="font-fredoka text-4xl font-bold text-ink-mute">?</span>
          <FractionBar n={n2} d={d2} color="lilac" />
        </div>
      );
    }

    // ── DIVISION GROUPS ──────────────────────────────────────────────────────
    // No se renderea aquí: el ExerciseRunner rutea "division-groups" al
    // DivisionDealInput, donde el reparto interactivo ES el visual.

    // -----------------------------------------------------------------
    // READING visuals
    // -----------------------------------------------------------------
    case "letter": {
      // Una letra grande sola. Para "¿qué letra es?" o sound matching.
      const { letter } = ex.payload as { letter: string };
      return (
        <div className="font-fredoka text-[160px] md:text-[240px] font-bold text-pink leading-none">
          {letter}
        </div>
      );
    }

    case "word": {
      // Una palabra grande. Para "¿cuántas letras tiene?" o reconocimiento.
      const { word } = ex.payload as { word: string };
      return (
        <div className="font-fredoka text-6xl md:text-8xl font-bold text-ink tracking-wider">
          {word.toUpperCase()}
        </div>
      );
    }

    case "word-letters": {
      // Una palabra mostrada letra por letra en cards (para conteo/análisis).
      const { word } = ex.payload as { word: string };
      const letters = word.toUpperCase().split("");
      return (
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap max-w-lg">
          {letters.map((l, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-pink-soft border-4 border-white flex items-center justify-center font-fredoka text-3xl md:text-5xl font-bold text-pink"
              style={{ boxShadow: "var(--shadow-chunky-sm)" }}
            >
              {l}
            </div>
          ))}
        </div>
      );
    }

    case "emoji-word": {
      // Un emoji grande (ilustración) + label opcional debajo. Útil para
      // "¿qué palabra describe a esta cosa?".
      const { emoji, label } = ex.payload as { emoji: string; label?: string };
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[120px] md:text-[180px] leading-none">{emoji}</div>
          {label && <div className="font-fredoka text-xl font-bold text-ink-soft">{label}</div>}
        </div>
      );
    }

    default:
      // Fallback genérico: si no hay visual definido, mostramos el prompt
      // como visual mismo. Útil para audio/speak en el futuro.
      return null;
  }
}

function EmojiStrip({ items, spread = false }: { items: string[]; spread?: boolean }) {
  return (
    <div className={`flex flex-wrap justify-center ${spread ? "gap-5 md:gap-8" : "gap-1.5 md:gap-2"} max-w-lg`}>
      {items.map((item, i) => (
        <span key={i} className="text-4xl md:text-6xl leading-none">{item}</span>
      ))}
    </div>
  );
}

function ScaledEmoji({ emoji, label, size }: { emoji: string; label?: string; size: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="leading-none" style={{ fontSize: 30 + size * 16 }}>{emoji}</span>
      {label && <span className="text-[10px] font-black text-ink-soft">{label}</span>}
    </div>
  );
}

function GroupBox({ label, group }: { label: string; group?: { item: string; count: number } }) {
  return (
    <div className="rounded-3xl bg-cream p-3 min-h-32 flex flex-col items-center justify-center gap-2">
      <div className="text-[10px] font-black text-ink-mute tracking-widest">{label}</div>
      <div className="flex flex-wrap justify-center gap-1">
        {Array.from({ length: group?.count ?? 0 }).map((_, i) => (
          <span key={i} className="text-3xl md:text-4xl leading-none">{group?.item}</span>
        ))}
      </div>
    </div>
  );
}

function NumberCard({ n, placeholder = false }: { n?: number; placeholder?: boolean }) {
  return (
    <div
      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 flex items-center justify-center font-fredoka text-3xl md:text-4xl font-bold ${
        placeholder
          ? "border-dashed border-ink/20 bg-cream text-ink-mute"
          : "border-white bg-sun-soft text-ink"
      }`}
      style={{ boxShadow: placeholder ? "none" : "var(--shadow-chunky-sm)" }}
    >
      {placeholder ? "?" : n}
    </div>
  );
}

function BondCircle({ value, variant }: { value: number | null; variant: "part" | "whole" }) {
  const isUnknown = value === null;
  const sizeClass = variant === "whole"
    ? "w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl"
    : "w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl";
  const colorClass = isUnknown
    ? "border-dashed border-ink/25 bg-cream text-ink-mute"
    : variant === "whole"
    ? "border-white bg-mint-soft text-mint shadow-(--shadow-chunky-sm)"
    : "border-white bg-sky-soft text-sky shadow-(--shadow-chunky-sm)";
  return (
    <div className={`${sizeClass} rounded-full border-4 flex items-center justify-center font-fredoka font-bold ${colorClass}`}>
      {isUnknown ? "?" : value}
    </div>
  );
}

function FractionBar({ n, d, color }: { n: number; d: number; color: "sky" | "lilac" | "mint" | "peach" }) {
  const colorMap: Record<string, [string, string]> = {
    sky:   ["bg-sky",   "bg-sky-soft"],
    lilac: ["bg-lilac", "bg-lilac/20"],
    mint:  ["bg-mint",  "bg-mint-soft"],
    peach: ["bg-peach", "bg-peach-soft"],
  };
  const [filled, empty] = colorMap[color] ?? colorMap.sky;
  const partW = Math.min(52, Math.floor(200 / d));
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: d }).map((_, i) => (
          <div
            key={i}
            className={`h-12 md:h-14 rounded-lg border-2 border-white ${i < n ? filled : empty}`}
            style={{ width: partW }}
          />
        ))}
      </div>
      <div className="flex flex-col items-center leading-none font-fredoka font-bold">
        <span className="text-3xl md:text-4xl text-ink">{n}</span>
        <div className="my-1 h-0.5 w-9 rounded-full bg-ink" />
        <span className="text-3xl md:text-4xl text-ink">{d}</span>
      </div>
    </div>
  );
}
