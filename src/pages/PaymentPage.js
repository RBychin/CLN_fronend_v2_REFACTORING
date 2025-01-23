import { useEffect, useState } from "react";
import {Config} from "../utills/config";
import {InputComponent} from "../components/InputComponent";
import {Button} from "../components/Button";
import {getApiRequest} from "../utills/requests";

export const PaymentPage = (props) => {
    const [sumValue, setSum] = useState(500);
    const mainButton = Config.tgWindow.MainButton

    const getQr = async () => {
        mainButton.showProgress()
        try {
            const response = await getApiRequest('/pay', {pin: props.point.pin, sum: sumValue });
            return response.text;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            mainButton.hideProgress()
        }
    }

    const payButtonClick = async () => {
        const qr = await getQr(sumValue)
        window.open(qr, '_blank');
        Config.tgWindow.close()
    }

    const onChangeSum = (sum) => {
        if (isNaN(sum)) {
            setSum(0);
            return;
        }
        setSum(sum)
        if (sum > 9) {
            setSum(sum);
        }
    }

    useEffect(() => {
        mainButton.setText('оплатить')
    }, []);

    useEffect(() => {
        if (sumValue && sumValue >= 10) {
            mainButton.show()
        } else {
            mainButton.hide()
        }
        mainButton.onClick(payButtonClick)
        return () => {
            mainButton.offClick(payButtonClick)
        };
    }, [sumValue]);



    return (
        <>
            <div className="overlay margin-auto flex" onClick={() => {props.setpayShow(false)}}>
                <div className="pay gradient-background"
                     onClick={(e) => {
                         e.stopPropagation()}
                     }>
                    <h3>
                        Введите сумму для оплаты:
                    </h3>
                    <div className="margin-auto vw-90 flex">
                        <div className="flex vr-margin-30">
                            <InputComponent
                                type='numeric'
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
                                    setSum(item);
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
