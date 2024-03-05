const NewInputButton = ({ addInput }) => {
	return (
		<div
			className="flex justify-center items-center rounded border border-gray-400 bg-white hover:bg-blue-50"
			onClick={addInput}
		>
			<p className="text-2xl">+</p>
		</div>
	);
};

export default NewInputButton;
