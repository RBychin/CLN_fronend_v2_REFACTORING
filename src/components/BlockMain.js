export const BlockMain = props => {
    return (
        <>
            <div className={`block ${props.wide?props.wide:'vw-85'} ${props.gradient}`}>
                <p className='hint'>{props.label}</p>
                {props.children}
            </div>
        </>
    )
}