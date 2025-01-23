import {useEffect, useState} from "react";
import {Config} from "../utills/config";
import {getApiRequest} from "../utills/requests";
import {InputComponent} from "./InputComponent";
import {Button} from "./Button";

export const PaymentSwipeBlock = ({
                                      onChangeSum,
                                      sumValue,
                                      setSumValue,
                                      sumError,
                                      setSumError}) => {

    const handleButtonClick = (value) => {
        Config.HapticFeedback.light()
        setSumValue(value);
        setSumError(false)
    }


    return (
        <>
            <div className="" >
                <div className={'swiper-menu'} />
                <div className="vr-margin-20"
                     onClick={(e) => {
                         e.stopPropagation()}
                     }>
                    <h3>
                        Введите сумму для оплаты:
                    </h3>
                    <div className="">
                        <div className="hr-padd-20 vr-margin-30">
                            {sumError && <p style={{color: 'var(--error-color-text)'}}>{sumError}</p>}
                            <InputComponent
                                error={sumError}
                                type='text'
                                placeholder='SUM'
                                id='sumValue'
                                inputMode="numeric"
                                onChange={e => onChangeSum(parseInt(e.target.value))}
                                value={sumValue}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        {[50, 200, 400, 1000].map((item, i) => (
                            <Button
                                key={i}
                                text={item}
                                onClick={() => {
                                    handleButtonClick(item)
                                }}
                                isMain={false}
                            />
                        ))}
                    </div>
                </div>

            </div>

        </>
    );
};
