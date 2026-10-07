"use client";

import { useMemo, useState } from "react";
import { StreakCard } from "./StreakCard";
import { PremiumBanner } from "./PremiumBanner";
import { LeagueCard } from "./LeagueCard";
import { CourseCard, type CourseSlide } from "./CourseCard";

type HomeStats = {
  childName: string;
  streak: number;
  hearts: number;
  gems: number;
  xp: number;
  weeklyXp: number;
  league: string;
  myRank: number | null;
  activeDaysThisWeek: number;
  isPremium: boolean;
  premiumUntil: string | null;
  premiumStatus: "free" | "active" | "expiring_soon" | "expired";
  premiumUntilLabel: string | null;
};

type LeaderboardRow = {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isMe: boolean;
};

export function HomeClient({
  courses,
  initialCourseSlug,
  reviewsDue,
  stats,
  leaderboardRows,
}: {
  courses: CourseSlide[];
  initialCourseSlug: string | null;
  reviewsDue: number;
  stats: HomeStats;
  leaderboardRows: LeaderboardRow[];
}) {
  const initialIndex = useMemo(
    () => Math.max(0, courses.findIndex((c) => c.slug === initialCourseSlug)),
    [courses, initialCourseSlug],
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeCourse = courses[activeIndex] ?? courses[0] ?? null;

  function goTo(delta: number) {
    if (courses.length <= 1) return;
    setActiveIndex((i) => (i + delta + courses.length) % courses.length);
  }

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-7 px-4 py-6 md:grid-cols-[390px_minmax(0,1fr)] md:px-8 md:py-10">
        <aside className="order-2 space-y-5 md:order-1">
          <StreakCard
            childName={stats.childName}
            streak={stats.streak}
            xp={stats.xp}
            gems={stats.gems}
            hearts={stats.hearts}
            activeDaysThisWeek={stats.activeDaysThisWeek}
          />
          <PremiumBanner
            isPremium={stats.isPremium}
            premiumStatus={stats.premiumStatus}
            premiumUntilLabel={stats.premiumUntilLabel}
          />
          <LeagueCard
            league={stats.league}
            weeklyXp={stats.weeklyXp}
            myRank={stats.myRank}
            rows={leaderboardRows}
          />
        </aside>

        <section className="order-1 min-w-0 md:order-2">
          {activeCourse && (
            <CourseCard
              course={activeCourse}
              isPremium={stats.isPremium}
              reviewsDue={reviewsDue}
              onPrev={() => goTo(-1)}
              onNext={() => goTo(1)}
            />
          )}
        </section>
      </div>
    </main>
  );
}
