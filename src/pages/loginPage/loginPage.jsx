import React, {useEffect, useState} from 'react';
import {getApiRequest, postApiRequest} from "../../utills/requests";
import {useLocation, useNavigate} from "react-router-dom";
import {InputComponent} from "../../components/InputComponent";
import {Config, WebUrls} from "../../utills/config";
import IconSvg from "../../components/icons/IconSvg";

export const LoginPage = (props) => {
    const [idValue, setIdValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loginError, setLoginError] = useState(null);
    const isFormValid = idValue.length > 0 && passwordValue.length > 0;
    const navigate = useNavigate();

    const location = useLocation()

    const [login, setLogin] = useState(null);

    const onBackClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        location.state && location.state.idValue && setIdValue(location.state.idValue)
        if (location.state && location.state.backButton) {
            Config.tgWindow.BackButton.show()
            Config.tgWindow.BackButton.onClick(onBackClick)
        }
        Config.tgWindow.MainButton.setText('Войти')
        return () => {
            Config.tgWindow.BackButton.offClick(onBackClick)
            Config.tgWindow.BackButton.hide()
            Config.tgWindow.MainButton.hide()
        }
    }, []);


    useEffect(() => {
        Config.tgWindow.MainButton.onClick(onClickLogin)
        return () => {
            Config.tgWindow.MainButton.offClick(onClickLogin)
            Config.tgWindow.BackButton.offClick(() => {navigate( - 1)})
        };
    }, [Config.tgWindow, idValue, passwordValue, props.associated]);


    const onClickAssociated = async () => {
        Config.HapticFeedback.light()
        await getApiRequest('/link')
        props.updateAccounts()
        props.setAssociated(false)
        navigate(WebUrls.UserPage);
    }


    const onClickLogin = async() => {
        Config.HapticFeedback.light()
        Config.tgWindow.MainButton.showProgress()
        // Проверяем, валидность введенных данных, если все ок - отправляем пользователя на страницу аккаунта
        try {
            const response = await postApiRequest('', {}, { pin: +idValue, password: passwordValue });
            const response_data = await response.json();
            if (!response_data.error) {
                props.updateAccounts()
                Config.HapticFeedback.success()
                navigate(WebUrls.UserPage);
            } else {
                Config.HapticFeedback.error()
                setLoginError(response_data.error);
                setPasswordValue("");
            }
        } catch (error) {
        } finally {
            Config.tgWindow.MainButton.hideProgress()
        }
    }

    if (isFormValid) {
        Config.tgWindow.MainButton.show()
    } else {
        Config.tgWindow.MainButton.hide()
    }

    return (
        <div className=''>
            <div className='vh-full margin-auto flex center'>
                <div className='vw-85 margin-auto'>
                    <div className='margin-auto center'>
                        {props.associated &&
                            <>
                                <div className='center welcome'>
                                    <div onClick={onClickAssociated}
                                         className='card vw-70 plate gradient-background glow bottom-margin-0'>
                                        <div className={"grid"}>
                                            <span className='left'>
                                                <IconSvg style={"icon-small"} icon="security" color={Config.colors.buttonColor}
                                                     size={'40px'}/>
                                            </span>
                                            <span className='right left-text'>
                                                <small>Войти c PIN</small>
                                                <br/>
                                                <h3>{props.associated}</h3>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                                <div style={{marginTop: 40}} onClick={() => {
                                    setLogin(!login)
                                }}
                                     className='card vw-70 plate gradient-background glow bottom-margin-0'>
                                    Использовать другой PIN
                                </div>
                                <div className={`container-login ${login ? 'show' : ''}`}>
                                    <div>
                                        {loginError &&
                                            <div className='hint center'>
                                                <p className='error-text'>{loginError}</p>
                                            </div>
                                        }
                                        <InputComponent
                                            error={loginError}
                                            type='numeric'
                                            placeholder='ID'
                                            id='PINValue'
                                            inputMode="numeric"
                                            onChange={e => setIdValue(e.target.value)}
                                            value={idValue}
                                        />
                                        <InputComponent
                                            error={loginError}
                                            type="password"
                                            placeholder="Password"
                                            id="PassValue"
                                            inputMode="text"
                                            onChange={e => setPasswordValue(e.target.value)}
                                            value={passwordValue}
                                        />
                                        <div className='center welcome'>
                                            <span className="">
                                                Ваш ID и Пароль вы можете узнать в личном кабинете, либо по телефону:<br/>+7 (495) 640-57-00
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {!props.associated &&
                            <div>
                                {loginError &&
                                    <div className='hint center'>
                                        <p className='error-text'>{loginError}</p>
                                    </div>
                                }
                                <InputComponent
                                    error={loginError}
                                    type='numeric'
                                    placeholder='ID'
                                    id='PINValue'
                                    inputMode="numeric"
                                    onChange={e => setIdValue(e.target.value)}
                                    value={idValue}
                                />
                                <InputComponent
                                    error={loginError}
                                    type="password"
                                    placeholder="Password"
                                    id="PassValue"
                                    inputMode="text"
                                    onChange={e => setPasswordValue(e.target.value)}
                                    value={passwordValue}
                                />
                                <div className='center welcome'>
                                    <span className="">
                                        Ваш ID и Пароль вы можете узнать в личном кабинете, либо по телефону:<br/>+7 (495) 640-57-00
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
