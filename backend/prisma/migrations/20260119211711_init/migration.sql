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
    "primaryPost" TEXT NOT NULL,
    "secondaryPost" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Player" ("createdAt", "dateOfBirth", "email", "firstName", "id", "lastName", "nationality", "photo", "primaryPost", "secondaryNationality", "secondaryPost", "size", "strongFoot", "telephone", "updatedAt", "weight") SELECT "createdAt", "dateOfBirth", "email", "firstName", "id", "lastName", "nationality", "photo", "primaryPost", "secondaryNationality", "secondaryPost", "size", "strongFoot", "telephone", "updatedAt", "weight" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
