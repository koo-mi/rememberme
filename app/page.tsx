'use client';
import { useEffect, useState } from 'react';
import HomeCardLink from './components/HomeCardLink';
import { useSession } from 'next-auth/react';

export default function Home() {
	const [mySetList, setMySetList] = useState([]);
	const [myRecList, setMyRecList] = useState([]);
	const [recentList, setRecentList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { data: session } = useSession();

	useEffect(() => {
		async function homeInfo() {
			const res = await fetch('/api/home', {
				headers: {
					id: session?.user.id
				}
			});
			const homeData = await res.json();

			setMySetList(homeData.myList);
			setMyRecList(homeData.recList);
			setRecentList(homeData.recentList);
		}

		homeInfo();
		setIsLoading(false);
	}, [session]);

	if (isLoading) {
		return;
	}

	return (
		<>
			<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
				{/* Recent */}
				<div>
					<h2 className="font-semibold text-lg">Recent</h2>
					<div className="grid grid-cols-2 gap-2 mt-3">
						{recentList.map((set) => {
							return (
								<HomeCardLink
									key={set.id}
									title={set.title}
									qty={set.total}
									author={set.author}
									link={`/cardset/${set.id}`}
								/>
							);
						})}
					</div>
				</div>

				{/* My Sets */}
				<div>
					<h2 className="font-semibold text-lg">My Sets</h2>
					<div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
						{mySetList.map((set) => {
							return (
								<HomeCardLink
									key={set.id}
									title={set.title}
									qty={set.total}
									author={set.author}
									link={`/cardset/${set.id}`}
								/>
							);
						})}
					</div>
				</div>

				<div>
					<h2 className="font-semibold text-lg">Recommended Sets</h2>
					<div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
						{myRecList.map((set) => {
							return (
								<HomeCardLink
									key={set.id}
									title={set.title}
									qty={set.total}
									author={set.author}
									link={`/cardset/${set.id}`}
								/>
							);
						})}
					</div>
				</div>
			</main>
		</>
	);
}
