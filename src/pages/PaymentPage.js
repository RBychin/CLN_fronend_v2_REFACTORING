import { useEffect, useState } from "react";
import {Config} from "../utills/config";
import {InputComponent} from "../components/InputComponent";
import {Button} from "../components/Button";
import {getApiRequest} from "../utills/requests";

export const PaymentPage = ({
                                point,
                                account,
                                setPay,
                                pay
                            }) => {
    const [responseData, setResponseData] = useState(null);
    const [sumValue, setSum] = useState(+account.tarif.abon);
    const mainButton = Config.tgWindow.MainButton

    const getQr = async () => {
        if (Config.tgWindow.platform !== 'unknown') {
            mainButton.showProgress()
        }
        try {
            const response = await getApiRequest('/pay', {pin: point.pin, sum: sumValue });
            setResponseData(response.text);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        mainButton.hideProgress()
    }

    const payButtonClick = () => {
        const Url = responseData.replace(/\?.*$/, '');
        window.open(Url, '_blank');
    }

    const onChangeSum = (sum) => {
        if (isNaN(sum)) {
            setSum(0);
            return;
        }
        setSum(sum)
        if (sum > 9) {
            setSum(sum);
            getQr(sumValue)
        }
    }

    useEffect(() => {
        if (Config.tgWindow.platform !== 'unknown') {
            mainButton.text = 'Оплатить'
            mainButton.show()
            return () => {
                mainButton.hide()
                mainButton.offClick(payButtonClick)
            }
        }
    }, []);

    useEffect(() => {
        mainButton.onClick(payButtonClick);

        return () => {
            mainButton.offClick(payButtonClick);
        };
    }, [responseData]);

    useEffect(() => {
        getQr()
    }, [sumValue]);



    return (
        <>
            <div className="overlay margin-auto flex" onClick={() => {setPay(false)}}>
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
                            {sumValue > 9 && responseData && Config.tgWindow.platform === "unknown" &&
                                <Button
                                    text="Оплатить"
                                    onClick={payButtonClick}
                                    isMain={true}
                                />
                            }

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
