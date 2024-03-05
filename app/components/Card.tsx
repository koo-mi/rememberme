import { useState } from 'react';
import './Card.css';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

const Card = ({ cardList, current }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isStarred, setIsStarred] = useState(false);

	function handleCardFlip() {
		setIsFlipped(!isFlipped);
	}

	function handleStar() {
		setIsStarred(!isStarred);
	}

	function handleHint() {
		console.log('hint!');
	}

	return (
		<div className="card h-64 sm:h-72 md:h-80 lg:h-96">
			<div
				className={`card__inner ${isFlipped ? 'flip' : ''}`}
				onClick={handleCardFlip}
			>
				{/* Card Front */}
				<div className="card__face">
					<div className="w-full flex justify-end">
						<div
							className="flex gap-3 px-4"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<HelpOutlineRoundedIcon onClick={handleHint} />
							{isStarred ? (
								<StarRateRoundedIcon onClick={handleStar} />
							) : (
								<StarBorderRoundedIcon onClick={handleStar} />
							)}
						</div>
					</div>
					<div className="flex flex-col justify-center items-center w-full h-full px-4 overflow-y-auto">
						<p>{cardList[current - 1].question}</p>
					</div>
				</div>

				{/* Card Back */}
				<div className="card__face card__face--back">
					<div className="w-full flex justify-end">
						<div
							className="flex gap-3 px-4"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							{isStarred ? (
								<StarRateRoundedIcon onClick={handleStar} />
							) : (
								<StarBorderRoundedIcon onClick={handleStar} />
							)}
						</div>
					</div>
					<div className="flex flex-col justify-center items-center w-full h-full px-4 overflow-y-auto">
						<p>{cardList[current - 1].answer}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
