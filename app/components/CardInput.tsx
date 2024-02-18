import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CardInput = ({ item, i, changeQuizInput, removeInput }) => {
	function handleFrontChange(e) {
		changeQuizInput(i, true, e.target.value);
	}

	function handleBackChange(e) {
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
			<div className="flex flex-col gap-1 p-2 pt-4">
				<input
					className="border-b border-black"
					type="text"
					value={item.front || ''}
					onChange={handleFrontChange}
				/>
				<label className="text-xs text-gray-400">Front</label>
			</div>
			<div className="flex flex-col gap-1 p-2">
				<input
					className="border-b border-black"
					type="text"
					value={item.back || ''}
					onChange={handleBackChange}
				/>
				<label className="text-xs text-gray-400">Back</label>
			</div>
		</div>
	);
};

export default CardInput;
