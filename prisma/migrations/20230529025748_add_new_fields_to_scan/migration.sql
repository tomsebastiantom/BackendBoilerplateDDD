/*
  Warnings:

  - Added the required column `guardName` to the `scans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteName` to the `scans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scans" ADD COLUMN     "guardName" VARCHAR(255) NOT NULL,
ADD COLUMN     "siteName" VARCHAR(255) NOT NULL;
