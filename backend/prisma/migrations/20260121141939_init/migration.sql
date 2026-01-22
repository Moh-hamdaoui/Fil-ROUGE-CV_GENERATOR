/*
  Warnings:

  - You are about to drop the column `rating` on the `PlayerQualities` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Competetion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerQualities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    CONSTRAINT "PlayerQualities_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlayerQualities" ("category", "id", "playerId", "quality") SELECT "category", "id", "playerId", "quality" FROM "PlayerQualities";
DROP TABLE "PlayerQualities";
ALTER TABLE "new_PlayerQualities" RENAME TO "PlayerQualities";
CREATE INDEX "PlayerQualities_playerId_idx" ON "PlayerQualities"("playerId");
CREATE TABLE "new_Stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "careerId" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "cleanSheet" INTEGER,
    "averagePlayingTime" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stats_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("assists", "careerId", "goals", "id", "matches") SELECT "assists", "careerId", "goals", "id", "matches" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
CREATE UNIQUE INDEX "Stats_careerId_key" ON "Stats"("careerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
