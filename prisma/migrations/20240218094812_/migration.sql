/*
  Warnings:

  - Added the required column `email` to the `businesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "email" VARCHAR(80) NOT NULL;
