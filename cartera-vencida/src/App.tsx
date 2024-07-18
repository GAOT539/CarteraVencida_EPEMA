import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Bodega from './components/body_Historical';
import Body_Information from './components/body_Information';
import GeneradorPDF from './components/generator_PDF';
import Body_User from './components/login';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Bar_Header />
        <main>
          <Routes>
            <Route path="/" element={<Bodega />} />
            <Route path="/information" element={<Body_Information />} />
            <Route path="/login" element={<Body_User />} />
          </Routes>
        </main>
        <Bar_Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;