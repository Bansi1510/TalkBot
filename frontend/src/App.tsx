import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/pages/Home'
import { UserContext } from './context/userContext'
import Customize from './components/pages/Customize'


const App: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('App must be used within UserContext provider');
  }
  const { user, setUser } = context;
  const isCustomized =
    !!user?.assistantName && !!user?.assistantImage;
  return (
    <>
      <Routes>
        <Route path='/' element={isCustomized ? <Home /> : <Navigate to="/customize" />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
        <Route path='/customize' element={user ? <Customize /> : <Login />} />
      </Routes>
    </>
  )
}

export default App
