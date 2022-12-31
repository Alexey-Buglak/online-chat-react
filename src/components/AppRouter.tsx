import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { privatRoutes, CHAT_PATH, LOGIN_PATH, publicRoutes } from '../routes'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../index'

const AppRouter = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)
  
  
  return user ? (
    <Routes>
      {privatRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate replace to={CHAT_PATH} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_PATH} />} />
    </Routes>
  )
}

export default AppRouter
