// app/practice/page.tsx
// Pantalla de selección de tema para Práctica libre.
import { redirect } from "next/navigation";
import Link from "next/link";
import { getActiveChild } from "@/lib/queries";
import { PRACTICE_TOPICS } from "@/lib/practice-topics";
import type { PracticeTopic } from "@/lib/practice-topics";

const colorClasses: Record<
  PracticeTopic["color"],
  { icon: string; card: string }
> = {
  sky:   { icon: "bg-sky text-white",     card: "border-sky/20 hover:border-sky/50" },
  mint:  { icon: "bg-mint text-white",    card: "border-mint/20 hover:border-mint/50" },
  sun:   { icon: "bg-sun text-ink",       card: "border-sun/30 hover:border-sun/60" },
  peach: { icon: "bg-peach text-white",   card: "border-peach/30 hover:border-peach/60" },
  lilac: { icon: "bg-lilac text-white",   card: "border-lilac/20 hover:border-lilac/50" },
  pink:  { icon: "bg-pink text-white",    card: "border-pink/20 hover:border-pink/50" },
};

export default async function PracticePage() {
  const child = await getActiveChild();
  if (!child) redirect("/profile/create");

  return (
    <div className="min-h-[100dvh] bg-cream px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl mb-3">🏋️</div>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-ink leading-tight">
            Práctica Libre
          </h1>
          <p className="mt-2 text-ink-soft font-semibold text-sm md:text-base">
            Sin corazones en riesgo — elige un tema y practica cuanto quieras
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {PRACTICE_TOPICS.map((topic) => {
            const c = colorClasses[topic.color];
            return (
              <Link
                key={topic.slug}
                href={`/practice/${topic.slug}`}
                className={`flex flex-col items-center gap-3 p-4 md:p-5 rounded-3xl bg-white border-2 transition-all active:scale-95 hover:scale-[1.02] ${c.card}`}
                style={{ boxShadow: "var(--shadow-chunky)" }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${c.icon}`}
                >
                  {topic.icon}
                </div>
                <div className="text-center">
                  <div className="font-fredoka font-bold text-ink text-base md:text-lg leading-tight">
                    {topic.title}
                  </div>
                  <div className="text-[11px] font-semibold text-ink-soft mt-0.5">
                    {topic.subtitle}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[11px] font-bold text-ink-mute uppercase tracking-widest">
          {child.name} · Práctica sin límites
        </p>
      </div>
    </div>
  );
}
