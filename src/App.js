import './App.css';
import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {getApiRequest} from "./utills/requests";
import {LoginPage} from "./pages/loginPage/loginPage";
import {UserHomePage} from "./pages/UserHomePage/UserHomePage";
import {LoadingPage} from "./pages/LoadingPage/LoadingPage";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {Config} from "./utills/config";
import {AccountPage} from "./pages/AccountPage/AccountPage";

function App() {

    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);
    const [r_error, setError] = useState({text: 'Хьюстон, у нас проблемы...', hint: 'попробуйте позже', code: '500'});

    const fetchData = async () => {
        // При запуске приложения проверяем, есть ли у пользователя авторизованные аккаунты
        navigate('/v2/')
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                setAccounts(response);
                navigate('/v2/user')
            } else {
                navigate('/v2/login');
            }

        } catch (error) {
            setError(error)
            console.error('TEST Error fetching user:', error);
            navigate('/v2/error');
            }
    };
    const tgTest = async () => {
    }

    useEffect(() => {
        tgTest()
        fetchData()
        Config.tgWindow.expand()

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
            navigate('/v2/error')
            console.error('Error updating accounts:', error);
        }
    };

    return (
      <div className="App">
          <Routes>
              <Route index path="/v2/" element={<LoadingPage />} />
              <Route path="/v2/login/" element={<LoginPage updateAccounts={updateAccounts} />} />
              <Route path="/v2/user/" element={<UserHomePage accounts={accounts} updateAccounts={updateAccounts} fetchData={fetchData} /> } />
              <Route path="/v2/account/" element={<AccountPage /> } />
              <Route index path="/v2/error" element={<ErrorPage r_error={r_error} fetchData={fetchData} />} />
              <Route index path="/" element={<Navigate to="/v2/" />} />
          </Routes>
      </div>
    );
}

export default App;
