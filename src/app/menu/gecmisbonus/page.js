'use client'
import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import { ListFilter } from 'lucide-react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const page = () => {
  const [gecmisBonuslar, setGecmisBonuslar] = useState(null)
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
            setGecmisBonuslar(data.gecmisBonuslar || [])
            setIsLoading(false)
          } else {
            setGecmisBonuslar([])
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
            {isLoading ? (
              <div className='flex items-center justify-center bg-white py-8'>
                <p className='text-gray-500'>Yükleniyor...</p>
              </div>
            ) : gecmisBonuslar && gecmisBonuslar.length > 0 ? (
              gecmisBonuslar.map((bonus, index) => (
                <div key={index} className='flex items-center justify-between bg-white border-b border-gray-300 px-8 py-3'> 
                  <div className='flex flex-col w-4/5 justify-between'>
                    <p className='text-sm'>{bonus.bonusAdi || 'Bonus'}</p>
                    <p className='text-xs'>{bonus.tip || '-'}</p>
                    <p className='text-xs'>{bonus.tarih && bonus.saat ? `${bonus.tarih}, ${bonus.saat}` : '-'}</p>
                  </div>
                  <div className='flex flex-col gap-4 w-1/5 justify-between h-full items-end'>
                    <p className='font-bold text-gray-600 text-sm'>{bonus.durum || 'Aktif'}</p>
                    <p className='text-sm'>{bonus.miktar || '-'}₺</p>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center bg-white py-8'>
                <p className='text-gray-500'>Geçmiş bonus bulunamadı</p>
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
