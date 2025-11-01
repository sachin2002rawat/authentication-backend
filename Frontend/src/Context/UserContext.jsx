import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
export const dataContext=createContext()
const UserContext = ({children}) => {
  let [userData,setUserData]=useState({});
    const serverUrl="https://authentication-backend-1-jmw5.onrender.com"
    const getUserdata=async()=>{
      try {
        let {data}=await axios.get(serverUrl+'/api/getUserdata',{
          withCredentials:true
        })

setUserData(data)

      } 
      catch (error) {
        console.log(error)
      }
    }
    const value={
        serverUrl,
        setUserData,
        userData,
        getUserdata
    }
    useEffect(()=>{
   getUserdata()
    },[])

  return (
    <dataContext.Provider value={value}>
     {children}
    </dataContext.Provider>
  )
}

export default UserContext
