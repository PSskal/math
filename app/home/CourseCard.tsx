"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, ChevronRight, Map } from "lucide-react";

type ActiveSubject = { name: string; slug: string; icon: string | null };

type CourseUnitPreview = {
  slug: string;
  title: string;
  order: number;
  icon: string | null;
  progressPct: number;
};

export type CourseSlide = {
  slug: string;
  name: string;
  description: string | null;
  href: string;
  isPremium: boolean;
  premiumLocked: boolean;
  freePreviewDone: boolean;
  subject: ActiveSubject;
  progressPct: number;
  unitsTotal: number;
  unitsDone: number;
  lessonsTotal: number;
  lessonsDone: number;
  currentUnitTitle: string | null;
  currentUnitIcon: string | null;
  currentLessonId: string | null;
  units: CourseUnitPreview[];
};

type Props = {
  course: CourseSlide;
  isPremium: boolean;
  reviewsDue: number;
  onPrev: () => void;
  onNext: () => void;
};

function courseCtaLabel(course: CourseSlide, hasPremiumAccess: boolean) {
  if (course.premiumLocked) return "Desbloquear curso";
  if (course.isPremium && !hasPremiumAccess && !course.freePreviewDone) return "Probar gratis";
  if (course.lessonsTotal > 0 && course.lessonsDone >= course.lessonsTotal) return "Repasar curso";
  return "Continuar curso";
}

export function CourseCard({ course, isPremium, reviewsDue, onPrev, onNext }: Props) {
  const startHref = course.premiumLocked
    ? "/premium"
    : course.currentLessonId
      ? `/lesson/${course.currentLessonId}`
      : course.href;

  const previewUnits = course.units.slice(0, 2);

  return (
    <>
      <div className="relative flex min-h-[500px] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_2px_0_rgba(15,23,42,0.06)] md:min-h-[620px] md:p-8">
        <div className="absolute -left-4 top-7 hidden h-[82%] w-4 rounded-l-3xl border-y border-l border-slate-200 bg-white md:block" />
        <div className="absolute -left-7 top-12 hidden h-[73%] w-4 rounded-l-3xl border-y border-l border-slate-200 bg-white md:block" />

        <div className="flex items-center justify-between gap-2 md:gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#4867f5] md:h-10 md:w-10"
            aria-label="Curso anterior"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <div className="inline-flex rounded-full bg-[#dfe6ff] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#4867f5] md:px-3 md:text-xs">
              Curso actual
            </div>
            <h1 className="mt-2 line-clamp-2 font-fredoka text-2xl font-bold leading-tight text-slate-950 md:text-4xl">
              {course.name}
            </h1>
            <div className="mt-1 text-xs font-black uppercase text-[#4867f5] md:mt-2 md:text-sm">
              {course.subject.name}
              {course.isPremium ? (isPremium ? " · Premium" : " · Premium · 1 gratis") : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-[#4867f5] md:h-10 md:w-10"
            aria-label="Curso siguiente"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {course.description && (
          <p className="mx-auto mt-3 hidden max-w-md text-center text-sm font-semibold leading-6 text-slate-500 md:block">
            {course.description}
          </p>
        )}

        <div className="mx-auto mt-6 grid h-20 w-28 place-items-center rounded-[1.5rem] bg-[#eef3ff] text-5xl shadow-inner md:mt-9 md:h-28 md:w-36 md:rounded-[2rem] md:text-6xl">
          {course.subject.icon ?? "📚"}
        </div>

        <div className="mx-auto mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100 md:mt-6 md:max-w-sm">
          <div
            className="h-full rounded-full bg-[#4867f5]"
            style={{ width: `${course.progressPct * 100}%` }}
          />
        </div>
        <div className="mt-2 text-center text-xs font-black uppercase tracking-wide text-slate-400">
          {course.lessonsDone}/{course.lessonsTotal} lecciones · {course.unitsDone}/{course.unitsTotal} unidades
        </div>

        {course.premiumLocked && (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-[#fff3d3] px-4 py-3 text-center text-sm font-bold leading-6 text-[#8a5a00]">
            Ya probaste la lección gratis. Activa Premium para seguir con el curso completo.
          </p>
        )}

        <div className="mt-6 space-y-3 md:mt-9 md:space-y-4">
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wide text-slate-400 md:text-xs">
            <BookOpen className="h-4 w-4" aria-hidden />
            Unidades del curso
          </div>
          {previewUnits.map((unit) => (
            <Link
              key={unit.slug}
              href={`${course.href}?unit=${unit.slug}`}
              className="flex items-center gap-3 rounded-2xl bg-[#f7f9ff] px-2.5 py-2 ring-1 ring-slate-100 transition hover:ring-[#b9c6ff] md:gap-4 md:px-3"
            >
              <div className="grid h-10 w-14 shrink-0 place-items-center rounded-full border-[5px] border-[#dce4ff] bg-white text-2xl text-[#4867f5] md:h-12 md:w-16 md:border-[6px]">
                {unit.icon ?? "🧩"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-clamp-1 font-fredoka text-base font-bold text-slate-950 md:text-lg">
                  {unit.title}
                </div>
                <div className="text-[10px] font-black uppercase tracking-wide text-slate-400 md:text-xs">
                  Unidad {unit.order} · {Math.round(unit.progressPct * 100)}%
                </div>
              </div>
              <div className="hidden h-2 w-20 overflow-hidden rounded-full bg-slate-100 md:block">
                <div
                  className="h-full rounded-full bg-[#4867f5]"
                  style={{ width: `${unit.progressPct * 100}%` }}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-[1fr_auto] md:pt-6">
          <Link
            href={startHref}
            className="btn-chunky block rounded-2xl bg-[#4867f5] px-5 py-3.5 text-center text-sm font-black text-white shadow-[0_5px_0_#2445d8] hover:bg-[#3d5df0] md:px-6 md:py-4 md:text-base"
          >
            {courseCtaLabel(course, isPremium)}
          </Link>
          <Link
            href={course.href}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-center text-sm font-black text-[#4867f5] shadow-[0_3px_0_rgba(15,23,42,0.08)] hover:border-[#b9c6ff] md:px-6 md:py-4"
          >
            <Map className="h-4 w-4" aria-hidden />
            Ver mapa
          </Link>
        </div>
      </div>

      <div className="mt-5 hidden justify-center gap-4 text-sm font-bold md:flex">
        <Link href="/subjects" className="text-[#4867f5]">Explorar materias</Link>
        <Link href="/review" className="text-slate-500">
          Repaso {reviewsDue > 0 ? `(${reviewsDue})` : ""}
        </Link>
      </div>
    </>
  );
}
