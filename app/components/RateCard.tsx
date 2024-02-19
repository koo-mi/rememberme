import './RateCard.css';

const RateCard = ({
	changeCurrent,
	current,
	total,
	addToNextList,
	switchList
}) => {
	function handleClick(e) {
		e.preventDefault();
		const value = e.target.value;
		const random = Math.random();

		if (value === '1') {
			if (random > 0.8) {
				addToNextList(current - 1);
			}
		} else if (value === '2') {
			if (random > 0.4) {
				addToNextList(current - 1);
			}
		} else {
			addToNextList(current - 1);
		}
		changeCurrent(1);
	}

	return (
		<form className="flex justify-center items-center gap-5 py-4">
			<button value={1} onClick={handleClick}>
				Excellent
			</button>
			<button value={2} onClick={handleClick}>
				Good
			</button>
			<button value={3} onClick={handleClick}>
				Bad
			</button>
		</form>
	);
};

export default RateCard;
