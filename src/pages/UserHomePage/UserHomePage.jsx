import {LoadingPage} from "../LoadingPage/LoadingPage";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import addAccIcon from '../../icons/add_acc.svg'
import {AccountHeader} from "../../components/AccountHeader";
import {StoriesList} from "../../components/storiesList";
import {BlockMain} from "../../components/BlockMain";
import {getProfile, getStories, getTransaction} from "../../utills/getInfo";
import {Transactions} from "../../components/Transactions";
import {PointCard} from "../../components/PointCard";
import {Config, WebUrls} from "../../utills/config";
import {PaymentSwipeBlock} from "../../components/PaymentSwipeBlock";
import IconSvg from "../../components/icons/IconSvg";


export const UserHomePage = (props) => {

    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [stories, setStories] = useState([]);
    const [user, setUser] = useState(null);

    // ============ Всплывающее меню оплаты ===========
    const [activePointMenu, setActivePointMenu] = useState(null)
    const [sumValue, setSumValue] = useState(500);
    const [sumError, setSumError] = useState(null)
    const mainButton = Config.tgWindow.MainButton
    const overlayRef = useRef()

    const onClickMainButton = () => {
        if (sumValue < 10) {
            setSumError('Минимальная сумма платежа 10 рублей.')
            return
        }
        if (sumValue > 10000) {
            setSumError('Максимальная сумма платежа 10 000 рублей.')
            return
        }
        if (activePointMenu) {
            navigate(WebUrls.PaymentPage, {state: {point: activePointMenu, sumValue}})
        }
    }

    useEffect(() => {
        if (activePointMenu) {
            mainButton.show()
        }
        return () => {
            mainButton.hide()
        }
    }, [activePointMenu]);

    useEffect(() => {
        mainButton.onClick(onClickMainButton)
        return () => {
            mainButton.offClick(onClickMainButton)
        }
    }, [sumValue, activePointMenu]);

    const onChangeSum = (sum) => {
        if (sumError) {
            setSumError(false)
        }
        if (isNaN(sum)) {
            setSumValue(0);
            return;
        }
        setSumValue(sum)
    }
    // ===================================================

    useEffect(() => {
        getTransaction().then(r => setTransactions(r))
        getStories().then(r => setStories(r))
        getProfile().then(r => setUser(r));

        mainButton.setText('оплатить')

        const handleClickOutside = (event) => {
            const overlay = overlayRef.current;
            if (overlay && !overlay.contains(event.target)) {
                setActivePointMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user && user.welcome_message && user.welcome_message.message) {
            Config.tgWindow.showAlert(user.welcome_message.message, () => {});
        }
    }, [user]);


    if (!(transactions && stories && user && props.accounts )) {
        return <LoadingPage />
    }

    return (
            <>
                {/*============ Всплывающее меню оплаты ===========*/}
                <div className="container-test">
                    <div ref={overlayRef} className={`overlay-test bottom-padd-30 top-padd-10 ${activePointMenu ? "visible" : ""}`}>
                        <PaymentSwipeBlock
                            onChangeSum={onChangeSum}
                            sumValue={sumValue}
                            setSumValue={setSumValue}
                            sumError={sumError}
                        />
                    </div>
                </div>
                {/*===============================================*/}
                <BlockMain label={''} gradient={'gradient-background'}>
                    <AccountHeader user={user} />
                </BlockMain>

                {stories.length > 0 && <BlockMain gradient={'gradient-end'} label={'Узнай больше'}>
                    <StoriesList stories={stories} setStories={setStories} />
                </BlockMain>}
                <BlockMain gradient={''} label={`Аккаунты`}>
                {Object.values(props.accounts).map((point, index) => (
                    <PointCard
                        key={index}
                        setActivePointMenu={setActivePointMenu}
                        sumValue={sumValue}
                        setSumValue={setSumValue}
                        callback={props.fetchData}
                        point={point}
                        status={!point.error}
                    />
                ))}
                </BlockMain>
                <BlockMain>
                    <div>
                        <div onClick={() => {setLogin(!login)}}>
                            <IconSvg color={Config.colors.buttonColor} icon={'add_account'} size={'30px'} style={`add-account vr-margin-10 bottom-margin-0 ${login ? "rotate-45 active" : ""}`} />
                        </div>
                        <div className={`container-login ${login ? 'show' : ''}`}>
                            <div onClick={() => {
                                navigate(WebUrls.LoginPage, {state: {backButton:true}})
                            }}>Добавить аккаунт
                            </div>
                        </div>
                    </div>

                </BlockMain>


                {transactions.length > 0 && <BlockMain label={'История операций'} gradient={'gradient-end'}>
                    <Transactions transactions={transactions}/>
                </BlockMain>}
                <BlockMain >
                    <div className={'center hint'}>CLN 2024</div>
                </BlockMain>
            </>
    )
}

