import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Body_Historical from './components/body_Historical';
import Body_Information from './components/body_Information';
import GeneradorPDF from './components/generator_PDF';
import Body_Login from './components/body_Login';
import Body_User from './components/body_User';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import colors from './resources/style/colors';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Bar_Header />
        <main style={{backgroundColor: colors.background_WhiteSmoke}}>
          <Routes>
            <Route path="/historicos" element={<Body_Historical />} />
            <Route path="/" element={<Body_Information />} />
            <Route path="/login" element={<Body_Login />} />
            <Route path="/usuarios" element={<Body_User />} />
            <Route path="/pdf" element={<GeneradorPDF />} />
          </Routes>
        </main>
        <Bar_Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;