-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "secondaryNationality" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "isTreated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Request_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "foundedYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerQualities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "PlayerQualities_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Career" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,
    "season" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    CONSTRAINT "Career_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Career_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "careerId" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Stats_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "institution" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "diploma" TEXT NOT NULL,
    CONSTRAINT "Formation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE INDEX "Request_playerId_idx" ON "Request"("playerId");

-- CreateIndex
CREATE INDEX "PlayerQualities_playerId_idx" ON "PlayerQualities"("playerId");

-- CreateIndex
CREATE INDEX "Career_playerId_idx" ON "Career"("playerId");

-- CreateIndex
CREATE INDEX "Career_clubId_idx" ON "Career"("clubId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_careerId_key" ON "Stats"("careerId");

-- CreateIndex
CREATE INDEX "Formation_playerId_idx" ON "Formation"("playerId");
