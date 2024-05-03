import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/loginPage/loginPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index path="/" element={<LoginPage />} />
            <Route path="login/" element={<LoginPage />} />
            <Route path="account/" element={<LoginPage /> } />
        </Routes>
    );
};
