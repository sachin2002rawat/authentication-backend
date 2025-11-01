import React, { useContext } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { dataContext } from './Context/UserContext'
const App = () => {
  let {userData,setUserData}=useContext(dataContext)
  return (
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     {/* default login page */}
       <Route path='*' element={<Login/>}/>
       <Route path='/home' element={userData?<Home/>:<Navigate to={'/login'}/>}/>
    </Routes>
  )
}

export default App
