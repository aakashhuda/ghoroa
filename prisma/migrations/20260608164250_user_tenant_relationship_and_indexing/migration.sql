/*
  Warnings:

  - You are about to drop the column `primaryUserId` on the `tenants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Made the column `flatDetails` on table `flats` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_primaryUserId_fkey";

-- DropIndex
DROP INDEX "tenants_primaryUserId_key";

-- AlterTable
ALTER TABLE "flats" ALTER COLUMN "flatDetails" SET NOT NULL,
ALTER COLUMN "flatDetails" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "primaryUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_userId_key" ON "tenants"("userId");

-- CreateIndex
CREATE INDEX "users_email_phone_idx" ON "users"("email", "phone");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
