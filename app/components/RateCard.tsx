import './RateCard.scss';

const RateCard = ({ changeCurrent, current, addToNextSet }) => {
	function handleClick(e) {
		e.preventDefault();
		const value = e.target.value;
		const random = Math.random();

		if (value === '1') {
			if (random > 0.8) {
				addToNextSet(current - 1);
			}
		} else if (value === '2') {
			if (random > 0.4) {
				addToNextSet(current - 1);
			}
		} else {
			addToNextSet(current - 1);
		}
		changeCurrent(1);
	}

	return (
		<form className="flex justify-center items-center gap-5 pt-4">
			<button
				className="rate__button bg-blue-200 border-blue-700 text-blue-900 font-semibold hover:bg-blue-300"
				value={1}
				onClick={handleClick}
			>
				Excellent
			</button>
			<button
				className="rate__button bg-green-200 border-green-700 text-green-900 font-semibold hover:bg-green-300"
				value={2}
				onClick={handleClick}
			>
				Good
			</button>
			<button
				className="rate__button bg-red-200 border-red-700 text-red-900 font-semibold hover:bg-red-300"
				value={3}
				onClick={handleClick}
			>
				Bad
			</button>
		</form>
	);
};

export default RateCard;
