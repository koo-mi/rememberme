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
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(4);

	function changeCurrent(num: number) {
		let newNum = current + num;
		if (newNum < 1) {
			return;
		} else if (newNum > total) {
			return;
		}
		setCurrent(newNum);
	}

	return (
		<>
			<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
				<h1 className="font-semibold text-lg">Geography Midterm</h1>
				<Card cardList={cardList} current={current} />
				<RateCard changeCurrent={changeCurrent} />
				<NavigateCard
					current={current}
					total={total}
					changeCurrent={changeCurrent}
				/>
			</main>
		</>
	);
}
