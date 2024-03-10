// misc imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import NavBar from "./components-general/NavBar"
import Footer from "./components-general/Footer"
import Signup from "./components-auth/Signup"
import Login from "./components-auth/Login"
import Home from "./components-front-page/Home"
import Account from "./components-account/Account"
import UserHome from './components-protected/UserHome'
import CreateNewMap from './components-protected/CreateNewMap'

function App() {

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <NavBar />
        <main className="flex justify-center grow">
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
