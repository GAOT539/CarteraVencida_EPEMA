import React from 'react';
import Bar_Header from './components/bar_Header'; // ajusta la ruta según tu estructura de archivos
import Bar_Footer from './components/bar_Footer';

function App() {
  return (
    <div>
      <Bar_Header />
      {/* Aquí puedes agregar el resto de tu contenido */}
      <main>
        <h1>Bienvenido a EP-EMA</h1>
        {/* Otros componentes y contenido de tu aplicación */}
      </main>
      <Bar_Footer/>
    </div>
    
  );
}

export default App;