'use client';
import { useState } from 'react';
import CardInput from '../components/CardInput';

const newCardSet = () => {
	const [quizInput, setQuizInput] = useState([{ front: '', back: '' }]);

	function changeQuizInput(i: number, front: boolean, change: string) {
		const newInput = [...quizInput];
		front ? (newInput[i].front = change) : (newInput[i].back = change);
		setQuizInput(newInput);
	}

	function addInput() {
		setQuizInput([...quizInput, { front: '', back: '' }]);
	}

	function removeInput(i) {
		if (!quizInput[1]) {
			return setQuizInput([{ front: '', back: '' }]);
		}

		let newInput = [...quizInput];
		newInput.splice(i, 1);
		setQuizInput(newInput);
	}

	return (
		<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
			<h1 className="font-semibold text-lg">Create New Card Set</h1>
			<form className="flex flex-col gap-3">
				{/* Title */}
				<div className="flex flex-col gap-1">
					<label htmlFor="title">Title:</label>
					<input
						className="rounded border border-black"
						name="title"
						type="text"
					/>
				</div>
				{/* Description */}
				<div className="flex flex-col gap-1 pb-5 border-b border-black">
					<label htmlFor="description">Description:</label>
					<textarea
						className="rounded border border-black"
						name="description"
						rows={4}
					/>
				</div>
				{/* CardInput */}
				{quizInput.map((item, i) => (
					<CardInput
						key={i}
						item={item}
						i={i}
						changeQuizInput={changeQuizInput}
						removeInput={removeInput}
					/>
				))}
				<div
					className="flex justify-center items-center rounded border border-black"
					onClick={addInput}
				>
					<p className="text-2xl">+</p>
				</div>
				<div className="flex justify-end mt-3">
					<button className="py-2 px-3 text-white bg-blue-600 rounded w-24">
						Create
					</button>
				</div>
			</form>
		</main>
	);
};

export default newCardSet;
