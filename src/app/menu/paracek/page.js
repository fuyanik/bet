'use client'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import payment1 from "../../../assets/payment1.png"
import payment2 from "../../../assets/payment2.png"
import payment3 from "../../../assets/payment3.png"
import payment4 from "../../../assets/payment4.png"
import payment5 from "../../../assets/payment5.png"
import payment6 from "../../../assets/payment6.png"
import payment7 from "../../../assets/payment7.png"
import payment8 from "../../../assets/payment8.png"
import payment9 from "../../../assets/payment9.png"
import payment10 from "../../../assets/payment10.webp"
import payment11 from "../../../assets/payment11.webp"
import payment12 from "../../../assets/payment12.png"
import payment13 from "../../../assets/payment13.png"
import payment14 from "../../../assets/payment14.png"
import payment15 from "../../../assets/payment15.png"
import payment16 from "../../../assets/payment16.png"
import BottomNavbar from '@/components/BottomNavbar'




const page = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
   // return <LoadingScreen />
  }

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
              
                 {/* Payment Item 1 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment1} className='w-[60px] h-[60px] ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>TRC20</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 250.00 - </p>
                        <p className='text-[#435061]'>50,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 2 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment2} className='w-[95px] h-auto ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Bitcoin</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 100.00 - </p>
                        <p className='text-[#435061]'>10,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 3 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment3} className='w-[95px] h-auto ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Ethereum</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 100.00 - </p>
                        <p className='text-[#435061]'>0,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 4 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment4} className='w-[95px] h-auto' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Tron</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 100.00 - </p>
                        <p className='text-[#435061]'>50,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 5 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment5} className='w-[60px] h-[60px] ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>ERC20</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 250.00 - </p>
                        <p className='text-[#435061]'>50,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
             
                 {/* Payment Item 6 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment6} className='w-[87px] h-auto ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Doge</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 250.00 - </p>
                        <p className='text-[#435061]'>50,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 7 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment7} className='w-[85px] h-auto ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Havale</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 5000.00 - </p>
                        <p className='text-[#435061]'>10,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 8 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment8} className='w-[95px] h-auto ' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Havale</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 5000.00 - </p>
                        <p className='text-[#435061]'>0,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
                
                 {/* Payment Item 9 */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] border-3 cursor-pointer   rounded-sm border-[#F7D749] bg-[#F4F7FA] relative'>
                   
                     {/* Logo Area */}
                     <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment9} className='w-[95px] h-auto' alt='logo'  /> </div>

                     {/* İnfo Area */}
                     <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                        <p className='text-[#3c455b] font-bold'>Havale</p>
                        <p className='text-[#435061]'>Anında</p>
                        <p className='text-[#435061]'>TRY 100.00 - </p>
                        <p className='text-[#435061]'>50,000,000,000</p>
                     </div>
                  

                     {/* Favorite Badge Absolutely Positioned */}
                     <p className='absolute -top-1.5 right-0 font-italic text-[11px]  bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] px-2 italic font-bold text-[#23272f]   rounded-full'>Favori</p> 
                 </div>
             
                 {/* Payment Item 10 - Not Favorite */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment10} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                 {/* Payment Item 11 - Not Favorite */}
                 <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment11} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                  {/* Payment Item 12 - Not Favorite */}
                  <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment12} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                  {/* Payment Item 13 - Not Favorite */}
                  <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment13} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                  {/* Payment Item 14 - Not Favorite */}
                  <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment14} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                  {/* Payment Item 15 - Not Favorite */}
                  <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment15} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Kredi Kartı</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 100.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>

                  {/* Payment Item 16 - Not Favorite */}
                  <div className='w-[calc(33.333%-0.5rem)] md:w-[calc(20%-0.6rem)] h-[160px] cursor-pointer   rounded-sm  bg-[#F4F7FA] relative'>
                   
                   {/* Logo Area */}
                   <div className='w-full h-1/2   flex items-center justify-center'> <Image src={payment16} className='w-[95px] h-auto' alt='logo'  /> </div>

                   {/* İnfo Area */}
                   <div className='w-full text-[11.4px]  items-center flex flex-col h-1/2   '>
                      <p className='text-[#3c455b] font-bold'>Havale</p>
                      <p className='text-[#435061]'>Anında</p>
                      <p className='text-[#435061]'>TRY 1000.00 - </p>
                      <p className='text-[#435061]'>50,000,000,000</p>
                   </div>

                 </div>
                 
                </div>
               

             </div>


        
         </div>
      </div>
   
    </div>
  )
}

export default page
