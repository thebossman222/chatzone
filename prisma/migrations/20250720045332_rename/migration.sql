/*
  Warnings:

  - You are about to drop the column `chatId` on the `post` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_chatId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "chatId",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
