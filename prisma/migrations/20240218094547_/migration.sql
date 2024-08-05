/*
  Warnings:

  - You are about to drop the column `address` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `businessStartDate` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `businesses` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `googleAuthID` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_BusinessOwners" DROP CONSTRAINT "_BusinessOwners_B_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_userID_fkey";

-- DropForeignKey
ALTER TABLE "userfiles" DROP CONSTRAINT "userfiles_userID_fkey";

-- DropIndex
DROP INDEX "users_googleAuthID_key";

-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "address",
DROP COLUMN "businessStartDate",
DROP COLUMN "location",
ADD COLUMN     "phoneNumber" VARCHAR(30) NOT NULL,
ALTER COLUMN "businessDescription" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "googleAuthID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userfiles" ADD CONSTRAINT "userfiles_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessOwners" ADD CONSTRAINT "_BusinessOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
