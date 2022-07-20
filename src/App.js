import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter/AppRouter';
import { Context } from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import PreLoader from './Components/PreLoader/PreLoader';
import CentralBlock from './Components/CentralBlock/CentralBlock';

const App = (props) => {
  const {auth} = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if(loading){
    return <PreLoader />
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {
          user
          ?<CentralBlock>
            <AppRouter />
          </CentralBlock>
          :<AppRouter />
        }
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
