'use client'
import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { ListFilter } from 'lucide-react'
import { useRouter } from 'next/navigation'


const page = () => {
    const router = useRouter()
  return (
    <div className='w-screen h-auto overflow-x-hidden bg-[#f0f0f0] z-50'>
        <Navbar />
        <header className=' text-[13px] font-bold w-full h-[45px] shadow-md  bg-white items-center flex gap-6 px-6'>
             <p onClick={() => router.push('/menu/oyungecmisi')} className='text-gray-500'>Oyun Geçmişi</p>
             <p className='text-[#F9C408] relative inline-block after:content-[""] after:absolute after:top-7 after:left-1/2 after:transform after:-translate-x-1/2 after:translate-y-full after:w-[calc(100%+25px)] after:h-[2px] after:bg-[#F9C408]'>Ödeme Geçmişi</p>
        </header>

        <div className='w-full h-full flex flex-col gap-3 pt-11 pb-15 px-4'> 
        {/* Form title */}
        <div className='flex items-center justify-between'> 
        <h1 className='text-xl font-bold tracking-tight '>Ödeme Geçmişi </h1>
        <p className='text-SM text-gray-500 flex items-center gap-1'>
          <ListFilter size={16} />
          Filtre
        </p>
            
        </div> 

        <div className='flex w-full gap-4 '>
          <div className='flex-1 flex justify-center items-center h-8 bg-[#F9C408] text-white text-sm'>Ödeme Geçmişi</div>
          <div className='flex-1 flex justify-center items-center text-gray-700 text-sm h-8 border border-gray-700 '>Çekim Geçmişi</div>
        </div>

        <div className='flex-col w-full'>
            {/* 1. oyun */}
            <div className='flex items-center justify-between  bg-white border-b border-gray-300 px-8 py-3'> 
                <div className='flex flex-col w-4/5 justify-between'>
          
                 <p className=' text-[13px] text-gray-500 mt-4'>522355906732700</p>
                 <p className=' text-[13px] text-gray-500'>06/12/2025, 16.08</p>
                </div>
                <div className='flex flex-col gap-4 w-1/5 justify-between h-full items-end'>
                    <p className=' text-[#F9C408] font-bold text-sm'>Başarılı</p>
                    <p className='text-sm text-gray-500'>120,00₺</p>
                </div>

                
            </div>

            


        </div>



     
            


      

    
   
   
   
        </div>


         <Footer/>
        <BottomNavbar />
      
    </div>
  )
}

export default page
