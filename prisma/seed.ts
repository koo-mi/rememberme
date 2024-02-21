import prisma from '../db';
import { userData, setData, cardData } from './seedData';

async function main() {
	for (let user of userData) {
		const { name, id } = user;
		await prisma.user.create({
			data: {
				name,
				id
			}
		});
	}

	for (let set of setData) {
		const { title, description, author, isPrivate, userId } = set;
		await prisma.cardSet.create({
			data: {
				title,
				description,
				author,
				isPrivate,
				userId
			}
		});
	}

	for (let card of cardData) {
		const { question, answer, hint, cardSetId } = card;

		await prisma.card.create({
			data: {
				question,
				answer,
				hint,
				cardSetId
			}
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
