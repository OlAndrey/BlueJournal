import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Components/AppRouter/AppRouter'
import { Context } from './index'
import { useAuthState } from 'react-firebase-hooks/auth'
import PreLoader from './Components/PreLoader/PreLoader'
import CentralBlock from './Components/CentralBlock/CentralBlock'
import { getUserByID } from './utils/getter'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useToken } from 'react-firebase-hooks/messaging'
import { messaging } from './firebase'

const App = (props) => {
  const { auth, firestore } = useContext(Context)
  const [user, loading] = useAuthState(auth)
  const [users] = useCollectionData(
      firestore.collection('users')
  )
  const [token] = useToken(messaging, process.env.vapidKey);


  useEffect(() => {
    if(user && users){
      const me = getUserByID(users, user.uid)
      if(token && me.token !== token )
        firestore.doc(me.path).update({
          token
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, users, token]);

  if (loading) {
    return <PreLoader />
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {user ? (
          <CentralBlock>
            <AppRouter />
          </CentralBlock>
        ) : (
          <AppRouter />
        )}

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
