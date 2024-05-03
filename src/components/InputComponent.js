export const InputComponent = ({
                                   type,
                                   placeholder,
                                   id,
                                   inputMode,
                                   value,
                                   onChange,
                                   error
                               }) => {
    const style = error?'vr-margin-10 red-glow':'vr-margin-10 glow'

    return (
        <>
            <div className=''>
                <input
                    className={style}
                    tabIndex="-1"
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    inputMode={inputMode}
                    value={value}
                    onChange={onChange}
                    min={10}
                />
            </div>
        </>
    )
}