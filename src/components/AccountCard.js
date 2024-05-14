import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getSpeedLim} from "../utills/funcs";
import {WebUrls} from "../utills/config";


export const AccountCard = (props) => {

    const navigate = useNavigate()
    const account = props.account.accounts && Object.values(props.account.accounts)[0]
    const account_name = props.name
    const point = props.point

    const onClickAccount = () => {
        navigate(WebUrls.AccountPage, {state: {account, account_name, point}})
    }

    if (!props.status) {
        return <></>
    }

    if (!account) {return (
        <div className='vr-margin-10'>
            <div className='vr-margin-10 border-bottom'>
                <div className='grid'>
                    <span className='left-text hr-padd-10'>
                            <p className='text-weight-500'>{account_name}</p>
                        <p><small>{'Аккаунт не найден'}</small></p>
                        </span>
                    <span className='right-text'>
                            <p><small>{''}</small></p>
                            <p><small>{''}</small></p>
                        </span>
                </div>
            </div>
        </div>
    )
    }

    return (
        <div className='vr-margin-10' onClick={onClickAccount}>
            <div className='vr-margin-10 border-bottom'>
                <div className='grid'>
                    <span className='left-text hr-padd-10'>
                            <p className='text-weight-500'>{account_name}</p>
                        <p><small>{account.IP}</small></p>
                        </span>
                    <span className='right-text'>
                            <p><small>{account.tarif.name}</small></p>
                            <p><small>{getSpeedLim(account.speed_lim_actual)}</small></p>
                        </span>
                </div>
            </div>
        </div>
    )
}