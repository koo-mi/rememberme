import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './Card';
import { useRouter } from 'next/navigation';

const CardFinish = () => {
	const router = useRouter();

	// When click Home Icon -> Redirect to HomePage
	function handleHomeIcon() {
		router.push('/');
	}

	// When click Replay Icon -> Restart the current
	function handleReplayIcon() {}

	return (
		<div className="card">
			<div className="card__face--complete">
				<h3 className="font-semibold">
					Great job! You&apos;ve finished all the cards.
				</h3>
				<div className="text-3xl flex relative mt-5">
					<div className="complete__icon-container">
						<HomeRoundedIcon
							fontSize="inherit"
							className="pointer-cursor complete__icon"
							onClick={handleHomeIcon}
						/>
					</div>
					<div className="complete__icon-container">
						<ReplayRoundedIcon
							fontSize="inherit"
							className="pointer-cursor complete__icon"
							onClick={handleReplayIcon}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardFinish;
