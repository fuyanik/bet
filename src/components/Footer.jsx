import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import footer from '@/assets/footer.webp'
import footer1 from '@/assets/footer1.webp'
import footer2 from '@/assets/footer2.webp'
import footer3 from '@/assets/footer3.webp'


const Footer = () => {
  return (
    <div className=' flex  flex-col w-screen  items-center  gap-8 py-7 pb-40 bg-black'>

      <Image className='object-contain h-auto w-48' src={logo} alt='logo' />

      <div className="flex gap-3 justify-start">
                  {/* X (Twitter) Icon */}
                  <a href="#" className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                  </a>
                  
                  {/* Telegram Icon */}
                  <a href="#" className="w-10 h-10 bg-[#37aee2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity pr-1">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M21.929 2.613a1.996 1.996 0 0 0-1.944.12L2.56 11.533a1.995 1.995 0 0 0 .11 3.652l4.496 1.445 1.53 4.956a1.996 1.996 0 0 0 3.479.51L14.5 19.27l4.89 3.644a2.005 2.005 0 0 0 3.232-1.243l3.375-17.5a2 2 0 0 0-2.068-2.558ZM12.014 13.4l-1.148 4.785-.65-3.85L20.33 5.45 12.014 13.4Z"></path></svg>
                  </a>
      </div>

      <h2 className='text-amber-300 text-sm tracking-tighter'>GENEL KURALLAR VE ŞARTLAR </h2>

      <div className='h-[1px] w-full bg-[#ffffff20]'></div>

      {/* down to line */}
      <div className='flex flex-col w-full py-3 px-7 items-center justify-center text-white'>
         <h2 className='text-white text-sm '> İŞ ORTAĞIMIZ</h2>
         <Image src={footer} alt='footer' className='object-contain h-auto w-40' />
         <p className='text-[10px]'> <span className='font-bold'>Destek</span> support@jojobet.com | <span className='font-bold'>Partnerler</span>   partners@jojobet.com</p>
         <p className='text-[10px]'> <span className='font-bold'>Reklam</span> press@jojobet.com | <span className='font-bold'>Şikayet</span>   sikayet@jojobet.com</p>

         <div className='flex flex-col gap-3 w-full mt-5 text-[10px] '>
          <p> <span className='text-amber-300 font-bold'> Jojobet</span>, bahis sektöründe ilkleri hedefleyen, kullanıcı memnuniyetini ve yüksek hizmet kalitesini merkeze alan yenilikçi bir bahis ve şans oyunları platformudur.
          Tüm dünyadaki spor dallarında, 125’ten fazla branşta ve her ay 40.000’in üzerinde canlı bahis seçeneğiyle, oyuncularına zengin içerikli ve yüksek oranlı bir oyun deneyimi sunar. Sadece oran avantajıyla değil, sunduğu benzersiz bahis seçenekleriyle de eğlenceyi ve heyecanı bir araya getirir.</p>
          
          <p> <span className='font-bold'>Jojobet </span>, geniş kapsamlı canlı casino bölümünde; blackjack, rulet, baccarat gibi klasik masa oyunlarının yanı sıra piyasanın en yüksek ödüllerini dağıtan slot oyunları ile oyuncularına gerçek bir kumarhane atmosferi yaşatır. Şansınızı en sevilen oyunlarda deneyin, büyük kazançlara siz de ortak olun.
          Sürekli güncellenen promosyonlarımızla, üyelerimizin keyifli ve kazançlı bir ortamda oyun oynamasını hedeflerken, 7 gün 24 saat kesintisiz çalışan deneyimli destek ekibimizle daima yanınızdayız. Tüm para yatırma ve çekme işlemleri hızlı, güvenli ve sorunsuz bir şekilde gerçekleşir.</p>
          <p>Bir Coinbar N.V. markası olan  <span className='font-bold'> Jojobet</span>, Curacao Hükümeti tarafından lisanslanmış olup GCB (OGL/2024/920/0382) lisansı kapsamında yasal ve denetimli olarak hizmet vermektedir.
          Lütfen sorumlu bahis oynayınız. ©  <span className='font-bold'>Jojobet</span> 2025 – Tüm hakları saklıdır.</p>

         </div>
        
           


      </div>

      <div className='flex justify-around w-full px-7'>

         <Image src={footer1} alt='footer1' className='object-contain h-auto w-20' />
         <Image src={footer2} alt='footer2' className='object-contain h-auto w-20' />     
         <Image src={footer3} alt='footer3' className='object-contain h-auto w-20' />     
      </div>
  
    </div>
  )
}

export default Footer
