import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {BlockMain} from "../../components/BlockMain";
import {Config, WebUrls} from "../../utills/config";
import {getApiRequest} from "../../utills/requests";
import {getQr} from "../../utills/funcs";


export const PaymentPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation()
    const point = location.state && location.state.point
    const sumValue = location.state && location.state.sumValue

    const onBackButtonCkick = () => {
        navigate(-1)
    }
    const [formattedName, setFormattedName] = useState(null)
    const [errorText, setErrorText] = useState(null)

    const onMainButtonClick = () => {
        Config.HapticFeedback.light()
        Config.tgWindow.MainButton.showProgress()
        getQr(point.pin, sumValue).then((qr) => {
            console.warn(qr)
            Config.tgWindow.MainButton.hideProgress()
            Config.HapticFeedback.success()
            Config.tgWindow.openLink(qr)
            navigate(WebUrls.UserPage)
        })
    }



    useEffect(() => {
        Config.tgWindow.MainButton.setText(`Оплатить ${sumValue.toLocaleString('ru-RU')} ₽`)
        Config.tgWindow.BackButton.onClick(onBackButtonCkick)
        Config.tgWindow.MainButton.onClick(onMainButtonClick)
        Config.tgWindow.MainButton.show()
        Config.tgWindow.BackButton.show()

        const userName = point.name.split(' ')
        let formattedName = userName && userName.shift()
        userName && userName.forEach(function (value) {
            if (userName.length > 0) {
                formattedName += ' ' + value[0] + '.'
            }
        })
        setFormattedName(formattedName)

        return () => {
            Config.tgWindow.BackButton.offClick(onBackButtonCkick)
            Config.tgWindow.MainButton.offClick(onMainButtonClick)
            Config.tgWindow.MainButton.hide()
            Config.tgWindow.BackButton.hide()
        }
    }, []);


    return (
        <div className={'margin-auto'}>
            <BlockMain wide={'vw-80'} gradient={''}>
                <div className={'block-title vw'}>
                    Платёж
                </div>
            </BlockMain>

            <BlockMain wide={'vw-80'} gradient={''} label={'Получатель'} >
                <div className={'hr-padd-20'}>
                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>ID</p>
                        <p className={'right-text'}>{point.pin}</p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Контакт</p>
                        <p className={'right-text'}>{formattedName?formattedName: '-'}</p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Телефон</p>
                        <p className={'right-text'}>{point.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Баланс</p>
                        <p className={'right-text'}>{point.balance.toLocaleString('ru-RU')} <small>₽</small></p>
                    </div>

                </div>
            </BlockMain>


            <BlockMain wide={'vw-80'} gradient={''} label={'Итого'}>
                <div className={'hr-padd-20'}>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Баланс после пополнения</p>
                        <p className={'right-text'}>{(sumValue + point.balance).toLocaleString('ru-RU')} <small>₽</small></p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Оплата</p>
                        <p className={'right-text'}>{sumValue.toLocaleString('ru-RU')} <small>₽</small></p>
                    </div>

                </div>
            </BlockMain>
        </div>
    )
}

