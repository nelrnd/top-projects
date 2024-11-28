/*
  Warnings:

  - You are about to drop the column `rootOfId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_rootOfId_fkey";

-- DropIndex
DROP INDEX "Folder_rootOfId_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "rootOfId",
ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false;
