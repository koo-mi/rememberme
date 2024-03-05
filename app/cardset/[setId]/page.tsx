'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/Card';
import NavigateCard from '../../components/NavigateCard';
import RateCard from '../../components/RateCard';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CardFinish from '@/app/components/CardFinish';
import { useSession } from 'next-auth/react';

export default function CardSet({ params }: { params: { setId: string } }) {
	const router = useRouter();
	const { data: session } = useSession();

	const [cardList, setCardList] = useState([]);
	const [originalSet, setOriginalSet] = useState([]);
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

	function replay() {
		setCardList(originalSet);
		setTotal(originalSet.length);
		setCurrent(1);
		setComplete(false);
	}

	let previousList = [];
	const [current, setCurrent] = useState(1);
	const [total, setTotal] = useState(1);
	const [complete, setComplete] = useState(false);
	const [cardSetInfo, setCardSetInfo] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getCardSetData() {
			const cardRes = await fetch('/api/flashcard', {
				headers: {
					cardSetId: params.setId,
					id: session?.user.id || ''
				}
			});
			const cardData = await cardRes.json();
			setCardList(cardData);
			setOriginalSet(cardData);
			setTotal(cardData.length);

			const setRes = await fetch('/api/cardset', {
				headers: {
					cardSetId: params.setId
				}
			});
			const setData = await setRes.json();
			setCardSetInfo(setData);

			setIsLoading(false);
		}

		getCardSetData();
	}, [session]);

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

	function handleEdit() {
		router.push(`/cardset/${params.setId}/edit`);
	}

	async function handleDelete() {
		const res = await fetch(`/api/cardset/${params.setId}`, {
			method: 'DELETE',
			headers: {
				cardSetId: params.setId
			}
		});

		router.push('/');
	}

	return (
		<>
			<main className="flex flex-col p-5 sm:p-8 gap-3 max-w-6xl m-auto">
				<div className="flex flex-col w-full gap-2">
					{/* Main Content */}
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
						<CardFinish replay={replay} />
					)}

					{/* Info Container */}
					<div className="border-t py-3">
						{/* Title */}
						<h1 className="font-semibold text-2xl mb-2">{cardSetInfo.title}</h1>

						{/* Author */}
						<div className="flex justify-between items-center mb-5">
							<h2>By {cardSetInfo.author}</h2>
							<div className="flex gap-2">
								<EditRoundedIcon
									className="cursor-pointer icon-enlarge"
									onClick={handleEdit}
								/>
								<DeleteRoundedIcon
									className="cursor-pointer icon-enlarge"
									onClick={handleDelete}
								/>
							</div>
						</div>

						{/* Description */}
						<div className="bg-white rounded w-full p-2">
							<p className="text-sm">{cardSetInfo.description}</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
