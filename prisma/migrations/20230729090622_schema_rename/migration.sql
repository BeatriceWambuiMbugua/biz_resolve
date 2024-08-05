/*
  Warnings:

  - You are about to drop the `businesses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `businessfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blacklist" DROP CONSTRAINT "blacklist_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "businessfiles" DROP CONSTRAINT "businessfiles_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userID_fkey";

-- DropForeignKey
ALTER TABLE "userfiles" DROP CONSTRAINT "userfiles_userID_fkey";

-- DropTable
DROP TABLE "businesses";

-- DropTable
DROP TABLE "businessfiles";

-- DropTable
DROP TABLE "rating";

-- DropTable
DROP TABLE "userfiles";

-- CreateTable
CREATE TABLE "businessEntities" (
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

    CONSTRAINT "businessEntities_pkey" PRIMARY KEY ("businessEntityID")
);

-- CreateTable
CREATE TABLE "ratings" (
    "ratingID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "ratingValue" INTEGER NOT NULL,
    "comments" VARCHAR(1000) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("ratingID")
);

-- CreateTable
CREATE TABLE "userFiles" (
    "fileID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userFiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateTable
CREATE TABLE "businessFiles" (
    "fileID" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessFiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateIndex
CREATE UNIQUE INDEX "userFiles_link_key" ON "userFiles"("link");

-- CreateIndex
CREATE UNIQUE INDEX "businessFiles_link_key" ON "businessFiles"("link");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("googleAuthID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businessEntities"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFiles" ADD CONSTRAINT "userFiles_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("googleAuthID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessFiles" ADD CONSTRAINT "businessFiles_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businessEntities"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklist" ADD CONSTRAINT "blacklist_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businessEntities"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;
