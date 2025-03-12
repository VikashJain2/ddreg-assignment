import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({children}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate]) // Make sure to add navigate as a dependency

  return <>{children}</>
}

export default AuthProvider
