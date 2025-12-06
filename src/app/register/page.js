'use client'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import React, { useState } from 'react'
import Image from 'next/image'
import registerBanner from "../../assets/registerbanner.webp"
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState('Turkey')
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState('+90')
  const [isCountryCodeDropdownOpen, setIsCountryCodeDropdownOpen] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  
  // Form States
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')

  const countries = [
    'Turkey',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
    'Belgium',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Poland',
    'Austria',
    'Switzerland',
    'Greece',
    'Portugal',
    'Czech Republic',
    'Romania'
  ]

  const countryCodes = [
    { country: 'Turkey', code: '+90' },
    { country: 'United States', code: '+1' },
    { country: 'United Kingdom', code: '+44' },
    { country: 'Germany', code: '+49' },
    { country: 'France', code: '+33' },
    { country: 'Italy', code: '+39' },
    { country: 'Spain', code: '+34' },
    { country: 'Netherlands', code: '+31' },
    { country: 'Belgium', code: '+32' },
    { country: 'Sweden', code: '+46' },
    { country: 'Norway', code: '+47' },
    { country: 'Denmark', code: '+45' },
    { country: 'Finland', code: '+358' },
    { country: 'Poland', code: '+48' },
    { country: 'Austria', code: '+43' },
    { country: 'Switzerland', code: '+41' },
    { country: 'Greece', code: '+30' },
    { country: 'Portugal', code: '+351' },
    { country: 'Czech Republic', code: '+420' },
    { country: 'Romania', code: '+40' }
  ]

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepClick = (step) => {
    setCurrentStep(step)
  }

  const handleRegister = () => {
    // Form bilgilerini localStorage'a kaydet
    const userData = {
      email,
      username,
      password,
      passwordConfirm,
      birthdate,
      firstName,
      lastName,
      address,
      city,
      country: selectedCountry,
      countryCode: selectedCountryCode,
      phone,
      totalBakiyeBilgisi: 0,
      registeredAt: new Date().toISOString()
    }
    
    localStorage.setItem('userData', JSON.stringify(userData))
  
    
    // 1.5 saniye buton animasyonu
    setIsLoadingButton(true)
    setTimeout(() => {
      setIsLoadingButton(false)
      setShowLoadingScreen(true)
      // 1 saniye loading screen sonra payment'a yönlendir
      setTimeout(() => {
        router.push('/payment')
      }, 1000)
    }, 1500)
  }

  const partyIcon = (
    <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve">
  <path className="cone-body" fill="#ff718d" d="M271.992,375.99L27.345,511.622c-3.161,1.752-8.283-2.96-6.798-6.255l114.85-255.065"></path>
  <path className="cone-part" fill="#EF8990" d="M249.373,355.176L34.548,474.274l-14.001,31.094c-1.484,3.297,3.636,8.008,6.799,6.255
    L271.993,375.99L249.373,355.176z"></path>
  <ellipse className="cone-part" transform="matrix(0.6771 -0.7359 0.7359 0.6771 -161.0841 252.6818)" fill="#59D3C4" cx="207.387" cy="309.895" rx="40.387" ry="93.5"></ellipse>
  <path className="cone-inner" fill="#29cdff" d="M234.73,280.166c-37.998-34.964-81.046-50-96.15-33.585c-4.671,5.076-6.115,12.571-4.768,21.529
    c20.053,2.145,47.666,16.588,73.038,39.934c26.248,24.151,43.211,51.489,46.22,71.5c9.978,1.067,18.093-0.895,23.112-6.35
    C291.288,356.78,272.728,315.129,234.73,280.166z"></path>
  <path fill="#ff718d" d="M276.14,195.076c-2.976,0-5.885-1.492-7.572-4.206c-2.595-4.178-1.312-9.668,2.865-12.262
    c13.482-8.375,31.86-23.705,42.852-49.18c5.723-13.265,8.638-27.46,8.663-42.19c0.008-4.912,3.992-8.888,8.904-8.888
    c0.005,0,0.009,0,0.015,0c4.917,0.008,8.896,4.001,8.888,8.919c-0.027,17.159-3.433,33.717-10.118,49.215
    c-12.82,29.709-34.16,47.532-49.805,57.251C279.368,194.643,277.744,195.076,276.14,195.076z"></path>
  <g>
    <path style={{fill:"#fdff6a"}} d="M283.649,272.084c-0.797,0-1.606-0.108-2.41-0.334c-4.734-1.327-7.494-6.243-6.166-10.977
      c9.902-35.291,26.337-59.243,48.847-71.194c14.197-7.54,26.912-8.403,39.209-9.24c11.42-0.775,22.208-1.509,35.216-7.307
      c18.331-8.17,33.787-23.325,45.939-45.047c2.399-4.289,7.822-5.822,12.117-3.424c4.29,2.4,5.823,7.827,3.423,12.118
      c-14.068,25.147-32.314,42.85-54.231,52.618c-15.896,7.085-29.369,8-41.257,8.809c-11.388,0.774-21.224,1.444-32.067,7.2
      c-18.042,9.578-31.519,29.858-40.054,60.277C291.113,269.512,287.54,272.084,283.649,272.084z"></path>
    <path style={{fill:"#fdff6a"}} d="M190.114,219.972c0.329,0.725,0.761,1.419,1.299,2.057c3.163,3.766,8.779,4.251,12.543,1.087
      c28.06-23.581,43.098-48.435,44.695-73.872c1.009-16.043-3.451-27.982-7.763-39.528c-4.005-10.723-7.789-20.852-7.875-35.094
      c-0.122-20.069,7.306-40.402,22.078-60.434c2.917-3.956,2.076-9.527-1.882-12.451c-3.958-2.918-9.532-2.075-12.451,1.883
      c-17.102,23.19-25.698,47.115-25.552,71.11c0.106,17.402,4.83,30.054,9,41.215c3.994,10.693,7.442,19.929,6.673,32.181
      c-1.28,20.387-14.192,41.03-38.379,61.357C189.374,212.112,188.509,216.428,190.114,219.972z"></path>
  </g>
  <path style={{fill:"#ff718d"}} d="M417.858,315.683c-3.913,0-7.756-0.412-11.526-1.235c-10.938-2.387-17.783-7.566-23.824-12.134
    c-3.885-2.939-7.556-5.715-12.33-7.839c-15.078-6.704-35.532-4.001-60.791,8.042c-4.442,2.113-9.754,0.232-11.869-4.206
    c-2.115-4.439-0.233-9.752,4.206-11.869c30.172-14.382,55.638-17.154,75.691-8.236c6.646,2.955,11.527,6.648,15.835,9.905
    c5.456,4.128,9.765,7.386,16.88,8.939c11.36,2.479,24.31-0.719,38.483-9.51c4.178-2.592,9.668-1.307,12.258,2.873
    c2.593,4.179,1.307,9.668-2.873,12.258C444.044,311.329,430.59,315.683,417.858,315.683z"></path>
  <g>
    <path style={{fill:"#29cdff"}} d="M421.163,245.37c-1.962,0-3.937-0.645-5.583-1.973c-3.829-3.088-4.428-8.692-1.341-12.52
      c8.289-10.279,18.851-18.758,30.542-24.518c8.442-4.16,17.477-6.964,26.854-8.335c4.871-0.709,9.387,2.654,10.099,7.521
      s-2.656,9.387-7.521,10.099c-7.537,1.103-14.791,3.352-21.561,6.69c-9.386,4.625-17.876,11.445-24.552,19.723
      C426.34,244.236,423.764,245.37,421.163,245.37z"></path>
    <path style={{fill:"#29cdff"}} d="M367.85,250.656c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
      c5.187,0,9.397,4.211,9.397,9.397C377.246,246.446,373.037,250.656,367.85,250.656z"></path>
  </g>
  <path style={{fill:"#ff718d"}} d="M388.829,122.001c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
    c5.187,0,9.397,4.211,9.397,9.397C398.227,117.79,394.016,122.001,388.829,122.001z"></path>
  <g>
    <path style={{fill:"#29cdff"}} d="M313.389,26.84c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
      c5.187,0,9.397,4.211,9.397,9.397S318.576,26.84,313.389,26.84z"></path>
    <path style={{fill:"#29cdff"}} d="M478.668,90.072c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
      c5.187,0,9.397,4.211,9.397,9.397C488.066,85.861,483.856,90.072,478.668,90.072z"></path>
  </g>
  <path style={{fill:"#fdff6a"}} d="M417.315,45.633c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
    c5.187,0,9.397,4.211,9.397,9.397S422.501,45.633,417.315,45.633z"></path>
  <path style={{fill:"#ff718d"}} d="M276.132,80.674c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
    c5.188,0,9.397,4.211,9.397,9.397C285.529,76.463,281.32,80.674,276.132,80.674z"></path>
  <g>
    <path style={{fill:"#fdff6a"}} d="M482.321,269.097c-5.187,0-9.397-4.211-9.397-9.397s4.21-9.397,9.397-9.397
      c5.187,0,9.397,4.211,9.397,9.397C491.717,264.886,487.508,269.097,482.321,269.097z"></path>
    <path style={{fill:"#fdff6a"}} d="M189.325,158.283c-5.187,0-9.397-4.211-9.397-9.397c0-5.187,4.21-9.397,9.397-9.397
      c5.188,0,9.397,4.211,9.397,9.397C198.722,154.073,194.511,158.283,189.325,158.283z"></path>
  </g>
</svg>
    
  )

  return (
    <div className='w-screen pb-6 overflow-x-hidden bg-white'>
      <Navbar />
      {/* Main Container */}
      <div className='flex flex-col w-full h-full'>

        {/* Banner area */}
        <div className='w-full h-[70px] relative'>
            <Image src={registerBanner} alt='banner' fill className='object-cover w-full h-full' />
           {/* Stepper  */}
            <div className='absolute flex gap-6 right-6.5 -bottom-3'>
                <div 
                    onClick={() => handleStepClick(1)}
                    className={`w-7 h-7 flex items-center justify-center text-sm cursor-pointer transition-all ${
                        currentStep === 1 
                            ? 'bg-[#2c3d11] text-white' 
                            : 'bg-white border-2 border-gray-350 text-gray-400'
                    }`}
                > 
                    1 
                </div>
                <div 
                    onClick={() => handleStepClick(2)}
                    className={`w-7 h-7 flex items-center justify-center text-sm cursor-pointer transition-all ${
                        currentStep === 2 
                            ? 'bg-[#2c3d11] text-white' 
                            : 'bg-white border-2 border-gray-350 text-gray-400'
                    }`}
                > 
                    2 
                </div>
                <div 
                    onClick={() => handleStepClick(3)}
                    className={`w-7 h-7 flex items-center justify-center text-sm cursor-pointer transition-all ${
                        currentStep === 3 
                            ? 'bg-[#2c3d11] text-white' 
                            : 'bg-white border-2 border-gray-350 text-gray-400'
                    }`}
                > 
                    3 
                </div>
            </div>
        </div>
       
        {/* Form area */}
        <div className='w-full  h-full flex flex-col px-6 pt-8 gap-2  border-gray-500'>
            {/* Step 1 - Hesap Detayları */}
            {currentStep === 1 && (
                <>
                    {/* Form title */}
                    <h1 className='text-md font-bold text-gray-700'>Hesap Detayları</h1>

                    {/* Eposta */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='email' className='text-[13px]  text-gray-700'> <span className='text-red-800'>*</span>E-posta</label>
                        <input 
                            type='email' 
                            id='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-md' 
                        />
                    </div>
                    
                    {/* Kullanıcı Adı */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='username' className='text-[13px]  text-gray-700'> <span className='text-red-800'>*</span>Kullanıcı Adı</label>
                        <input 
                            type='text' 
                            id='username' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-md' 
                        />
                    </div>

                    {/* Şifre */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='password' className='text-[13px]  text-gray-700'> <span className='text-red-800'>*</span>Şifre</label>
                        <div className='relative'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-2 pr-10 border border-gray-300 rounded-md' 
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none'
                            >
                                {showPassword ? (
                                    // Açık Göz İkonu
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    // Kapalı Göz İkonu (üstü çizili)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Şifre Tekrar */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='password_confirm' className='text-[13px]  text-gray-700'> <span className='text-red-800'>*</span>Şifrenizi tekrar girin </label>
                        <div className='relative'>
                            <input 
                                type={showPasswordConfirm ? 'text' : 'password'} 
                                id='password_confirm'
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className='w-full p-2 pr-10 border border-gray-300 rounded-md' 
                            />
                            <button
                                type='button'
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none'
                            >
                                {showPasswordConfirm ? (
                                    // Açık Göz İkonu
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    // Kapalı Göz İkonu (üstü çizili)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Doğum Tarihi */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='birthdate' className='text-[13px]  text-gray-700'> <span className='text-red-800'>*</span>Doğum Tarihi</label>
                        <input 
                            type='date' 
                            id='birthdate' 
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-md' 
                        />
                    </div>

                    {/* Sonraki Butonu */}
                    <button 
                        onClick={handleNextStep}
                        className='w-full p-3 text-[#294c0b] bg-[#f4c91c] font-bold mt-4 rounded-md'
                    >
                        Sonraki*
                    </button>
                    
                    <p className='text-xs mt-6'>Kayıt ol butonuna basıldığında <span className='text-[#f4c91c]'> Kurallar & Şartlar</span> tarafınızdan kabul edilmiş sayılacaktır</p>
                </>
            )}

            {/* Step 2 - Kullanıcı Detayları */}
            {currentStep === 2 && (
                <>
                    {/* Form title */}
                    <h1 className='text-md font-bold text-gray-700'>Kullanıcı Detayları</h1>

                    {/* İsim ve Soyad - Side by side */}
                    <div className='w-full flex gap-3 mt-3'>
                        {/* İsim */}
                        <div className='flex-1 flex flex-col gap-2'>
                            <label htmlFor='firstName' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>İsim</label>
                            <input 
                                type='text' 
                                id='firstName' 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md' 
                            />
                        </div>
                        
                        {/* Soyad */}
                        <div className='flex-1 flex flex-col gap-2'>
                            <label htmlFor='lastName' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Soyad</label>
                            <input 
                                type='text' 
                                id='lastName' 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded-md' 
                            />
                        </div>
                    </div>

                    {/* Sokak ve apartman numarası */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='address' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Sokak ve apartman numarası</label>
                        <input 
                            type='text' 
                            id='address' 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-md' 
                        />
                    </div>

                    {/* Şehir */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='city' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Şehir</label>
                        <input 
                            type='text' 
                            id='city' 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded-md' 
                        />
                    </div>

                    {/* Ülke - Custom Dropdown */}
                    <div className='w-full flex flex-col gap-2 mt-3 relative'>
                        <label htmlFor='country' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Ülke</label>
                        <div className='relative'>
                            <div 
                                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                className='w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center'
                            >
                                <span>{selectedCountry}</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className={`w-5 h-5 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            
                            {/* Dropdown List */}
                            {isCountryDropdownOpen && (
                                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10'>
                                    {countries.map((country) => (
                                        <div
                                            key={country}
                                            onClick={() => {
                                                setSelectedCountry(country)
                                                setIsCountryDropdownOpen(false)
                                            }}
                                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                                selectedCountry === country ? 'bg-gray-50 font-semibold' : ''
                                            }`}
                                        >
                                            {country}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sonraki Butonu */}
                    <button 
                        onClick={handleNextStep}
                        className='w-full p-3 text-[#294c0b] bg-[#f4c91c] font-bold mt-4 rounded-md'
                    >
                        Sonraki*
                    </button>
                    
                    <p className='text-xs mt-6'>Kayıt ol butonuna basıldığında <span className='text-[#f4c91c]'> Kurallar & Şartlar</span> tarafınızdan kabul edilmiş sayılacaktır</p>
                </>
            )}

            {/* Step 3 - İletişim Bilgileri */}
            {currentStep === 3 && (
                <>
                    {/* Form title */}
                    <h1 className='text-md font-bold text-gray-700'>İletişim Bilgileri</h1>

                    {/* Telefon Numarası */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='phone' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Telefon Numarası</label>
                        <div className='flex gap-2'>
                            {/* Ülke Kodu Seçici */}
                            <div className='relative w-[120px]'>
                                <div 
                                    onClick={() => setIsCountryCodeDropdownOpen(!isCountryCodeDropdownOpen)}
                                    className='w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-white flex justify-between items-center'
                                >
                                    <span className='text-sm'>{selectedCountryCode}</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className={`w-4 h-4 transition-transform ${isCountryCodeDropdownOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                
                                {/* Dropdown List */}
                                {isCountryCodeDropdownOpen && (
                                    <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-20'>
                                        {countryCodes.map((item) => (
                                            <div
                                                key={item.code}
                                                onClick={() => {
                                                    setSelectedCountryCode(item.code)
                                                    setIsCountryCodeDropdownOpen(false)
                                                }}
                                                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                                    selectedCountryCode === item.code ? 'bg-gray-50 font-semibold' : ''
                                                }`}
                                            >
                                                <div className='text-sm'>{item.code}</div>
                                                <div className='text-xs text-gray-500'>{item.country}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Telefon Numarası Inputu */}
                            <input 
                                type='tel' 
                                id='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='flex-1 p-2 border border-gray-300 rounded-md' 
                                placeholder='' 
                            />
                            
                        </div>
                        <p className='text-[9px] text-gray-700 italic -mt-1'>Lütfen doğru numara ve SMS onay yaparak üyeliğinizi tamamlayınız. SMS onay yapmanız hesap güvenliğiniz için önemlidir.</p>
                    </div>

                    {/* Güvenlik Sorusu */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='securityQuestion' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Güvenlik sorusu</label>
                        <input type='text' id='securityQuestion' className='w-full p-2 border border-gray-300 rounded-md' placeholder='' />
                    </div>

                    {/* Güvenlik Cevap */}
                    <div className='w-full flex flex-col gap-2 mt-3'>
                        <label htmlFor='securityAnswer' className='text-[13px] text-gray-700'> <span className='text-red-800'>*</span>Güvenlik cevap</label>
                        <input type='text' id='securityAnswer' className='w-full p-2 border border-gray-300 rounded-md' />
                    </div>

                    {/* Onay Kutucukları */}
                    <div className='w-full flex flex-col gap-3 mt-5'>
                        {/* Email Promosyon Onayı */}
                        <div className='flex items-start gap-2'>
                            <input 
                                type='checkbox' 
                                id='emailPromo' 
                                className='mt-1 w-4 h-4 cursor-pointer accent-[#f4c91c]'
                            />
                            <label htmlFor='emailPromo' className='text-xs text-gray-700 cursor-pointer'>
                                Evet, promosyonlarınız ve tekliflerinizle ilgili eposta iletişime geçilmesini isterim (Bu bilgiler, Hesap Bilgileriniz kısmından istediğiniz zaman güncelleyebilirsiniz)
                            </label>
                        </div>

                        {/* SMS Onayı */}
                        <div className='flex items-start gap-2'>
                            <input 
                                type='checkbox' 
                                id='smsConsent' 
                                className='mt-1 w-4 h-4 cursor-pointer accent-[#f4c91c]'
                            />
                            <label htmlFor='smsConsent' className='text-xs text-gray-700 cursor-pointer'>
                                SMS ile üye olmak istiyorum
                            </label>
                        </div>
                    </div>

                    {/* Şimdi Kayıt Olun Butonu */}
                    <button 
                        onClick={handleRegister}
                        disabled={isLoadingButton}
                        className='w-full h-[42px] text-[#294c0b] bg-[#f4c91c] font-bold mt-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#e4c448] transition-colors disabled:cursor-not-allowed'
                    >
                        {isLoadingButton ? (
                          <div className="flex items-center gap-4 h-full">
                            <div className="w-2 h-2 bg-[#294c0b] rounded-md animate-[wave_2s_ease-in-out_infinite]"></div>
                            <div className="w-2 h-2 bg-[#294c0b] rounded-md animate-[wave_2s_ease-in-out_0.4s_infinite]"></div>
                            <div className="w-2 h-2 bg-[#294c0b] rounded-md animate-[wave_2s_ease-in-out_0.8s_infinite]"></div>
                            <div className="w-2 h-2 bg-[#294c0b] rounded-md animate-[wave_2s_ease-in-out_1.2s_infinite]"></div>
                          </div>
                        ) : (
                          <>
                            {partyIcon}
                            <span>Şimdi Kayıt Olun!*</span>
                          </>
                        )}
                    </button>
                    
                    <p className='text-xs mt-6'>Kayıt ol butonuna basıldığında <span className='text-[#f4c91c]'> Kurallar & Şartlar</span> tarafınızdan kabul edilmiş sayılacaktır</p>
                </>
            )}
        </div>


      </div>
      
      {/* Loading Screen */}
      {showLoadingScreen && <LoadingScreen />}
    </div>
  )
}

export default page
