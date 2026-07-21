import { SubscriptionPlan } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { addDaysUtc, canStartTrial, TRIAL_DAYS } from "@/lib/premium";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Inicia la prueba gratuita de 7 días.
 *
 * Reutiliza el mismo mecanismo de premium: pone plan = PREMIUM y
 * premiumUntil = ahora + 7 días. Como `hasPremiumAccess` ya considera
 * plan + vigencia, al día 8 el usuario vuelve automáticamente a FREE.
 *
 * `trialStartedAt` marca que la prueba ya se usó (una sola vez por cuenta).
 */
export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`trial:start:${user.id}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!canStartTrial(user)) {
    return NextResponse.json({ error: "trial_not_available" }, { status: 409 });
  }

  const now = new Date();
  const premiumUntil = addDaysUtc(now, TRIAL_DAYS);
  const note = `Prueba gratis ${TRIAL_DAYS} días`;

  const updated = await prisma.$transaction(async (tx) => {
    // Guard de carrera: sólo actualiza si la prueba aún no se ha usado.
    const result = await tx.user.updateMany({
      where: { id: user.id, trialStartedAt: null, plan: SubscriptionPlan.FREE },
      data: {
        plan: SubscriptionPlan.PREMIUM,
        premiumUntil,
        premiumAssignedAt: now,
        premiumNote: note,
        trialStartedAt: now,
      },
    });

    if (result.count === 0) return null;

    await tx.premiumGrant.create({
      data: {
        userId: user.id,
        adminUserId: null,
        plan: SubscriptionPlan.PREMIUM,
        startsAt: now,
        endsAt: premiumUntil,
        note,
      },
    });

    return tx.user.findUnique({
      where: { id: user.id },
      select: { plan: true, premiumUntil: true, trialStartedAt: true },
    });
  });

  if (!updated) {
    return NextResponse.json({ error: "trial_not_available" }, { status: 409 });
  }

  return NextResponse.json({
    ok: true,
    plan: updated.plan,
    premiumUntil: updated.premiumUntil?.toISOString() ?? null,
    trialDays: TRIAL_DAYS,
  });
}
