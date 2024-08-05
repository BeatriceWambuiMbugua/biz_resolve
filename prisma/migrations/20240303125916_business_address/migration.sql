/*
  Warnings:

  - You are about to drop the column `location` on the `businesses` table. All the data in the column will be lost.
  - Added the required column `address` to the `businesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "location",
ADD COLUMN     "address" VARCHAR(100) NOT NULL;
