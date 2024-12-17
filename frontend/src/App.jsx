import { useState } from 'react'
import './App.css'
import {Routes, Route } from "react-router-dom";
import PageLogin from './Pages/PageLogin';
import PageSignUp from './Pages/PageSignUp';
import HomePage from './Pages/HomePage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path = '/' element = {<HomePage />}></Route>
        <Route path = '/login' element={<PageLogin />}></Route>
        <Route path = '/signup' element={<PageSignUp />}></Route>
      </Routes>
    </>
  )
}

export default App
