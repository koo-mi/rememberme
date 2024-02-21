'use client';
import Card from '../../components/Card';
import NavigateCard from '../../components/NavigateCard';
import RateCard from '../../components/RateCard';
import { useEffect, useState } from 'react';

export default function cardSet({ params }: { params: { setId: string } }) {
	const [cardList, setCardList] = useState([]);

	const [nextSet, setNextSet] = useState(new Set());

	function addToNextSet(index: number) {
		const newSet = nextSet.add(index);
		setNextSet(newSet);
	}

	function removeFromNextSet(index: number) {
		if (nextSet.has(index)) {
			const newSet = new Set(nextSet);
			newSet.delete(index);
			setNextSet(newSet);
		}
	}

	let previousList = [];
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(1);
	const [complete, setComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getCardSetData() {
			const res = await fetch('/api/flashcard', {
				headers: {
					cardSetId: params.setId
				}
			});
			const cardData = await res.json();
			setCardList(cardData);
			setTotal(cardData.length);
			setIsLoading(false);
		}

		getCardSetData();
	}, []);

	if (isLoading) {
		return;
	}

	// Move the card to other index
	function changeCurrent(num: number) {
		let newNum = current + num;
		if (newNum < 1) {
			return;
		}
		setCurrent(newNum);
	}

	function switchList() {
		previousList = [...cardList];

		const newSetIndex = nextSet.entries();
		const newList = [];
		for (const i of newSetIndex) {
			newList.push(cardList[i[1]]);
		}
		setCurrent(1);
		setTotal(newList.length);
		setCardList([...newList]);
		setNextSet(new Set());
	}

	if (total === 0 && !complete) {
		setComplete(true);
	}

	if (current > total && total > 0) {
		switchList();
	}

	return (
		<>
			<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
				<h1 className="font-semibold text-lg">Geography Midterm</h1>
				{!complete ? (
					<>
						<Card cardList={cardList} current={current} />
						<RateCard
							changeCurrent={changeCurrent}
							current={current}
							addToNextSet={addToNextSet}
						/>
						<NavigateCard
							current={current}
							total={total}
							changeCurrent={changeCurrent}
							addToNextSet={addToNextSet}
							removeFromNextSet={removeFromNextSet}
						/>
					</>
				) : (
					'Complete!'
				)}
			</main>
		</>
	);
}
