/*
  Warnings:

  - You are about to drop the column `provider` on the `account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "account_providerId_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "provider";
