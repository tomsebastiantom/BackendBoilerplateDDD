/*
  Warnings:

  - You are about to drop the column `Address` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Address",
ADD COLUMN     "address" JSON;
