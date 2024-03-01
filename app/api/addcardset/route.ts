import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, description, isPrivate, author, cards, id, userId } =
		await req.json();

	await prisma.cardSet.create({
		data: {
			title,
			description,
			author,
			isPrivate,
			total: cards.length,
			userId: id
		}
	});

	const newSetId = await prisma.cardSet.findFirst({
		where: {
			title,
			author,
			userId
		}
	});

	for (let i in cards) {
		await prisma.card.create({
			data: {
				cardSetId: newSetId.id,
				question: cards[i].question,
				answer: cards[i].answer
			}
		});
	}

	return NextResponse.json({ message: 'complete' });
}
