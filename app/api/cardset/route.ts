import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const cardSetId = req.headers.get('cardSetId');

	const cardSet = await prisma.cardSet.findFirst({
		where: {
			id: Number(cardSetId)
		}
	});

	return NextResponse.json(cardSet);
}
