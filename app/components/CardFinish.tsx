import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import './Card';
import { useRouter } from 'next/navigation';

// When cardSet finishes, render this component to Replay or go to Home
const CardFinish = ({ replay }) => {
	const router = useRouter();

	// When click Home Icon -> Redirect to HomePage
	function handleHomeIcon() {
		router.push('/');
	}

	// When click Replay Icon -> Restart the current
	function handleReplayIcon() {
		replay();
	}

	return (
		<div className="card h-64 sm:h-72 md:h-80 lg:h-96">
			<div className="card__face--complete bg-white">
				<h3 className="font-semibold">
					Great job! You&apos;ve finished all the cards.
				</h3>
				<div className="text-3xl flex relative mt-5">
					<div className="complete__icon-container">
						<HomeRoundedIcon
							fontSize="inherit"
							className="pointer-cursor icon-enlarge"
							onClick={handleHomeIcon}
						/>
					</div>
					<div className="complete__icon-container">
						<ReplayRoundedIcon
							fontSize="inherit"
							className="pointer-cursor icon-enlarge"
							onClick={handleReplayIcon}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardFinish;
