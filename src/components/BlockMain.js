export const BlockMain = props => {
    return (
        <>
            <div className={`block vw-85 ${props.gradient}`}>
                <p className='hint'>{props.label}</p>
                {props.children}
            </div>
        </>
    )
}