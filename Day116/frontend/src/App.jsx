import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router'
import { Routes } from './app.routes'
import "../src/features/shared/global.scss"
import { AuthContextProvider } from './features/auth/auth.context'
const App = () => {
  return (
    <>
    <AuthContextProvider>
      <RouterProvider router={Routes}/>
    </AuthContextProvider>
    </>
  )
}

export default App
