/*
  Warnings:

  - You are about to drop the `Competetion` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Career" ADD COLUMN "clubLogo" TEXT;
ALTER TABLE "Career" ADD COLUMN "competitionLogo" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Competetion";
PRAGMA foreign_keys=on;
