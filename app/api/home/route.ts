import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const email = req.headers.get('email');

	const id = await prisma.user.findFirst({
		where: {
			email
		},
		select: {
			id: true
		}
	});

	const myList = await prisma.cardSet.findMany({
		where: {
			userId: id?.id
		}
	});

	return NextResponse.json(myList);
}
