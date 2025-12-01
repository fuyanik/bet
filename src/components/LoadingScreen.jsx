"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <div 
      className='fixed top-0 left-0 right-0 bottom-0 h-screen w-screen min-h-screen min-w-full flex items-center bg-[#0e1f04] justify-center z-[999999] overflow-hidden pointer-events-auto'
      style={{ position: 'fixed' }}
    >
      {/* Main logo container with massive yellow shadow */}
      <div 
        className='relative z-10 flex flex-col items-center justify-center md:w-70 md:h-70 w-55 h-55 bg-[#224d094e] rounded-full border-8 border-[#eecd48]'
        style={{
          animation: 'pulse-shadow 2s ease-in-out infinite',
        }}
      >
        {/* Orange spinning border inside - Outer ring */}
        <div 
          className='absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow'
          style={{
            borderTopColor: '#f97316',
            borderRightColor: '#f97316',
          }}
        ></div>
        
        {/* Orange spinning border inside - Inner ring (reverse) */}
        <div 
          className='absolute inset-2 rounded-full border-3 border-transparent animate-spin-reverse'
          style={{
            borderBottomColor: '#fb923c',
            borderLeftColor: '#fb923c',
          }}
        ></div>
        
        {/* Logo */}
        <Image src={logo} alt='logo'  className=' w-[120px] md:w-[200px]  h-auto relative z-10' />
      </div>
    </div>
  )
}

export default LoadingScreen
