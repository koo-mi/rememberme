import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, description, author, isPrivate, total, userId } =
		await req.json();

	await prisma.cardSet.create({
		data: {
			title,
			description,
			author,
			isPrivate,
			total,
			userId
		}
	});

	return NextResponse.json({ message: 'complete' });
}
