import React from 'react';
import CentralBlock from './Components/CentralBlock/CentralBlock';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import LogInContainer from './Components/LogIn/LoginContainer';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* <CentralBlock /> */}
        <LogInContainer />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
