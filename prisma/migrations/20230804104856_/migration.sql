/*
  Warnings:

  - A unique constraint covering the columns `[businessName]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "businesses_businessName_key" ON "businesses"("businessName");
