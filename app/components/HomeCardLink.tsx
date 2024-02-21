import { useRouter } from 'next/navigation';

const HomeCardLink = ({ title, qty, author, link }) => {
	const router = useRouter();

	return (
		<article
			className="border-black border rounded px-4 py-3"
			onClick={() => {
				router.push(link);
			}}
		>
			<h3 className="font-semibold mb-1">{title}</h3>
			<p className="inline-block px-1.5 py-1 rounded-full bg-gray-400 text-xs font-semibold">
				{qty} cards
			</p>
			<p className="mt-10">{author}</p>
		</article>
	);
};

export default HomeCardLink;
