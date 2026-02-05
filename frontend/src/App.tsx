import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/pages/Home'
import { UserContext } from './context/userContext'
import Customize from './components/pages/Customize'
import InputName from './components/Customize/InputName'
import RequireAuth from './protectedRoutes/RequireAuth'
import RequireCustomization from './protectedRoutes/RequireCustomization'

const App: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('App must be used within UserContext provider');
  }
  const { user, setUser } = context;
  console.log(user)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <RequireCustomization>
                <Home />
              </RequireCustomization>
            </RequireAuth>
          }
        />

        <Route
          path="/customize"
          element={
            <RequireAuth>
              <Customize />
            </RequireAuth>
          }
        />

        <Route
          path="/ass-name"
          element={
            <RequireAuth>
              <InputName />
            </RequireAuth>
          }
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />
      </Routes>

    </>
  )
}

export default App
