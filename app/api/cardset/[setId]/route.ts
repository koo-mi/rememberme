import prisma from '../../../../db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	await prisma.cardSet.delete({
		where: {
			id: Number(cardSetId)
		}
	});

	return NextResponse.json({ message: 'complete' });
}

export async function GET(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	const setInfo = await prisma.cardSet.findFirst({
		where: {
			id: Number(cardSetId)
		},
		include: {
			Card: {
				select: {
					question: true,
					answer: true
				}
			}
		}
	});

	return NextResponse.json(setInfo);
}

export async function PUT(req: Request) {
	const cardSetId = req.headers.get('cardSetId');
	const { title, description, cards, userId, isPrivate } = await req.json();

	console.log(title, description, cards, userId, isPrivate);

	// const setInfo = await prisma.cardSet.update({
	//     where: {
	//         id: Number(cardSetId)
	//     },
	//     data: {
	//         title, description
	//     }
	// })
	return NextResponse.json({});
	// return NextResponse.json(setInfo);
}
