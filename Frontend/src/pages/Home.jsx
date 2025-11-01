import React from 'react'
import UserContext, { dataContext } from '../Context/UserContext'

const Home = () => {
    let{userData,setUserData}=UserContext(dataContext)
  return (
    <div>
      {userData.firstName}
    </div>
  )
}

export default Home
