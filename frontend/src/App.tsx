// misc imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import NavBar from "./components-unprotected/NavBar"
import Footer from "./components-unprotected/Footer"
import Signup from "./components-auth/Signup"
import Login from "./components-auth/Login"
import Home from "./components-unprotected/Home"
import Account from "./components-account/Account"
import UserHome from './components-protected/UserHome'
import CreateNewMap from './components-protected/CreateNewMap'

function App() {

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <NavBar />
        <main className="flex grow justify-center">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/account' element={<Account />} />
            <Route path='/userhome' element={<UserHome />} />
            <Route path='/create' element={<CreateNewMap />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
