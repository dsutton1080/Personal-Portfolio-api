-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,
    "lastName" TEXT,
    "password" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER,
    "title" TEXT NOT NULL DEFAULT 'New Section',
    "header" TEXT,
    "subHeader" TEXT
);

-- CreateTable
CREATE TABLE "Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "order" INTEGER,
    "section_id" INTEGER NOT NULL,
    CONSTRAINT "Content_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'New Experience',
    "content" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'New Project',
    "content" TEXT NOT NULL DEFAULT '',
    "repoLink" TEXT NOT NULL DEFAULT '',
    "repoLabel" TEXT NOT NULL DEFAULT '',
    "order" INTEGER,
    "imageUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
