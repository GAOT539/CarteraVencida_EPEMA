import React from 'react';
import Bar_Header from './components/bar_Header'; // ajusta la ruta según tu estructura de archivos
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Bar_Header />
      {/* Aquí puedes agregar el resto de tu contenido */}
      <main>
        <h1>Bienvenido a EP-EMA</h1>
        {/* Otros componentes y contenido de tu aplicación */}
      </main>
      <Footer/>
    </div>
    
  );
}

export default App;