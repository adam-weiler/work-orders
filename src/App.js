import React from 'react';
import logo from './logo.svg';
import './App.css';

// Smaller components:
import Main from './Components/Main/Main.js';
import WorkOrders from './Components/WorkerOrders/WorkOrders.js';

function App() {
  return (
    <div className="App">
      Page
      <Main />
      <WorkOrders />
    </div>
  );
}

export default App;
