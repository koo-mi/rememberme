'use client';
import Card from './components/Card';
import NavigateCard from './components/NavigateCard';
import RateCard from './components/RateCard';
import { useState } from 'react';

export default function Home() {
	const [cardList, setCardList] = useState([
		{
			question: 'What is the capital city of France?',
			answer: 'Paris',
			hint: 'P____'
		},
		{
			question: 'What is the capital city of Korea?',
			answer: 'Seoul',
			hint: 'S____'
		},
		{
			question: 'What is the capital city of Japan?',
			answer: 'Tokyo',
			hint: 'T____'
		},
		{
			question: 'What is the capital city of Canada?',
			answer: 'Ottawa',
			hint: 'O_____'
		}
	]);
	const [nextList, setNextList] = useState<any>([]);
	let previousList = [];

	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(4);
	const [complete, setComplete] = useState(false);

	// Move the card to other index
	function changeCurrent(num: number) {
		let newNum = current + num;
		if (newNum < 1) {
			return;
		}
		setCurrent(newNum);
	}

	// Add new card to NextList
	function addToNextList(index: number) {
		setNextList([...nextList, cardList[index]]);
	}

	// Switch cardList to nextList
	function switchList() {
		previousList = [...cardList];
		setCurrent(1);
		setTotal(nextList.length);
		setCardList([...nextList]);
		setNextList([]);
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
							total={total}
							addToNextList={addToNextList}
							switchList={switchList}
						/>
						<NavigateCard
							current={current}
							total={total}
							changeCurrent={changeCurrent}
						/>
					</>
				) : (
					'Complete!'
				)}
			</main>
		</>
	);
}
