import {useEffect, useState} from "react";
import {Config, WebUrls} from "../utills/config";
import {useLocation, useNavigate} from "react-router-dom";
import {formatDate, getSpeedLim, getTraffic} from "../utills/funcs";
import {BlockMain} from "../components/BlockMain";
import {getPinSettings, Logout, SetNotifications} from "../utills/getInfo";
import {LoadingPage} from "./LoadingPage/LoadingPage";
import {AccountCard} from "../components/AccountCard";
import Switch from "../components/Switcher/Switcher";

export const SettingsPage = () => {
    const backButton = Config.tgWindow.BackButton
    const navigate = useNavigate()
    const [settings, setSettings] = useState(null)
    const location = useLocation()
    const point = location.state.point

    const onClickBack = () => {
        navigate(-1)
    }

    const onClickNotification = (value) => {
        SetNotifications(point.pin, value).then(r => {
            console.log(r)
            }
        )
    }

    const getSettings = () => {
        getPinSettings(point.pin).then(
            r => setSettings(r)
        )
    }

    const onClickLogout = (telegram_id) => {
        Config.HapticFeedback.warning()
        Config.tgWindow.showConfirm(
            `Отвязать этого клиента от учетной записи ${point.pin}? Если вам не известен этот контакт - смените пароль от личного кабинета.`,
            (r) => {Logout(r, {pin: point.pin, telegram_id: telegram_id}).then(r => {
                getSettings()
            })})
    }

    useEffect(() => {
        getSettings()
        backButton.onClick(onClickBack)
        backButton.show()
        return () => {
            backButton.offClick(onClickBack)
            backButton.hide()
        }
    }, []);

    if (!settings) {
        return (
            <LoadingPage/>
        )
    }

    return (
        <div>
            <BlockMain gradient={'gradient-background'}>Настройки</BlockMain>
            <BlockMain gradient={''} label={'Уведомления'}>
                <div className={'hr-padd-20'}>
                    <div className={'grid border-bottom vr-margin-20'}>
                        <span className={'left-text'}>
                            <p>Платежи</p>
                            <p className={'width-50pc'}>
                                {point.telegram_id && <small className={'hint'}>
                                    {+point.telegram_id === +Config.user.id ? `Уведомления подключены к вашему Telegram клиенту.` : `Уведомления подключены к TelegramID ${point.telegram_id}`}
                                </small>}
                            </p>
                        </span>
                        <span className={'center margin-auto'}></span>
                        <span className={'right-text'}>
                            <Switch callback={onClickNotification} isActive={!!point.telegram_id}/>
                        </span>
                        <div className={'grid'}>
                        <span className={'left-text'}>

                        </span>
                        </div>
                    </div>

                    <p className={'left-text'}><small className={'hint'}>Уведомления пока можно подключить только к
                        одному Телеграм аккаунту.</small></p>
                </div>
            </BlockMain>

            <BlockMain gradient={''} label={'Устройства'}>
                <div className={'hr-padd-20'}>
                {settings && Object.entries(settings.clients).map(([key, client], index) => (
                        <div key={index} className={'grid  vr-margin-20 border-bottom'}>
                        <span className='left-text margin-auto'>
                            <span className=''>
                                <p>{client.last_login_os}</p>
                                <p><small className={'hint'}>{formatDate(client.last_login)}</small></p>
                            </span>
                        </span>
                            <span className='right-text margin-auto'>
                                {client.is_current_user ? (
                                    <p className=''>{'вы'}</p>
                                ): (
                                    <p onClick={() => {onClickLogout(client.telegram_id)}}>{'❌'}</p>
                                )}
                        </span>
                        </div>
                    ))}
                </div>
            </BlockMain>
        </div>
    )
}