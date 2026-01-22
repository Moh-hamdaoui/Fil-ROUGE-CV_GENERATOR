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
    "isInternationalPlayer" BOOLEAN NOT NULL DEFAULT false,
    "aboutInternationalSelection" TEXT,
    "internationalTeamName" TEXT,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isChampionWinner" BOOLEAN NOT NULL DEFAULT false,
    "nameOfChampionship" TEXT,
    "clubLogo" TEXT,
    "competitionLogo" TEXT,
    CONSTRAINT "Career_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Career_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Career" ("clubId", "clubLogo", "competition", "competitionLogo", "endDate", "id", "playerId", "season", "startDate") SELECT "clubId", "clubLogo", "competition", "competitionLogo", "endDate", "id", "playerId", "season", "startDate" FROM "Career";
DROP TABLE "Career";
ALTER TABLE "new_Career" RENAME TO "Career";
CREATE INDEX "Career_playerId_idx" ON "Career"("playerId");
CREATE INDEX "Career_clubId_idx" ON "Career"("clubId");
CREATE TABLE "new_Stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "careerId" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "cleanSheet" INTEGER,
    "averagePlayingTime" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stats_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("assists", "averagePlayingTime", "careerId", "cleanSheet", "goals", "id", "matches") SELECT "assists", "averagePlayingTime", "careerId", "cleanSheet", "goals", "id", "matches" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
CREATE UNIQUE INDEX "Stats_careerId_key" ON "Stats"("careerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
