-- Prueba gratuita: marca cuándo el usuario inició su trial (una sola vez).
ALTER TABLE "user"
  ADD COLUMN "trialStartedAt" TIMESTAMP(3);
