/*
  Warnings:

  - Added the required column `companyName` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "companyName" VARCHAR(255) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255),
ADD COLUMN     "username" VARCHAR(255);
