-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "order" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Metrics" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Views" INTEGER NOT NULL,
    "CTA_Clicks" INTEGER NOT NULL,
    "Play_Time" INTEGER NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
