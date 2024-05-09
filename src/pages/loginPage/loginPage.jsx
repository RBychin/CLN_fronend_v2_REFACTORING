import {useEffect, useState} from 'react';
import { postApiRequest } from "../../utills/requests";
import {useLocation, useNavigate} from "react-router-dom";
import {InputComponent} from "../../components/InputComponent";

export const LoginPage = (props) => {
    const [idValue, setIdValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loginError, setLoginError] = useState(null);
    const isFormValid = idValue.length > 0 && passwordValue.length > 0;
    const navigate = useNavigate();

    const location = useLocation()

    useEffect(() => {
        location.state && location.state.idValue && setIdValue(location.state.idValue)
    }, []);


    const onClickLogin = async() => {
        // Проверяем, валидность введенных данных, если все ок - отправляем пользователя на страницу аккаунта
        try {
            const response = await postApiRequest('', {}, { pin: +idValue, password: passwordValue });
            const response_data = await response.json();
            if (!response_data.error) {
                props.updateAccounts()
                navigate('/v2/user');
            } else {
                setLoginError(response_data.error);
                setPasswordValue("");
            }
        } catch (error) {
        }
    }

    return (
        <>
            <div className='vh-100 margin-auto flex center'>
                <div className='vw-85 margin-auto'>
                    <div className='margin-auto center'>
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

                        {isFormValid &&
                            <div className='vr-margin-30'>
                                <span className='glow' onClick={onClickLogin}>
                                LOGIN
                            </span>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </>
    );
};
