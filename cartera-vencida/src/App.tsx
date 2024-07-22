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
import Body_Home from './components/body_Home';

const AppRoutes: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        localStorage.removeItem('isAuthenticated');
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Body_Home />} />
            <Route path="/informacion" element={<Body_Information />} />
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
                <main>
                    <AppRoutes />
                </main>
                <Bar_Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
