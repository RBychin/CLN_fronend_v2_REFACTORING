import './App.css';
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {getApiRequest} from "./utills/requests";
import {LoginPage} from "./pages/loginPage/loginPage";
import {AccountPage} from "./pages/accountPage/accountPage";
import {LoadingPage} from "./pages/LoadingPage/LoadingPage";

function App() {

    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);

    const fetchData = async () => {
        // При запуске приложения проверяем, есть ли у пользователя авторизованные аккаунты
        navigate('/v2/')
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                setAccounts(response);
                navigate('/v2/account')
            } else {
                navigate('/v2/login');
            }

        } catch (error) {
            console.error('TEST Error fetching user:', error);
            navigate('')
            }
    };

    useEffect(() => {
        fetchData()
    }, []);


    const updateAccounts = async () => {
        // Обновляем список аккаунтов при логине и удалении аккаунта
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                setAccounts(response);
            }
        } catch (error) {
            console.error('Error updating accounts:', error);
        }
    };

    return (
      <div className="App">
          <Routes>
              <Route index path="/v2/" element={<LoadingPage />} />
              <Route path="/v2/login/" element={<LoginPage updateAccounts={updateAccounts} />} />
              <Route path="/v2/account/" element={<AccountPage accounts={accounts} updateAccounts={updateAccounts} fetchData={fetchData} /> } />
              <Route index path="*" element={<LoginPage />} />
          </Routes>
      </div>
    );
}

export default App;
