/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Server_id_name_key" ON "Server"("id", "name");
