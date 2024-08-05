/*
  Warnings:

  - Added the required column `businessStartDate` to the `businesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "businessStartDate" VARCHAR(100) NOT NULL;
