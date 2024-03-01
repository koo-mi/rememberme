import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

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
		<div className="flex flex-col p-3 mt-3 border border-black rounded">
			<div className="flex justify-between px-1 py-2 border-b">
				<span># {i + 1}</span>
				<DeleteRoundedIcon fontSize="small" onClick={handleRemove} />
			</div>
			<div className="flex flex-col justify-center items-center sm:flex-row sm:gap-7">
				<div className="flex flex-col gap-1 p-2 pt-4 w-full sm:w-1/2">
					<input
						className="border-b border-black"
						type="text"
						value={item.question || ''}
						onChange={handleQuestionChange}
					/>
					<label className="text-xs text-gray-400">Question</label>
				</div>
				<div className="flex flex-col gap-1 p-2 sm:pt-4 w-full sm:w-1/2">
					<input
						className="border-b border-black"
						type="text"
						value={item.answer || ''}
						onChange={handleAnswerChange}
					/>
					<label className="text-xs text-gray-400">Answer</label>
				</div>
			</div>
		</div>
	);
};

export default CardInput;
