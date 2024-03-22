// react imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// components
import NavBar from './components/global-misc-general/NavBar'
import Footer from "./components/global-misc-general/Footer"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/front-page/Home"
import Account from "./components/account/Account"
import UserHome from './components/user-front-page/UserHome'
import CreateNewMap from './components/edit-create-map/CreateEditMap'
import UserMapView from './components/map-view/UserMapView'

// context and hooks
import { useAuthContext } from './hooks/user-hooks/useAuthContext'
import { MapContextProvider } from './contexts/MapContext'
import { PlaceContextProvider } from './contexts/PlaceContext'
import { MapStateContextProvider } from './contexts/MapStateContext'

function App() {

  const { user } = useAuthContext();

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <NavBar />
        <main className="flex justify-center grow">
          <MapContextProvider>
            <PlaceContextProvider>
              <MapStateContextProvider>
                <Routes>
                  <Route path='/' element={user ? <UserHome /> : <Home />} />
                  <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
                  <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
                  <Route path='/account' element={user ? <Account /> : <Navigate to='/' />} />
                  <Route path='/map/create' element={user ? <CreateNewMap /> : <Navigate to='/' />} />
                  <Route path='/map/edit/:map_id' element={user ? <CreateNewMap /> : <Navigate to='/' />} />
                  <Route path='/map/:map_id' element={user ? <UserMapView /> : <Navigate to='/' />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MapStateContextProvider>
            </PlaceContextProvider>
          </MapContextProvider>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
