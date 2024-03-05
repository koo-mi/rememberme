'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardInput from '../components/CardInput';
import { useSession } from 'next-auth/react';
import NewInputButton from '../components/NewInputButton';

const NewCardSet = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [quizInput, setQuizInput] = useState([{ question: '', answer: '' }]);

	function changeQuizInput(i: number, question: boolean, change: string) {
		const newInput = [...quizInput];
		question ? (newInput[i].question = change) : (newInput[i].answer = change);
		setQuizInput(newInput);
	}

	function addInput() {
		setQuizInput([...quizInput, { question: '', answer: '' }]);
	}

	function removeInput(i) {
		if (!quizInput[1]) {
			return setQuizInput([{ question: '', answer: '' }]);
		}

		let newInput = [...quizInput];
		newInput.splice(i, 1);
		setQuizInput(newInput);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			title: e.target.title.value,
			description: e.target.description.value,
			cards: quizInput,
			id: session?.user.id || '',
			isPrivate: false,
			author: session?.user.name
		};

		const res = await fetch('/api/addcardset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		router.push('/');
	}

	return (
		<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
			<h1 className="font-semibold text-xl">Create New Card Set</h1>
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				{/* Title */}
				<div className="flex flex-col gap-1">
					<label htmlFor="title" className="text-lg">
						Title:
					</label>
					<input
						className="rounded border border-gray-400"
						name="title"
						type="text"
					/>
				</div>
				{/* Description */}
				<div className="flex flex-col gap-1 pb-5 border-b border-gray-400">
					<label htmlFor="description" className="text-lg">
						Description:
					</label>
					<textarea
						className="rounded border border-gray-400"
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
				<NewInputButton addInput={addInput} />
				<div className="flex justify-end mt-3">
					<button className="py-2 px-3 text-white bg-blue-600 rounded w-24 hover:text-blue-600 hover:bg-blue-100 hover:font-semibold border border-blue-600">
						Create
					</button>
				</div>
			</form>
		</main>
	);
};

export default NewCardSet;
