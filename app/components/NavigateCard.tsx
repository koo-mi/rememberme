import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import './NavigateCard.scss';

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
		<div className="flex justify-center items-center gap-5 m-2">
			<div className="navigate__button">
				<NavigateBeforeRoundedIcon fontSize="large" onClick={handleBefore} />
			</div>
			<p className="text-lg">
				{current} / {total}
			</p>
			<div className="navigate__button navigate__button--right">
				<NavigateNextRoundedIcon fontSize="large" onClick={handleNext} />
			</div>
		</div>
	);
};

export default NavigateCard;
