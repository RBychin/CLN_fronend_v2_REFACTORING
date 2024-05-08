import iconOk from '../icons/status-ok.svg'
import iconPause from '../icons/status-pause.svg'
import React, {useState} from "react";
import settingsIcon from '../icons/settings.svg'
import plusIcon from '../icons/plus.svg'
import closeIcon from '../icons/cross-stop.svg'
import {useNavigate} from "react-router-dom";
import {getApiRequest} from "../utills/requests";
import {Config} from "../utills/config";
import {AgreeQuestion} from "./AgreeQuestion";
import {PaymentPage} from "../pages/PaymentPage";
import {PointCard} from "./PointCard";


export const AccountCard = (props) => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [question, setQuestion] = useState(false)
    const [pay, setPay] = useState(false)
    const isActiveStyle = active?'slide-in': ''


    // const host = point.points[Object.keys(point.points)[0]];
    // const account = host.accounts[Object.keys(host.accounts)[0]];
    // point.balance = +point.balance

    const onClickLogin = (idValue) => {
        navigate('/v2/login', {state: {idValue}})
    }
    // console.log(props.account)

    // const onClickLogout= async () => {
    //     const response = await getApiRequest(
    //         '/logout',
    //         {pin: props.account.pin},
    //     )
    //     props.callback()
    //     setQuestion(false)
    //     navigate('/v2/')
    // }
    const account = Object.values(props.account.accounts)[0]
    const style = props.status?'card vw-70 plate glow bottom-margin-0': 'card vw-70 plate bottom-margin-0 red-glow'
    if (!props.status) {
        return <></>
    }

    return (
        <div className='vr-margin-10'>
            <div className='vr-margin-10 border-bottom'>
                <div className='grid'>
                    <span className='left-text hr-padd-10'>
                            <p className='text-weight-500'>{Object.keys(props.account.accounts)[0]}</p>
                        <p><small>{account.IP}</small></p>
                        </span>
                    <span className='right-text'>
                            <p><small>{account.tarif.name}</small></p>
                            <p><small>{account.speed_lim / 100} мб/с</small></p>
                        </span>
                </div>
            </div>
        </div>
    )
}