import { useRouter } from 'next/navigation';
import './HomeCardLink.scss';

const HomeCardLink = ({ title, qty, author, link }) => {
	const router = useRouter();

	return (
		<article
			className="border-black px-4 py-3 cursor-pointer m-2 bg-white homecard flex flex-col"
			onClick={() => {
				router.push(link);
			}}
		>
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<div className="mb-12">
				<p className="inline-block px-2.5 py-1.5 rounded-full bg-gray-200 text-xs font-semibold">
					{qty} cards
				</p>
			</div>
			<p className="homecard__author">{author}</p>
		</article>
	);
};

export default HomeCardLink;
