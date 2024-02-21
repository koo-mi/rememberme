import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	await prisma.user.create({
		data: {
			name: 'Test'
		}
	});

	const userData = await prisma.user.findMany({
		where: {
			name: 'Test'
		}
	});

	return NextResponse.json(userData);
}

const a = {
	question: 'What is the capital city of Korea?',
	answer: 'Seoul',
	hint: 'Hint',
	cardSetId: 1
};
