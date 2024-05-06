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


export const AccountsCard = ({
                                 callback,
                                 point,
                                 accountName,
                                 status,
                                 setUser,
                                 user
                             }) => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [question, setQuestion] = useState(false)
    const [pay, setPay] = useState(false)
    const isActiveStyle = active?'slide-in': ''


    const host = point.points[Object.keys(point.points)[0]];
    const account = host.accounts[Object.keys(host.accounts)[0]];
    point.balance = +point.balance

    const onClickLogin = (idValue) => {
        navigate('/v2/login', {state: {idValue}})
    }

    const onClickLogout= async () => {
        const response = await getApiRequest(
            '/logout',
            {pin: point.pin},
        )
        callback()
        setQuestion(false)
        navigate('/v2/')
    }

    const style = status?'card vw-70 plate glow bottom-margin-0': 'card vw-70 plate bottom-margin-0 red-glow'
    return (
        <>
            {question &&
                <AgreeQuestion
                    question="Вы уверены что хотите отвязать этот аккаунт?"
                    callback={onClickLogout}
                    setQuestion={setQuestion}
                />
            }
            {pay &&
                <PaymentPage point={point} account={account} setPay={setPay} pay={pay} />
            }

            <div className={style}>
                <div onClick={() => {setActive(!active)}} className='grid'>
                    <img alt='status' className='icon' src={status? iconOk: iconPause} />
                    <span className='left-text hr-padd-10'>
                        <p className='text-weight-500'>{point.pin}</p>
                        <p><small>{accountName}</small></p>
                    </span>
                    <span className='right-text'>
                        <p><small>Баланс:</small></p>
                        <p style={{color: +point.balance <= 0? "#var(--error-color-text)": "var(--font-color)"}} className='text-weight-700'>
                            {point.balance} ₽
                        </p>
                    </span>
                </div>
            </div>
            {status && (
                <div className='slide-menu vw-65 margin-auto'>
                    <div className={`grid container ${active ? 'show' : ''}`}>
                    <span className='center margin-auto' onClick={() => {setPay(true)}}>
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

            {!status && (
                <div className='slide-menu vw-65 margin-auto'>
                    <div className={`grid container ${active ? 'show' : ''}`}>
                    <span className='center margin-auto' onClick={() => onClickLogin(point.pin)}>
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