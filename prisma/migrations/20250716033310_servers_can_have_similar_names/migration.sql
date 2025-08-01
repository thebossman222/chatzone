/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "server_id_name_key" ON "server"("id", "name");
