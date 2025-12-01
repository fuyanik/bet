'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import menubutton3 from "../assets/menubutton3.svg"
import menubutton1 from "../assets/menubutton1.svg"
import menubutton2 from "../assets/menubutton2.svg"
import menubutton4 from "../assets/menubutton4.svg"
import menubutton5 from "../assets/menubutton5.svg"

import btm1 from "../assets/btm1.png"
import btm2 from "../assets/btm2.png"
import btm3 from "../assets/btm3.png"
import btm4 from "../assets/btm4.png"
import btm5 from "../assets/btm5.png"
import btm6 from "../assets/btm6.png"
import btm7 from "../assets/btm7.png"
import btm8 from "../assets/btm8.png"
import btm9 from "../assets/btm9.png"
import btm10 from "../assets/btm10.png"
import btm11 from "../assets/btm11.png"
import btm12 from "../assets/btm12.png"


const BottomNavbar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
  }

  return (
    <>
      {/* Sliding Panel */}
      <div 
        className={`fixed md:hidden z-50 left-0 right-0 w-full h-[140px] rounded-t-lg bg-[#212121]  border-x border-t border-[#f7d7493c] transition-transform duration-300 ease-in-out ${
          isPanelOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ bottom: '65px' }}
      >
        {/* Close Button */}
        <button 
          onClick={togglePanel}
          className='absolute top-2 right-2 w-3 h-3 flex items-center justify-center text-[#F7D749] text-sm font-bold hover:opacity-70 transition-opacity'
        >
          ✕
        </button>

        {/* Panel Content - Empty for now */}
        <div className='w-full h-full px-3 pb-2 pt-4'>
          {/* İçerik buraya gelecek */}
           <div className='w-full h-full grid grid-cols-6 grid-rows-2 gap-2 p-2'>
              {/* Row 1 - Top 6 items */}
              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm1} alt='btm1' className='w-[31px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm2} alt='btm2' className='w-[31px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm3} alt='btm3' className='w-[28px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm4} alt='btm4' className='w-[31px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm5} alt='btm5' className='w-[28px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm6} alt='btm6' className='w-[30px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              {/* Row 2 - Bottom 6 items */}
              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm7} alt='btm7' className='w-[28px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm8} alt='btm8' className='w-[28px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm9} alt='btm9' className='w-[27px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm10} alt='btm10' className='w-[29px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm11} alt='btm11' className='w-[29px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>

              <div className="flex flex-col gap-0.5 items-center"> 
                  <div className="h-[35px] w-full flex items-center justify-center">
                    <Image src={btm12} alt='btm12' className='w-[29px] h-auto max-w-[45px] object-contain' />
                  </div>
                  <p className='text-[7px] sm:text-[8px] text-center text-[#f3eded] leading-tight'>Sweet Bonanza</p>
              </div>
           </div>
            

        </div>
    
      </div>

      {/* Bottom Navbar */}
      <div className='fixed md:hidden z-50 text-white text-x px-4  bottom-0 left-0 right-0 w-full h-[65px] bg-[#151516]'>
          <div className='flex text-[9px] text-center items-center justify-around gap-1   w-full h-full'>
          
            <div className=' py-1 flex-1 h-full flex flex-col items-center justify-center'>
              <Image className='w-[33px] h-auto mb-1' src={menubutton1} alt='menu' />
              <p>Canlı Destek</p>
            </div>

            <div className=' py-1 flex-1 h-full flex flex-col items-center justify-center'>
              <Image className='w-[33px] h-auto mb-1' src={menubutton2} alt='menu' />
              <p>Casino</p>
            </div>
            
            <div 
              onClick={togglePanel} 
              className=' flex-1 h-full flex items-center justify-center cursor-pointer'
            >
              <Image className='w-[33px] h-auto mb-1' src={menubutton3} alt='menu' />
            </div>
            
            <div className=' py-1 flex-1 h-full flex flex-col items-center justify-center'>
              <Image className='w-[33px] h-auto mb-1' src={menubutton4} alt='menu' />
              <p>Canlı Casino</p>
            </div>

            
            <div className=' py-1 flex-1 h-full flex flex-col items-center justify-center'>
              <Image className='w-[33px] h-auto mb-1' src={menubutton5} alt='menu' />
              <p>25.000.000</p>
            </div>
            
           

          </div>
      </div>
    </>
  )
}

export default BottomNavbar
