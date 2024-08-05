/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `logo` to the `businesses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "logo" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "businesses_email_key" ON "businesses"("email");
