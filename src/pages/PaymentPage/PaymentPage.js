import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {BlockMain} from "../../components/BlockMain";
import {Config} from "../../utills/config";


export const PaymentPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation()
    const point = location.state && location.state.point
    const sumValue = location.state && location.state.sumValue

    const onBackButtonCkick = () => {
        navigate(-1)
    }


    useEffect(() => {
        Config.tgWindow.MainButton.setText(`Оплатить ${sumValue.toLocaleString('ru-RU')} ₽`)
        Config.tgWindow.MainButton.show()
        Config.tgWindow.BackButton.show()
        Config.tgWindow.BackButton.onClick(onBackButtonCkick)
        Config.tgWindow.MainButton.onClick()
        console.log(point)
        return () => {
            Config.tgWindow.BackButton.offClick(onBackButtonCkick)
            Config.tgWindow.MainButton.offClick()
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
                        <p className={'left-text'}>PIN</p>
                        <p className={'right-text'}>{point.pin}</p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Контакт</p>
                        <p className={'right-text'}>{point.name.split(' ').slice(-2).join(' ')}</p>
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
                        <p className={'left-text'}>Оплата</p>
                        <p className={'right-text'}>{sumValue.toLocaleString('ru-RU')} <small>₽</small></p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Баланс после пополнения</p>
                        <p className={'right-text'}>{(sumValue + point.balance).toLocaleString('ru-RU')} <small>₽</small></p>
                    </div>

                </div>
            </BlockMain>
        </div>
    )
}

