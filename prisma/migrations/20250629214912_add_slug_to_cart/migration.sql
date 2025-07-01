/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_slug_key" ON "Cart"("slug");
