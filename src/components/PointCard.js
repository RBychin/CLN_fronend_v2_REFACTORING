import iconOk from '../icons/status-ok.svg'
import iconPause from '../icons/status-pause.svg'
import {useState} from "react";
import plusIcon from '../icons/plus.svg'
import closeIcon from '../icons/cross-stop.svg'
import {useNavigate} from "react-router-dom";
import {getApiRequest} from "../utills/requests";
import {Config, WebUrls} from "../utills/config";
import {AccountCard} from "./AccountCard";
import IconSvg from "./icons/IconSvg";
import {Logout} from "../utills/getInfo";


export const PointCard = ({
    point,
    status,
    callback,
    setActivePointMenu


                          }) => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    const onClickSettings = () => {
        navigate(WebUrls.Settings, {state: {point: point}})
    }


    const onClickLogin = (idValue) => {
        navigate(WebUrls.LoginPage, {state: {idValue, backButton:true}})
    }

    const onClickLogout = () => {
        Config.HapticFeedback.warning()
        Config.tgWindow.showConfirm(
            `Выйти из ${point.pin}?\nЭто так же удалит из приложения все связанные с этим ID аккаунты.`,
            (accepted) => {Logout(accepted, {pin: point.pin}).then(() => {
                if (accepted) {
                    callback()
                    navigate(WebUrls.BASE_URL)
                }
            })})

    }


    const style = status?'card vw-70 plate glow bottom-margin-0': 'card vw-70 plate bottom-margin-0 red-glow'
    return (
        <>
            <div className={style}>
                <div onClick={() => {setActive(!active);Config.HapticFeedback.soft();}} className='grid'>
                    <img alt='status' className='icon' src={status? iconOk: iconPause} />
                    <span className='left-text hr-padd-10'>
                        <p className='text-weight-500'>{point.pin}</p>
                        <p><small>{point.points && (Object.keys(point.points).length) > 1 && `Аккаунтов: ${(Object.keys(point.points).length)}`}</small></p>
                    </span>
                    <span className='right-text'>
                        {status &&
                            <>
                                <p><small>Баланс:</small></p>
                                <p style={{color: +point.balance <= 0 ? "var(--error-color-text)" : "var(--font-color)"}}
                                   className='text-weight-700'>
                                    {point.balance.toLocaleString('ru-RU')} ₽
                                </p>
                            </>
                        }

                    </span>
                </div>
            </div>
            {status && (
                <div className={`slide-menu vw-65 margin-auto container ${active ? 'show' : ''}`}>
                {Object.entries(point.points).map(([key, account], index) => (
                        <AccountCard status={status} name={key} account={account} key={index} point={point} />
                    ))}
                    <div className={`grid`}>
                    <span className='center margin-auto' onClick={() => {setActivePointMenu(point); Config.HapticFeedback.soft()}}>

                        <IconSvg icon={'payment'} color={Config.colors.hintColor} style={'icon-small'} size={'20px'} />
                        <p className='hint'>Пополнить</p>
                    </span>
                        <span className='center margin-auto' onClick={onClickSettings}>
                                <IconSvg icon={'settings'} color={Config.colors.hintColor} style={'icon-small'} size={'20px'} />
                                <p className='hint'>Настройки</p>
                        </span>
                        <span className='center margin-auto' onClick={onClickLogout}>
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
                        <span className='center margin-auto' onClick={onClickLogout}>
                        <img alt="icon-small" className='icon-small' src={closeIcon}/>
                        <p className='hint'>Удалить</p>
                    </span>
                    </div>
                </div>
            )}
        </>
    )
}