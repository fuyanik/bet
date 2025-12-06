import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { ListFilter } from 'lucide-react'

const page = () => {
  return (
    <div className='w-screen h-auto overflow-x-hidden bg-[#f0f0f0] z-50'>
        <Navbar />

        <div className='w-full h-full flex flex-col gap-3 pt-11 pb-15 px-4'> 
       {/* Form title */}
        <div className='flex items-center justify-between'> 
        <h1 className='text-xl font-bold tracking-tight '>Geçmiş Bonuslar </h1>
        <p className='text-SM text-gray-500 flex items-center gap-1'>
          <ListFilter size={16} />
          Filtre
        </p>
            
        </div> 

        <div className='flex-col w-full'>
            
            <div className='flex items-center justify-between  bg-white border-b border-gray-300 px-8 py-3'> 
                <div className='flex flex-col w-4/5 justify-between'>
                 <p className='text-sm'>JOJOBET-ten Pragmatic Live 1000₺...</p>
                 <p className=' text-xs'>standard</p>
                 <p className=' text-xs'>03/12/2025, 16.08</p>
                </div>
                <div className='flex flex-col gap-4 w-1/5 justify-between h-full items-end'>
                    <p className='font-bold text-gray-600 text-sm'>Aktif</p>
                    <p className='text-sm'>1.250.00₺</p>
                </div>

                
            </div>


            <div className='flex items-center justify-between  bg-white border-b border-gray-300 px-8 py-3'> 
                <div className='flex flex-col w-4/5 justify-between'>
                 <p className='text-sm'>JOJOBET - Kombine Ekstra Oran</p>
                 <p className=' text-xs'>oddBoost</p>
                 <p className=' text-xs'>19/11/2025, 03.52</p>
                </div>
                <div className='flex flex-col gap-4 w-1/5 justify-between h-full items-end'>
                    <p className='font-bold text-gray-600 text-sm'>Aktif</p>
                    <p className='text-sm'>-</p>
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
