import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

const NavigateCard = ({
	current,
	total,
	changeCurrent,
	addToNextSet,
	removeFromNextSet
}) => {
	function handleNext() {
		addToNextSet(current - 1);
		changeCurrent(1);
	}
	function handleBefore() {
		removeFromNextSet(current - 2);
		changeCurrent(-1);
	}

	return (
		<div className="flex justify-center items-center gap-5">
			<NavigateBeforeRoundedIcon fontSize="large" onClick={handleBefore} />
			<p>
				{current} / {total}
			</p>
			<NavigateNextRoundedIcon fontSize="large" onClick={handleNext} />
		</div>
	);
};

export default NavigateCard;
