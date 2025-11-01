import React, { useContext, useState } from 'react'
import axios from 'axios'
import profile from '../assets/profile.jpg'
import { dataContext } from '../Context/UserContext'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  let { serverUrl,userData,setUserData,getUserdata } = useContext(dataContext)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate=useNavigate()
  // axios for fetch
const handleLogin=async(e)=>{
e.preventDefault();
   try {
    let data=await axios.post(serverUrl + '/api/login',{
      email,
      password
    },{withCredentials:true})
await getUserdata()
     setUserData(data)
   if(userData){
  navigate("/home")
}
   } catch (error) {

    console.log(error.response.data.message)
    alert(error.response.data.message);
   }
 
}


  return (
    <div className='w-full h-[100vh] bg-[black] flex justify-center items-center'>
      <div className='w-[90%] max-w-[400px] h-[500px] bg-[#141f1f] flex flex-col justify-center items-center gap-[15px]'>
        {/* heading */}
        <h1 className='text-white text-[20px] font-semibold'>Login</h1>

        {/* FORM START */}
        <form
          className='w-[100%] flex flex-col items-center justify-center gap-[20px]'
          onSubmit={handleLogin}
        >
          {/* EMAIL */}
          <input
            type='text'
            placeholder='Email'
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* PASSWORD */}
          <input
            type='password'
            placeholder='Password'
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {/* BUTTON */}
          <button className='bg-[#07c7e4] text-black px-[15px] py-[10px] rounded-lg'>
            Login
          </button>
          <p className='text-white' onClick={()=>navigate('/signup')}>Already have an account? <span className='text-blue-500 cursor-pointer'>Signup</span></p>

        </form>
      </div>
    </div>
  )
}

export default Login
