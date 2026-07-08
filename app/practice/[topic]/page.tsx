// app/practice/[topic]/page.tsx
// Carga el pool de ejercicios de la unidad, los mezcla y pasa al cliente.
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getActiveChild } from "@/lib/queries";
import { PRACTICE_TOPICS } from "@/lib/practice-topics";
import { PracticeSession } from "./PracticeSession";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SESSION_SIZE = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function PracticeTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const child = await getActiveChild();
  if (!child) redirect("/profile/create");

  const topicConfig = PRACTICE_TOPICS.find((t) => t.slug === topic);
  if (!topicConfig) notFound();

  const raw = await prisma.exercise.findMany({
    where: {
      kind: { not: "TEACH" },
      lesson: {
        unit: { slug: { in: topicConfig.unitSlugs } },
      },
    },
    select: {
      id: true,
      kind: true,
      prompt: true,
      payload: true,
      solution: true,
      hints: true,
      explanation: true,
      audioUrl: true,
    },
  });

  if (raw.length === 0) {
    return <NoExercisesScreen title={topicConfig.title} icon={topicConfig.icon} />;
  }

  const pool = shuffle(raw).slice(0, SESSION_SIZE);

  return (
    <PracticeSession
      topicSlug={topic}
      topicTitle={topicConfig.title}
      topicIcon={topicConfig.icon}
      childId={child.id}
      hearts={child.hearts}
      exercises={pool.map((e) => ({
        id: e.id,
        kind: e.kind,
        prompt: e.prompt,
        payload: (e.payload ?? {}) as Record<string, unknown>,
        solution: (e.solution ?? {}) as {
          answer?: number | string;
          sequence?: (number | string)[];
          pairs?: number[][];
          groups?: Record<string, string[]>;
          total?: number;
          parts?: number[];
        },
        hints: Array.isArray(e.hints) ? (e.hints as string[]) : null,
        explanation: e.explanation,
        audioUrl: e.audioUrl,
      }))}
    />
  );
}

function NoExercisesScreen({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-cream px-6 py-8 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h1 className="font-fredoka text-3xl font-bold text-ink mb-2">{title}</h1>
      <p className="text-ink-soft max-w-xs mb-6">
        Todavía no hay ejercicios para este tema. ¡Vuelve pronto!
      </p>
      <Link
        href="/practice"
        className="btn-chunky py-3 px-8 rounded-full bg-ink text-white font-black uppercase tracking-wide text-sm"
        style={{ boxShadow: "0 4px 0 rgba(0,0,0,0.25)" }}
      >
        Elegir otro tema
      </Link>
    </div>
  );
}
