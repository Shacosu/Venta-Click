/*
  Warnings:

  - You are about to drop the column `trialEnds` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "trialEnds",
ADD COLUMN     "planEnds" TIMESTAMP(3);
