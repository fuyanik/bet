"use client"
import React, { useEffect, useRef } from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const LoadingScreen = () => {
  const router = useRouter()
  const intervalRef = useRef(null)

  /*
  useEffect(() => {
    const checkUserData = async () => {
      try {
        // localStorage'dan userData'yı al
        console.log('=== localStorage Kontrolü ===')
        const userDataString = localStorage.getItem('userData')
        console.log('userDataString:', userDataString)
        
        if (!userDataString) {
          console.error('❌ userData localStorage\'da bulunamadı')
          return
        }

        const userData = JSON.parse(userDataString)
        console.log('Parsed userData:', userData)
        const username = userData.username
        console.log('Username:', username)
        console.log('============================')

        if (!username) {
          console.error('❌ username userData içinde bulunamadı')
          return
        }

        // Firestore'da extracted_data collection'ında username ile document ara
        console.log(`🔍 Firestore'da document aranıyor: extracted_data/${username}`)
        const docRef = doc(db, 'extracted_data', username)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          // Document bulundu, tüm verileri al
          const documentData = docSnap.data()
          
          // Firebase'den gelen tüm verileri logla
          console.log('=== Firebase extracted_data Document Bilgileri ===')
          console.log('Username:', username)
          console.log('Firebase Document Data:', documentData)
          console.log('Login Durumu:', documentData.login)
          console.log('Login Tipi:', typeof documentData.login)
          console.log('Login Değeri (string):', String(documentData.login))
          console.log('===============================================')
          
          // Firebase'den gelen verileri öncelikli olarak kullan (mevcut localStorage data'sını override et)
          const updatedUserData = {
            ...userData,
            ...documentData
          }
          
          // updatedUserData'yı logla
          console.log('=== Updated User Data ===')
          console.log('Updated User Data:', updatedUserData)
          console.log('Updated User Data - Login:', updatedUserData.login)
          console.log('=========================')
          
          // Tüm document verilerini localStorage'a kaydet
          localStorage.setItem('userData', JSON.stringify(updatedUserData))

          // login: true ise anasayfaya yönlendir ve interval'i temizle
          console.log('Login kontrolü yapılıyor...')
          console.log('documentData.login === true:', documentData.login === true)
          console.log('documentData.login == true:', documentData.login == true)
          console.log('Boolean(documentData.login):', Boolean(documentData.login))
          
          if (documentData.login === true) {
            console.log('✅ Login: true - Kullanıcı anasayfaya yönlendiriliyor...')
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            router.push('/')
          } else {
            // login: false ise, login: true olana kadar polling devam edecek
            console.log(`⚠️ Document bulundu ancak login: ${documentData.login}, login: true olana kadar bekleniyor...`)
          }
        } else {
          // Document bulunamadı, polling devam edecek
          console.log(`❌ Document bulunamadı: ${username}, tekrar kontrol edilecek...`)
        }
      } catch (error) {
        console.error('Kullanıcı verisi kontrol hatası:', error)
      }
    }

    // İlk kontrolü yap
    checkUserData()

    // 2 saniyede bir kontrol et (polling)
    intervalRef.current = setInterval(() => {
      checkUserData()
    }, 2000)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [router])
*/
//6 saniye sonra anasayfaya yönlendir
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 9000)
  }, [router])

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
