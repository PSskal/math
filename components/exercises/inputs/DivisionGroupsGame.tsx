"use client";
// División visual — mecánica "imán":
// Arrastra un punto (verde) y los puntos cercanos se van pegando solos con una
// animación de atracción gradual. Al completar groupSize puntos, se forman en
// flor automáticamente. Toca una flor para deshacer.
import { useMemo, useRef, useState } from "react";
import { playTap } from "@/lib/gamification/audio";

const BOARD  = 320;
const SNAP_R = 34;

type Flower = { ids: number[]; cx: number; cy: number };

export function DivisionGroupsGame({
  total,
  groupSize,
  disabled = false,
  onSelect,
}: {
  total: number;
  groupSize: number;
  disabled?: boolean;
  onSelect: (value: number) => void;
}) {
  const scatter = useMemo(() => {
    const R      = BOARD * 0.42;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: total }, (_, i) => {
      const r = R * Math.sqrt((i + 0.5) / total);
      const a = i * GOLDEN;
      return { x: BOARD / 2 + r * Math.cos(a), y: BOARD / 2 + r * Math.sin(a) };
    });
  }, [total]);

  const boardRef = useRef<HTMLDivElement>(null);

  const [flowers,     setFlowers]     = useState<Flower[]>([]);
  const [dragCluster, setDragCluster] = useState<{ ids: number[]; x: number; y: number } | null>(null);

  const floweredIds = useMemo(() => new Set(flowers.flatMap(f => f.ids)), [flowers]);
  const dragIds     = useMemo(() => new Set(dragCluster?.ids ?? []), [dragCluster]);

  const dot    = total > 40 ? 16 : total > 24 ? 20 : 24;
  const petalR = Math.max(12, (dot / 2 / Math.sin(Math.PI / groupSize)) * 0.82);

  const completedCount = flowers.length;
  const isDone = total - completedCount * groupSize < groupSize && !dragCluster;

  function toBoard(cx: number, cy: number) {
    const r = boardRef.current?.getBoundingClientRect();
    if (!r) return { x: BOARD / 2, y: BOARD / 2 };
    return {
      x: Math.max(0, Math.min(BOARD, (cx - r.left) / r.width  * BOARD)),
      y: Math.max(0, Math.min(BOARD, (cy - r.top)  / r.height * BOARD)),
    };
  }

  // Posición en órbita dentro del cluster siendo arrastrado
  function orbitPos(slot: number, n: number, cx: number, cy: number) {
    if (n === 1) return { x: cx, y: cy };
    const angle = (slot * 2 * Math.PI) / n - Math.PI / 2;
    const r     = Math.min(petalR * 0.7, 8 + n * 4);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  // ── Handlers ──────────────────────────────────────────────────────────────
  function onBoardDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || dragCluster) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos  = toBoard(e.clientX, e.clientY);
    const hitR = dot / 2 + 18;

    // Toca flor → deshacer
    for (let fi = 0; fi < flowers.length; fi++) {
      if (Math.hypot(flowers[fi].cx - pos.x, flowers[fi].cy - pos.y) < petalR + dot) {
        playTap();
        setFlowers(prev => prev.filter((_, i) => i !== fi));
        return;
      }
    }

    // Agarrar punto libre más cercano
    let best: { id: number; dist: number } | null = null;
    for (let id = 0; id < total; id++) {
      if (floweredIds.has(id)) continue;
      const dist = Math.hypot(scatter[id].x - pos.x, scatter[id].y - pos.y);
      if (dist < hitR && (!best || dist < best.dist)) best = { id, dist };
    }
    if (best) setDragCluster({ ids: [best.id], x: pos.x, y: pos.y });
  }

  function onBoardMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragCluster) return;
    const pos     = toBoard(e.clientX, e.clientY);
    const have    = new Set(dragCluster.ids);
    const newIds  = [...dragCluster.ids];

    for (let id = 0; id < total; id++) {
      if (floweredIds.has(id) || have.has(id)) continue;
      if (newIds.length >= groupSize) break;
      if (Math.hypot(scatter[id].x - pos.x, scatter[id].y - pos.y) < SNAP_R) {
        newIds.push(id);
        have.add(id);
      }
    }

    if (newIds.length >= groupSize) {
      playTap();
      const cx   = Math.max(petalR + dot, Math.min(BOARD - petalR - dot, pos.x));
      const cy   = Math.max(petalR + dot, Math.min(BOARD - petalR - dot, pos.y));
      const next = [...flowers, { ids: newIds.slice(0, groupSize), cx, cy }];
      setFlowers(next);
      setDragCluster(null);
      const rem = total - next.length * groupSize;
      if (rem < groupSize) onSelect(next.length);
      return;
    }

    setDragCluster({ ids: newIds, x: pos.x, y: pos.y });
  }

  function onBoardUp() {
    setDragCluster(null); // suelta antes de completar → puntos vuelven a su lugar
  }

  // ── Unified dot render (mismo key={id} en todos los estados) ──────────────
  // Mantener el mismo elemento DOM permite que la transición CSS anime la
  // posición anterior → nueva, creando el efecto de atracción gradual.
  function dotVisual(id: number): {
    x: number; y: number;
    bg: string; scale: number; z: number;
    transition: string; shadow?: string;
  } {
    // ¿En una flor?
    const fi = flowers.findIndex(f => f.ids.includes(id));
    if (fi !== -1) {
      const f     = flowers[fi];
      const slot  = f.ids.indexOf(id);
      const angle = (slot * 2 * Math.PI) / groupSize - Math.PI / 2;
      return {
        x: f.cx + petalR * Math.cos(angle),
        y: f.cy + petalR * Math.sin(angle),
        bg: "#ff5a78", scale: 1, z: 2,
        transition: "left .35s ease-out, top .35s ease-out, background .3s",
        shadow: "0 0 10px rgba(255,90,120,0.5)",
      };
    }

    // ¿En el cluster que se arrastra?
    if (dragCluster) {
      const slot = dragCluster.ids.indexOf(id);
      if (slot !== -1) {
        const { x, y } = orbitPos(slot, dragCluster.ids.length, dragCluster.x, dragCluster.y);
        const grabbed   = slot === 0;
        return {
          x, y,
          bg:    grabbed ? "#34c759" : "#7c6cff",
          scale: grabbed ? 1.35 : 1.12,
          z:     grabbed ? 25 : 20,
          // Slot 0 (agarrado): sin transición — sigue el dedo exacto.
          // Slots 1+ (atraídos): transición lenta — efecto de ser jalado.
          transition: grabbed
            ? "background .2s"
            : "left .55s cubic-bezier(.2,1.1,.3,1), top .55s cubic-bezier(.2,1.1,.3,1), background .2s",
          shadow: grabbed
            ? "0 6px 18px rgba(52,199,89,0.5)"
            : "0 4px 14px rgba(124,108,255,0.4)",
        };
      }
    }

    // Libre
    return {
      x: scatter[id].x, y: scatter[id].y,
      bg: "#4867f5", scale: 1, z: 1,
      transition: "left .3s ease-out, top .3s ease-out, background .25s, transform .2s",
    };
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">

      {/* Ecuación */}
      <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2"
        style={{ boxShadow: "var(--shadow-chunky-sm)" }}>
        <span className="font-fredoka text-2xl font-bold text-ink">{total}</span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">÷</span>
        <span className="font-fredoka text-2xl font-bold text-ink">{groupSize}</span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">=</span>
        <span className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-1 font-fredoka text-xl font-bold ${
          isDone ? "bg-mint-soft text-mint" : "bg-ink/10 text-transparent"
        }`}>
          {isDone ? completedCount : "?"}
        </span>
        {total % groupSize !== 0 && isDone && (
          <>
            <span className="font-fredoka text-sm font-black text-ink-soft">R</span>
            <span className="flex h-9 min-w-9 items-center justify-center rounded-lg px-1 font-fredoka text-xl font-bold bg-mint-soft text-mint">
              {total - completedCount * groupSize}
            </span>
          </>
        )}
      </div>

      {/* Tablero */}
      <div
        ref={boardRef}
        className="relative w-full max-w-90 aspect-square overflow-hidden rounded-3xl
          border-4 border-sky/20 bg-sky-soft/40 touch-none select-none"
        onPointerDown={onBoardDown}
        onPointerMove={onBoardMove}
        onPointerUp={onBoardUp}
        onPointerCancel={onBoardUp}
      >
        {Array.from({ length: total }, (_, id) => {
          const v = dotVisual(id);
          return (
            <div
              key={id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width:     dot,
                height:    dot,
                left:      `${(v.x / BOARD) * 100}%`,
                top:       `${(v.y / BOARD) * 100}%`,
                transform: `translate(-50%,-50%) scale(${v.scale})`,
                background: v.bg,
                zIndex:    v.z,
                transition: v.transition,
                boxShadow: v.shadow,
              }}
            />
          );
        })}
      </div>

      {/* Estado */}
      {isDone ? (
        <p className="text-sm font-bold text-mint">
          🌸 ¡{completedCount} grupos de {groupSize}! Toca Comprobar 👇
        </p>
      ) : dragCluster ? (
        <p className="text-sm font-bold text-ink-soft">
          {dragCluster.ids.length} de {groupSize} · ¡sigue moviéndote!
        </p>
      ) : (
        <p className="text-sm font-bold text-ink-soft">
          Arrastra un punto y recoge {groupSize} en total
          {completedCount > 0 && (
            <span className="text-mint"> · {completedCount} grupo{completedCount !== 1 ? "s" : ""} listo{completedCount !== 1 ? "s" : ""}</span>
          )}
        </p>
      )}
    </div>
  );
}
