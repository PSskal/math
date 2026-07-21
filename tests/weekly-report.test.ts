import { describe, expect, it } from "vitest";
import { formatWeeklyReportMessage } from "@/lib/analytics/weekly-report";

const base = {
  childName: "Mateo",
  lessonsThisWeek: 12,
  xpThisWeek: 340,
  activeDaysThisWeek: 4,
  accuracy: 88,
  streak: 5,
  mastered: 23,
};

describe("weekly report message", () => {
  it("includes the child name and every weekly metric", () => {
    const msg = formatWeeklyReportMessage(base);
    expect(msg).toContain("Mateo");
    expect(msg).toContain("Lecciones completadas: 12");
    expect(msg).toContain("XP ganado: 340");
    expect(msg).toContain("Racha: 5 días");
    expect(msg).toContain("Días activos: 4 de 7");
    expect(msg).toContain("Aciertos: 88%");
    expect(msg).toContain("Temas dominados: 23");
  });

  it("shows a gentle nudge when there was no activity", () => {
    const msg = formatWeeklyReportMessage({ ...base, lessonsThisWeek: 0 });
    expect(msg).toContain("no practicó esta semana");
    expect(msg).not.toContain("Lecciones completadas:");
    expect(msg).toContain("Temas dominados: 23");
  });

  it("uses singular 'día' when the streak is 1", () => {
    const msg = formatWeeklyReportMessage({ ...base, streak: 1 });
    expect(msg).toContain("Racha: 1 día");
    expect(msg).not.toContain("Racha: 1 días");
  });
});
