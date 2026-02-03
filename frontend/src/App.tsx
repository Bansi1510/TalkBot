import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
