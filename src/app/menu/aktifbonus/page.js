'use client'
import BottomNavbar from '@/components/BottomNavbar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const page = () => {
  const [aktifBonuslar, setAktifBonuslar] = useState(null)
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
            setAktifBonuslar(data.aktifBonuslar || [])
            setIsLoading(false)
          } else {
            setAktifBonuslar([])
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
       
        {isLoading ? (
          <div className='flex items-center justify-center bg-white py-8 rounded-md'>
            <p className='text-gray-500'>Yükleniyor...</p>
          </div>
        ) : aktifBonuslar && aktifBonuslar.length > 0 ? (
          aktifBonuslar.map((bonus, index) => (
            <div key={index} className='flex flex-col gap-2 text-[13px] p-3 bg-white rounded-md mb-3'> 
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Bonus Adı:</p> 
                <p>{bonus.bonusAdi || 'Bonus'}</p> 
              </div>
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Son Kullanma Tarihi:</p> 
                <p>{bonus.sonKullanmaTarihi || '-'}</p> 
              </div>
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Kalan bonus miktarı:</p> 
                <p>{bonus.kalanBonusMiktari || '0,00'}₺</p> 
              </div>
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Orijinal çevrim şartı:</p> 
                <p>{bonus.orjinalCevrimSarti || '0,00'}₺</p> 
              </div>
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Kalan çevrim şartı:</p> 
                <p>{bonus.kalanCevrimSarti || '0,00'}₺</p> 
              </div>
              <div className='flex gap-1'> 
                <p className='text-gray-600'>Bonus tipi:</p> 
                <p>{bonus.bonusTipi || '-'}</p> 
              </div>
            </div>
          ))
        ) : (
          <p className='text-xs text-gray-700 ml-3'>0 aktif bonusunuz bulunmaktadır</p>
        )}

    </div>
   
   
   
        </div>


         <Footer/>
        <BottomNavbar />
      
    </div>
  )
}

export default page
