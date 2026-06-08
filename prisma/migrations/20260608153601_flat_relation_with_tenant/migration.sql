/*
  Warnings:

  - A unique constraint covering the columns `[flatId]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tenants_flatId_key" ON "tenants"("flatId");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_flatId_fkey" FOREIGN KEY ("flatId") REFERENCES "flats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
