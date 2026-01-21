-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "secondaryNationality" TEXT,
    "dateOfBirth" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "strongFoot" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "vma" INTEGER,
    "primaryPost" TEXT NOT NULL,
    "secondaryPost" TEXT,
    "photo" TEXT,
    "favoriteTactic" TEXT NOT NULL DEFAULT '4-4-3',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("createdAt", "dateOfBirth", "email", "firstName", "id", "lastName", "nationality", "photo", "primaryPost", "secondaryNationality", "secondaryPost", "size", "strongFoot", "telephone", "updatedAt", "vma", "weight") SELECT "createdAt", "dateOfBirth", "email", "firstName", "id", "lastName", "nationality", "photo", "primaryPost", "secondaryNationality", "secondaryPost", "size", "strongFoot", "telephone", "updatedAt", "vma", "weight" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
CREATE TABLE "new_Stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "careerId" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stats_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stats" ("assists", "careerId", "goals", "id", "matches") SELECT "assists", "careerId", "goals", "id", "matches" FROM "Stats";
DROP TABLE "Stats";
ALTER TABLE "new_Stats" RENAME TO "Stats";
CREATE UNIQUE INDEX "Stats_careerId_key" ON "Stats"("careerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
