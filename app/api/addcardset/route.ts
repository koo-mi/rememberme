import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, description, isPrivate, userId, cards } = await req.json();

	await prisma.cardSet.create({
		data: {
			title,
			description,
			author: userId,
			isPrivate,
			total: cards.length,
			userId
		}
	});

	const newSetId = await prisma.cardSet.findFirst({
		where: {
			title,
			author: userId,
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
