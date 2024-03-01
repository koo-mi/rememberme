import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, description, isPrivate, author, cards, email, userId } =
		await req.json();

	const id = await prisma.user.findFirst({
		where: {
			email
		},
		select: {
			id: true
		}
	});

	await prisma.cardSet.create({
		data: {
			title,
			description,
			author,
			isPrivate,
			total: cards.length,
			userId: id.id
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
