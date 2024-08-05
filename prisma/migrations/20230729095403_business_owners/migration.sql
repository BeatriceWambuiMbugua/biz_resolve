/*
  Warnings:

  - You are about to alter the column `businessName` on the `businessEntities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(150)`.
  - You are about to alter the column `category` on the `businessEntities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.
  - You are about to alter the column `location` on the `businessEntities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.
  - You are about to alter the column `address` on the `businessEntities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "businessEntities" ALTER COLUMN "businessName" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "businessDescription" SET DATA TYPE VARCHAR(600),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "_BusinessOwners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessOwners_AB_unique" ON "_BusinessOwners"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessOwners_B_index" ON "_BusinessOwners"("B");

-- AddForeignKey
ALTER TABLE "_BusinessOwners" ADD CONSTRAINT "_BusinessOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "businessEntities"("businessEntityID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessOwners" ADD CONSTRAINT "_BusinessOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("googleAuthID") ON DELETE CASCADE ON UPDATE CASCADE;
