/*
  Warnings:

  - Added the required column `category` to the `PlayerQualities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN "vma" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerQualities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "PlayerQualities_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PlayerQualities" ("id", "playerId", "quality", "rating") SELECT "id", "playerId", "quality", "rating" FROM "PlayerQualities";
DROP TABLE "PlayerQualities";
ALTER TABLE "new_PlayerQualities" RENAME TO "PlayerQualities";
CREATE INDEX "PlayerQualities_playerId_idx" ON "PlayerQualities"("playerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
