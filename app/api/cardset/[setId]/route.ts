import prisma from '../../../../db';
import { NextResponse } from 'next/server';

/* Delete cardSet by ID */
export async function DELETE(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	await prisma.cardSet.delete({
		where: {
			id: Number(cardSetId)
		}
	});

	return NextResponse.json({ message: 'complete' });
}

/* Get cardSet Info by ID */
export async function GET(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	const setInfo = await prisma.cardSet.findFirst({
		where: {
			id: Number(cardSetId)
		},
		include: {
			Card: {
				select: {
					id: true,
					question: true,
					answer: true
				}
			}
		}
	});

	return NextResponse.json(setInfo);
}

/* For Editing CardSet */
export async function PUT(req: Request) {
	const cardSetId = Number(req.headers.get('cardSetId'));
	const { title, description, cards, userId, isPrivate, deleted } =
		await req.json();
	const total = cards.length;

	// Update the cardSet Info - title, description, total
	const setInfo = await prisma.cardSet.update({
		where: {
			id: cardSetId
		},
		data: {
			title,
			description,
			total
		}
	});

	// Update card Info
	cards.forEach(async (card) => {
		// If already exist, update
		if (card.id !== 0) {
			await prisma.card.update({
				where: {
					id: Number(card.id)
				},
				data: {
					question: card.question,
					answer: card.answer
				}
			});
		}
		// If new, create
		else {
			await prisma.card.create({
				data: {
					question: card.question,
					answer: card.answer,
					cardSetId
				}
			});
		}
	});

	// Delete cards
	deleted.forEach(async (id) => {
		await prisma.card.delete({
			where: {
				id
			}
		});
	});

	return NextResponse.json(setInfo);
}
