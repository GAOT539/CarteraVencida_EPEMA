import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Bodega from './components/body_Historical';
import Body_Information from './components/body_Information';
import GeneradorPDF from './components/generator_PDF';

function App() {
  return (
    <div>
      <Bar_Header />
      <main>
        <GeneradorPDF/>
      </main>
      <Bar_Footer />
    </div>

  );
}

export default App;