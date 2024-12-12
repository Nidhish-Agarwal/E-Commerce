import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/auth/Login'
import SignupPage from './components/auth/Sign-up'
import {Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path = '/'></Route>
        <Route path = '/login' element={<LoginPage/>}></Route>
        <Route path = '/signup' element={<SignupPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
