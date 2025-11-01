 import React, { useContext, useRef, useState } from 'react'
 import axios from 'axios'
 import {useNavigate} from 'react-router-dom'
 import profile from '../assets/profile.jpg'
import { dataContext } from '../Context/UserContext'
 const Signup = () => {
   let {serverUrl,userData,setUserData,getUserdata}=useContext(dataContext)
   let navigate=useNavigate()
  let[firstName,setFirstName]=useState('')
   let[lastName,setLastName]=useState('')
    let[userName,setUserName]=useState('')
     let[email,setEmail]=useState('')
      let[password,setPassword]=useState('')

      let file=useRef(null)
   //axios for fetch
   const handleSignup=async(e)=>{
     e.preventDefault()
     try {
      // Form data made
      let formdata=new FormData()
      formdata.append('firstName',firstName)
      formdata.append('lastName',lastName)
       formdata.append('userName',userName)
        formdata.append('email',email)
         formdata.append('password',password)
    if(backendImages){
      formdata.append('profileImage',backendImages)
    }
    //send data/image to backend
      let {data}=await axios.post(serverUrl + '/api/signup',formdata,
  {withCredentials:true,headers:{'Content-Type':'multipart/form-data'}
})
await getUserdata()
setUserData(data)
if(userData){
  navigate("/home")
}

     } catch (error) {
      console.log(error.message)
     }
   }
   //image handle in profile
   let [frontendImage,setFrontendImage]=useState(profile)
   let[backendImages,setBackendImage]=useState(null)
   function handleImage(e){
  let file=e.target.files[0]
   setBackendImage(file)
   //for frontend we have to convert it into url
   let image=URL.createObjectURL(file)
   setFrontendImage(image)
   }

   return (
     <div className='w-full h-[100vh] bg-[black] flex justify-center items-center'>
        <div className='w-[90%] max-w-[400px] h-[532px] bg-[#141f1f] flex flex-col justify-center items-center gap-[15px]'>
          {/* heading */}
        <h1 className='text-white text-[20px] font-semibold'>Sign Up</h1>
        {/* FORM SATRTED */}
       <form className='w-[100%] flex flex-col  items-center justify-center gap-[15px] ' onSubmit={handleSignup}>
     {/* file upload */}
    <input type="file" hidden ref={file} onChange={handleImage} />
    
        {/* image upload */}

        <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white '>
       <img src={frontendImage} alt=""  className='w-[100%] h-[100%]  '/>
       <div className='absolute w-[100%] h-[100%] bg-black hover:opacity-[0.5] top-0  opacity-[0] cursor-pointer flex justify-center items-center text-white font-extrabold text-[30px]' onClick={()=>{ file.current.click()}} >
        +
        </div>
        </div>
        
       <div className='w-[80%] h-[50px] flex items-end justify-center gap-[10px]'>
        {/* FIRST NAME */}
       <input type="text" placeholder='First name...'  className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
     {/* LAST NAME */}
    <input type="text" placeholder='last name...' className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]' onChange={(e)=>setLastName(e.target.value)} value={lastName} />
      </div>
    {/* USERNAME */}
 
 <input type="text" placeholder='Username' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]' onChange={(e)=>setUserName(e.target.value)} value={userName} />
{/* EMAIL */}
<input type="text" placeholder='email' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]' onChange={(e)=>setEmail(e.target.value)} value={email} />
   {/* Password */}
   <input type="text" placeholder='password' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[10px]' onChange={(e)=>setPassword(e.target.value)} value={password}/>
     
{/* BUTTON */}
<button className='bg-[#07c7e4] text-black px-[15px] py-[10px] rounded-lg'>SignUp</button>
<p className='text-white' onClick={()=>navigate('/login')}>Already have an account? <span className='text-blue-500 cursor-pointer'>Login</span></p>

       </form>
 
        </div>
       
     </div>
   )
 }
 
 export default Signup
 