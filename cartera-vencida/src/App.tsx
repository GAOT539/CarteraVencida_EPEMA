import React from 'react';
import Bar_Header from './components/bar_Header';
import Bar_Footer from './components/bar_Footer';
import DataTable from './components/dateTable';
import Taxpayers from './components/taxpayers';
import Body_Information from './components/body_Information';
import Notification from './components/notification';


function App() {
  return (
    <div>
      <Bar_Header />
      <main>
        <Taxpayers />
        <Notification/>
        <hr />
      </main>
      <Bar_Footer />
    </div>

  );
}

export default App;