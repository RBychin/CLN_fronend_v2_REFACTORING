import './App.css';
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {AppRoutes} from "./AppRoutes";
import {getApiRequest} from "./utills/requests";
import {LoginPage} from "./pages/loginPage/loginPage";

function App() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getApiRequest('', {});
            if (!response.error && !response.detail) {
                navigate('/v2/account')
            } else {
                console.log(response);
            }

        } catch (error) {
            console.error('TEST Error fetching user:', error);
            navigate('')
            }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
      <div className="App">
          <Routes>
              <Route index path="/v2/" element={<LoginPage />} />
              <Route path="/v2/login/" element={<LoginPage />} />
              <Route path="/v2/account/" element={<LoginPage /> } />
              <Route index path="*" element={<LoginPage />} />
          </Routes>
      </div>
    );
}

export default App;
