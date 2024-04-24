/*
  Warnings:

  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `SMSToken` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT DEFAULT 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "created_at", "email", "id", "password", "phone", "updated_at", "username") SELECT "avatar", "created_at", "email", "id", "password", "phone", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "SMSToken_token_key" ON "SMSToken"("token");
