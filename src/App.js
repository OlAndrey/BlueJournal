import React from 'react';
import './App.css';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Header from './Components/Header/Header';

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <CentralBlock />
    </div>
  );
}

export default App;
