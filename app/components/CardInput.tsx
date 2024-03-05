import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import './CardInput.scss';

const CardInput = ({ item, i, changeQuizInput, removeInput }) => {
	function handleQuestionChange(e) {
		changeQuizInput(i, true, e.target.value);
	}

	function handleAnswerChange(e) {
		changeQuizInput(i, false, e.target.value);
	}

	function handleRemove() {
		removeInput(i);
	}

	return (
		<div className="cardinput__full-container flex flex-col p-3 mt-3 border rounded bg-white">
			<div className="flex justify-between px-1 py-2 border-b">
				<span className="text-lg"># {i + 1}</span>
				<DeleteRoundedIcon
					fontSize="small"
					onClick={handleRemove}
					className="cursor-pointer icon-enlarge"
				/>
			</div>
			<div className="flex flex-col justify-center items-center sm:flex-row sm:gap-7">
				<div className="flex flex-col gap-1 p-2 pt-4 w-full sm:w-1/2">
					<input
						className="cardinput__qainput border-b-4 border-gray-400"
						type="text"
						value={item.question || ''}
						onChange={handleQuestionChange}
					/>
					<label className="text-sm text-black">Question</label>
				</div>
				<div className="flex flex-col gap-1 p-2 sm:pt-4 w-full sm:w-1/2">
					<input
						className="cardinput__qainput border-b-4 border-gray-400"
						type="text"
						value={item.answer || ''}
						onChange={handleAnswerChange}
					/>
					<label className="text-sm text-black">Answer</label>
				</div>
			</div>
		</div>
	);
};

export default CardInput;
