/*
  Warnings:

  - Made the column `imageUrl` on table `Step` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoUrl` on table `Step` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT '',
ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "videoUrl" SET DEFAULT '';
