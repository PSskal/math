import { describe, expect, it } from "vitest";
import {
  addDaysUtc,
  addMonthsUtc,
  canStartTrial,
  hasPremiumAccess,
  isTrialActive,
  premiumStatus,
  trialDaysLeft,
} from "@/lib/premium";

const now = new Date("2026-06-02T12:00:00.000Z");

describe("premium access", () => {
  it("blocks free users even if a date exists", () => {
    expect(
      hasPremiumAccess({
        plan: "FREE",
        premiumUntil: new Date("2026-07-02T12:00:00.000Z"),
      }),
    ).toBe(false);
  });

  it("allows premium users with a future expiration", () => {
    expect(
      hasPremiumAccess(
        {
          plan: "PREMIUM",
          premiumUntil: new Date("2026-07-02T12:00:00.000Z"),
        },
        now,
      ),
    ).toBe(true);
  });

  it("allows manually activated premium users without an expiration date", () => {
    expect(
      hasPremiumAccess(
        {
          plan: "PREMIUM",
          premiumUntil: null,
        },
        now,
      ),
    ).toBe(true);
    expect(
      premiumStatus(
        {
          plan: "PREMIUM",
          premiumUntil: null,
        },
        now,
      ),
    ).toBe("active");
  });

  it("treats expired premium as expired", () => {
    expect(
      premiumStatus(
        {
          plan: "PREMIUM",
          premiumUntil: new Date("2026-06-01T12:00:00.000Z"),
        },
        now,
      ),
    ).toBe("expired");
  });

  it("marks access expiring within seven days", () => {
    expect(
      premiumStatus(
        {
          plan: "FAMILY",
          premiumUntil: new Date("2026-06-08T12:00:00.000Z"),
        },
        now,
      ),
    ).toBe("expiring_soon");
  });

  it("adds months using UTC month arithmetic", () => {
    expect(addMonthsUtc(now, 3).toISOString()).toBe("2026-09-02T12:00:00.000Z");
  });

  it("adds days using UTC date arithmetic", () => {
    expect(addDaysUtc(now, 1).toISOString()).toBe("2026-06-03T12:00:00.000Z");
  });
});

describe("free trial", () => {
  it("lets a fresh free user start the trial", () => {
    expect(
      canStartTrial({ plan: "FREE", premiumUntil: null, trialStartedAt: null }),
    ).toBe(true);
  });

  it("blocks starting the trial once it was used", () => {
    expect(
      canStartTrial({
        plan: "FREE",
        premiumUntil: null,
        trialStartedAt: new Date("2026-05-01T12:00:00.000Z"),
      }),
    ).toBe(false);
  });

  it("blocks the trial for users who are already premium", () => {
    expect(
      canStartTrial({
        plan: "PREMIUM",
        premiumUntil: addDaysUtc(now, 30),
        trialStartedAt: null,
      }),
    ).toBe(false);
  });

  it("counts remaining trial days rounding up", () => {
    const user = {
      plan: "PREMIUM" as const,
      premiumUntil: new Date("2026-06-05T00:00:00.000Z"),
      trialStartedAt: new Date("2026-05-29T00:00:00.000Z"),
    };
    // now = 2026-06-02T12:00 → 2.5 days left → ceil → 3
    expect(trialDaysLeft(user, now)).toBe(3);
    expect(isTrialActive(user, now)).toBe(true);
  });

  it("reports zero days and inactive once the trial expired", () => {
    const user = {
      plan: "PREMIUM" as const,
      premiumUntil: new Date("2026-06-01T12:00:00.000Z"),
      trialStartedAt: new Date("2026-05-25T12:00:00.000Z"),
    };
    expect(trialDaysLeft(user, now)).toBe(0);
    expect(isTrialActive(user, now)).toBe(false);
  });
});
