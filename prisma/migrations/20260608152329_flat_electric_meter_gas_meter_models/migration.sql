-- CreateTable
CREATE TABLE "flats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "electricMeterId" TEXT NOT NULL,
    "gasMeterId" TEXT NOT NULL,
    "flatDetails" JSONB,

    CONSTRAINT "flats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "electric_meters" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "meterNo" BIGINT NOT NULL,

    CONSTRAINT "electric_meters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gas_meters" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "meterNo" BIGINT NOT NULL,

    CONSTRAINT "gas_meters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flats_code_key" ON "flats"("code");

-- CreateIndex
CREATE UNIQUE INDEX "flats_electricMeterId_key" ON "flats"("electricMeterId");

-- CreateIndex
CREATE UNIQUE INDEX "flats_gasMeterId_key" ON "flats"("gasMeterId");

-- CreateIndex
CREATE INDEX "flats_code_idx" ON "flats"("code");

-- CreateIndex
CREATE UNIQUE INDEX "electric_meters_meterNo_key" ON "electric_meters"("meterNo");

-- CreateIndex
CREATE INDEX "electric_meters_meterNo_idx" ON "electric_meters"("meterNo");

-- CreateIndex
CREATE UNIQUE INDEX "gas_meters_meterNo_key" ON "gas_meters"("meterNo");

-- CreateIndex
CREATE INDEX "gas_meters_meterNo_idx" ON "gas_meters"("meterNo");

-- AddForeignKey
ALTER TABLE "flats" ADD CONSTRAINT "flats_electricMeterId_fkey" FOREIGN KEY ("electricMeterId") REFERENCES "electric_meters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flats" ADD CONSTRAINT "flats_gasMeterId_fkey" FOREIGN KEY ("gasMeterId") REFERENCES "gas_meters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
