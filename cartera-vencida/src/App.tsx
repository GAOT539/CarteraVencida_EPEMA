import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard_01';
import Footer from './components/Footer'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
