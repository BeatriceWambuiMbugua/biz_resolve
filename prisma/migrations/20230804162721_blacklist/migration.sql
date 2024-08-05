/*
  Warnings:

  - A unique constraint covering the columns `[businessEntityID]` on the table `blacklist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blacklist_businessEntityID_key" ON "blacklist"("businessEntityID");
