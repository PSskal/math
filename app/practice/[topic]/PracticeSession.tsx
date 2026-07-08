"use client";
// Wrapper de Práctica libre sobre el ExerciseRunner compartido.
// reviewMode=true → no descuenta corazones ni guarda progreso de lección.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Confetti } from "@/components/Confetti";
import { playTap, playVictory } from "@/lib/gamification/audio";
import { Lumi } from "@/components/Lumi";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import type { ExerciseDTO } from "@/components/exercises/types";

type Props = {
  topicSlug: string;
  topicTitle: string;
  topicIcon: string;
  childId: string;
  hearts: number;
  exercises: ExerciseDTO[];
};

export function PracticeSession({
  topicSlug,
  topicTitle,
  topicIcon,
  childId,
  hearts,
  exercises,
}: Props) {
  const router = useRouter();
  const [done, setDone] = useState<{ correctCount: number; total: number } | null>(null);

  const handleAgain = () => {
    playTap();
    // ?r= fuerza una URL nueva → Next.js la trata como navegación fresca,
    // y force-dynamic en el servidor re-mezcla el pool.
    router.push(`/practice/${topicSlug}?r=${Date.now()}`);
  };

  if (done) {
    return (
      <PracticeDoneScreen
        correct={done.correctCount}
        total={done.total}
        topicTitle={topicTitle}
        topicIcon={topicIcon}
        onAgain={handleAgain}
      />
    );
  }

  return (
    <ExerciseRunner
      childId={childId}
      hearts={hearts}
      exercises={exercises}
      reviewMode
      labels={{ step: "PRÁCTICA", idle: `Practica ${topicTitle} — sin presión.` }}
      onComplete={async (result) => {
        setDone(result);
      }}
    />
  );
}

function PracticeDoneScreen({
  correct,
  total,
  topicTitle,
  topicIcon,
  onAgain,
}: {
  correct: number;
  total: number;
  topicTitle: string;
  topicIcon: string;
  onAgain: () => void;
}) {
  const pct = Math.round((correct / Math.max(1, total)) * 100);

  useEffect(() => {
    const t = setTimeout(() => playVictory(), 120);
    return () => clearTimeout(t);
  }, []);

  const message =
    pct === 100
      ? "¡Perfecto! No fallaste nada 🌟"
      : pct >= 75
      ? "¡Muy bien! Sigue así 💪"
      : pct >= 50
      ? "Buen intento, ¡a seguir practicando!"
      : "La práctica hace al maestro 📚";

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #EAF0FF 0%, #FFFFFF 58%, #F7FAFF 100%)",
      }}
    >
      <Confetti />
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-4xl mb-1">{topicIcon}</div>
          <div className="font-fredoka text-sm font-semibold tracking-widest text-ink/70">
            {topicTitle.toUpperCase()} · COMPLETADO
          </div>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-ink mt-1">
            {message}
          </h1>
        </div>

        <div className="animate-bob">
          <Lumi size={140} mood="celebrate" />
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 gap-2">
          <div
            className="bg-white/95 rounded-2xl p-3 text-center border-2 border-white"
            style={{ boxShadow: "var(--shadow-chunky-sm)" }}
          >
            <div className="text-2xl">✅</div>
            <div className="font-fredoka font-bold text-ink text-xl">
              {correct}/{total}
            </div>
            <div className="text-[10px] font-extrabold text-ink-soft uppercase">
              Correctos
            </div>
          </div>
          <div
            className="bg-white/95 rounded-2xl p-3 text-center border-2 border-white"
            style={{ boxShadow: "var(--shadow-chunky-sm)" }}
          >
            <div className="text-2xl">🎯</div>
            <div className="font-fredoka font-bold text-ink text-xl">{pct}%</div>
            <div className="text-[10px] font-extrabold text-ink-soft uppercase">
              Precisión
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onAgain}
            className="btn-chunky w-full py-4 rounded-2xl bg-sky text-white font-black uppercase tracking-wide text-base"
            style={{ boxShadow: "0 5px 0 #2445D8" }}
          >
            🔄 Practicar de nuevo
          </button>
          <Link
            href="/practice"
            className="btn-chunky w-full py-4 rounded-2xl bg-white text-ink font-black uppercase tracking-wide text-base text-center border-2 border-ink/10"
            style={{ boxShadow: "var(--shadow-chunky)" }}
            onClick={() => playTap()}
          >
            Otro tema
          </Link>
        </div>

        <Link
          href="/home"
          className="text-xs font-bold text-ink-soft underline"
          onClick={() => playTap()}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
