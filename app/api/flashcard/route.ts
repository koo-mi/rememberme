import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	const cardData = await prisma.card.findMany({
		where: {
			cardSetId: Number(cardSetId)
		}
	});

	return NextResponse.json(cardData);
}
