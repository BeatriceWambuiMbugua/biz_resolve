/*
  Warnings:

  - Added the required column `fileName` to the `businessFiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `userFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "businessFiles" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userFiles" ADD COLUMN     "fileName" TEXT NOT NULL;
