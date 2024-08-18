import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.js'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Cart from './pages/Cart/Cart.js'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.js'
import Footer from './components/Footer/Footer.js'
import LoginPopup from './components/LoginPopup/LoginPopup.js'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
   <Navbar setShowLogin={setShowLogin}/>
   <Routes>
    <Route  path='/' element={<Home/>}></Route>
    <Route  path='/cart' element={<Cart/>}></Route>
    <Route  path='/order' element={<PlaceOrder/>}></Route>
   </Routes>
    </div>
    
   <Footer/>
   </>
  )
}

export default App