import {useEffect, useState} from "react";

export const ErrorPage = (props) => {
    const [textError, setTextError] = useState({});

    useEffect(() => {
        if (props.r_error.toString() && props.r_error.toString() === "TypeError: Failed to fetch") {
            setTextError({text: 'Хьюстон, у нас проблемы...', hint: 'попробуйте позже', code: '500'});
        }
    }, []);

    return (
        <div className='centered'>
            <p>
                <h1>{textError.code}</h1>
                <h3>{textError.text}</h3>
                <h5>{textError.hint}</h5>
            </p>
        </div>
    )
}