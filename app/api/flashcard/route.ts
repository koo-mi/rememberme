import prisma from '../../../db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const cardSetId = Number(req.headers.get('cardSetId'));
	const id = req.headers.get('id');

	const cardData = await prisma.card.findMany({
		where: {
			cardSetId: cardSetId
		}
	});

	if (id) {
		// Check if this card set exists in Recent table.
		const cardSetExist = await prisma.user.findFirst({
			where: {
				id
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
					userId: id,
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
					userId: id,
					cardSetId
				}
			});
		}
	}

	return NextResponse.json(cardData);
}
