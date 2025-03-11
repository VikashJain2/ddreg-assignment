import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserForm from './pages/UserForm'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className='w-screen h-screen'>
    
      {/* <Navbar/> */}
    <Routes>
      <Route path='/' element={<UserForm/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </div>
  )
}

export default App
