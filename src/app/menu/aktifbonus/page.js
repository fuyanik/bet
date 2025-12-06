import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen h-auto overflow-x-hidden bg-[#f0f0f0] z-50'>
        <Navbar />

        <div className='w-full h-full flex flex-col gap-3 pt-4 pb-15 px-3'> 
       {/* Form title */}
        <h1 className='text-sm font-bold text-gray-700'>Aktif Bonuslar </h1>

        {/* İsim ve Soyad - Side by side */}
      <div className='w-full flex flex-col gap-3 '>
         {/* İsim */}
        <div className='flex-1 flex flex-col gap-2'>
        <label htmlFor='firstName' className='text-[13px]  font-bold text-gray-700'> <span className='text-red-800'>*</span>Bonus kodunuz var mı ? </label>
        <input 
            type='text' 
            id='firstName' 
            className='w-full bg-white p-2 border border-gray-300 rounded-sm' 
        />
      
      </div>

      <button    className='w-full p-3 text-white bg-[#f4c91c] font-bold mt-4 rounded-md' >
                        Bonusu Al
        </button>
       
        <p className='text-xs text-gray-700 ml-3 hidden'>0 aktif bonusunuz bulunmaktadır</p>

        <div className='flex flex-col gap-2 text-[13px] p-3 bg-white rounded-md'> 
          <div className='flex gap-1'> <p className='text-gray-600'>Bonus Adı:</p> Jojobet'ten Pragmatic Live 1000₺ Hediye<p></p> </div>
          <div className='flex gap-1'> <p className='text-gray-600'>Son Kullanma Tarihi:</p> <p className=''>2026/01/02</p> </div>
          <div className='flex gap-1'> <p className='text-gray-600'>Kalan bonus miktarı:</p> <p className=''>1.250,00₺</p> </div>
          <div className='flex gap-1'> <p className='text-gray-600'>Orijinal çevrim şartı:</p> <p className=''>35.000,00₺</p> </div>
          <div className='flex gap-1'> <p className='text-gray-600'>Kalan çevrim şartı:</p> <p className=''>34.710,00₺</p> </div>
          <div className='flex gap-1'> <p className='text-gray-600'>Bonus tipi:</p> <p className=''>standard</p> </div>

        </div>

    </div>
   
   
   
        </div>


         <Footer/>
        <BottomNavbar />
      
    </div>
  )
}

export default page
