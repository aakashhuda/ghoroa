-- AlterTable
ALTER TABLE "users" ALTER COLUMN "userType" SET DEFAULT 'SUPER_ADMIN';

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "verifications_identifier_idx" ON "verifications"("identifier");
