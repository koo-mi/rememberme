import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const recommendData = await prisma.cardSet.findMany({
		where: {
			userId: 'koo-mi'
		}
	});

	return NextResponse.json(recommendData);
}
