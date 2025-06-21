/*
  Warnings:

  - You are about to drop the column `clientId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "clientId",
DROP COLUMN "status",
DROP COLUMN "total",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";
