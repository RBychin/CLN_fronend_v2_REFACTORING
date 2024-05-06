export const Button = ({ onClick, text, isMain }) => {
    const className = `button `
    return (
        <>
            <div className={`button ${isMain ? 'button-main' : ''}`} onClick={onClick}>
                <div className="button-text text-weight-700">
                    <h2>{text}</h2>
                </div>
            </div>

        </>
    )
}