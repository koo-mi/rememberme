/*
  Warnings:

  - Added the required column `total` to the `CardSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cardset` ADD COLUMN `total` INTEGER NOT NULL;
