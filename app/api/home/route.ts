import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const id = req.headers.get('id');

	const recentSetId = await prisma.recent.findMany({
		select: {
			cardSetId: true
		},
		where: {
			userId: id
		},
		orderBy: {
			updatedAt: 'desc'
		},
		take: 4
	});

	const recentList = [];
	for (const i in recentSetId) {
		const id = recentSetId[i].cardSetId;
		const set = await prisma.cardSet.findFirst({
			where: {
				id
			}
		});
		recentList.push(set);
	}

	const myList = await prisma.cardSet.findMany({
		where: {
			userId: id || ''
		}
	});

	const recList = await prisma.cardSet.findMany({
		where: {
			userId: 'koo-mi'
		}
	});

	const homeData = {
		recentList,
		myList,
		recList
	};

	return NextResponse.json(homeData);
}
