import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/server";
import { canStartTrial, hasPremiumAccess, TRIAL_DAYS } from "@/lib/premium";
import { TrialChoice } from "./TrialChoice";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");
  if (user.children.length === 0) redirect("/profile/create");

  if (hasPremiumAccess(user) || !canStartTrial(user)) {
    redirect("/subjects");
  }

  return <TrialChoice trialDays={TRIAL_DAYS} />;
}
