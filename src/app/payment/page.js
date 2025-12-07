'use client'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import payment1 from "../../assets/payment1.png"
import payment2 from "../../assets/payment2.png"
import payment3 from "../../assets/payment3.png"
import payment4 from "../../assets/payment4.png"
import payment5 from "../../assets/payment5.png"
import payment6 from "../../assets/payment6.png"
import payment7 from "../../assets/payment7.png"
import payment8 from "../../assets/payment8.png"
import payment9 from "../../assets/payment9.png"
import payment10 from "../../assets/payment10.webp"
import payment11 from "../../assets/payment11.webp"
import payment12 from "../../assets/payment12.png"
import payment13 from "../../assets/payment13.png"
import payment14 from "../../assets/payment14.png"
import payment15 from "../../assets/payment15.png"
import payment16 from "../../assets/payment16.png"
import BottomNavbar from '@/components/BottomNavbar'
import { getPaymentSettings } from '@/lib/adminFirebase'

const paymentMethodsConfig = [
  { id: 'trc20', href: '/payment/trc20', image: payment1, name: 'TRC20', min: '250.00', max: '50,000,000,000', favorite: true },
  { id: 'bitcoin', href: '/payment/bitcoin', image: payment2, name: 'Bitcoin', min: '100.00', max: '10,000,000,000', favorite: true },
  { id: 'ethereum', href: '/payment/ethereum', image: payment3, name: 'Ethereum', min: '100.00', max: '0,000,000,000', favorite: true },
  { id: 'tron', href: '/payment/tron', image: payment4, name: 'Tron', min: '100.00', max: '50,000,000,000', favorite: true },
  { id: 'erc20', href: '/payment/erc20', image: payment5, name: 'ERC20', min: '250.00', max: '50,000,000,000', favorite: true },
  { id: 'doge', href: '/payment/doge', image: payment6, name: 'Doge', min: '250.00', max: '50,000,000,000', favorite: true },
  { id: 'havale-1', href: '/payment/havale-1', image: payment7, name: 'Havale', min: '5000.00', max: '10,000,000,000', favorite: true },
  { id: 'havale-2', href: '/payment/havale-2', image: payment8, name: 'Havale', min: '5000.00', max: '0,000,000,000', favorite: true },
  { id: 'havale-3', href: '/payment/havale-3', image: payment9, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: true },
  { id: 'havale-4', href: '/payment/havale-4', image: payment10, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'havale-5', href: '/payment/havale-5', image: payment11, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'havale-6', href: '/payment/havale-6', image: payment12, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'havale-7', href: '/payment/havale-7', image: payment13, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'havale-8', href: '/payment/havale-8', image: payment14, name: 'Havale', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'kredi-karti', href: '/payment/kredi-karti', image: payment15, name: 'Kredi Kartı', min: '100.00', max: '50,000,000,000', favorite: false },
  { id: 'havale-9', href: '/payment/havale-9', image: payment16, name: 'Havale', min: '1000.00', max: '50,000,000,000', favorite: false },
]

const page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentSettings, setPaymentSettings] = useState({})

  useEffect(() => {
    const loadData = async () => {
      const settings = await getPaymentSettings()
      setPaymentSettings(settings)
      setIsLoading(false)
    }
    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center bg-[#e5e6e7]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7D749]'></div>
      </div>
    )
  }

  // Filter only enabled payment methods
  const enabledMethods = paymentMethodsConfig.filter(method => {
    const setting = paymentSettings[method.id]
    return setting?.enabled !== false // Default to enabled if not set
  })

  return (
    <div className='w-screen overflow-x-hidden h-auto mb:pb-10 pb-20'>
      <Navbar onLoginClick={() => {}} />
      <BottomNavbar />

      <div className='w-full h-full bg-[#e5e6e7] md:p-10 p-1 py-7 '>
         <div className='flex items-center justify-center w-full h-full bg-[#eeeeee] py-7'>
             <div className=' md:w-[670px] w-full h-full bg-white flex flex-col gap-3  p-4'>
               <h2 className='text-xl font-bold text-[#546080]'>Ödeme Yöntemleri</h2>
              
               {/* payment options area */}
               <div className='w-full flex flex-wrap gap-3 '>
              
                 {enabledMethods.map((method) => (
                   <Link 
                     key={method.id}
                     href={method.href} 
                     className={`w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer rounded-sm bg-[#F4F7FA] relative hover:shadow-lg transition-shadow ${method.favorite ? 'border-3 border-[#F7D749]' : ''}`}
                   >
                     {/* Logo Area */}
                     <div className='w-full h-1/2 flex items-center justify-center'>
                       <Image src={method.image} className='w-[60px] md:w-[85px] h-auto max-h-[60px] object-contain' alt={`${method.name} logo`} />
                     </div>

                     {/* Info Area */}
                     <div className='w-full text-[11.4px] items-center flex flex-col h-1/2'>
                        <p className='text-[#3c455b] font-bold'>{method.name}</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY {paymentSettings[method.id]?.minAmount?.toLocaleString() || method.min} - </p>
                        <p className='text-[#435061]'>{paymentSettings[method.id]?.maxAmount?.toLocaleString() || method.max}</p>
                     </div>

                     {/* Favorite Badge */}
                     {method.favorite && (
                       <p className='absolute -top-1.5 right-0 font-italic text-[11px] bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f] rounded-full'>Favori</p>
                     )}
                   </Link>
                 ))}

                 {enabledMethods.length === 0 && (
                   <div className='w-full text-center py-8 text-[#435061]'>
                     Şu anda aktif ödeme yöntemi bulunmamaktadır.
                   </div>
                 )}
                 
                </div>
              

             </div>


        
         </div>
      </div>
   
    </div>
  )
}

export default page
