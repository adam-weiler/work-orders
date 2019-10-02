import React from 'react';
import './App.css';

// Smaller components:
import WorkOrders from './Components/WorkerOrders/WorkOrders.js';

function App() {
  return (
    <div className="App">
      <h1>Work Orders:</h1>
      <WorkOrders />
    </div>
  );
}

export default App;
