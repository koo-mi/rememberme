import prisma from '@/db';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
	const { id, isStar } = await req.json();

	await prisma.card.update({
		where: {
			id
		},
		data: {
			isStar
		}
	});

	return NextResponse.json({ message: 'complete' });
}
