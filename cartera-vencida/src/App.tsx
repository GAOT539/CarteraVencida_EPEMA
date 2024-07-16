import React from 'react';
import Bar_Header from './components/bar_Header'; // ajusta la ruta según tu estructura de archivos
import Bar_Footer from './components/bar_Footer';
import DataTable from './components/Table';
import Taxpayers_Wineries from './components/taxpayers_Wineries';
import Taxpayers_Positions from './components/taxpayers_Positions';
import Body_Information from './components/body_Information';
import Notification from './components/notification';


function App() {
  return (
    <div>
      <Bar_Header />
      <main>
        <Taxpayers_Wineries />
        <Notification/>
        <hr />
      </main>
      <Bar_Footer />
    </div>

  );
}

export default App;