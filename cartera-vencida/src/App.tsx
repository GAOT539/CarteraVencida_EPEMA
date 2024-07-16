import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Bodega from './components/body_Historical';
import Body_Information from './components/body_Information';

function App() {
  return (
    <div>
      <Bar_Header />
      <main>
        <Bodega />
      </main>
      <Bar_Footer />
    </div>

  );
}

export default App;