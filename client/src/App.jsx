import { useState } from 'react'

import './App.css'
import SignIn from './components/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Landing'
import Favorite from './components/Favorites'

function App() {
  const [count, setCount] = useState(0)

  return (
<div>
<BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn></SignIn>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/fav' element={<Favorite></Favorite>}></Route>

     </Routes>
     
     </BrowserRouter>
</div>
  )
}

export default App
