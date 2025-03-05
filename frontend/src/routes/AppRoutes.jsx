import React from 'react'
import {Routes, Route,BrowserRouter} from 'react-router-dom'
import Home from '../screens/Home.jsx'
import Login from '../screens/Login.jsx'
import Register from '../screens/Register.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
