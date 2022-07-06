import React from 'react';
import './App.css';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <CentralBlock />
      <Footer />
    </div>
  );
}

export default App;
