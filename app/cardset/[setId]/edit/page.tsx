'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardInput from '@/app/components/CardInput';
import NewInputButton from '@/app/components/NewInputButton';
import { useSession } from 'next-auth/react';

const EditCardSet = ({ params }: { params: { setId: string } }) => {
	const router = useRouter();
	const { data: session } = useSession();

	const [isLoading, setIsLoading] = useState(true);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [cardData, setCardData] = useState([
		{ id: 0, question: '', answer: '' }
	]);
	const [deleted, setDeleted] = useState<number[]>([]);

	useEffect(() => {
		async function getSetInfo() {
			const res = await fetch(`/api/cardset/${params.setId}`, {
				method: 'GET',
				headers: {
					cardSetId: params.setId,
					userId: session?.user.id
				}
			});
			const cardSetData = await res.json();

			setTitle(cardSetData.title);
			setDescription(cardSetData.description);
			setCardData(cardSetData.Card);
			setIsLoading(false);
		}

		getSetInfo();
	}, [session]);

	if (isLoading) {
		return;
	}

	function changeQuizInput(i: number, question: boolean, change: string) {
		const newInput = [...cardData];
		question ? (newInput[i].question = change) : (newInput[i].answer = change);
		setCardData(newInput);
	}

	function addInput() {
		setCardData([...cardData, { id: 0, question: '', answer: '' }]);
	}

	function removeInput(i) {
		if (!cardData[1]) {
			return setCardData([{ id: 0, question: '', answer: '' }]);
		}
		let newInput = [...cardData];
		let newDeleted = [...deleted, cardData[i].id];
		newInput.splice(i, 1);
		setCardData(newInput);
		setDeleted(newDeleted);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			title: e.target.title.value,
			description: e.target.description.value,
			cards: cardData,
			userId: 'koo-mi',
			isPrivate: false,
			deleted
		};

		const res = await fetch(`/api/cardset/${params.setId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				cardSetId: params.setId,
				userId: session?.user.id
			},
			body: JSON.stringify(data)
		});

		router.push(`/cardset/${params.setId}`);
	}

	return (
		<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
			<h1 className="font-semibold text-xl">Edit Card Set</h1>
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
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
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
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</div>
				{/* CardInput */}
				{cardData.map((item, i) => (
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
						Edit
					</button>
				</div>
			</form>
		</main>
	);
};

export default EditCardSet;
