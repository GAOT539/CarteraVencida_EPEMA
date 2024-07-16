import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import Body_Information from './components/body_Information';

function App() {
  return (
    <div>
      <Bar_Header />
      <main>
        <Body_Information />
      </main>
      <Bar_Footer />
    </div>

  );
}

export default App;