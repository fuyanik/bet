'use client'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  return (
    <div className='w-screen h-screen '>
      <Navbar 
        onLoginClick={() => {}} 
        isLoggedIn={isLoggedIn}
        userData={userData}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
      />
   
    </div>
  )
}

export default page
