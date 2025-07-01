/*
  Warnings:

  - You are about to drop the column `userId` on the `Catalog` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Catalog" DROP CONSTRAINT "Catalog_userId_fkey";

-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "userId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
