'use client'
import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import { ListFilter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'


const page = () => {
    const router = useRouter()
    const [oyunGecmisi, setOyunGecmisi] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      // localStorage'dan username'i al
      const userDataString = localStorage.getItem('userData')
      if (!userDataString) {
        setIsLoading(false)
        return
      }

      try {
        const userData = JSON.parse(userDataString)
        const username = userData.username

        if (!username) {
          setIsLoading(false)
          return
        }

        // Firestore'dan real-time dinleme
        const docRef = doc(db, 'extracted_data', username)
        const unsubscribe = onSnapshot(
          docRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data()
              setOyunGecmisi(data.oyunGeçmişi || [])
              setIsLoading(false)
            } else {
              setOyunGecmisi([])
              setIsLoading(false)
            }
          },
          (error) => {
            console.error('Firestore listener hatası:', error)
            setIsLoading(false)
          }
        )

        return () => unsubscribe()
      } catch (error) {
        console.error('Veri okuma hatası:', error)
        setIsLoading(false)
      }
    }, [])
  return (
    <div className='w-screen h-auto overflow-x-hidden bg-[#f0f0f0] z-50'>
        <Navbar />
        <header className=' text-[13px] font-bold w-full h-[45px] shadow-md  bg-white items-center flex gap-6 px-6 relative'>
             <p className='text-[#F9C408] relative inline-block after:content-[""] after:absolute after:top-7 after:left-1/2 after:transform after:-translate-x-1/2 after:translate-y-full after:w-[calc(100%+25px)] after:h-[2px] after:bg-[#F9C408]'>Oyun Geçmişi</p>
             <p onClick={() => router.push('/menu/odemegecmisi')} className='text-gray-500'>Ödeme Geçmişi</p>
       
        </header>

        <div className='w-full h-full flex flex-col gap-3 pt-11 pb-15 px-4'> 
        {/* Form title */}
        <div className='flex items-center justify-between'> 
        <h1 className='text-xl font-bold tracking-tight '>Bahis Geçmişi </h1>
        <p className='text-SM text-gray-500 flex items-center gap-1'>
          <ListFilter size={16} />
          Filtre
        </p>
            
        </div> 
        <p className='text-xs text-gray-800'>Bu tablodaki bilgiler geçici olarak 15 dakikaya kadar gecikmeli yansıyor olabilir, bilgilerinze.</p>

        <div className='flex-col w-full'>
            {isLoading ? (
              <div className='flex items-center justify-center bg-white py-8'>
                <p className='text-gray-500'>Yükleniyor...</p>
              </div>
            ) : oyunGecmisi && oyunGecmisi.length > 0 ? (
              oyunGecmisi.map((oyun, index) => (
                <div key={index} className='flex items-center justify-between bg-white border-b border-gray-300 px-8 py-3'> 
                  <div className='flex flex-col w-4/5 justify-between'>
                    <p className='text-[14.5px]'>{oyun.oyun || 'Bilinmeyen Oyun'}</p>
                    <p className='text-[13px] text-gray-500'>{oyun.islem_id || '-'}</p>
                    <p className='text-[13px] text-gray-500'>{oyun.tarih && oyun.saat ? `${oyun.tarih}, ${oyun.saat}` : '-'}</p>
                  </div>
                  <div className='flex flex-col gap-4 w-1/5 justify-between h-full items-end'>
                    <p className='text-gray-700 text-sm'>{oyun.miktar || '0,00'}₺</p>
                    <p className='text-sm text-gray-500'>{oyun.bakiye || '-'}₺</p>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center bg-white py-8'>
                <p className='text-gray-500'>Oyun geçmişi bulunamadı</p>
              </div>
            )}
        </div>

    
   
   
   
        </div>


         <Footer/>
        <BottomNavbar />
      
    </div>
  )
}

export default page
