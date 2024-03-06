import prisma from '@/db';

export default async function checkCardSetAccess(
	cardSetId: number,
	userId: string,
	checkPrivate: boolean
) {
	// Get cardSet Data
	const cardSetData = await prisma.cardSet.findFirst({
		where: {
			id: cardSetId
		}
	});

	// If cardSet does not exist
	if (!cardSetData) {
		return 404;
	}

	// Check if the user has the access to the set

	if (checkPrivate) {
		if (cardSetData.isPrivate && cardSetData.userId !== userId) {
			return 403;
		}
	} else {
		if (cardSetData.userId !== userId) {
			return 403;
		}
	}

	return cardSetData;
}
