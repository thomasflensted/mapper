// misc imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// components
import NavBar from "./components/components-general/NavBar"
import Footer from "./components/components-general/Footer"
import Signup from "./components/components-auth/Signup"
import Login from "./components/components-auth/Login"
import Home from "./components/components-front-page/Home"
import Account from "./components/components-account/Account"
import UserHome from './components/components-user-home/UserHome'
import CreateNewMap from './components/components-edit-create-map/CreateEditMap'
import { useAuthContext } from './hooks/user-hooks/useAuthContext'
import { MapContextProvider } from './contexts/MapContext'

function App() {

  const { user } = useAuthContext();

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <NavBar />
        <main className="flex justify-center grow">
          <MapContextProvider>
            <Routes>
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
              <Route path='/account' element={user ? <Account /> : <Navigate to='/' />} />
              <Route path='/' element={user ? <UserHome /> : <Home />} />
              <Route path='/createmap' element={user ? <CreateNewMap /> : <Navigate to='/' />} />
              <Route path='/editmap' element={user ? <CreateNewMap /> : <Navigate to='/' />} />
            </Routes>
          </MapContextProvider>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
