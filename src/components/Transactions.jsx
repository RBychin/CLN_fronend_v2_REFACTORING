import send from "../icons/send.svg";

export const Transactions = (props) => {

    if (!props.transactions || props.transactions.length === 0) {
        return <div>Не удается загрузить данные...</div>;
    }

    return (
        <>
            {props.transactions.map((obj, index) => (
                <div key={index} className='card vw-80'>
                    <div className='grid border-bottom'>
                        <img alt='status' className='icon' src={send}/>
                        <span className='left-text hr-padd-10'>{obj.comment}
                            <p><small className='hint'>{formatDate(obj.date)}</small></p>
                        </span>
                        <span className='right-text'>{obj.sum}₽<p><small className='hint'>{obj.id}</small></p></span>
                    </div>
                </div>
            ))}
        </>
    );
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};