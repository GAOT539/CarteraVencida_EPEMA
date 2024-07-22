import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Body_Historical from './components/body_Historical';
import Body_Information from './components/body_Information';
import Body_Login from './components/body_Login';
import Body_User from './components/body_User';
import Body_Error from './components/body_Error';
import GeneradorPDF from './components/generator_PDF';
import colors from './resources/style/colors';

const AppRoutes: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Limpiar estado de autenticación cuando la ruta cambia
        localStorage.removeItem('isAuthenticated');
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Body_Information />} />
            <Route path="/historicos" element={<Body_Historical />} />
            <Route path="/login" element={<Body_Login />} />
            <Route path="/pdf" element={<GeneradorPDF />} />
            <Route element={<Body_Error isProtected />}>
                <Route path="/usuarios" element={<Body_User />} />
            </Route>
            <Route path="*" element={<Body_Error />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <div>
                <Bar_Header />
                <main style={{ backgroundColor: colors.background_WhiteSmoke }}>
                    <AppRoutes />
                </main>
                <Bar_Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
