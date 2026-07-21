import { prisma } from "@/lib/prisma";
import { getMasteryStats } from "@/lib/queries";

export type WeeklyReport = {
  childName: string;
  lessonsThisWeek: number;
  xpThisWeek: number;
  activeDaysThisWeek: number;
  accuracy: number; // 0-100
  streak: number;
  mastered: number;
};

function startOfDayUtc(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Resumen de la semana (últimos 7 días) de un niño, para el reporte a padres.
 * Reúne lecciones completadas, XP ganado, días activos, aciertos y racha.
 */
export async function getWeeklyReport(
  childId: string,
  now: Date = new Date(),
): Promise<WeeklyReport | null> {
  const weekStart = startOfDayUtc(new Date(now.getTime() - 6 * 864e5));

  const child = await prisma.child.findUnique({
    where: { id: childId },
    select: { name: true, streak: true },
  });
  if (!child) return null;

  const [completedThisWeek, attemptsWeek, masteryStats] = await Promise.all([
    prisma.progress.findMany({
      where: { childId, completed: true, completedAt: { gte: weekStart } },
      select: { lesson: { select: { xpReward: true } } },
    }),
    prisma.attempt.findMany({
      where: { childId, createdAt: { gte: weekStart } },
      select: { correct: true, createdAt: true },
    }),
    getMasteryStats(childId),
  ]);

  const lessonsThisWeek = completedThisWeek.length;
  const xpThisWeek = completedThisWeek.reduce(
    (sum, p) => sum + (p.lesson?.xpReward ?? 0),
    0,
  );
  const totalAttempts = attemptsWeek.length;
  const correct = attemptsWeek.filter((a) => a.correct).length;
  const accuracy = totalAttempts
    ? Math.round((correct / totalAttempts) * 100)
    : 0;

  // Días distintos con actividad esta semana.
  const dayKeys = new Set<string>();
  for (const a of attemptsWeek) {
    const d = a.createdAt;
    dayKeys.add(`${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`);
  }

  return {
    childName: child.name,
    lessonsThisWeek,
    xpThisWeek,
    activeDaysThisWeek: dayKeys.size,
    accuracy,
    streak: child.streak,
    mastered: masteryStats.mastered,
  };
}

/**
 * Mensaje listo para compartir por WhatsApp. Es una función pura (sin IO)
 * para poder testearla y reutilizarla en el panel admin.
 */
export function formatWeeklyReportMessage(report: WeeklyReport): string {
  const {
    childName,
    lessonsThisWeek,
    xpThisWeek,
    activeDaysThisWeek,
    accuracy,
    streak,
    mastered,
  } = report;

  const header = `📊 Reporte semanal de ${childName} · Paskalito`;

  if (lessonsThisWeek === 0) {
    return [
      header,
      "",
      `${childName} no practicó esta semana. ¡Un ratito de juego lo pone al día! 💪`,
      `🔥 Racha actual: ${streak} ${streak === 1 ? "día" : "días"}`,
      `🏅 Temas dominados: ${mastered}`,
    ].join("\n");
  }

  return [
    header,
    "",
    "Esta semana:",
    `📚 Lecciones completadas: ${lessonsThisWeek}`,
    `⭐ XP ganado: ${xpThisWeek}`,
    `🔥 Racha: ${streak} ${streak === 1 ? "día" : "días"}`,
    `📅 Días activos: ${activeDaysThisWeek} de 7`,
    `🎯 Aciertos: ${accuracy}%`,
    `🏅 Temas dominados: ${mastered}`,
    "",
    `¡Sigue así, ${childName}! 🎉`,
  ].join("\n");
}
