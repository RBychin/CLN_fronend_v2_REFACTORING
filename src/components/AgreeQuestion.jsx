import {Button} from "./Button";


export const AgreeQuestion = ({
    question,
    callback,
    setQuestion
    }) => {
    return (
        <>
            <div className="overlay flex vh-100 margin-auto radial"  onClick={() => setQuestion(false)}>
                <div className="modal" onClick={(e) => {
                    e.stopPropagation()}}>
                    <h2>{question}</h2>
                    <Button
                        text="Да"
                        onClick={callback}
                        isMain={false}
                    />
                    <Button
                        text="Нет"
                        onClick={() => setQuestion(false)}
                        isMain={true}
                    />
                </div>
            </div>
        </>
    )
}