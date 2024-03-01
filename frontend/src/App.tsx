// misc imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home"
import Account from "./components/Account"

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
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
