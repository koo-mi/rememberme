import prisma from '../../../db';
import { NextResponse } from 'next/server';
import checkCardSetAccess from '@/lib/checkCardSetAccess';

export async function GET(req: Request) {
	const cardSetId = Number(req.headers.get('cardSetId'));
	const userId = req.headers.get('id');

	// Get cardSet Data with validation
	const cardSetData = await checkCardSetAccess(cardSetId, userId, true);

	if (cardSetData === 404) {
		return NextResponse.json(
			{ message: 'Unable to find the cardSet.' },
			{ status: 404 }
		);
	} else if (cardSetData === 403) {
		return NextResponse.json({ message: 'Access Denied' }, { status: 403 });
	}

	const cardData = await prisma.card.findMany({
		where: {
			cardSetId: cardSetId
		}
	});

	if (userId) {
		// Check if this card set exists in Recent table.
		const cardSetExist = await prisma.user.findFirst({
			where: {
				id: userId
			},
			select: {
				recent: {
					where: {
						cardSetId
					}
				}
			}
		});

		// If exist, update the entry
		if (cardSetExist!.recent.length) {
			await prisma.recent.updateMany({
				where: {
					userId,
					cardSetId
				},
				data: {
					cardSetId
				}
			});
		} else {
			// If not, create the entry
			await prisma.recent.create({
				data: {
					userId,
					cardSetId
				}
			});
		}
	}

	return NextResponse.json({ cardSetData, cardData });
}
