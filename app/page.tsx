'use client';

import { useEffect, useState } from 'react';
import HomeCardLink from './components/HomeCardLink';

export default function Home() {
	const [recommendList, setRecommendList] = useState([]);

	useEffect(() => {
		async function homeInfo() {
			const res = await fetch('/api/home');
			const homeData = await res.json();
			setRecommendList(homeData);
		}

		homeInfo();
	}, []);

	return (
		<>
			<main className="flex flex-col p-4 gap-3 max-w-7xl m-auto">
				{/* Recent */}
				<div>
					<h2 className="font-semibold text-lg">Recent</h2>
					<div className="grid grid-cols-2 gap-2 mt-3">
						<HomeCardLink
							title="Card Set 1"
							qty={10}
							author={'Mikael Koo'}
							link={'/cardset/1'}
						/>
						<HomeCardLink
							title="Card Set 2"
							qty={11}
							author={'Mikael Koo'}
							link={'/cardset/2'}
						/>
					</div>
				</div>

				{/* My Sets */}
				<div>
					<h2 className="font-semibold text-lg">My Sets</h2>
					<div className="grid grid-cols-2 gap-2 mt-3">
						<HomeCardLink
							title="Card Set 3"
							qty={12}
							author={'Mikael Koo'}
							link={'/cardset/3'}
						/>
						<HomeCardLink
							title="Card Set 4"
							qty={13}
							author={'Mikael Koo'}
							link={'/cardset/4'}
						/>
					</div>
				</div>

				{/* Recommend */}
				<div>
					<h2 className="font-semibold text-lg">Recommended Sets</h2>
					<div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
						{recommendList.map((set) => {
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
