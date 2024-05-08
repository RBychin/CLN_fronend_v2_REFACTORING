import iconOk from '../icons/status-ok.svg'
import iconPause from '../icons/status-pause.svg'
import {useState} from "react";
import settingsIcon from '../icons/settings.svg'
import plusIcon from '../icons/plus.svg'
import closeIcon from '../icons/cross-stop.svg'
import {useNavigate} from "react-router-dom";
import {getApiRequest} from "../utills/requests";
import {Config} from "../utills/config";
import {AgreeQuestion} from "./AgreeQuestion";
import {PaymentPage} from "../pages/PaymentPage";
import {AccountCard} from "./AccountCard";


export const PointCard = (props) => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [question, setQuestion] = useState(false)
    const [payShow, setpayShow] = useState(false)
    const isActiveStyle = active?'slide-in': ''

    const onClickLogin = (idValue) => {
        navigate('/v2/login', {state: {idValue}})
    }

    const onClickLogout= async () => {
        const response = await getApiRequest(
            '/logout',
            {pin: props.point.pin},
        )
        props.callback()
        setQuestion(false)
        navigate('/v2/')
    }

    const style = props.status?'card vw-70 plate glow bottom-margin-0': 'card vw-70 plate bottom-margin-0 red-glow'
    return (
        <>
            {question &&
                <AgreeQuestion
                    question="Вы уверены что хотите отвязать этот аккаунт?"
                    callback={onClickLogout}
                    setQuestion={setQuestion}
                />
            }
            {payShow &&
                <PaymentPage point={props.point} setpayShow={setpayShow} payShow={payShow} />
            }

            <div className={style}>
                <div onClick={() => {setActive(!active)}} className='grid'>
                    <img alt='status' className='icon' src={props.status? iconOk: iconPause} />
                    <span className='left-text hr-padd-10'>
                        <p className='text-weight-500'>{props.point.pin}</p>
                        {/*<p><small>{Object.keys(props.account.points.accounts).length}</small></p>*/}
                    </span>
                    <span className='right-text'>
                        {props.status &&
                            <>
                                <p><small>Баланс:</small></p>
                                <p style={{color: +props.point.balance <= 0 ? "#var(--error-color-text)" : "var(--font-color)"}}
                                   className='text-weight-700'>
                                    {props.point.balance} ₽
                                </p>
                            </>
                        }

                    </span>
                </div>
            </div>
            {props.status && (
                <div className={`slide-menu vw-65 margin-auto container ${active ? 'show' : ''}`}>
                {Object.values(props.point.points).map((account, index) => (
                        <AccountCard status={props.status} account={account} key={index} />
                    ))}
                    <div className={`grid`}>
                    <span className='center margin-auto' onClick={() => {setpayShow(true)}}>

                        <img alt="icon-small" className='icon-small' src={plusIcon}/>
                        <p className='hint'>Пополнить</p>
                    </span>
                        <span className='center margin-auto'>
                        <a href="#">
                            <img alt="icon-small" className='icon-small' src={settingsIcon}/>
                            <p className='hint'>Настройки</p>
                        </a>
                    </span>
                        <span className='center margin-auto' onClick={() => setQuestion(true)}>
                        <a href="#">
                        <img alt="icon-small" className='icon-small' src={closeIcon}/>
                        <p className='hint'>Выйти</p>
                        </a>
                    </span>
                    </div>
                </div>
            )}

            {!props.status && (
                <div className='slide-menu vw-65 margin-auto'>
                    <div className={`grid container ${active ? 'show' : ''}`}>
                    <span className='center margin-auto' onClick={() => onClickLogin(props.point.pin)}>
                        <img alt="icon-small" className='icon-small' src={plusIcon}/>
                        <p className='hint'>Войти</p>
                    </span>
                        <span className='center margin-auto' onClick={() => setQuestion(true)}>
                        <img alt="icon-small" className='icon-small' src={closeIcon}/>
                        <p className='hint'>Удалить</p>
                    </span>
                    </div>
                </div>
            )}
        </>
    )
}