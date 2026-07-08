"use client";
// Motor de división estilo Synthesis: los puntos aparecen dispersos en forma
// circular sobre un tablero oscuro. El niño toca puntos para seleccionarlos
// (magenta) y al juntar `groupSize` se fusionan en una "flor" (rosa). Cuando
// ya no se pueden formar más grupos completos, la cantidad de flores ES la
// respuesta y se reporta al runner para Comprobar. Tocar una flor la deshace.
import { useMemo, useState } from "react";
import { playTap } from "@/lib/gamification/audio";

// Espacio de coordenadas del tablero; se rendea responsive vía porcentajes.
const SIZE = 320;

type Cluster = { ids: number[]; cx: number; cy: number };

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
  // Nube circular: espiral de girasol (ángulo áureo) + jitter suave. Reparte
  // los puntos parejo en forma circular sin superponerse.
  const scatter = useMemo(() => {
    const R = SIZE * 0.44;
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    // Sin jitter: la espiral de girasol sola garantiza separación uniforme.
    return Array.from({ length: total }, (_, i) => {
      const r = R * Math.sqrt((i + 0.5) / total);
      const a = i * GOLDEN;
      return {
        x: SIZE / 2 + r * Math.cos(a),
        y: SIZE / 2 + r * Math.sin(a),
      };
    });
  }, [total, groupSize]);

  const [selected, setSelected] = useState<number[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);

  const dot = total > 40 ? 18 : total > 24 ? 21 : 24; // diámetro px
  // Radio de los "pétalos" de la flor: los puntos quedan tocándose.
  const petalR = Math.min(24, Math.max(10, (dot / 2 / Math.sin(Math.PI / groupSize)) * 0.9));

  const clusterOf = new Map<number, { c: number; slot: number }>();
  clusters.forEach((cl, c) => cl.ids.forEach((id, slot) => clusterOf.set(id, { c, slot })));

  const freeCount = total - selected.length - clusters.length * groupSize;
  const remainder = freeCount + selected.length;
  const done = remainder < groupSize;

  function report(nextClusters: Cluster[]) {
    const left = total - nextClusters.length * groupSize;
    if (left < groupSize) onSelect(nextClusters.length);
  }

  function tapDot(id: number) {
    if (disabled) return;
    playTap();

    const membership = clusterOf.get(id);
    if (membership) {
      // Deshacer la flor: sus puntos vuelven a estar sueltos.
      setClusters(clusters.filter((_, i) => i !== membership.c));
      return;
    }

    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    const nextSel = [...selected, id];
    if (nextSel.length < groupSize) {
      setSelected(nextSel);
      return;
    }

    // Grupo completo → se fusiona en una flor en el centroide de sus puntos.
    const margin = petalR + dot / 2 + 6;
    const cx = Math.min(SIZE - margin, Math.max(margin,
      nextSel.reduce((a, i) => a + scatter[i].x, 0) / groupSize));
    const cy = Math.min(SIZE - margin, Math.max(margin,
      nextSel.reduce((a, i) => a + scatter[i].y, 0) / groupSize));
    const nextClusters = [...clusters, { ids: nextSel, cx, cy }];
    setSelected([]);
    setClusters(nextClusters);
    report(nextClusters);
  }

  // Posición y estilo de cada punto según su estado.
  function dotProps(id: number) {
    const membership = clusterOf.get(id);
    if (membership) {
      const { c, slot } = membership;
      const angle = (slot * 2 * Math.PI) / groupSize - Math.PI / 2;
      return {
        x: clusters[c].cx + petalR * Math.cos(angle),
        y: clusters[c].cy + petalR * Math.sin(angle),
        cls: "bg-pink shadow-[0_0_10px_rgba(255,90,120,0.55)]",
        scale: 1,
      };
    }
    if (selected.includes(id)) {
      return {
        x: scatter[id].x,
        y: scatter[id].y,
        cls: "bg-lilac ring-2 ring-white/70 shadow-[0_0_10px_rgba(124,108,255,0.7)]",
        scale: 1.18,
      };
    }
    return {
      x: scatter[id].x,
      y: scatter[id].y,
      cls: "bg-sky hover:brightness-125",
      scale: 1,
    };
  }

  const showR = total % groupSize !== 0;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      {/* Ecuación viva, como en Synthesis: se completa al terminar de agrupar */}
      <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2" style={{ boxShadow: "var(--shadow-chunky-sm)" }}>
        <span className="font-fredoka text-2xl font-bold text-ink">{total}</span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">÷</span>
        <span className="font-fredoka text-2xl font-bold text-ink">{groupSize}</span>
        <span className="font-fredoka text-xl font-bold text-ink-soft">=</span>
        <EqSlot value={done ? clusters.length : null} />
        {showR && (
          <>
            <span className="font-fredoka text-sm font-black text-ink-soft">R</span>
            <EqSlot value={done ? remainder : null} />
          </>
        )}
      </div>

      {/* Tablero claro con los puntos dispersos en círculo */}
      <div
        className="relative w-full max-w-90 aspect-square overflow-hidden rounded-3xl border-4 border-sky/20 bg-sky-soft/40"
      >
        {/* Leyenda de conteo, como el panel de Synthesis */}
        <div className="absolute left-2 top-2 z-20 flex flex-col gap-1 rounded-xl bg-white p-2 text-xs font-black text-ink" style={{ boxShadow: "var(--shadow-chunky-sm)" }}>
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-white">{total}</span>
            <span className="text-ink-soft">Total</span>
          </div>
          {clusters.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink text-[10px] text-white">{groupSize}</span>
              <span className="text-ink-soft">× {clusters.length}</span>
            </div>
          )}
          {selected.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lilac text-[10px] text-white">{selected.length}</span>
              <span className="text-ink-soft">× 1</span>
            </div>
          )}
          {freeCount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky text-[10px] text-white">1</span>
              <span className="text-ink-soft">× {freeCount}</span>
            </div>
          )}
        </div>

        {Array.from({ length: total }, (_, id) => {
          const p = dotProps(id);
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onClick={() => tapDot(id)}
              aria-label={`Punto ${id + 1}`}
              className={`absolute rounded-full transition-all duration-300 ease-out ${p.cls}`}
              style={{
                width: dot,
                height: dot,
                left: `${(p.x / SIZE) * 100}%`,
                top: `${(p.y / SIZE) * 100}%`,
                transform: `translate(-50%, -50%) scale(${p.scale})`,
              }}
            />
          );
        })}
      </div>

      {done ? (
        <p className="text-sm font-bold text-mint">
          🌸 ¡{clusters.length} grupos de {groupSize}! Toca Comprobar 👇
        </p>
      ) : (
        <p className="text-sm font-bold text-ink-soft">
          Toca {groupSize} puntos y se juntan en un grupo
          {selected.length > 0 && ` · llevas ${selected.length} de ${groupSize}`}
        </p>
      )}
    </div>
  );
}

function EqSlot({ value }: { value: number | null }) {
  return (
    <span
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-1 font-fredoka text-xl font-bold ${
        value === null ? "bg-ink/10 text-transparent" : "bg-mint-soft text-mint"
      }`}
    >
      {value ?? "?"}
    </span>
  );
}
