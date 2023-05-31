/*
  Warnings:

  - You are about to drop the column `TenantName` on the `tenants` table. All the data in the column will be lost.
  - Added the required column `dbUrl` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "TenantName",
ADD COLUMN     "dbUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
