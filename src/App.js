import './App.css';
import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {getApiRequest} from "./utills/requests";
import {LoginPage} from "./pages/loginPage/loginPage";
import {UserHomePage} from "./pages/UserHomePage/UserHomePage";
import {LoadingPage} from "./pages/LoadingPage/LoadingPage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {Config, WebUrls} from "./utills/config";
import {AccountPage} from "./pages/AccountPage/AccountPage";
import {PaymentPage} from "./pages/PaymentPage/PaymentPage";
import {SettingsPage} from "./pages/SettingsPage";

function App() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);
    const [r_error, setError] = useState({text: 'Хьюстон, у нас проблемы...', hint: 'попробуйте позже', code: '500'});

    const fetchData = async () => {
        // При запуске приложения проверяем, есть ли у пользователя авторизованные аккаунты
        navigate(WebUrls.BASE_URL)
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                setAccounts(response);
                navigate(WebUrls.UserPage)
                Config.HapticFeedback.success()
            } else {
                navigate(WebUrls.LoginPage);
            }

        } catch (error) {
            setError(error)
            console.error('TEST Error fetching user:', error);
            navigate(WebUrls.ErrorPage);
            }
    };
    const tgTest = async () => {
    }

    useEffect(() => {
        tgTest()
        fetchData()
        Config.tgWindow.expand()
        Config.tgWindow.enableClosingConfirmation()
    }, []);


    const updateAccounts = async () => {
        // Обновляем список аккаунтов при логине и удалении аккаунта
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                setAccounts(response);
            }
        } catch (error) {
            setError(error)
            navigate(WebUrls.ErrorPage)
            console.error('Error updating accounts:', error);
        }
    };

    return (
      <div className="App">
          <Routes>
              <Route index path={WebUrls.BASE_URL} element={<LoadingPage />} />
              <Route path={WebUrls.LoginPage} element={<LoginPage updateAccounts={updateAccounts} />} />
              <Route path={WebUrls.UserPage} element={<UserHomePage accounts={accounts} updateAccounts={updateAccounts} fetchData={fetchData} /> } />
              <Route path={WebUrls.AccountPage} element={<AccountPage /> } />
              <Route path={WebUrls.Settings} element={<SettingsPage /> } />
              <Route index path={WebUrls.ErrorPage} element={<ErrorPage r_error={r_error} fetchData={fetchData} />} />
              <Route index path={WebUrls.PaymentPage} element={<PaymentPage />} />
              <Route index path="/" element={<Navigate to={WebUrls.BASE_URL} />} />
          </Routes>
      </div>
    );
}

export default App;
