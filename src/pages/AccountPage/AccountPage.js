import {useLocation} from "react-router-dom";
import {BlockMain} from "../../components/BlockMain";
import {ServiceField} from "../../components/ServicesField";
import {getSpeedLim, getTraffic} from "../../utills/funcs";

export const AccountPage = (props) => {
    const location = useLocation()
    const account = location.state.account
    const account_name = location.state.account_name
    const point = location.state.point
    console.log(account)


    return (
        <>
            <BlockMain gradient={'gradient-background'}>
                <div className={'block-title'}>
                    {account && account_name}
                </div>
            </BlockMain>

            <BlockMain gradient={'gradient'} label={'Информация'} >
                <div className={'hr-padd-20'}>
                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Статус</p>
                        <p className={'right-text'}>{!account.disable?'Активен':'Не активен'}</p>
                    </div>

                    <div className={'grid vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>PIN</p>
                        <p className={'right-text'}>{point.pin}</p>
                    </div>

                    <div className={'grid vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>IP Address</p>
                        <p className={'right-text'}>{account.IP}</p>
                    </div>

                    <div className={'grid vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Тариф</p>
                        <p className={'right-text'}>{account.tarif.name}</p>
                    </div>

                    <div className={'grid vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Скорость</p>
                        <p className={'right-text'}>До {getSpeedLim(account.speed_lim)}</p>
                    </div>

                    <div className={'grid vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Абонентская плата</p>
                        <p className={'right-text'}>{account.tarif.abon} ₽</p>
                    </div>
                </div>
            </BlockMain>

            {account.services && <BlockMain label={'Услуги'}>
                <div className={'hr-padd-20'}>
                    {Object.entries(account.services).map(([key, service], index) => (
                        <ServiceField key={index} service={service} serviceId={key} />
                    ))}
                </div>
            </BlockMain>}

            <BlockMain gradient={'gradient-end'} label={'Статистика за месяц'}>
                <div className={'hr-padd-20'}>
                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Трафик</p>
                        <p className={'right-text'}>{getTraffic(account.trcvd)}</p>
                    </div>

                    <div className={'grid  vr-margin-20 border-bottom'}>
                        <p className={'left-text'}>Отправлено</p>
                        <p className={'right-text'}>{getTraffic(account.tsent)}</p>
                    </div>
                </div>
            </BlockMain>
        </>
    )
}