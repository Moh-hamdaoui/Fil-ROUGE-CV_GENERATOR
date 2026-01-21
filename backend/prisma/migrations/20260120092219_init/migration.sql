-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Career" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    CONSTRAINT "Career_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Career_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Career" ("clubId", "competition", "endDate", "id", "playerId", "season", "startDate") SELECT "clubId", "competition", "endDate", "id", "playerId", "season", "startDate" FROM "Career";
DROP TABLE "Career";
ALTER TABLE "new_Career" RENAME TO "Career";
CREATE INDEX "Career_playerId_idx" ON "Career"("playerId");
CREATE INDEX "Career_clubId_idx" ON "Career"("clubId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
