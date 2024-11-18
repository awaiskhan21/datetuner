/*
  Warnings:

  - You are about to drop the column `udatedAt` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "udatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
