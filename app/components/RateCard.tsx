import './RateCard.css';

const RateCard = ({changeCurrent}) => {

    function handleSubmit(e) {
        e.preventDefault();
        changeCurrent(1);
    }

    return (
        <form className='flex justify-center items-center gap-5 py-4' onSubmit={handleSubmit}>
            <button>Excellent</button>
            <button>Good</button>
            <button>Bad</button>
        </form>
    );
};

export default RateCard;