/*
  Warnings:

  - You are about to drop the `businessEntities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `businessFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userFiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `blacklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BusinessOwners" DROP CONSTRAINT "_BusinessOwners_A_fkey";

-- DropForeignKey
ALTER TABLE "blacklist" DROP CONSTRAINT "blacklist_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "businessFiles" DROP CONSTRAINT "businessFiles_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_businessEntityID_fkey";

-- DropForeignKey
ALTER TABLE "userFiles" DROP CONSTRAINT "userFiles_userID_fkey";

-- AlterTable
ALTER TABLE "blacklist" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "businessEntities";

-- DropTable
DROP TABLE "businessFiles";

-- DropTable
DROP TABLE "userFiles";

-- CreateTable
CREATE TABLE "businesses" (
    "businessEntityID" TEXT NOT NULL,
    "businessName" VARCHAR(150) NOT NULL,
    "businessDescription" VARCHAR(600) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "businessStartDate" VARCHAR(50) NOT NULL,
    "certified" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("businessEntityID")
);

-- CreateTable
CREATE TABLE "userfiles" (
    "fileID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userfiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateTable
CREATE TABLE "businessfiles" (
    "fileID" TEXT NOT NULL,
    "businessEntityID" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businessfiles_pkey" PRIMARY KEY ("fileID")
);

-- CreateIndex
CREATE UNIQUE INDEX "userfiles_link_key" ON "userfiles"("link");

-- CreateIndex
CREATE UNIQUE INDEX "businessfiles_link_key" ON "businessfiles"("link");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userfiles" ADD CONSTRAINT "userfiles_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("googleAuthID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessfiles" ADD CONSTRAINT "businessfiles_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklist" ADD CONSTRAINT "blacklist_businessEntityID_fkey" FOREIGN KEY ("businessEntityID") REFERENCES "businesses"("businessEntityID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessOwners" ADD CONSTRAINT "_BusinessOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "businesses"("businessEntityID") ON DELETE CASCADE ON UPDATE CASCADE;
