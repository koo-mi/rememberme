-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_cardSetId_fkey`;

-- DropForeignKey
ALTER TABLE `cardset` DROP FOREIGN KEY `CardSet_userId_fkey`;

-- AddForeignKey
ALTER TABLE `CardSet` ADD CONSTRAINT `CardSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_cardSetId_fkey` FOREIGN KEY (`cardSetId`) REFERENCES `CardSet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
