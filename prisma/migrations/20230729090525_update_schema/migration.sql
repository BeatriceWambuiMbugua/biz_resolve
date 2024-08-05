/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "googleAuthID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("googleAuthID")
);

-- CreateTable
CREATE TABLE "businesses" (
    "businessEntityID" TEXT NOT NULL,
    "businessName" VARCHAR(300) NOT NULL,
    "businessDescription" VARCHAR(300) NOT NULL,
    "category" VARCHAR(300) NOT NULL,
    "location" VARCHAR(300) NOT NULL,
    "address" VARCHAR(300) NOT NULL,
    "businessStartDate" VARCHAR(50) NOT NULL,
    "certified" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("businessEntityID")
);

-- CreateTable
CREATE TABLE "rating" (
    "ratingID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "ratingValue" INTEGER NOT NULL,
    "comments" VARCHAR(1000) NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("ratingID")
);

-- CreateTable
CREATE TABLE "userfiles" (
    "fileID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userfiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateTable
CREATE TABLE "businessfiles" (
    "fileID" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessfiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateTable
CREATE TABLE "blacklist" (
    "id" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "dateBlacklisted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_googleAuthID_key" ON "users"("googleAuthID");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userfiles_link_key" ON "userfiles"("link");

-- CreateIndex
CREATE UNIQUE INDEX "businessfiles_link_key" ON "businessfiles"("link");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("googleAuthID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userfiles" ADD CONSTRAINT "userfiles_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("googleAuthID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessfiles" ADD CONSTRAINT "businessfiles_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklist" ADD CONSTRAINT "blacklist_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;
