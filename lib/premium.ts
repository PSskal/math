import type { SubscriptionPlan } from "@prisma/client";

/** Duración de la prueba gratuita, en días. */
export const TRIAL_DAYS = 7;

export type PremiumUser = {
  plan: SubscriptionPlan;
  premiumUntil: Date | null;
};

export type TrialUser = PremiumUser & {
  trialStartedAt: Date | null;
};

export type PremiumStatus = "free" | "active" | "expiring_soon" | "expired";

export function hasPremiumAccess(user: PremiumUser, now = new Date()) {
  if (user.plan === "FREE") return false;
  if (!user.premiumUntil) return true;
  return user.premiumUntil > now;
}

export function premiumStatus(user: PremiumUser, now = new Date()): PremiumStatus {
  if (user.plan === "FREE") return "free";
  if (!user.premiumUntil) return "active";
  if (user.premiumUntil <= now) return "expired";

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  if (user.premiumUntil.getTime() - now.getTime() <= sevenDaysMs) {
    return "expiring_soon";
  }

  return "active";
}

/**
 * ¿El usuario puede iniciar la prueba gratuita? Sólo si nunca la ha usado
 * y todavía está en plan FREE (no tiene sentido para quien ya es Premium).
 */
export function canStartTrial(user: TrialUser) {
  return user.trialStartedAt == null && user.plan === "FREE";
}

/**
 * Días completos que le quedan a la prueba. Devuelve 0 si ya expiró o si el
 * usuario nunca inició la prueba. Redondea hacia arriba: durante el último
 * día parcial sigue mostrando "1 día".
 */
export function trialDaysLeft(user: TrialUser, now = new Date()) {
  if (!user.trialStartedAt || !user.premiumUntil) return 0;
  const ms = user.premiumUntil.getTime() - now.getTime();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

/** ¿El acceso premium actual proviene de la prueba gratuita en curso? */
export function isTrialActive(user: TrialUser, now = new Date()) {
  return (
    user.trialStartedAt != null &&
    user.premiumUntil != null &&
    user.premiumUntil > now
  );
}

export function addMonthsUtc(date: Date, months: number) {
  const copy = new Date(date);
  copy.setUTCMonth(copy.getUTCMonth() + months);
  return copy;
}

export function addDaysUtc(date: Date, days: number) {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

export function formatPremiumDate(date: Date | null | undefined) {
  if (!date) return null;
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
